import React, { useState } from 'react';

// 🧰 Full Laboratory Equipment Database
const LAB_TOOLS = [
  { id: 'beaker', name: '250ml Beaker', image: '/assets/beaker.png', width: '150px', height: '180px' },
  { id: 'flask', name: 'Erlenmeyer Flask', image: '/assets/flask.png', width: '160px', height: '180px' },
  { id: 'testtube', name: 'Test Tube', image: '/assets/testtube.png', width: '80px', height: '250px' },
  { id: 'volumetric', name: 'Volumetric Flask', image: '/assets/volumetric.png', width: '140px', height: '220px' },
  { id: 'cylinder', name: 'Measuring Cylinder', image: '/assets/cylinder.png', width: '90px', height: '260px' },
  { id: 'petridish', name: 'Petri Dish', image: '/assets/petri.png', width: '200px', height: '60px' },
  { id: 'crucible', name: 'Crucible', image: '/assets/crucible.png', width: '100px', height: '90px' },
  { id: 'evap_dish', name: 'Evaporating Dish', image: '/assets/evap_dish.png', width: '140px', height: '80px' }
];

// 🧪 Comprehensive Chemicals Database (Standard Lab Kit)
const CHEMICAL_DB = [
  // Solvents & Water
  { id: 'water', name: 'Distilled Water', formula: 'H₂O', category: 'water', color: 'rgba(173, 216, 230, 0.2)' },
  { id: 'ethanol', name: 'Ethanol', formula: 'C₂H₅OH', category: 'solvent', color: 'rgba(255, 255, 255, 0.1)' },
  
  // Strong Acids
  { id: 'hcl', name: 'Hydrochloric Acid', formula: 'HCl', category: 'strong_acid', color: 'rgba(255,255,255,0.2)' },
  { id: 'h2so4', name: 'Sulfuric Acid', formula: 'H₂SO₄', category: 'strong_acid', color: 'rgba(255,255,255,0.2)' },
  { id: 'hno3', name: 'Nitric Acid', formula: 'HNO₃', category: 'strong_acid', color: 'rgba(255,255,255,0.2)' },
  
  // Weak Acids
  { id: 'ch3cooh', name: 'Acetic Acid', formula: 'CH₃COOH', category: 'weak_acid', color: 'rgba(255,255,255,0.1)' },

  // Strong Bases
  { id: 'naoh', name: 'Sodium Hydroxide', formula: 'NaOH', category: 'strong_base', color: 'rgba(255,255,255,0.4)' },
  { id: 'koh', name: 'Potassium Hydroxide', formula: 'KOH', category: 'strong_base', color: 'rgba(255,255,255,0.4)' },
  
  // Weak Bases
  { id: 'nh4oh', name: 'Ammonium Hydroxide', formula: 'NH₄OH', category: 'weak_base', color: 'rgba(255,255,255,0.2)' },

  // Reactive Metals
  { id: 'na', name: 'Sodium Metal', formula: 'Na', category: 'alkali_metal', iconImg: '/assets/sodium.png' },
  { id: 'k', name: 'Potassium Metal', formula: 'K', category: 'alkali_metal', iconImg: '/assets/potassium.png' },
  { id: 'mg', name: 'Magnesium Ribbon', formula: 'Mg', category: 'alkaline_earth', iconImg: '/assets/magnesium.png' },
  { id: 'zn', name: 'Zinc Granules', formula: 'Zn', category: 'transition_metal', iconImg: '/assets/zinc.png' },
  { id: 'cu', name: 'Copper Turnings', formula: 'Cu', category: 'transition_metal', iconImg: '/assets/copper.png' },
  { id: 'fe', name: 'Iron Filings', formula: 'Fe', category: 'transition_metal', iconImg: '/assets/iron.png' },

  // Salts & Compounds
  { id: 'nacl', name: 'Sodium Chloride', formula: 'NaCl', category: 'salt', color: 'rgba(255,255,255,0.3)' },
  { id: 'cuso4', name: 'Copper(II) Sulfate', formula: 'CuSO₄', category: 'transition_salt', color: 'rgba(41, 128, 185, 0.7)' }, // Blue solution
  { id: 'kmno4', name: 'Potassium Permanganate', formula: 'KMnO₄', category: 'oxidizer', color: 'rgba(142, 68, 173, 0.9)' }, // Deep purple
  { id: 'k2cr2o7', name: 'Potassium Dichromate', formula: 'K₂Cr₂O₇', category: 'oxidizer', color: 'rgba(211, 84, 0, 0.8)' }, // Orange
  { id: 'ki', name: 'Potassium Iodide', formula: 'KI', category: 'salt', color: 'rgba(255,255,255,0.2)' },
  { id: 'agno3', name: 'Silver Nitrate', formula: 'AgNO₃', category: 'salt', color: 'rgba(255,255,255,0.2)' },
  { id: 'caco3', name: 'Calcium Carbonate', formula: 'CaCO₃', category: 'carbonate', iconImg: '/assets/caco3.png' },
  { id: 'nahco3', name: 'Baking Soda', formula: 'NaHCO₃', category: 'carbonate', color: 'rgba(255,255,255,0.3)' },

  // Indicators
  { id: 'phph', name: 'Phenolphthalein', formula: 'Ind', category: 'indicator', color: 'rgba(253, 167, 223, 0.1)' },
  { id: 'methyl_orange', name: 'Methyl Orange', formula: 'Ind', category: 'indicator', color: 'rgba(243, 156, 18, 0.5)' }, // Orange
  { id: 'universal_ind', name: 'Universal Indicator', formula: 'Ind', category: 'indicator', color: 'rgba(46, 204, 113, 0.5)' }, // Green initially
  { id: 'litmus_blue', name: 'Blue Litmus Solution', formula: 'Ind', category: 'indicator', color: 'rgba(52, 152, 219, 0.6)' }
];

function ExperimentLab() {
  const [activeVessel, setActiveVessel] = useState(null);
  const [vesselContents, setVesselContents] = useState([]);
  const [selectedChem, setSelectedChem] = useState(CHEMICAL_DB[0].id);
  
  const [simState, setSimState] = useState({ 
    liquidColor: 'transparent', 
    liquidHeight: '0%',
    effects: [], 
    log: 'System Ready. Select a real vessel to begin.', 
    equation: '' 
  });

  const addTool = (tool) => {
    setActiveVessel(tool);
    setVesselContents([]);
    setSimState({ liquidColor: 'transparent', liquidHeight: '0%', effects: [], log: `✅ ${tool.name} placed on the lab table.`, equation: '' });
  };

  const addChemical = () => {
    if (!activeVessel) return setSimState(s => ({ ...s, log: '⚠️ Add a vessel first.' }));
    const chem = CHEMICAL_DB.find(c => c.id === selectedChem);
    if (vesselContents.find(c => c.id === chem.id)) return;
    
    const newContents = [...vesselContents, chem];
    setVesselContents(newContents);
    
    // Mix colors dynamically or use the strongest color
    const liquidCount = newContents.filter(c => c.color).length;
    const newHeight = liquidCount > 0 ? `${Math.min(10 + (liquidCount * 15), 85)}%` : '0%';
    const dominantColor = chem.color || simState.liquidColor;

    setSimState(s => ({ 
      ...s, 
      liquidColor: dominantColor, 
      liquidHeight: newHeight,
      log: `Added ${chem.name} (${chem.formula}).` 
    }));
  };

  const removeChemical = (chemId) => {
    const updated = vesselContents.filter(c => c.id !== chemId);
    setVesselContents(updated);
    
    const liquidCount = updated.filter(c => c.color).length;
    const newHeight = liquidCount > 0 ? `${Math.min(10 + (liquidCount * 15), 85)}%` : '0%';
    const newColor = updated.length > 0 ? (updated[updated.length - 1].color || 'transparent') : 'transparent';

    setSimState(s => ({ 
      ...s, 
      liquidColor: newColor, 
      liquidHeight: newHeight,
      log: `Removed item. Contents updated.`, 
      effects: [], 
      equation: '' 
    }));
  };

  const runSimulation = () => {
    if (vesselContents.length < 2) return setSimState(s => ({ ...s, log: '⚠️ Need at least 2 chemicals.' }));
    setSimState(s => ({ ...s, log: '⚙️ Processing chemical reaction...' }));

    fetch('http://127.0.0.1:5000/api/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chemicals: vesselContents })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setSimState(s => ({
          ...s,
          liquidColor: data.reaction.color !== 'transparent' ? data.reaction.color : s.liquidColor,
          effects: data.reaction.effects,
          log: data.reaction.message,
          equation: data.reaction.equation
        }));
      }
    }).catch(() => setSimState(s => ({ ...s, log: '❌ API Connection Failed. Check Python Backend.' })));
  };

  const clearWorkbench = () => {
    setActiveVessel(null);
    setVesselContents([]);
    setSimState({ liquidColor: 'transparent', liquidHeight: '0%', effects: [], log: '🗑️ Workbench cleared.', equation: '' });
  };

  const hasFire = simState.effects.includes('fire');
  const hasSmoke = simState.effects.includes('smoke');
  const hasBubbles = simState.effects.includes('bubbles');

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'Segoe UI, Tahoma, sans-serif', backgroundColor: '#1a1a1a', color: '#fff' }}>
      
      {/* LEFT PANEL: NB Lab Style Menu */}
      <div style={{ width: '350px', backgroundColor: '#2d3436', padding: '20px', borderRight: '2px solid #000', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '18px', color: '#00cec9', borderBottom: '1px solid #636e72', paddingBottom: '10px' }}>🧪 INVENTORY & ASSETS</h2>
        
        <h3 style={{ fontSize: '14px', color: '#b2bec3', marginTop: '20px' }}>1. Glassware & Tools</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxHeight: '250px', overflowY: 'auto', paddingRight: '5px' }}>
          {LAB_TOOLS.map(tool => (
            <button key={tool.id} onClick={() => addTool(tool)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', padding: '10px', background: '#636e72', border: activeVessel?.id === tool.id ? '2px solid #00cec9' : '1px solid transparent', borderRadius: '5px', color: 'white', cursor: 'pointer', transition: '0.2s' }}>
              <div style={{ width: '50px', height: '50px', backgroundColor: '#fff', borderRadius: '5px', padding: '2px' }}>
                <img src={tool.image} alt={tool.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.src='https://via.placeholder.com/50?text=IMG'} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>{tool.name}</span>
            </button>
          ))}
        </div>

        <h3 style={{ fontSize: '14px', color: '#b2bec3', marginTop: '30px' }}>2. Reagents & Chemicals</h3>
        <select value={selectedChem} onChange={(e) => setSelectedChem(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#dfe6e9', color: '#2d3436', fontWeight: 'bold', fontSize: '13px' }}>
          {CHEMICAL_DB.map(c => <option key={c.id} value={c.id}>{c.name} ({c.formula})</option>)}
        </select>
        <button onClick={addChemical} style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: '#0984e3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Add to Vessel
        </button>

        <h3 style={{ fontSize: '14px', color: '#b2bec3', marginTop: '30px' }}>📋 Current Contents</h3>
        <div style={{ maxHeight: '150px', overflowY: 'auto', background: '#353b48', padding: '10px', borderRadius: '5px' }}>
          {vesselContents.length === 0 && <span style={{ fontSize: '12px', color: '#7f8c8d' }}>Empty...</span>}
          {vesselContents.map(chem => (
            <div key={chem.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2f3640', margin: '5px 0', padding: '5px 10px', borderRadius: '4px', fontSize: '12px' }}>
              <span>{chem.formula} - {chem.name}</span>
              <button onClick={() => removeChemical(chem.id)} style={{ background: '#e84118', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', padding: '2px 5px' }}>X</button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <button onClick={runSimulation} style={{ width: '100%', padding: '15px', backgroundColor: '#00b894', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            ▶ SIMULATE REACTION
          </button>
          <button onClick={clearWorkbench} style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: '#d63031', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Clear Workbench
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: The Real 3D-Like Workbench */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ flex: 1, position: 'relative', backgroundImage: 'url(/assets/table_bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '12vh' }}>
          
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.2))', zIndex: 0 }}></div>

          {activeVessel ? (
            <div style={{ position: 'relative', width: activeVessel.width, height: activeVessel.height, zIndex: 2 }}>
              
              <div style={{ position: 'absolute', bottom: '5%', left: '10%', right: '10%', height: simState.liquidHeight, backgroundColor: simState.liquidColor, transition: 'all 1.5s ease-in-out', borderRadius: '0 0 40% 40%', zIndex: 1, boxShadow: simState.liquidHeight !== '0%' ? 'inset 0px -10px 20px rgba(0,0,0,0.3)' : 'none', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', overflow: 'hidden' }}>
                {hasBubbles && <span style={{ animation: 'bubble 0.5s infinite', fontSize: '10px' }}>⚪</span>}
                {hasBubbles && <span style={{ animation: 'bubble 0.8s infinite', fontSize: '14px' }}>⚪</span>}
              </div>

              <img 
                src={activeVessel.image} 
                alt="vessel" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 2, pointerEvents: 'none' }} 
                onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML += '<div style="width:100%; height:100%; border:2px solid white; display:flex; align-items:center; justify-content:center;">Missing PNG</div>'; }} 
              />

              {hasFire && <img src="/assets/fire.gif" alt="fire" style={{ position: 'absolute', top: '-40%', left: '20%', width: '60%', zIndex: 3, mixBlendMode: 'screen' }} />}
              {hasSmoke && <img src="/assets/smoke.gif" alt="smoke" style={{ position: 'absolute', top: '-150%', left: '-50%', width: '200%', opacity: 0.7, zIndex: 4, pointerEvents: 'none' }} />}
              
            </div>
          ) : (
            <div style={{ zIndex: 1, color: 'rgba(255,255,255,0.4)', fontSize: '28px', letterSpacing: '3px', fontWeight: 'bold' }}>
              EMPTY WORKBENCH
            </div>
          )}
        </div>

        {/* Bottom Console Panel */}
        <div style={{ height: '120px', backgroundColor: '#222f3e', borderTop: '2px solid #576574', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
          {simState.equation && (
            <div style={{ color: '#ff9f43', fontSize: '20px', fontWeight: 'bold', marginBottom: '5px', letterSpacing: '1px' }}>
              {simState.equation}
            </div>
          )}
          <div style={{ color: '#1dd1a1', fontFamily: 'monospace', fontSize: '16px' }}>
            [System Log] {simState.log}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes bubble { 0% { transform: translateY(0); opacity: 0.8; } 100% { transform: translateY(-100px); opacity: 0; } }
          /* Scrollbar styling for inventory */
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #2d3436; }
          ::-webkit-scrollbar-thumb { background: #636e72; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #00cec9; }
        `}
      </style>
    </div>
  );
}

export default ExperimentLab;