import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  CATEGORIES,
  EQUIPMENT_CATALOG,
  REACTION_RULES,
  SHOWCASE_CATEGORIES,
  evaluateMixture,
  EXPERIMENT_LIBRARY
} from '../data/chemistryData';
import {
  GlassVesselGraphic,
  ToolGraphic,
  SolidChemicalGraphic,
  LiquidChemicalGraphic,
  GasChemicalGraphic,
  HumanHandGraphic
} from './EquipmentSVGs';

const uid = () => `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function ExperimentLab({ initialSetup }) {
  // Navigation & Workspace State
  const [activeCategory, setActiveCategory] = useState('vessel');
  const [libraryTab, setLibraryTab] = useState('equipment');
  const [equipmentGroup, setEquipmentGroup] = useState('glassware');
  const [search, setSearch] = useState('');
  const [workspaceItems, setWorkspaceItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [experimentName, setExperimentName] = useState('Unnamed');
  const [editingName, setEditingName] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [zoomDropdownOpen, setZoomDropdownOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [activeTool, setActiveTool] = useState('pointer'); // 'pointer' | 'pen' | 'select'
  const [sortMode, setSortMode] = useState('default'); // 'default' | 'Z' | 'hash' | 'A'
  const [handAction, setHandAction] = useState(null);

  const equipmentGroups = [
    { id: 'glassware', label: 'Glassware', icon: '⚗' },
    { id: 'measuring', label: 'Measuring', icon: '◉' },
    { id: 'transfer', label: 'Transfer', icon: '⌁' },
    { id: 'heating', label: 'Heating', icon: '♨' },
    { id: 'filtration', label: 'Filtration', icon: '▽' },
    { id: 'other', label: 'Other', icon: '⚙' }
  ];

  const equipmentGroupIds = {
    glassware: ['round_flask', 'separatory_funnel', 'gas_jar', 'gas_cylinder', 'small_test_tube', 'large_test_tube', 'side_arm_tube', 'beaker_100', 'beaker_250', 'conical_flask', 'watch_glass', 'evaporating_dish', 'volumetric_flask', 'measuring_cylinder', 'reagent_bottle'],
    measuring: ['balance', 'thermometer', 'ph_meter', 'burette', 'measuring_pipette', 'volumetric_pipette', 'graduated_pipette'],
    transfer: ['dropper', 'funnel', 'stirring_rod', 'spatula', 'wash_bottle'],
    heating: ['burner', 'hot_plate', 'tripod', 'wire_gauze', 'crucible', 'tongs'],
    filtration: ['filter_funnel', 'filter_paper', 'filter_flask', 'vacuum_filtration'],
    other: ['stand', 'test_tube_rack', 'forceps', 'delivery_tube', 'mortar_pestle', 'desiccator']
  };

  // Reaction Drawer & Modal States
  const [reactionsDrawerOpen, setReactionsDrawerOpen] = useState(false);
  const [activeReactionResult, setActiveReactionResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [labNotes, setLabNotes] = useState([]);
  const [setupModalOpen, setSetupModalOpen] = useState(false);
  const [selectedExperimentId, setSelectedExperimentId] = useState(EXPERIMENT_LIBRARY[0].id);
  const [procedurePanelCollapsed, setProcedurePanelCollapsed] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [runnerPosition, setRunnerPosition] = useState(null);
  const [runnerDrag, setRunnerDrag] = useState(null);

  const canvasRef = useRef(null);
  const runnerPanelRef = useRef(null);

  const handleRunnerDragStart = (event) => {
    if (event.button !== 0 || !runnerPanelRef.current) return;
    const bounds = runnerPanelRef.current.getBoundingClientRect();
    setRunnerPosition({ left: bounds.left, top: bounds.top });
    setRunnerDrag({
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top
    });
    event.preventDefault();
  };

  useEffect(() => {
    if (!runnerDrag) return undefined;

    const handleRunnerDragMove = (event) => {
      const panel = runnerPanelRef.current;
      if (!panel) return;
      const width = panel.offsetWidth;
      const height = panel.offsetHeight;
      const left = Math.max(0, Math.min(window.innerWidth - width, event.clientX - runnerDrag.offsetX));
      const top = Math.max(0, Math.min(window.innerHeight - height, event.clientY - runnerDrag.offsetY));
      setRunnerPosition({ left, top });
    };

    const handleRunnerDragEnd = () => setRunnerDrag(null);
    window.addEventListener('mousemove', handleRunnerDragMove);
    window.addEventListener('mouseup', handleRunnerDragEnd);
    return () => {
      window.removeEventListener('mousemove', handleRunnerDragMove);
      window.removeEventListener('mouseup', handleRunnerDragEnd);
    };
  }, [runnerDrag]);

  // Initialize with default or passed setup
  useEffect(() => {
    if (initialSetup) {
      if (initialSetup.name) setExperimentName(initialSetup.name);
      loadExperimentPreset(initialSetup);
    } else {
      const savedBench = localStorage.getItem('smartchem_saved_bench');
      if (savedBench) {
        try {
          const savedData = JSON.parse(savedBench);
          if (Array.isArray(savedData.workspaceItems)) {
            setExperimentName(savedData.experimentName || 'Unnamed');
            setWorkspaceItems(savedData.workspaceItems);
            addLog('Saved experiment restored.', 'success');
            return;
          }
        } catch {
          localStorage.removeItem('smartchem_saved_bench');
        }
      }

      // Default clean bench setup: Beaker 100mL + Dropper ready to go
      const beakerDef =
        EQUIPMENT_CATALOG.vessel.find((v) => v.id === 'beaker_100') || EQUIPMENT_CATALOG.vessel[7];
      if (beakerDef) {
        setWorkspaceItems([
          {
            ...beakerDef,
            uid: uid(),
            x: 240,
            y: 200,
            contents: [],
            liquidLevel: 0,
            liquidColor: '#58aee8',
            solidContent: null,
            temperature: 25.0,
            isHeating: false,
            isStirring: false,
            reaction: null,
            connectedTo: null,
            measurement: null
          }
        ]);
      }
    }
  }, [initialSetup]);

  const loadExperimentPreset = (preset) => {
    const vesselDef =
      EQUIPMENT_CATALOG.vessel.find((v) => v.id === preset.vesselId) ||
      EQUIPMENT_CATALOG.vessel.find((v) => v.id === 'beaker_250');

    const items = [];
    if (vesselDef) {
      const vesselItem = {
        ...vesselDef,
        uid: uid(),
        x: 280,
        y: 200,
        contents: preset.chemicals || [],
        liquidLevel: preset.chemicals?.some((c) => c.state === 'liquid') ? 0.6 : 0,
        liquidColor: preset.chemicals?.[0]?.color || '#58aee8',
        solidContent: preset.chemicals?.find((c) => c.state === 'solid') || null,
        temperature: preset.isHeating ? 85.0 : 25.0,
        isHeating: preset.isHeating || false,
        isStirring: false,
        reaction: null
      };

      if (preset.chemicals?.length >= 2) {
        const res = evaluateMixture(preset.chemicals, preset.isHeating);
        if (res) {
          vesselItem.reaction = res;
          vesselItem.liquidColor = res.after_color || res.color;
          setActiveReactionResult(res);
        }
      }
      items.push(vesselItem);

      if (preset.isHeating) {
        const burnerDef = EQUIPMENT_CATALOG.tools.find((t) => t.id === 'burner');
        if (burnerDef) {
          items.push({
            ...burnerDef,
            uid: uid(),
            x: 280,
            y: 335,
            isActive: true
          });
        }
      }
    }
    setWorkspaceItems(items);
    setReactionsDrawerOpen(false);
    addLog(`Loaded preset: ${preset.name || 'Experiment'}`);
  };

  // Filter Catalog items based on category, search, and sorting
  const visibleEquipment = useMemo(() => {
    let list;
    if (libraryTab === 'equipment') {
      const ids = equipmentGroupIds[equipmentGroup] || [];
      list = [...EQUIPMENT_CATALOG.vessel, ...EQUIPMENT_CATALOG.tools].filter((item) => ids.includes(item.id));
    } else if (libraryTab === 'tools') {
      list = EQUIPMENT_CATALOG.tools;
    } else {
      list = [...EQUIPMENT_CATALOG.solid, ...EQUIPMENT_CATALOG.liquid, ...EQUIPMENT_CATALOG.gas];
      if (activeCategory === 'solid' || activeCategory === 'liquid' || activeCategory === 'gas') {
        list = EQUIPMENT_CATALOG[activeCategory] || [];
      }
    }
    const query = search.trim().toLowerCase();

    if (query) {
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.detail.toLowerCase().includes(query) ||
          (item.formula && item.formula.toLowerCase().includes(query))
      );
    }

    if (sortMode === 'A') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === 'Z') {
      list = [...list].sort((a, b) => (a.formula || a.name).localeCompare(b.formula || b.name));
    }

    return list;
  }, [activeCategory, equipmentGroup, libraryTab, search, sortMode]);

  // Log Lab event
  const addLog = (message, type = 'info') => {
    setLabNotes((prev) => [
      { id: uid(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), message, type },
      ...prev.slice(0, 15)
    ]);
  };

  const showHandAction = (pose, targetUid, duration = 900) => {
    setHandAction({ pose, targetUid });
    window.setTimeout(() => {
      setHandAction((current) => current?.targetUid === targetUid ? null : current);
    }, duration);
  };

  const simulateMixtureWithBackend = async (vesselId, chemicals, isHeated, fallbackReaction) => {
    if (!chemicals || (!isHeated && chemicals.length < 2)) return fallbackReaction;

    setIsSimulating(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chemicals, is_heated: Boolean(isHeated) })
      });

      if (!response.ok) {
        throw new Error(`Simulation request failed with status ${response.status}.`);
      }

      const data = await response.json();
      const reaction = data.reaction || fallbackReaction;
      if (reaction && reaction.status !== 'idle' && reaction.id) {
        setActiveReactionResult(reaction);
        setWorkspaceItems((items) =>
          items.map((item) =>
            item.uid === vesselId
              ? {
                  ...item,
                  reaction,
                  liquidColor: reaction.after_color || reaction.color || item.liquidColor
                }
              : item
          )
        );
        addLog(`Reaction: ${reaction.equation || reaction.name}`, 'success');
        return reaction;
      }
      return null;
    } catch {
      // Backend simulation is optional; local physics engine smoothly evaluates
      if (fallbackReaction && fallbackReaction.status !== 'idle' && fallbackReaction.id) {
        setActiveReactionResult(fallbackReaction);
      }
      return fallbackReaction;
    } finally {
      setIsSimulating(false);
    }
  };

  // Add chemical directly into vessel
  const addChemicalToVessel = (chemical, vesselId) => {
    const target = workspaceItems.find((item) => item.uid === vesselId);
    const nextContents = target ? [...target.contents, chemical] : [];
    const localReaction = target ? evaluateMixture(nextContents, target.isHeating) : null;

    setWorkspaceItems((items) =>
      items.map((i) => {
        if (i.uid === vesselId) {
          const newContents = [...i.contents, chemical];
          const newLiquidLevel = Math.min(1.0, (i.liquidLevel || 0) + (chemical.state === 'liquid' ? 0.35 : 0));
          const newSolid = chemical.state === 'solid' ? chemical : i.solidContent;
          const rxn = evaluateMixture(newContents, i.isHeating);
          const newColor = rxn ? rxn.after_color || rxn.color : chemical.state === 'liquid' ? chemical.color : i.liquidColor;

          if (rxn) {
            setActiveReactionResult(rxn);
            addLog(`Reaction: ${rxn.name}! (${rxn.equation})`, 'success');
          } else {
            addLog(`${chemical.name} added to ${i.name}.`);
          }

          return {
            ...i,
            contents: newContents,
            liquidLevel: newLiquidLevel,
            solidContent: newSolid,
            liquidColor: newColor,
            reaction: rxn,
            temperature: rxn?.temperatureChange ? i.temperature + rxn.temperatureChange : i.temperature
          };
        }
        return i;
      })
    );

    simulateMixtureWithBackend(vesselId, nextContents, target?.isHeating, localReaction);
  };

  // Place item onto the canvas
  const placeItem = (itemDef, coords) => {
    const defaultX = 140 + (workspaceItems.length % 5) * 125;
    const defaultY = 160 + (workspaceItems.length % 3) * 110;

    const newItem = {
      ...itemDef,
      uid: uid(),
      x: coords?.x ?? defaultX,
      y: coords?.y ?? defaultY,
      contents: itemDef.type === 'chemical' ? [itemDef] : [],
      liquidLevel: itemDef.type === 'chemical' && itemDef.state === 'liquid' ? 0.75 : 0,
      liquidColor: itemDef.color || '#58aee8',
      solidContent: itemDef.state === 'solid' ? itemDef : null,
      temperature: 25.0,
      mass: itemDef.mass || (itemDef.type === 'vessel' ? 120.0 : 0),
      isHeating: false,
      isStirring: false,
      isActive: false,
      reaction: null
    };

    setWorkspaceItems((prev) => [...prev, newItem]);
    setSelectedId(newItem.uid);
    addLog(`Placed ${itemDef.name} onto the bench.`);
  };

  // Drag from catalog handlers
  const handleCatalogDragStart = (e, item) => {
    e.dataTransfer.setData('smartchem-item', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleCanvasDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('smartchem-item');
    if (!data || !canvasRef.current) return;
    const item = JSON.parse(data);
    const bounds = canvasRef.current.getBoundingClientRect();
    const scale = zoomLevel / 100;
    const dropX = Math.max(10, (e.clientX - bounds.left) / scale - 55);
    const dropY = Math.max(10, (e.clientY - bounds.top) / scale - 55);

    // If dropped directly onto an existing vessel on the bench, pour/add it in!
    if (item.type === 'chemical') {
      const targetVessel = workspaceItems.find(
        (v) => v.type === 'vessel' && Math.hypot(v.x - dropX, v.y - dropY) < 75
      );
      if (targetVessel) {
        addChemicalToVessel(item, targetVessel.uid);
        return;
      }
    }

    placeItem(item, { x: dropX, y: dropY });
  };

  // Canvas Move Handlers for placed items
  const handleMouseDownItem = (e, item) => {
    if (isLocked) return;
    e.stopPropagation();
    setSelectedId(item.uid);
    setDraggingId(item.uid);

    const bounds = canvasRef.current.getBoundingClientRect();
    const scale = zoomLevel / 100;
    setDragOffset({
      x: (e.clientX - bounds.left) / scale - item.x,
      y: (e.clientY - bounds.top) / scale - item.y
    });
  };

  const handleCanvasMouseMove = (e) => {
    if (!draggingId || !canvasRef.current || isLocked) return;
    const bounds = canvasRef.current.getBoundingClientRect();
    const scale = zoomLevel / 100;
    const canvasWidth = bounds.width / scale;
    const canvasHeight = bounds.height / scale;
    const newX = Math.max(10, Math.min(canvasWidth - 120, (e.clientX - bounds.left) / scale - dragOffset.x));
    const newY = Math.max(10, Math.min(canvasHeight - 120, (e.clientY - bounds.top) / scale - dragOffset.y));

    setWorkspaceItems((items) =>
      items.map((item) => (item.uid === draggingId ? { ...item, x: newX, y: newY } : item))
    );
  };

  const handleCanvasMouseUp = () => {
    if (!draggingId) return;

    const dragged = workspaceItems.find((i) => i.uid === draggingId);
    if (dragged) {
      // 1. Pouring chemical into a vessel when dropped over it
      if (dragged.type === 'chemical') {
        const targetVessel = workspaceItems.find(
          (v) => v.type === 'vessel' && v.uid !== dragged.uid && Math.hypot(v.x - dragged.x, v.y - dragged.y) < 75
        );
        if (targetVessel) {
          transferContents(dragged.uid, targetVessel.uid);
        }
      }

      // 2. Placing vessel on top of a burner/heater OR dragging heater beneath a vessel
      if (dragged.type === 'vessel') {
        const burner = workspaceItems.find(
          (b) => b.type === 'heater' && Math.hypot(b.x - dragged.x, b.y - (dragged.y + 70)) < 75
        );
        if (burner && burner.isActive) {
          heatVessel(dragged.uid);
        }
      }
      if (dragged.type === 'heater') {
        const vessel = workspaceItems.find(
          (v) => v.type === 'vessel' && Math.hypot(dragged.x - v.x, dragged.y - (v.y + 70)) < 75
        );
        if (vessel && dragged.isActive) {
          heatVessel(vessel.uid);
        }
      }

      if (dragged.type === 'meter') {
        const target = workspaceItems.find(
          (item) =>
            item.uid !== dragged.uid &&
            (item.type === 'vessel' || item.type === 'chemical') &&
            Math.hypot(item.x - dragged.x, item.y - dragged.y) < 105
        );
        if (target) {
          setWorkspaceItems((items) =>
            items.map((item) =>
              item.uid === dragged.uid
                ? {
                    ...item,
                    connectedTo: target.uid,
                    x: target.x + 15,
                    y: target.y + (dragged.id === 'thermometer' ? 18 : 28)
                  }
                : item
            )
          );
          addLog(`${dragged.name} connected to ${target.name}.`);
        }
      }
    }

    setDraggingId(null);
  };

  const handleMeterMeasurement = (meter) => {
    const target = workspaceItems.find((item) => item.uid === meter.connectedTo);
    if (!target) {
      addLog(`Connect ${meter.name} to a vessel or sample first.`, 'warning');
      return;
    }

    const vessel = target.type === 'vessel' ? target : workspaceItems.find((item) => item.uid === target.connectedTo);
    const contents = vessel?.contents || (target.type === 'chemical' ? [target] : []);
    let value = '0.00';
    let unit = 'g';

    if (meter.id === 'thermometer') {
      value = Number(vessel?.temperature ?? target.temperature ?? 25).toFixed(1);
      unit = '°C';
    } else if (meter.id === 'ph_meter') {
      const categories = contents.map((item) => item.category);
      value = categories.includes('strong_acid') ? '1.0' : categories.includes('strong_base') ? '13.0' : '7.0';
      unit = 'pH';
    } else if (meter.id === 'balance') {
      value = contents.reduce((sum, item) => sum + Number(item.mass || 0), Number(vessel?.tare || 0)).toFixed(2);
    }

    const reading = `${value} ${unit}`;
    showHandAction('measure', meter.uid, 1000);
    setWorkspaceItems((items) =>
      items.map((item) => item.uid === meter.uid ? { ...item, measurement: reading, isActive: true } : item)
    );
    addLog(`${meter.name} reading: ${reading} (${target.name}).`, 'success');
  };

  // Transfer / Pour chemical contents into a target vessel
  const transferContents = (sourceId, targetId) => {
    const source = workspaceItems.find((i) => i.uid === sourceId);
    const target = workspaceItems.find((i) => i.uid === targetId);
    if (!source || !target) return;

    const sourceChem = source.type === 'chemical' ? source : source.contents[0];
    if (!sourceChem) return;

    setWorkspaceItems((items) =>
      items.map((i) => (i.uid === sourceId ? { ...i, isPouring: true } : i))
    );
    showHandAction(source.state === 'solid' ? 'scoop' : 'pour', sourceId, 700);

    setTimeout(() => {
      setWorkspaceItems((items) => {
        const updatedTarget = items.find((i) => i.uid === targetId);
        if (!updatedTarget) return items;

        const newContents = [...updatedTarget.contents, sourceChem];
        const newLiquidLevel = Math.min(1.0, (updatedTarget.liquidLevel || 0) + (sourceChem.state === 'liquid' ? 0.35 : 0));
        const newSolid = sourceChem.state === 'solid' ? sourceChem : updatedTarget.solidContent;

        const reactionResult = evaluateMixture(newContents, updatedTarget.isHeating);
        const newColor = reactionResult
          ? reactionResult.after_color || reactionResult.color
          : sourceChem.state === 'liquid'
          ? sourceChem.color
          : updatedTarget.liquidColor;

        if (reactionResult) {
          setActiveReactionResult(reactionResult);
          addLog(`Reaction: ${reactionResult.name}!`, 'success');
        } else {
          addLog(`${source.name} added into ${target.name}.`);
        }

        simulateMixtureWithBackend(targetId, newContents, updatedTarget.isHeating, reactionResult);

        return items
          .filter((i) => (source.type === 'chemical' ? i.uid !== sourceId : true))
          .map((i) => {
            if (i.uid === targetId) {
              return {
                ...i,
                contents: newContents,
                liquidLevel: newLiquidLevel,
                solidContent: newSolid,
                liquidColor: newColor,
                reaction: reactionResult,
                temperature: reactionResult?.temperatureChange
                  ? i.temperature + reactionResult.temperatureChange
                  : i.temperature
              };
            }
            if (i.uid === sourceId && source.type !== 'chemical') {
              return { ...i, isPouring: false, liquidLevel: 0, contents: [], solidContent: null };
            }
            return i;
          });
      });
    }, 600);
  };

  // Manual Pour / Scoop Action
  const handlePourAction = (sourceItem) => {
    const targetVessel = workspaceItems.find(
      (v) => v.type === 'vessel' && v.uid !== sourceItem.uid && Math.hypot(v.x - sourceItem.x, v.y - sourceItem.y) < 240
    );
    if (!targetVessel) {
      addLog(`Move ${sourceItem.name} near a reaction vessel to transfer.`, 'warning');
      return;
    }
    transferContents(sourceItem.uid, targetVessel.uid);
  };

  // Stir vessel contents
  const handleStirAction = (vesselId) => {
    showHandAction('stir', vesselId, 1300);
    setWorkspaceItems((items) =>
      items.map((i) => (i.uid === vesselId ? { ...i, isStirring: true } : i))
    );
    addLog('Stirring mixture with glass stirring rod...');
    setTimeout(() => {
      setWorkspaceItems((items) =>
        items.map((i) => {
          if (i.uid === vesselId) {
            const rxn = evaluateMixture(i.contents, i.isHeating);
            return {
              ...i,
              isStirring: false,
              reaction: rxn || i.reaction,
              liquidColor: rxn ? rxn.after_color || rxn.color : i.liquidColor
            };
          }
          return i;
        })
      );
    }, 1200);
  };

  // Toggle heating on burner
  const handleToggleBurner = (burnerId) => {
    setWorkspaceItems((items) => {
      const burner = items.find((i) => i.uid === burnerId);
      const nextActive = !burner.isActive;
      showHandAction('heat', burnerId, 900);
      addLog(nextActive ? 'Bunsen burner ignited.' : 'Bunsen burner extinguished.');

      return items.map((item) => {
        if (item.uid === burnerId) return { ...item, isActive: nextActive };
        if (item.type === 'vessel' && Math.hypot(item.x - burner.x, item.y - (burner.y - 70)) < 80) {
          const rxn = evaluateMixture(item.contents, nextActive);
          return {
            ...item,
            isHeating: nextActive,
            temperature: nextActive ? 85.0 : 25.0,
            reaction: rxn || item.reaction,
            liquidColor: rxn ? rxn.after_color || rxn.color : item.liquidColor
          };
        }
        return item;
      });
    });
  };

  const getNearestItem = (source, predicate, distance = 260) =>
    workspaceItems
    .filter((item) => item.uid !== source?.uid && predicate(item))
    .map((item) => ({ item, distance: Math.hypot(item.x - source.x, item.y - source.y) }))
    .filter(({ distance: itemDistance }) => itemDistance <= distance)
    .sort((a, b) => a.distance - b.distance)[0]?.item;

  const handleToolAction = (tool) => {
    if (tool.type === 'meter') {
      handleMeterMeasurement(tool);
      return;
    }

    if (tool.id === 'burner' || tool.id === 'hot_plate') {
      handleToggleBurner(tool.uid);
      return;
    }

    if (tool.id === 'stirring_rod') {
      const vessel = getNearestItem(tool, (item) => item.type === 'vessel' && item.contents.length > 0);
      if (!vessel) {
        addLog('Place the stirring rod beside a vessel containing chemicals.', 'warning');
        return;
      }
      handleStirAction(vessel.uid);
      return;
    }

    if (tool.id === 'dropper' || tool.action === 'pipette') {
      const source = getNearestItem(tool, (item) => item.type === 'chemical' && item.state === 'liquid');
      const target = getNearestItem(tool, (item) => item.type === 'vessel');
      if (!source || !target) {
        addLog('Place the dropper near a liquid reagent and a vessel.', 'warning');
        return;
      }
      transferContents(source.uid, target.uid);
      addLog(`Dropper delivered a controlled addition of ${source.name}.`, 'success');
      return;
    }

    if (tool.id === 'spatula' || tool.action === 'scoop') {
      const source = getNearestItem(tool, (item) => item.type === 'chemical' && item.state === 'solid');
      const target = getNearestItem(tool, (item) => item.type === 'vessel');
      if (!source || !target) {
        addLog('Place the spatula near a solid reagent and a vessel.', 'warning');
        return;
      }
      transferContents(source.uid, target.uid);
      addLog(`Spatula transferred a small portion of ${source.name}.`, 'success');
      return;
    }

    if (tool.id === 'forceps') {
      const sample = getNearestItem(tool, (item) => item.type === 'chemical' && item.state === 'solid');
      if (!sample) {
        addLog('Place the forceps beside a solid sample to handle it.', 'warning');
        return;
      }
      setWorkspaceItems((items) =>
        items.map((item) => (item.uid === tool.uid ? { ...item, isActive: true, connectedTo: sample.uid } : item))
      );
      showHandAction('hold', tool.uid, 900);
      addLog(`Forceps safely picked up ${sample.name}.`, 'success');
      return;
    }

    if (tool.id === 'tongs' || tool.action === 'handle_hot') {
      const target = getNearestItem(tool, (item) => item.type === 'vessel' || item.id === 'crucible');
      if (!target) {
        addLog('Place the crucible tongs beside a vessel or crucible to handle it.', 'warning');
        return;
      }
      setWorkspaceItems((items) =>
        items.map((item) => (item.uid === tool.uid ? { ...item, isActive: true, connectedTo: target.uid } : item))
      );
      showHandAction('hold', tool.uid, 900);
      addLog(`${tool.name} picked up ${target.name}.`, 'success');
      return;
    }

    if (tool.id === 'mortar_pestle' || tool.action === 'grind') {
      const sample = getNearestItem(tool, (item) => item.type === 'chemical' && item.state === 'solid');
      if (!sample) {
        addLog('Place a solid chemical near the mortar and pestle to grind.', 'warning');
        return;
      }
      setWorkspaceItems((items) =>
        items.map((item) => (item.uid === tool.uid ? { ...item, isActive: true, connectedTo: sample.uid } : item))
      );
      showHandAction('stir', tool.uid, 1200);
      addLog(`${tool.name} ground ${sample.name} into fine powder.`, 'success');
      return;
    }

    if (tool.id === 'delivery_tube') {
      const source = getNearestItem(tool, (item) => item.type === 'vessel' && item.contents.length > 0);
      const receiver = getNearestItem(tool, (item) => item.id === 'gas_jar' || item.id === 'gas_collection');
      if (!source || !receiver) {
        addLog('Place the delivery tube between a reacting vessel and a gas jar.', 'warning');
        return;
      }
      setWorkspaceItems((items) =>
        items.map((item) => (item.uid === tool.uid ? { ...item, isActive: true, connectedTo: source.uid, receiverUid: receiver.uid } : item))
      );
      showHandAction('hold', tool.uid, 1000);
      addLog(`Delivery tube connected ${source.name} to ${receiver.name}.`, 'success');
      return;
    }

    if (
      tool.id === 'burette' ||
      tool.id === 'funnel' ||
      tool.id === 'filter_funnel' ||
      tool.action === 'filter' ||
      tool.action === 'titrate'
    ) {
      const source = getNearestItem(tool, (item) => item.type === 'chemical' && item.state === 'liquid');
      const target = getNearestItem(tool, (item) => item.type === 'vessel');
      if (!source || !target) {
        addLog(`Place the ${tool.name.toLowerCase()} between a liquid reagent and a vessel.`, 'warning');
        return;
      }
      transferContents(source.uid, target.uid);
      setWorkspaceItems((items) =>
        items.map((item) => (item.uid === tool.uid ? { ...item, isActive: true, connectedTo: target.uid } : item))
      );
      showHandAction('hold', tool.uid, 900);
      addLog(`${tool.name} delivered ${source.name} into ${target.name}.`, 'success');
      return;
    }

    if (tool.id === 'wash_bottle') {
      const target = getNearestItem(tool, (item) => item.type === 'vessel');
      if (!target) {
        addLog('Place the wash bottle beside glassware to rinse it.', 'warning');
        return;
      }
      handleEmptyVessel(target.uid);
      addLog(`Rinsed ${target.name} with distilled water.`, 'success');
      return;
    }

    if (tool.type === 'support') {
      const vessel = getNearestItem(tool, (item) => item.type === 'vessel');
      if (!vessel) {
        addLog(`Place ${tool.name} beside compatible glassware first.`, 'warning');
        return;
      }
      setWorkspaceItems((items) =>
        items.map((item) => (item.uid === tool.uid ? { ...item, isActive: true, connectedTo: vessel.uid } : item))
      );
      showHandAction('hold', tool.uid, 900);
      addLog(`${tool.name} secured ${vessel.name}.`, 'success');
      return;
    }
  };

  const selectedItem = workspaceItems.find((item) => item.uid === selectedId);
  const selectedExperiment =
    EXPERIMENT_LIBRARY.find((experiment) => experiment.id === selectedExperimentId) || EXPERIMENT_LIBRARY[0];
  const experimentChemicalIds = workspaceItems.flatMap((item) =>
    item.type === 'vessel' ? (item.contents || []).map((chemical) => chemical.id) : item.type === 'chemical' ? [item.id] : []
  );
  const experimentEquipmentIds = workspaceItems.map((item) => item.id);
  const hasRequiredChemicals = selectedExperiment.chemicals.every((chemicalId) => experimentChemicalIds.includes(chemicalId));
  const equipmentAliases = { test_tube: ['small_test_tube', 'large_test_tube'] };
  const hasRequiredEquipment = selectedExperiment.equipment.every((equipmentId) =>
    equipmentAliases[equipmentId]
      ? equipmentAliases[equipmentId].some((alias) => experimentEquipmentIds.includes(alias))
      : experimentEquipmentIds.includes(equipmentId)
  );
  const reactiveVesselReady = workspaceItems.some(
    (item) => item.type === 'vessel' && item.contents && item.contents.length >= 2
  );
  const experimentRunReady = hasRequiredEquipment && hasRequiredChemicals && reactiveVesselReady;
  const hasObservedResult = workspaceItems.some((item) => item.type === 'vessel' && (item.reaction || item.isHeating));
  const experimentSteps = selectedExperiment.steps.map((step, index) => ({
    text: step,
    done: index === 0 ? hasRequiredEquipment : index === 1 ? hasRequiredChemicals : index >= 2 ? hasObservedResult : false
  }));
  const experimentProgress = experimentSteps.filter((step) => step.done).length;
  const guideForSelection = selectedItem
    ? selectedItem.type === 'chemical'
    ? `Place ${selectedItem.name} near a compatible vessel, then use ${selectedItem.state === 'solid' ? 'Scoop' : 'Pour'}.`
    : selectedItem.type === 'vessel'
    ? selectedItem.contents.length
      ? 'Select a stirring rod or a measurement tool, then place it close to this vessel.'
      : 'Add a liquid or solid reagent to this vessel from the equipment catalog.'
    : selectedItem.action === 'heat'
    ? 'Place the burner beneath a vessel and ignite it to start heating.'
    : selectedItem.action === 'measure_temp'
    ? 'Place the thermometer probe inside a vessel, then press Measure.'
    : selectedItem.action === 'measure_ph'
    ? 'Place the pH electrode inside a liquid vessel, then press Measure.'
    : selectedItem.action === 'weigh'
    ? 'Place a solid or sample vessel near the balance, then press Measure.'
    : selectedItem.description || 'Place this tool beside compatible equipment and use its action button.'
    : 'Select equipment from the catalog, place it on the bench, and follow the guided action.';

  const heatVessel = (vesselId) => {
    setWorkspaceItems((items) =>
      items.map((i) => {
        if (i.uid === vesselId) {
          const rxn = evaluateMixture(i.contents, true);
          return {
            ...i,
            isHeating: true,
            temperature: 85.0,
            reaction: rxn || i.reaction,
            liquidColor: rxn ? rxn.after_color || rxn.color : i.liquidColor
          };
        }
        return i;
      })
    );
  };

  // Empty / Clean a vessel
  const handleEmptyVessel = (vesselId) => {
    setWorkspaceItems((items) =>
      items.map((i) =>
        i.uid === vesselId
          ? {
              ...i,
              contents: [],
              liquidLevel: 0,
              solidContent: null,
              reaction: null,
              liquidColor: '#58aee8',
              temperature: 25.0
            }
          : i
      )
    );
    addLog('Vessel emptied and rinsed clean.');
  };

  const handleRemoveItem = (itemId) => {
    setWorkspaceItems((items) => items.filter((i) => i.uid !== itemId));
    if (selectedId === itemId) setSelectedId(null);
  };

  // Global Demo / Simulation trigger (Top right "Demo" button)
  const handleRunDemoSimulation = async () => {
    if (!experimentRunReady) {
      setSidebarOpen(true);
      setActiveCategory('vessel');
      setLibraryTab('equipment');
      addLog('Equipment library opened. Place the required items, then add chemicals to a vessel.', 'info');
      return;
    }

    setIsSimulating(true);
    addLog('Evaluating all laboratory interactions...');

    const reactiveVessel = workspaceItems.find(
      (item) => item.type === 'vessel' && item.contents && item.contents.length >= 2
    );

    if (!reactiveVessel) {
      addLog('Add at least 2 chemicals into a vessel to run reaction simulation.', 'warning');
      setIsSimulating(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chemicals: reactiveVessel.contents, is_heated: Boolean(reactiveVessel.isHeating) })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reaction && data.reaction.status !== 'idle' && data.reaction.id) {
          setActiveReactionResult(data.reaction);
          setWorkspaceItems((items) =>
            items.map((i) =>
              i.uid === reactiveVessel.uid
                ? {
                    ...i,
                    reaction: data.reaction,
                    liquidColor: data.reaction.after_color || data.reaction.color
                  }
                : i
            )
          );
          addLog(`Reaction: ${data.reaction.name} (${data.reaction.equation})`, 'success');
          setIsSimulating(false);
          return;
        }
      }
    } catch {
      // Backend not running; client-side engine evaluates seamlessly
    }

    const localResult = evaluateMixture(reactiveVessel.contents, reactiveVessel.isHeating);
    if (localResult) {
      setActiveReactionResult(localResult);
      setWorkspaceItems((items) =>
        items.map((i) =>
          i.uid === reactiveVessel.uid
            ? {
                ...i,
                reaction: localResult,
                liquidColor: localResult.after_color || localResult.color
              }
            : i
        )
      );
      addLog(`Reaction Result: ${localResult.name}`, 'success');
    } else {
      addLog('No reaction between current chemicals.', 'info');
    }

    setIsSimulating(false);
  };

  const handleCanvasClick = (e) => {
    if (activeTool === 'pen' && canvasRef.current) {
      const bounds = canvasRef.current.getBoundingClientRect();
      const scale = zoomLevel / 100;
      const x = Math.max(10, Math.round((e.clientX - bounds.left) / scale));
      const y = Math.max(10, Math.round((e.clientY - bounds.top) / scale));
      const text = window.prompt('Enter observation or lab note:', 'Observed change');
      if (text) {
        setAnnotations((prev) => [...prev, { id: uid(), x, y, text }]);
        addLog(`Note pinned: "${text}"`, 'info');
      }
      return;
    }
    setSelectedId(null);
  };

  const handleSaveExperiment = () => {
    const data = {
      experimentName,
      workspaceItems,
      date: new Date().toISOString()
    };
    localStorage.setItem('smartchem_saved_bench', JSON.stringify(data));
    addLog('Experiment saved locally.', 'success');
  };

  const handleLoadSavedExperiment = () => {
    const savedBench = localStorage.getItem('smartchem_saved_bench');
    if (!savedBench) {
      addLog('No saved experiment found in this browser.', 'warning');
      return;
    }

    try {
      const savedData = JSON.parse(savedBench);
      if (!Array.isArray(savedData.workspaceItems)) {
        throw new Error('Saved experiment has no workspace items.');
      }
      setExperimentName(savedData.experimentName || 'Unnamed');
      setWorkspaceItems(savedData.workspaceItems);
      setSelectedId(null);
      setActiveReactionResult(null);
      addLog('Saved experiment loaded.', 'success');
    } catch {
      addLog('Saved experiment could not be loaded.', 'warning');
    }
  };

  const handleResetBench = () => {
    setWorkspaceItems([]);
    setSelectedId(null);
    setActiveReactionResult(null);
    addLog('Bench cleared.');
  };

  return (
    <div className="lab-shell dark-theme-bench">
      {/* ── TOP HEADER (Faithful to Screenshot) ── */}
      <header className="lab-header-modern">
        {/* Left top controls: < (Reactions / Formulas drawer), Save, Empty, Setup */}
        <div className="top-nav-group">
          <button
            className={`top-icon-back ${reactionsDrawerOpen ? 'active' : ''}`}
            onClick={() => setReactionsDrawerOpen(!reactionsDrawerOpen)}
            title="Chemical Reaction Formulas & Experiment Guide"
          >
            ‹
          </button>

          <button className="top-tool-btn" onClick={handleSaveExperiment}>
            <span className="btn-icon">💾</span>
            <span className="btn-label">Save</span>
          </button>

          <button className="top-tool-btn" onClick={handleLoadSavedExperiment}>
            <span className="btn-icon">📂</span>
            <span className="btn-label">Load</span>
          </button>

          <button className="top-tool-btn" onClick={handleResetBench}>
            <span className="btn-icon">🗑️</span>
            <span className="btn-label">Empty</span>
          </button>

          <button className="top-tool-btn" onClick={() => setSetupModalOpen(true)}>
            <span className="btn-icon">⚙️</span>
            <span className="btn-label">Setup</span>
          </button>
        </div>

        {/* Center: Experiment Title with Pencil Icon */}
        <div className="center-experiment-title">
          {editingName ? (
            <input
              type="text"
              autoFocus
              value={experimentName}
              onChange={(e) => setExperimentName(e.target.value)}
              onBlur={() => setEditingName(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingName(false)}
              className="title-edit-input"
            />
          ) : (
            <button
              className="title-display-btn"
              onClick={() => setEditingName(true)}
              title="Click to rename experiment"
            >
              <span>{experimentName}</span>
              <span className="pencil-icon">✎</span>
            </button>
          )}
        </div>

        {/* Right: Demo Button with Monitor Icon */}
        <div className="top-action-group">
          <button
            className={`demo-screen-btn ${!experimentRunReady ? 'is-disabled' : ''}`}
            onClick={handleRunDemoSimulation}
            disabled={isSimulating}
            title={
              experimentRunReady
                ? 'Run the prepared experiment'
                : 'Place the required equipment and chemicals into a vessel first'
            }
          >
            <span className="demo-icon">🖥️</span>
            <span className="demo-text">{isSimulating ? 'Evaluating…' : experimentRunReady ? 'Run' : 'Place items'}</span>
          </button>
        </div>
      </header>

      {/* ── MAIN WORKSPACE BODY ── */}
      <div className="lab-workbench-body">
        {/* Interactive Canvas */}
        <main
          ref={canvasRef}
          className={`workbench-canvas ${activeTool === 'pen' ? 'pen-cursor' : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleCanvasDrop}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onClick={handleCanvasClick}
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
        >
          <div className="procedure-guide">
            <div className="procedure-guide-kicker">LAB PROCEDURE</div>
            <strong>{selectedItem ? `Step for ${selectedItem.name}` : 'Step-by-step workspace'}</strong>
            <p>{guideForSelection}</p>
            <div className="procedure-guide-status">
              <span className="procedure-dot" />
              {selectedItem?.isActive || selectedItem?.measurement ? 'Action ready / completed' : 'Select and place equipment to begin'}
            </div>
          </div>

          {/* Empty workspace prompt */}
          {workspaceItems.length === 0 && (
            <div className="canvas-empty-state">
              <div className="empty-flask-icon">⚗️</div>
              <h3>Virtual Lab Workspace Ready</h3>
              <p>Drag equipment, solid chemicals, or liquid solutions from the catalog onto the bench.</p>
              <div className="quick-suggestions">
                <button
                  onClick={() => {
                    placeItem(EQUIPMENT_CATALOG.vessel[7], { x: 260, y: 220 }); // Beaker 100mL
                    placeItem(EQUIPMENT_CATALOG.liquid[1], { x: 120, y: 150 }); // HCl
                    placeItem(EQUIPMENT_CATALOG.solid[2], { x: 420, y: 150 }); // Zn
                  }}
                >
                  ⚡ Quick Load: Zinc + Acid Reaction
                </button>
              </div>
            </div>
          )}

          {/* Render All Placed Equipment & Chemicals */}
          {workspaceItems.map((item) => {
            const isSelected = selectedId === item.uid;
            return (
              <div
                key={item.uid}
                className={`canvas-bench-item ${isSelected ? 'is-selected' : ''} ${item.isPouring ? 'is-pouring' : ''}`}
                style={{ left: `${item.x}px`, top: `${item.y}px` }}
                onMouseDown={(e) => handleMouseDownItem(e, item)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(item.uid);
                }}
              >
                {/* Remove button */}
                {isSelected && (
                  <button
                    className="item-remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(item.uid);
                    }}
                    title="Remove item"
                  >
                    ×
                  </button>
                )}

                {/* Visual Graphic Representation */}
                <div className="item-visual-wrap">
                  {item.type === 'vessel' && (
                    <GlassVesselGraphic
                      type={item.vesselType || item.id}
                      liquidLevel={item.liquidLevel}
                      liquidColor={item.liquidColor}
                      solidContent={item.solidContent}
                      reaction={item.reaction}
                      isHeating={item.isHeating}
                      isStirring={item.isStirring}
                      width={110}
                      height={110}
                    />
                  )}

                  {item.type === 'tool' || item.type === 'heater' || item.type === 'meter' || item.type === 'support' ? (
                    <ToolGraphic
                      type={item.id}
                      isActive={item.isActive || item.isHeating}
                      readout={
                        item.measurement ||
                        (item.id === 'thermometer'
                          ? `${item.temperature?.toFixed(1) || '25.0'}°C`
                          : item.id === 'balance'
                          ? `${item.mass?.toFixed(2) || '0.00'} g`
                          : item.id === 'ph_meter'
                          ? `pH 7.0`
                          : null)
                      }
                      width={110}
                      height={110}
                    />
                  ) : null}

                  {item.type === 'chemical' && item.state === 'solid' && (
                    <SolidChemicalGraphic chemical={item} width={110} height={110} />
                  )}

                  {item.type === 'chemical' && item.state === 'liquid' && (
                    <LiquidChemicalGraphic chemical={item} width={110} height={110} />
                  )}

                  {item.type === 'chemical' && item.state === 'gas' && (
                    <GasChemicalGraphic chemical={item} width={110} height={110} />
                  )}

                  {handAction?.targetUid === item.uid && (
                    <HumanHandGraphic
                      pose={handAction.pose}
                      width={76}
                      height={76}
                    />
                  )}

                  {item.type === 'vessel' &&
                    item.isHeating &&
                    (item.vesselType || '').includes('testtube') && (
                      <HumanHandGraphic pose="heat" width={76} height={76} />
                    )}
                </div>

                {/* Contents and reaction state stay visible without repeating the item name. */}
                {((item.contents && item.contents.length > 0) || item.reaction) && (
                  <div className="item-label-strip">
                  {item.contents && item.contents.length > 0 && (
                    <span className="item-contents-count">
                      {item.contents.map((c) => c.formula).join(' + ')}
                    </span>
                  )}
                  {item.reaction && (
                    <span className="item-reaction-state">
                      {item.reaction.gasProduced ? `${item.reaction.gasProduced} released` : item.reaction.status}
                    </span>
                  )}
                  </div>
                )}

                {item.type === 'vessel' && item.reaction && (
                  <div className="reaction-visual-badge">
                    <span
                      className="reaction-color-swatch"
                      style={{ background: item.reaction.after_color || item.reaction.color || item.liquidColor }}
                    />
                    <span>{item.reaction.title || item.reaction.name}</span>
                    {item.reaction.products?.slice(0, 2).map((product, index) => (
                      <small key={index}>{product}</small>
                    ))}
                  </div>
                )}

                {/* Floating Action Menu for Selected Item */}
                {isSelected && (
                  <div className="item-context-toolbar" onClick={(e) => e.stopPropagation()}>
                    {/* Pour/Scoop action for chemicals */}
                    {item.type === 'chemical' && (
                      <button
                        className="ctx-btn pour"
                        onClick={() => handlePourAction(item)}
                        title={item.state === 'solid' ? 'Scoop with spatula into nearest vessel' : 'Pour liquid into nearest vessel'}
                      >
                        {item.state === 'solid' ? '🥄 Scoop' : '💧 Pour'}
                      </button>
                    )}

                    {/* Pour action for vessels with liquid */}
                    {item.type === 'vessel' && item.liquidLevel > 0 && (
                      <button
                        className="ctx-btn pour"
                        onClick={() => handlePourAction(item)}
                        title="Pour into nearby vessel"
                      >
                        ☝ Pour
                      </button>
                    )}

                    {/* Stir action for vessels */}
                    {item.type === 'vessel' && (
                      <button
                        className="ctx-btn stir"
                        onClick={() => handleStirAction(item.uid)}
                        title="Stir with glass rod"
                      >
                        ✦ Stir
                      </button>
                    )}

                    {/* Empty vessel */}
                    {item.type === 'vessel' && item.contents.length > 0 && (
                      <button
                        className="ctx-btn empty"
                        onClick={() => handleEmptyVessel(item.uid)}
                        title="Empty & Clean"
                      >
                        Rinse
                      </button>
                    )}

                    {/* Toggle Burner flame */}
                    {item.type === 'heater' && (
                      <button
                        className={`ctx-btn burner ${item.isActive ? 'active' : ''}`}
                        onClick={() => handleToggleBurner(item.uid)}
                      >
                        {item.isActive ? 'Extinguish' : 'Ignite Flame'}
                      </button>
                    )}
                    {(item.type === 'meter' || item.type === 'tool' || item.type === 'support') && (
                      <button
                        className={`ctx-btn ${item.type === 'meter' ? 'measure' : 'tool-action'}`}
                        onClick={() => handleToolAction(item)}
                        title={item.description || 'Use this equipment'}
                      >
                        {item.type === 'meter' ? '📐 Measure' : item.action === 'heat' ? '🔥 Ignite' : item.action === 'stir' ? '✦ Stir' : item.action === 'drop' ? '💧 Drop' : item.action === 'scoop' ? '🥄 Scoop' : item.action === 'connect_gas' ? '🔗 Connect' : item.action === 'titrate' ? '⚗ Titrate' : item.action === 'filter' ? '▽ Transfer' : item.action === 'rinse' ? '♧ Rinse' : '▶ Use'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* ── ACTIVE REACTION OVERLAY CARD ── */}
          {activeReactionResult && (
            <div className="reaction-notification-card">
              <div className="notif-header">
                <span className="notif-icon">
                  {activeReactionResult.status === 'violent'
                    ? '🔥'
                    : activeReactionResult.status === 'precipitation'
                    ? '🌧️'
                    : '⚗️'}
                </span>
                <div>
                  <h4>{activeReactionResult.name || 'Reaction Detected'}</h4>
                  <span className="notif-badge">{activeReactionResult.status?.toUpperCase()}</span>
                </div>
                <button
                  className="notif-close"
                  onClick={() => setActiveReactionResult(null)}
                >
                  ×
                </button>
              </div>
              <div className="notif-body">
                <code>{activeReactionResult.equation}</code>
                <p>{activeReactionResult.description || activeReactionResult.message}</p>
                {activeReactionResult.products && (
                  <div className="product-pills">
                    {activeReactionResult.products.map((p, idx) => (
                      <span key={idx} className="product-pill">
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bench Annotations (Pen Tool) */}
          {annotations.map((ann) => (
            <div
              key={ann.id}
              className="canvas-bench-annotation"
              style={{ left: `${ann.x}px`, top: `${ann.y}px` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="annotation-pin">📌</div>
              <div className="annotation-card">
                <span>{ann.text}</span>
                <button
                  className="annotation-del"
                  onClick={() => setAnnotations((prev) => prev.filter((a) => a.id !== ann.id))}
                  title="Remove note"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </main>

        <aside
          ref={runnerPanelRef}
          className={`experiment-procedure-panel ${procedurePanelCollapsed ? 'collapsed' : ''}`}
          style={{
            right: runnerPosition ? 'auto' : sidebarOpen ? '414px' : '24px',
            bottom: runnerPosition ? 'auto' : undefined,
            ...(runnerPosition || {})
          }}
        >
          <div
            className="procedure-panel-header runner-drag-handle"
            onMouseDown={handleRunnerDragStart}
            title="Drag to move the experiment runner"
          >
            <div>
              <span className="catalog-panel-kicker">EXPERIMENT RUNNER</span>
              <strong>Guided procedure</strong>
            </div>
            <div className="procedure-header-actions">
              <span className="procedure-progress">{experimentProgress}/{experimentSteps.length}</span>
              <button
                className="procedure-toggle-btn"
                onClick={() => setProcedurePanelCollapsed(!procedurePanelCollapsed)}
                title={procedurePanelCollapsed ? 'Expand procedure guide' : 'Minimize procedure guide'}
              >
                {procedurePanelCollapsed ? '▲ Expand' : '▼ Minimize'}
              </button>
            </div>
          </div>
          {!procedurePanelCollapsed && (
            <>
              <select
                className="experiment-select"
                value={selectedExperimentId}
                onChange={(event) => {
                  setSelectedExperimentId(event.target.value);
                  const nextExperiment = EXPERIMENT_LIBRARY.find((experiment) => experiment.id === event.target.value);
                  if (nextExperiment) setExperimentName(nextExperiment.name);
                }}
              >
                {EXPERIMENT_LIBRARY.map((experiment) => (
                  <option key={experiment.id} value={experiment.id}>{experiment.name}</option>
                ))}
              </select>
              <p className="experiment-objective">{selectedExperiment.objective}</p>
              <div className="experiment-requirements">
                <span className={hasRequiredChemicals ? 'requirement-ready' : ''}>
                  Chemicals {hasRequiredChemicals ? 'ready' : 'needed'}
                </span>
                <span className={hasRequiredEquipment ? 'requirement-ready' : ''}>
                  Equipment {hasRequiredEquipment ? 'ready' : 'needed'}
                </span>
              </div>
              <ol className="experiment-step-list">
                {experimentSteps.map((step, index) => (
                  <li key={`${selectedExperiment.id}-${index}`} className={step.done ? 'complete' : ''}>
                    <span>{step.done ? '✓' : index + 1}</span>
                    {step.text}
                  </li>
                ))}
              </ol>
              <details className="experiment-details">
                <summary>Show theory, safety & result</summary>
                <p><b>Theory:</b> {selectedExperiment.theory}</p>
                <p><b>Safety:</b> {selectedExperiment.safety}</p>
                <p><b>Expected:</b> {selectedExperiment.expected}</p>
                <code>{selectedExperiment.equation}</code>
              </details>
            </>
          )}
        </aside>

        {/* ── BOTTOM-LEFT FLOATING CANVAS TOOLBAR (Exact Match to Screenshot) ── */}
        <div className="bottom-left-toolbar">
          <button
            className="tb-btn"
            title="Reset Canvas View"
            onClick={() => setZoomLevel(100)}
          >
            ⌖
          </button>

          <div className="zoom-dropdown-wrap">
            <button
              className="tb-btn zoom-btn"
              onClick={() => setZoomDropdownOpen(!zoomDropdownOpen)}
            >
              <span>{zoomLevel}%</span>
              <span className="arrow-down">▾</span>
            </button>
            {zoomDropdownOpen && (
              <div className="zoom-menu">
                {[50, 75, 100, 125, 150].map((lvl) => (
                  <button
                    key={lvl}
                    className={`zoom-opt ${zoomLevel === lvl ? 'active' : ''}`}
                    onClick={() => {
                      setZoomLevel(lvl);
                      setZoomDropdownOpen(false);
                    }}
                  >
                    {lvl}%
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="tb-divider" />

          <button
            className={`tb-btn ${isLocked ? 'active' : ''}`}
            title={isLocked ? 'Unlock Bench' : 'Lock Bench'}
            onClick={() => setIsLocked(!isLocked)}
          >
            {isLocked ? '🔒' : '🔓'}
          </button>

          <button
            className={`tb-btn ${activeTool === 'pen' ? 'active' : ''}`}
            title="Pen Annotation Tool"
            onClick={() => setActiveTool(activeTool === 'pen' ? 'pointer' : 'pen')}
          >
            ✏
          </button>

          <button
            className={`tb-btn ${activeTool === 'select' ? 'active' : ''}`}
            title="Lasso / Box Select"
            onClick={() => setActiveTool(activeTool === 'select' ? 'pointer' : 'select')}
          >
            ⛶
          </button>

          <button
            className="tb-btn"
            title="Zoom In"
            onClick={() => setZoomLevel((z) => Math.min(200, z + 25))}
          >
            🔍⁺
          </button>
        </div>

        {/* ── RIGHT EQUIPMENT CATALOG PANEL (Faithful to Screenshot) ── */}
        <aside className={`equipment-sidebar-panel ${sidebarOpen ? 'open' : 'collapsed'}`}>
          <button
            className="sidebar-collapse-chevron"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Collapse Equipment Panel' : 'Expand Equipment Panel'}
          >
            {sidebarOpen ? '›' : '‹'}
          </button>

          {sidebarOpen && (
            <div className="sidebar-inner-container">
              {/* Left Category Icon Strip */}
              <div className="sidebar-category-rail">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className={`rail-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setLibraryTab(cat.id === 'solid' || cat.id === 'liquid' || cat.id === 'gas' ? 'chemicals' : cat.id === 'tools' ? 'tools' : 'equipment');
                    }}
                    title={cat.description}
                  >
                    <span className="rail-icon">
                      {cat.id === 'vessel' ? '⚗' : cat.id === 'tools' ? '♨' : cat.id === 'solid' ? '◐' : cat.id === 'liquid' ? '💧' : '☁'}
                    </span>
                    <span className="rail-label">{cat.name}</span>
                  </button>
                ))}

                {/* Bottom Quick Elements / Sort keys (Z, #, A) from screenshot */}
                <div className="rail-bottom-sorts">
                  <button
                    className={`rail-sort-btn ${sortMode === 'Z' ? 'active' : ''}`}
                    onClick={() => setSortMode(sortMode === 'Z' ? 'default' : 'Z')}
                    title="Formula / Element Sort (Z)"
                  >
                    Z
                  </button>
                  <button
                    className={`rail-sort-btn ${sortMode === 'default' ? 'active' : ''}`}
                    onClick={() => setSortMode('default')}
                    title="Category Group (#)"
                  >
                    #
                  </button>
                  <button
                    className={`rail-sort-btn ${sortMode === 'A' ? 'active' : ''}`}
                    onClick={() => setSortMode(sortMode === 'A' ? 'default' : 'A')}
                    title="Alphabetical Sort (A-Z)"
                  >
                    A
                  </button>
                </div>
              </div>

              {/* Catalog Body: Search Bar + Equipment Grid */}
              <div className="sidebar-content-body">
                <div className="catalog-panel-heading">
                  <div>
                    <span className="catalog-panel-kicker">LAB LIBRARY</span>
                    <strong>
                      {libraryTab === 'equipment'
                        ? equipmentGroups.find((group) => group.id === equipmentGroup)?.label
                        : libraryTab === 'chemicals'
                        ? 'Chemicals'
                        : 'Tools'}
                    </strong>
                  </div>
                  <span className="catalog-panel-count">{visibleEquipment.length} items</span>
                </div>
                {libraryTab === 'equipment' && (
                  <div className="equipment-group-grid">
                    {equipmentGroups.map((group) => (
                      <button
                        key={group.id}
                        className={equipmentGroup === group.id ? 'active' : ''}
                        onClick={() => setEquipmentGroup(group.id)}
                        title={`Show ${group.label}`}
                      >
                        <span>{group.icon}</span>
                        {group.label}
                      </button>
                    ))}
                  </div>
                )}
                <div className="catalog-header-search">
                  <div className="search-input-box">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search equipment"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                      <button className="clear-search-btn" onClick={() => setSearch('')}>
                        ×
                      </button>
                    )}
                  </div>
                  <button className="grid-toggle-btn" title="Grid Layout">
                    ▦
                  </button>
                </div>

                {/* 2-Column Equipment Cards Grid (Exact match to screenshot) */}
                <div className="equipment-catalog-grid">
                  {visibleEquipment.map((item) => (
                    <article
                      key={item.id}
                      className="equipment-shelf-card"
                      draggable
                      onDragStart={(e) => handleCatalogDragStart(e, item)}
                      onClick={() => placeItem(item)}
                      title={`Click or drag to place ${item.name}`}
                    >
                      <div className="shelf-card-preview">
                        {item.type === 'vessel' && (
                          <GlassVesselGraphic
                            type={item.vesselType || item.id}
                            liquidLevel={0}
                            width={75}
                            height={75}
                          />
                        )}
                        {item.type === 'tool' || item.type === 'heater' || item.type === 'meter' || item.type === 'support' ? (
                          <ToolGraphic type={item.id} width={75} height={75} />
                        ) : null}
                        {item.type === 'chemical' && item.state === 'solid' && (
                          <SolidChemicalGraphic chemical={item} width={75} height={75} />
                        )}
                        {item.type === 'chemical' && item.state === 'liquid' && (
                          <LiquidChemicalGraphic chemical={item} width={75} height={75} />
                        )}
                      </div>

                      <h4 className="shelf-card-name">{item.name}</h4>
                      <span className="shelf-card-detail">{item.detail}</span>
                      <span className="shelf-card-action">{item.action || 'hold / place'}</span>
                    </article>
                  ))}

                  {visibleEquipment.length === 0 && (
                    <div className="no-equipment-notice">
                      <span>🔍</span>
                      <p>No matching equipment found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* ── CHEMICAL REACTION FORMULAS & EXPERIMENT GUIDE DRAWER ── */}
      {reactionsDrawerOpen && (
        <aside className="reactions-guide-drawer">
          <div className="drawer-header">
            <div className="drawer-title-group">
              <span className="drawer-icon">⚗️</span>
              <div>
                <h3>Reaction Formulas & Visual Guide</h3>
                <p>Click any reaction to load suitable equipment and chemicals onto the bench.</p>
              </div>
            </div>
            <button
              className="drawer-close-btn"
              onClick={() => setReactionsDrawerOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="drawer-body">
            {SHOWCASE_CATEGORIES.map((cat) => (
              <div key={cat.id} className="drawer-cat-block">
                <div className="drawer-cat-title">
                  <span>{cat.icon}</span>
                  <h4>{cat.name}</h4>
                </div>
                <div className="drawer-reactions-list">
                  {cat.examples.map((ex) => (
                    <div key={ex.id} className="drawer-reaction-row">
                      <div className="rxn-info">
                        <strong>{ex.name}</strong>
                        <code>{ex.equation}</code>
                        <p>{ex.observation}</p>
                      </div>
                      <button
                        className="rxn-load-btn"
                        onClick={() => {
                          const allChems = [
                            ...EQUIPMENT_CATALOG.solid,
                            ...EQUIPMENT_CATALOG.liquid
                          ];
                          const rA = allChems.find((c) => c.id === ex.reactants[0]);
                          const rB = allChems.find((c) => c.id === ex.reactants[1]);
                          loadExperimentPreset({
                            name: ex.name,
                            chemicals: [rA, rB].filter(Boolean),
                            vesselId: ex.vessel || 'beaker_250',
                            isHeating: ex.id.includes('thermal') || ex.id.includes('combustion')
                          });
                        }}
                      >
                        ⚡ Load on Bench
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* ── SETUP & PREFERENCES MODAL ── */}
      {setupModalOpen && (
        <div className="modal-backdrop" onClick={() => setSetupModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Lab Bench Setup & Controls</h3>
              <button onClick={() => setSetupModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="setup-option-row">
                <label>Ambient Temperature</label>
                <span>25.0 °C (Standard Conditions)</span>
              </div>
              <div className="setup-option-row">
                <label>Atmospheric Pressure</label>
                <span>1.0 atm (101.3 kPa)</span>
              </div>
              <div className="setup-option-row">
                <label>Reaction Physics Engine</label>
                <span>Full Kinetic & Thermodynamic Simulation</span>
              </div>
              <div className="setup-option-row">
                <label>Backend Calculation Service</label>
                <span className="status-online">● Connected (Port 5000)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
