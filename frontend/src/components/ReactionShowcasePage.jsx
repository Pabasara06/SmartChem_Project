import React, { useState, useMemo } from 'react';
import {
  EQUIPMENT_CATALOG,
  REACTION_RULES,
  SHOWCASE_CATEGORIES,
  evaluateMixture
} from '../data/chemistryData';
import { GlassVesselGraphic } from './EquipmentSVGs';

export default function ReactionShowcasePage({ onLaunchBench, onLoadPreset }) {
  // Combine all chemicals for the interactive selector
  const allChemicals = useMemo(() => {
    return [
      ...EQUIPMENT_CATALOG.solid.map((c) => ({ ...c, state: 'solid' })),
      ...EQUIPMENT_CATALOG.liquid.map((c) => ({ ...c, state: 'liquid' }))
    ];
  }, []);

  // Interactive sandbox state
  const [reactantAId, setReactantAId] = useState('lead_nitrate_aq');
  const [reactantBId, setReactantBId] = useState('ki_aq');
  const [isHeating, setIsHeating] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const reactantA = useMemo(() => allChemicals.find((c) => c.id === reactantAId), [allChemicals, reactantAId]);
  const reactantB = useMemo(() => allChemicals.find((c) => c.id === reactantBId), [allChemicals, reactantBId]);

  // Compute live reaction
  const liveReaction = useMemo(() => {
    if (!reactantA || !reactantB) return null;
    return evaluateMixture([reactantA, reactantB], isHeating);
  }, [reactantA, reactantB, isHeating]);

  // Quick preset loader
  const handleLoadExample = (example) => {
    if (example.reactants.length >= 2) {
      setReactantAId(example.reactants[0]);
      setReactantBId(example.reactants[1]);
      setIsHeating(example.id.includes('thermal') || example.id.includes('combustion'));
    }
  };

  const handleLaunchCurrentInBench = () => {
    if (!reactantA || !reactantB) return;
    onLaunchBench({
      name: liveReaction ? liveReaction.title : `${reactantA.formula} + ${reactantB.formula}`,
      chemicals: [reactantA, reactantB],
      vesselId: reactantA.state === 'solid' && reactantB.state === 'solid' ? 'watch_glass' : 'beaker_250',
      isHeating
    });
  };

  // Filter showcase categories
  const filteredCategories = useMemo(() => {
    return SHOWCASE_CATEGORIES.filter((cat) => {
      if (activeCategoryFilter !== 'all' && cat.id !== activeCategoryFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const inCat = cat.name.toLowerCase().includes(q) || cat.tagline.toLowerCase().includes(q);
      const inEx = cat.examples.some(
        (ex) =>
          ex.name.toLowerCase().includes(q) ||
          ex.equation.toLowerCase().includes(q) ||
          ex.subtitle.toLowerCase().includes(q)
      );
      return inCat || inEx;
    });
  }, [activeCategoryFilter, searchQuery]);

  return (
    <div className="showcase-page">
      {/* Top Banner Navigation */}
      <header className="showcase-header">
        <div className="showcase-brand">
          <div className="brand-logo-icon">⚗️</div>
          <div>
            <h1>SmartChem Studio</h1>
            <p>Interactive Chemical Reaction Visualizer & Laboratory Simulator</p>
          </div>
        </div>
        <div className="showcase-header-nav">
          <button className="nav-tab active">
            <span>☷</span> Reaction Explorer
          </button>
          <button className="nav-tab btn-bench-switch" onClick={() => onLaunchBench(null)}>
            <span>🔬</span> Launch Lab Workspace
          </button>
        </div>
      </header>

      {/* Hero Interactive Playground Section */}
      <section className="showcase-hero">
        <div className="hero-heading">
          <span className="hero-pill">Real Chemical Reaction Engine</span>
          <h2>Interactive Reaction Visualizer & Formula Laboratory</h2>
          <p>
            Mix solid and liquid chemicals below to observe live color shifts, precipitate sediment formation,
            effervescent gas evolution, and thermal enthalpy outputs in real-time.
          </p>
        </div>

        {/* Live Interactive Reaction Lab Box */}
        <div className="interactive-sandbox-card">
          {/* Chemical Selectors */}
          <div className="sandbox-selectors">
            <div className="selector-column">
              <label>
                <span className="dot-indicator blue" /> Chemical 1 (Reactant A)
              </label>
              <select
                value={reactantAId}
                onChange={(e) => setReactantAId(e.target.value)}
                className="chemical-dropdown"
              >
                <optgroup label="── Liquid Solutions & Acids ──">
                  {allChemicals
                    .filter((c) => c.state === 'liquid')
                    .map((chem) => (
                      <option key={chem.id} value={chem.id}>
                        {chem.name} ({chem.formula})
                      </option>
                    ))}
                </optgroup>
                <optgroup label="── Solid Metals, Salts & Powders ──">
                  {allChemicals
                    .filter((c) => c.state === 'solid')
                    .map((chem) => (
                      <option key={chem.id} value={chem.id}>
                        [Solid] {chem.name} ({chem.formula})
                      </option>
                    ))}
                </optgroup>
              </select>
              {reactantA && (
                <div className="reactant-badge">
                  <span className={`state-tag ${reactantA.state}`}>
                    {reactantA.state === 'solid' ? '◐ SOLID' : '💧 LIQUID'}
                  </span>
                  <span className="formula-display">{reactantA.formula}</span>
                  <p className="chem-desc">{reactantA.detail}</p>
                </div>
              )}
            </div>

            <div className="plus-sign-divider">
              <span>＋</span>
            </div>

            <div className="selector-column">
              <label>
                <span className="dot-indicator green" /> Chemical 2 (Reactant B)
              </label>
              <select
                value={reactantBId}
                onChange={(e) => setReactantBId(e.target.value)}
                className="chemical-dropdown"
              >
                <optgroup label="── Liquid Solutions & Bases ──">
                  {allChemicals
                    .filter((c) => c.state === 'liquid')
                    .map((chem) => (
                      <option key={chem.id} value={chem.id}>
                        {chem.name} ({chem.formula})
                      </option>
                    ))}
                </optgroup>
                <optgroup label="── Solid Powders, Salts & Chips ──">
                  {allChemicals
                    .filter((c) => c.state === 'solid')
                    .map((chem) => (
                      <option key={chem.id} value={chem.id}>
                        [Solid] {chem.name} ({chem.formula})
                      </option>
                    ))}
                </optgroup>
              </select>
              {reactantB && (
                <div className="reactant-badge">
                  <span className={`state-tag ${reactantB.state}`}>
                    {reactantB.state === 'solid' ? '◐ SOLID' : '💧 LIQUID'}
                  </span>
                  <span className="formula-display">{reactantB.formula}</span>
                  <p className="chem-desc">{reactantB.detail}</p>
                </div>
              )}
            </div>

            {/* Heating control */}
            <div className="heat-toggle-col">
              <label>Thermal State</label>
              <button
                className={`heat-toggle-btn ${isHeating ? 'active' : ''}`}
                onClick={() => setIsHeating(!isHeating)}
              >
                <span>♨</span> {isHeating ? 'Heat Applied (85°C)' : 'Room Temp (25°C)'}
              </button>
              <small className="heat-hint">Toggle Bunsen burner</small>
            </div>
          </div>

          {/* Visualization Stage & Scientific Results */}
          <div className="sandbox-output-grid">
            {/* Visual Reaction Simulation Vessel */}
            <div className="vessel-preview-stage">
              <div className="vessel-bench-platform">
                <GlassVesselGraphic
                  type="beaker_250"
                  liquidLevel={liveReaction ? 0.65 : 0.45}
                  liquidColor={
                    liveReaction?.after_color ||
                    liveReaction?.color ||
                    reactantA?.color ||
                    '#58aee8'
                  }
                  solidContent={
                    reactantA?.state === 'solid'
                      ? reactantA
                      : reactantB?.state === 'solid'
                      ? reactantB
                      : null
                  }
                  reaction={liveReaction}
                  isHeating={isHeating}
                  width={150}
                  height={150}
                />
              </div>

              {/* Status Badges Overlay */}
              <div className="stage-badges">
                {liveReaction ? (
                  <span className={`live-status-pill ${liveReaction.status}`}>
                    {liveReaction.status.replace('_', ' ').toUpperCase()} ACTIVE
                  </span>
                ) : (
                  <span className="live-status-pill idle">IDLE MIXTURE (NO REACTION)</span>
                )}
                {isHeating && <span className="temp-badge">♨ 85.0 °C</span>}
              </div>
            </div>

            {/* Scientific Readout Panel */}
            <div className="reaction-scientific-details">
              <div className="reaction-heading-box">
                <span className="reaction-category-badge">
                  {liveReaction ? liveReaction.category?.toUpperCase() : 'PHYSICAL MIXTURE'}
                </span>
                <h3>{liveReaction ? liveReaction.name : 'No Chemical Reaction Occurring'}</h3>
              </div>

              {/* Balanced Chemical Equation */}
              <div className="equation-box">
                <span className="eq-label">Balanced Chemical Equation:</span>
                <code>
                  {liveReaction
                    ? liveReaction.equation
                    : `${reactantA?.formula || 'A'} + ${reactantB?.formula || 'B'} → No Reaction`}
                </code>
              </div>

              {/* Visual Observations */}
              <div className="observations-box">
                <h4>Visual Phenomena Observed:</h4>
                <ul>
                  {liveReaction ? (
                    <>
                      <li>
                        <strong>Appearance:</strong> {liveReaction.description}
                      </li>
                      {liveReaction.precipitate_color && (
                        <li>
                          <strong>Precipitate:</strong> Insoluble sediment forming (
                          <span
                            className="color-sample-dot"
                            style={{ backgroundColor: liveReaction.precipitate_color }}
                          />
                          {liveReaction.precipitate_color}).
                        </li>
                      )}
                      {liveReaction.gasProduced && (
                        <li>
                          <strong>Gas Evolution:</strong> Vigorous bubbling release of{' '}
                          {liveReaction.gasProduced} gas ↑.
                        </li>
                      )}
                      {liveReaction.temperatureChange && (
                        <li>
                          <strong>Thermal Output:</strong>{' '}
                          {liveReaction.temperatureChange > 0 ? 'Exothermic (+' : 'Endothermic ('}
                          {liveReaction.temperatureChange} °C).
                        </li>
                      )}
                    </>
                  ) : (
                    <li>Reagents are miscible or non-reactive at current temperature.</li>
                  )}
                </ul>
              </div>

              {/* Mechanism */}
              {liveReaction?.mechanism && (
                <div className="mechanism-box">
                  <strong>Scientific Mechanism:</strong>
                  <p>{liveReaction.mechanism}</p>
                </div>
              )}

              {/* Direct Workspace Launcher Button */}
              <div className="sandbox-actions">
                <button
                  className="btn-launch-bench-primary"
                  onClick={handleLaunchCurrentInBench}
                >
                  <span>🔬</span> Open this Reaction in Lab Bench Workspace
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Reactions Showcase Library */}
      <section className="showcase-catalog-section">
        <div className="catalog-toolbar">
          <div className="filter-chips">
            <button
              className={`filter-chip ${activeCategoryFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategoryFilter('all')}
            >
              All Reactions
            </button>
            {SHOWCASE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`filter-chip ${activeCategoryFilter === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategoryFilter(cat.id)}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          <div className="catalog-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search by formula (e.g. PbI2, HCl), name, or reaction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && <button onClick={() => setSearchQuery('')}>×</button>}
          </div>
        </div>

        {/* Gallery Categories */}
        <div className="categories-stack">
          {filteredCategories.map((category) => (
            <div key={category.id} className="category-section">
              <div className="category-header">
                <div className="cat-title-wrap">
                  <span className="cat-icon">{category.icon}</span>
                  <div>
                    <h3>{category.name}</h3>
                    <span className="cat-badge">{category.badge}</span>
                  </div>
                </div>
                <p className="cat-tagline">{category.tagline}</p>
              </div>

              {/* Examples Grid */}
              <div className="reactions-grid">
                {category.examples.map((example) => (
                  <article key={example.id} className="reaction-card-detailed">
                    <div className="card-top">
                      <div className="reaction-icon-indicator" style={{ backgroundColor: example.color }}>
                        {category.icon}
                      </div>
                      <div>
                        <h4>{example.name}</h4>
                        <span className="card-subtitle">{example.subtitle}</span>
                      </div>
                    </div>

                    <div className="card-equation">
                      <code>{example.equation}</code>
                    </div>

                    <p className="card-observation">{example.observation}</p>

                    <div className="card-footer">
                      <button
                        className="btn-card-preview"
                        onClick={() => handleLoadExample(example)}
                      >
                        <span>▶</span> Preview Reaction
                      </button>
                      <button
                        className="btn-card-bench"
                        onClick={() => {
                          const rA = allChemicals.find((c) => c.id === example.reactants[0]);
                          const rB = allChemicals.find((c) => c.id === example.reactants[1]);
                          onLaunchBench({
                            name: example.name,
                            chemicals: [rA, rB].filter(Boolean),
                            vesselId: example.vessel || 'beaker_250',
                            isHeating: false
                          });
                        }}
                      >
                        <span>⚗️</span> Test in Lab Bench
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
