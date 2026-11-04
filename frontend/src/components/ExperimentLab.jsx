import React, { useState } from 'react';

const LAB_TOOLS = [
  { id: 'beaker', name: 'Beaker', icon: '🥛', width: '120px', height: '140px', radius: '5px 5px 15px 15px' },
  { id: 'flask', name: 'Conical Flask', icon: '⚗️', width: '140px', height: '130px', radius: '50% 50% 15px 15px' },
  { id: 'testtube', name: 'Test Tube', icon: '🧪', width: '60px', height: '200px', radius: '5px 5px 30px 30px' }
];

const CHEMICALS = [
  { id: 'water', name: 'Water', formula: 'H₂O', icon: '💧', type: 'liquid', color: 'rgba(52, 152, 219, 0.4)' },
  { id: 'sodium', name: 'Sodium', formula: 'Na', icon: '🪨', type: 'solid', color: null }
];

function ExperimentLab() {
  const [workspaceTool, setWorkspaceTool] = useState(null);
  const [vesselContents, setVesselContents] = useState([]); 
  const [reactionState, setReactionState] = useState('idle'); 
  const [log, setLog] = useState('1. Drag a Tool. 2. Set Mass (g) & Drag Water, then Sodium.');
  const [masses, setMasses] = useState({ water: 100, sodium: 5 });
  const [calcResults, setCalcResults] = useState(null); 

  const handleDragStart = (e, itemType, itemData) => {
    e.dataTransfer.setData('itemType', itemType);
    const dataToTransfer = itemType === 'chemical' ? { ...itemData, mass: masses[itemData.id] } : itemData;
    e.dataTransfer.setData('itemData', JSON.stringify(dataToTransfer));
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const itemType = e.dataTransfer.getData('itemType');
    const itemData = JSON.parse(e.dataTransfer.getData('itemData'));

    if (itemType === 'tool') {
      setWorkspaceTool(itemData);
      setVesselContents([]); 
      setReactionState('idle');
      setCalcResults(null);
      setLog(`Placed ${itemData.name} on the workbench.`);
      return;
    }

    if (itemType === 'chemical') {
      if (!workspaceTool) { setLog('⚠️ Drag and drop a Lab Tool first!'); return; }
      if (vesselContents.find(c => c.id === itemData.id)) { setLog(`⚠️ ${itemData.name} is already added.`); return; }
      if (itemData.id === 'sodium' && !vesselContents.find(c => c.id === 'water')) { setLog('⚠️ Add Water first!'); return; }
      if (itemData.mass <= 0) { setLog(`⚠️ Invalid mass for ${itemData.name}.`); return; }

      const newContents = [...vesselContents, itemData];
      setVesselContents(newContents);
      setLog(`Added ${itemData.mass}g of ${itemData.name} to the ${workspaceTool.name}.`);
      analyzeReaction(newContents);
    }
  };

  const analyzeReaction = (contents) => {
    const has = (id) => contents.find(c => c.id === id);

    if (has('water') && has('sodium')) {
      setReactionState('reacting_sodium');
      setLog('🔥 Sodium reacting violently! Calculating stoichiometry...');
      
      fetch('http://127.0.0.1:5000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          na_mass: contents.find(c => c.id === 'sodium').mass,
          h2o_mass: contents.find(c => c.id === 'water').mass
        })
      })
      .then(res => res.json())
      .then(data => setCalcResults(data))
      .catch(err => console.error("Backend Error:", err));

      setTimeout(() => {
        setReactionState('done_sodium');
        setLog('✅ Reaction Complete! Final calculation report generated.');
      }, 5000);
    }
  };

  const clearWorkbench = () => {
    setWorkspaceTool(null);
    setVesselContents([]);
    setReactionState('idle');
    setCalcResults(null);
    setLog('Workbench cleared.');
  };

  let liquidHeight = '0%';
  let currentLiquidColor = 'transparent';
  let isBubbling = false;
  let hasFire = false;
  let hasSmoke = false;

  const liquidChemicals = vesselContents.filter(c => c.type === 'liquid');
  if (liquidChemicals.length > 0) {
    liquidHeight = '50%';
    currentLiquidColor = liquidChemicals[0].color; 
  }
  if (reactionState === 'done_sodium') currentLiquidColor = 'rgba(233, 30, 99, 0.3)'; 
  if (reactionState === 'reacting_sodium') {
    isBubbling = true; hasFire = true; hasSmoke = true;
  }
  const has = (id) => vesselContents.find(c => c.id === id);

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: 'auto', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1', minWidth: '350px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>🧰 Tools</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {LAB_TOOLS.map(tool => (
              <div key={tool.id} draggable onDragStart={(e) => handleDragStart(e, 'tool', tool)} style={{ padding: '15px', background: '#e5f2f5', border: '2px dashed #16a085', borderRadius: '10px', cursor: 'grab', textAlign: 'center', fontWeight: 'bold', color: '#16a085' }}>
                <div style={{ fontSize: '30px' }}>{tool.icon}</div><div>{tool.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>🧪 Chemicals (Set Mass)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {CHEMICALS.map(chem => (
              <div key={chem.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8f9fa', padding: '10px', borderRadius: '8px', border: '1px solid #bdc3c7', borderLeft: '5px solid #3498db' }}>
                <div draggable onDragStart={(e) => handleDragStart(e, 'chemical', chem)} style={{ cursor: 'grab', flex: '1', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                  <span style={{ fontSize: '24px' }}>{chem.icon}</span><span>{chem.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="number" min="1" value={masses[chem.id]} onChange={(e) => setMasses({...masses, [chem.id]: Number(e.target.value)})} style={{ width: '60px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc', textAlign: 'center' }} />
                  <span style={{ fontSize: '14px', color: '#555', fontWeight: 'bold' }}>g</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div onDragOver={handleDragOver} onDrop={handleDrop} style={{ flex: '2', minWidth: '400px', background: '#2c3e50', padding: '30px', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: workspaceTool ? '3px solid #1abc9c' : '3px dashed #7f8c8d' }}>
        <h2 style={{ color: '#ecf0f1', margin: '0 0 5px 0' }}>Drop Zone</h2>
        <p style={{ color: '#bdc3c7', fontSize: '14px', marginBottom: '30px' }}>Drop tools & chemicals here</p>
        
        <div style={{ height: '320px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative', width: '100%' }}>
          {workspaceTool ? (
            <div style={{ width: workspaceTool.width, height: workspaceTool.height, border: '4px solid rgba(255, 255, 255, 0.8)', borderTop: 'none', borderRadius: workspaceTool.radius, position: 'relative', display: 'flex', alignItems: 'flex-end', backgroundColor: 'rgba(255,255,255,0.05)' }}>
              {hasSmoke && (
                <div style={{ position: 'absolute', top: '-180px', left: '0', width: '100%', height: '180px', pointerEvents: 'none', display: 'flex', justifyContent: 'center' }}>
                  <div className="smoke smoke-1"></div><div className="smoke smoke-2"></div><div className="smoke smoke-3"></div>
                </div>
              )}
              <div style={{ width: '100%', height: liquidHeight, backgroundColor: currentLiquidColor, transition: 'background-color 2s ease, height 1s ease', position: 'relative', borderRadius: '0 0 10px 10px' }}>
                {has('sodium') && (
                  <div style={{ position: 'absolute', top: hasFire ? '-25px' : 'calc(100% - 30px)', left: '40%', fontSize: '35px', animation: hasFire ? 'jump 0.2s infinite alternate' : 'none' }}>
                    {hasFire ? '🔥' : '🪨'}
                  </div>
                )}
                {isBubbling && (
                  <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '15px', animation: 'bubble 0.4s infinite' }}>⚪</span>
                    <span style={{ fontSize: '20px', animation: 'bubble 0.6s infinite' }}>⚪</span>
                  </div>
                )}
              </div>
            </div>
          ) : ( <div style={{ color: '#7f8c8d', fontSize: '60px', opacity: 0.3 }}>+</div> )}
        </div>

        <div style={{ marginTop: '30px', padding: '15px', background: '#000', color: '#2ecc71', borderRadius: '8px', width: '100%', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '14px', textAlign: 'center' }}>
          > {log}
        </div>

        {/* --- SIMPLE CALCULATION REPORT --- */}
        {reactionState === 'done_sodium' && calcResults && (
          <div style={{ marginTop: '20px', padding: '20px', background: '#fff', border: '1px solid #ccc', borderRadius: '5px', width: '100%', boxSizing: 'border-box', textAlign: 'left' }}>
            <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px', color: '#333' }}>
              Calculation Results
            </h3>
            
            <p style={{ fontWeight: 'bold', color: '#555' }}>Equation: 2Na + 2H₂O → 2NaOH + H₂</p>
            
            <ul style={{ lineHeight: '1.8', color: '#444' }}>
              <li>
                <strong>Na Moles:</strong> {vesselContents.find(c => c.id === 'sodium').mass}g / 23.0 = {calcResults.mol_na} mol
              </li>
              <li>
                <strong>H₂O Moles:</strong> {vesselContents.find(c => c.id === 'water').mass}g / 18.0 = {calcResults.mol_h2o} mol
              </li>
              <li>
                <strong>Limiting Reactant:</strong> {calcResults.limiting}
              </li>
              <li>
                <strong>NaOH Produced:</strong> {calcResults.mass_naoh} g
              </li>
              <li>
                <strong>H₂ Gas Released:</strong> {calcResults.vol_h2} L
              </li>
            </ul>
          </div>
        )}

        <button onClick={clearWorkbench} style={{ marginTop: '20px', padding: '10px 25px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          🗑️ Clear Workbench
        </button>
      </div>

      <style>
        {`
          @keyframes bubble { 0% { transform: translateY(0); opacity: 0.9; } 100% { transform: translateY(-120px); opacity: 0; } }
          @keyframes jump { 0% { transform: translateY(0) scale(1) rotate(-10deg); } 100% { transform: translateY(-20px) scale(1.2) rotate(10deg); } }
          @keyframes rise { 0% { transform: translateY(0) scale(1); opacity: 0.8; } 100% { transform: translateY(-200px) scale(4); opacity: 0; } }
          .smoke { position: absolute; bottom: 0; width: 40px; height: 40px; background: rgba(220, 220, 220, 0.7); border-radius: 50%; filter: blur(10px); animation: rise 2s infinite ease-in; }
          .smoke-1 { left: 10%; animation-delay: 0s; }
          .smoke-2 { left: 40%; animation-delay: 0.3s; width: 50px; height: 50px; }
          .smoke-3 { left: 70%; animation-delay: 0.6s; }
        `}
      </style>
    </div>
  );
}

export default ExperimentLab;