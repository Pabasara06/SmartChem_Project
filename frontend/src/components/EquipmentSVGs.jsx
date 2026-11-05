import React from 'react';

/**
 * Photorealistic Glassware & Laboratory Equipment SVG Renderers
 * Provides authentic, high-fidelity laboratory visuals matching professional chemistry software.
 */

export function GlassVesselGraphic({
  type = 'beaker_250',
  liquidLevel = 0, // 0 to 1
  liquidColor = '#58aee8',
  solidContent = null, // { color: string, type: 'granules' | 'powder' | 'crystals' | 'ribbon' }
  reaction = null,
  isHeating = false,
  isStirring = false,
  width = 110,
  height = 110,
  className = ''
}) {
  const hasLiquid = liquidLevel > 0;
  const isViolent = reaction?.status === 'violent';
  const hasBubbles = reaction?.effects?.includes('bubbles') || reaction?.effects?.includes('rapid_fizzing') || isHeating;
  const hasPrecipitate = reaction?.effects?.includes('precipitate') || reaction?.precipitate_color;

  return (
    <div
      className={`glass-vessel-container ${className} ${isHeating ? 'heating-active' : ''} ${isStirring ? 'stirring-active' : ''}`}
      style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}
    >
      <svg
        viewBox="0 0 120 120"
        width="100%"
        height="100%"
        className="glass-svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Glass specular gradients */}
          <linearGradient id="glassSpecular" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="15%" stopColor="#d2eaf5" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#a5cde3" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e6f5ff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#c0e2f5" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#e6f5ff" stopOpacity="0.25" />
          </linearGradient>

          {/* Liquid dynamic gradient */}
          <linearGradient id={`liquidGrad-${liquidColor.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={liquidColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={liquidColor} stopOpacity="0.75" />
          </linearGradient>

          {/* Glass Filter & Drop Shadow */}
          <filter id="glassGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="4" floodColor="#08101a" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* --- VESSEL SPECIFIC SHAPES & LIQUID FILLS --- */}

        {/* 1. BEAKER (100mL or 250mL) */}
        {(type === 'beaker_100' || type === 'beaker_250' || type === 'beaker') && (
          <g filter="url(#glassGlow)">
            {/* Liquid Fill */}
            {hasLiquid && (
              <g>
                <path
                  d={`M 28 ${100 - liquidLevel * 60} 
                      L 92 ${100 - liquidLevel * 60} 
                      Q 92 102 85 104 
                      L 35 104 
                      Q 28 102 28 ${100 - liquidLevel * 60} Z`}
                  fill={liquidColor}
                  opacity="0.82"
                />
                {/* Liquid Meniscus Curve */}
                <ellipse
                  cx="60"
                  cy={100 - liquidLevel * 60}
                  rx="32"
                  ry="4.5"
                  fill={liquidColor}
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  strokeOpacity="0.6"
                />
              </g>
            )}

            {/* Precipitate sediment at the bottom */}
            {hasPrecipitate && (
              <path
                d="M 30 98 Q 60 93 90 98 Q 88 104 80 105 L 40 105 Q 32 104 30 98 Z"
                fill={reaction?.precipitate_color || '#ffd700'}
                opacity="0.9"
              />
            )}

            {/* Solid powder/granules pile */}
            {solidContent && (
              <path
                d="M 36 102 Q 60 90 84 102 L 78 104 L 42 104 Z"
                fill={solidContent.color || '#9ba7af'}
                opacity="0.95"
              />
            )}

            {/* Glass Beaker Body */}
            <path
              d="M 23 20 L 28 24 L 28 98 Q 28 106 36 106 L 84 106 Q 92 106 92 98 L 92 24 L 97 20"
              fill="url(#glassBody)"
              stroke="#dff4ff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Top Rim */}
            <ellipse cx="60" cy="24" rx="32" ry="4.5" fill="none" stroke="#eef8ff" strokeWidth="1.8" />
            {/* Graduation Markings */}
            <line x1="32" y1="42" x2="44" y2="42" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.75" />
            <line x1="32" y1="58" x2="40" y2="58" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="32" y1="74" x2="44" y2="74" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.75" />
            <line x1="32" y1="90" x2="40" y2="90" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
            {/* Text Label */}
            <text x="50" y="44" fill="#ffffff" fillOpacity="0.6" fontSize="6" fontFamily="sans-serif">
              {type === 'beaker_100' ? '100ml' : '250ml'}
            </text>
            {/* Glass Specular Reflection Highlight */}
            <path d="M 31 28 L 31 98" stroke="url(#glassSpecular)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 89 28 L 89 98" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
          </g>
        )}

        {/* 2. ROUND BOTTOMED FLASK */}
        {(type === 'round_flask' || type === 'flask_round') && (
          <g filter="url(#glassGlow)">
            {/* Liquid Fill */}
            {hasLiquid && (
              <g>
                <circle cx="60" cy="74" r={34 * Math.min(1, Math.max(0.4, liquidLevel))} fill={liquidColor} opacity="0.82" />
                <ellipse cx="60" cy={74 - 30 * liquidLevel} rx="26" ry="4" fill={liquidColor} stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.6" />
              </g>
            )}
            {/* Solid sediment */}
            {hasPrecipitate && (
              <ellipse cx="60" cy="98" rx="20" ry="6" fill={reaction?.precipitate_color || '#ffd700'} opacity="0.9" />
            )}
            {/* Glass Body */}
            <path
              d="M 52 14 L 52 46 C 40 52 30 65 30 76 A 30 30 0 1 0 90 76 C 90 65 80 52 68 46 L 68 14 Z"
              fill="url(#glassBody)"
              stroke="#dff4ff"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Flask Neck Rim */}
            <ellipse cx="60" cy="14" rx="8" ry="2.5" fill="#eaf6ff" fillOpacity="0.2" stroke="#eef8ff" strokeWidth="1.8" />
            {/* Specular curved highlight */}
            <path d="M 37 68 A 24 24 0 0 1 50 54" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
          </g>
        )}

        {/* 3. CONICAL (ERLENMEYER) FLASK */}
        {(type === 'conical_flask' || type === 'flask_conical' || type === 'flask') && (
          <g filter="url(#glassGlow)">
            {/* Liquid Fill */}
            {hasLiquid && (
              <g>
                <path
                  d={`M ${48 - liquidLevel * 22} ${100 - liquidLevel * 56} 
                      L ${72 + liquidLevel * 22} ${100 - liquidLevel * 56} 
                      Q 96 102 90 104 
                      L 30 104 
                      Q 24 102 ${48 - liquidLevel * 22} ${100 - liquidLevel * 56} Z`}
                  fill={liquidColor}
                  opacity="0.82"
                />
                <ellipse cx="60" cy={100 - liquidLevel * 56} rx={16 + liquidLevel * 18} ry="3.5" fill={liquidColor} stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.6" />
              </g>
            )}
            {hasPrecipitate && (
              <ellipse cx="60" cy="101" rx="28" ry="4" fill={reaction?.precipitate_color || '#ffd700'} opacity="0.9" />
            )}
            {/* Glass Body */}
            <path
              d="M 51 16 L 51 36 L 25 98 Q 23 105 32 105 L 88 105 Q 97 105 95 98 L 69 36 L 69 16 Z"
              fill="url(#glassBody)"
              stroke="#dff4ff"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Neck Rim */}
            <ellipse cx="60" cy="16" rx="9" ry="2.6" fill="#eaf6ff" fillOpacity="0.2" stroke="#eef8ff" strokeWidth="1.8" />
            {/* Graduation lines */}
            <line x1="42" y1="75" x2="52" y2="75" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="38" y1="88" x2="48" y2="88" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
            <path d="M 33 94 L 54 44" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
          </g>
        )}

        {/* 4. GLOBE-SHAPED SEPARATORY FUNNEL */}
        {(type === 'separatory_funnel' || type === 'separatory') && (
          <g filter="url(#glassGlow)">
            {/* Upper Globe Liquid */}
            {hasLiquid && (
              <ellipse cx="60" cy="52" rx={24 * Math.min(1, Math.max(0.4, liquidLevel))} ry={20 * Math.min(1, Math.max(0.4, liquidLevel))} fill={liquidColor} opacity="0.85" />
            )}
            {/* Funnel Glass Body */}
            <ellipse cx="60" cy="50" rx="27" ry="24" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="2" />
            {/* Upper Neck */}
            <path d="M 55 14 L 55 28 L 65 28 L 65 14 Z" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="2" />
            {/* Ground Glass Stopper */}
            <ellipse cx="60" cy="14" rx="7" ry="2.5" fill="#cbe6f7" stroke="#eef8ff" strokeWidth="1.6" />
            {/* Lower Stem & Stopcock Valve */}
            <path d="M 57 73 L 57 88 L 63 88 L 63 73 Z" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="1.8" />
            {/* Stopcock valve knob */}
            <rect x="52" y="88" width="16" height="6" rx="2" fill="#3a8fd4" stroke="#236fa8" strokeWidth="1" />
            <circle cx="60" cy="91" r="2" fill="#ffffff" />
            {/* Slender delivery tip */}
            <path d="M 58 94 L 58 110 L 62 110 L 62 94 Z" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="1.6" />
            <ellipse cx="60" cy="110" rx="2" ry="0.8" fill="#dff4ff" />
          </g>
        )}

        {/* 5. TEST TUBES (SMALL, LARGE, SIDE-ARM) */}
        {(type.includes('testtube') || type.includes('test_tube') || type === 'testtube') && (
          <g filter="url(#glassGlow)">
            {/* Test Tube Liquid */}
            {hasLiquid && (
              <g>
                <path
                  d={`M ${type === 'large_test_tube' ? 44 : 48} ${102 - liquidLevel * 68} 
                      L ${type === 'large_test_tube' ? 76 : 72} ${102 - liquidLevel * 68} 
                      L ${type === 'large_test_tube' ? 76 : 72} 96 
                      A ${type === 'large_test_tube' ? 16 : 12} ${type === 'large_test_tube' ? 14 : 10} 0 0 1 ${type === 'large_test_tube' ? 44 : 48} 96 Z`}
                  fill={liquidColor}
                  opacity="0.85"
                />
                <ellipse
                  cx="60"
                  cy={102 - liquidLevel * 68}
                  rx={type === 'large_test_tube' ? 16 : 12}
                  ry="2.5"
                  fill={liquidColor}
                  stroke="#ffffff"
                  strokeWidth="0.7"
                />
              </g>
            )}

            {/* Precipitate in Test Tube */}
            {hasPrecipitate && (
              <path
                d={`M ${type === 'large_test_tube' ? 45 : 49} 98 
                    A ${type === 'large_test_tube' ? 15 : 11} ${type === 'large_test_tube' ? 10 : 8} 0 0 0 ${type === 'large_test_tube' ? 75 : 71} 98 Z`}
                fill={reaction?.precipitate_color || '#ffd700'}
                opacity="0.95"
              />
            )}

            {/* Solid powder at bottom */}
            {solidContent && (
              <ellipse
                cx="60"
                cy="100"
                rx={type === 'large_test_tube' ? 12 : 9}
                ry="4"
                fill={solidContent.color || '#9ba7af'}
              />
            )}

            {/* Glass Tube Body */}
            <path
              d={
                type === 'large_test_tube'
                  ? 'M 43 16 L 43 96 A 17 14 0 0 0 77 96 L 77 16'
                  : 'M 47 16 L 47 96 A 13 11 0 0 0 73 96 L 73 16'
              }
              fill="url(#glassBody)"
              stroke="#dff4ff"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Tube Flared Rim */}
            <ellipse
              cx="60"
              cy="16"
              rx={type === 'large_test_tube' ? 18 : 14}
              ry="3.2"
              fill="#eaf6ff"
              fillOpacity="0.2"
              stroke="#eef8ff"
              strokeWidth="1.8"
            />

            {/* Side Arm (if test tube with side arm) */}
            {(type === 'side_arm_tube' || type === 'testtube_sidearm') && (
              <g>
                <path d="M 72 32 L 94 22 L 96 26 L 73 38" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="1.8" />
                <ellipse cx="95" cy="24" rx="2" ry="2.5" fill="#dff4ff" stroke="#ffffff" strokeWidth="1" />
              </g>
            )}

            {/* Reflection line */}
            <line
              x1={type === 'large_test_tube' ? '47' : '50'}
              y1="22"
              x2={type === 'large_test_tube' ? '47' : '50'}
              y2="92"
              stroke="#ffffff"
              strokeWidth="2"
              strokeOpacity="0.6"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* 6. GAS JAR */}
        {type === 'gas_jar' && (
          <g filter="url(#glassGlow)">
            {/* Gas smoke or liquid fill */}
            {hasLiquid && (
              <rect x="36" y={100 - liquidLevel * 60} width="48" height={liquidLevel * 60} fill={liquidColor} opacity="0.75" />
            )}
            {/* Gas Jar Body */}
            <rect x="35" y="24" width="50" height="80" rx="3" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="2.2" />
            {/* Ground Glass Heavy Rim */}
            <ellipse cx="60" cy="24" rx="26" ry="4" fill="#e2f3fc" stroke="#ffffff" strokeWidth="2" />
            {/* Heavy Base Flange */}
            <ellipse cx="60" cy="104" rx="28" ry="4.5" fill="#cce8f8" stroke="#dff4ff" strokeWidth="2" />
            {/* Glass highlights */}
            <line x1="39" y1="28" x2="39" y2="100" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.6" />
          </g>
        )}

        {/* 7. QUINTUPLE GAS CYLINDER */}
        {type === 'gas_cylinder' && (
          <g filter="url(#glassGlow)">
            {/* 3 Main Chambers */}
            <rect x="25" y="30" width="20" height="74" rx="3" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="1.8" />
            <rect x="50" y="24" width="20" height="80" rx="3" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="1.8" />
            <rect x="75" y="30" width="20" height="74" rx="3" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="1.8" />
            {/* Red indicator lines like in screenshot */}
            <line x1="28" y1="45" x2="42" y2="45" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="28" y1="60" x2="42" y2="60" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="28" y1="75" x2="42" y2="75" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="53" y1="40" x2="67" y2="40" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="53" y1="55" x2="67" y2="55" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="53" y1="70" x2="67" y2="70" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="78" y1="45" x2="92" y2="45" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="78" y1="60" x2="92" y2="60" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="78" y1="75" x2="92" y2="75" stroke="#ff4757" strokeWidth="1.5" />
            {/* Interconnecting tubes */}
            <path d="M 45 48 L 50 48 M 70 48 L 75 48" stroke="#dff4ff" strokeWidth="2.5" />
            <ellipse cx="60" cy="24" rx="8" ry="2.5" fill="#dff4ff" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        )}

        {/* 8. WATCH GLASS */}
        {(type === 'watch_glass') && (
          <g filter="url(#glassGlow)">
            {/* Dish arc */}
            <path d="M 20 80 Q 60 102 100 80" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="2.4" />
            <path d="M 20 80 Q 60 88 100 80" fill="url(#glassBody)" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
            {/* Solid powder pile on watch glass */}
            {solidContent && (
              <ellipse cx="60" cy="85" rx="22" ry="6" fill={solidContent.color || '#e4c83c'} opacity="0.95" />
            )}
            <line x1="28" y1="84" x2="55" y2="92" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.7" strokeLinecap="round" />
          </g>
        )}

        {/* 9. CRUCIBLE & EVAPORATING DISH */}
        {(type === 'crucible' || type === 'evaporating_dish') && (
          <g filter="url(#glassGlow)">
            {/* Porcelain ceramic texture */}
            <path
              d={type === 'crucible' ? 'M 35 45 L 43 96 Q 60 102 77 96 L 85 45 Z' : 'M 22 68 Q 60 105 98 68 Z'}
              fill="#f0f4f8"
              stroke="#b5c8d6"
              strokeWidth="2"
            />
            <ellipse
              cx="60"
              cy={type === 'crucible' ? 45 : 68}
              rx={type === 'crucible' ? 25 : 38}
              ry={type === 'crucible' ? 6 : 8}
              fill="#e2ecf5"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            {/* Powder in crucible */}
            {solidContent && (
              <ellipse
                cx="60"
                cy={type === 'crucible' ? 82 : 82}
                rx={type === 'crucible' ? 14 : 22}
                ry="5"
                fill={solidContent.color || '#6f4a35'}
              />
            )}
          </g>
        )}

        {/* --- DYNAMIC BUBBLE PARTICLES DURING REACTION --- */}
        {hasBubbles && (
          <g className="bubble-group">
            <circle cx="50" cy="90" r="2.5" fill="#ffffff" opacity="0.8">
              <animate attributeName="cy" values="90;45" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="65" cy="88" r="3.5" fill="#ffffff" opacity="0.8">
              <animate attributeName="cy" values="88;40" dur="0.9s" repeatCount="indefinite" begin="0.3s" />
              <animate attributeName="opacity" values="0.8;0" dur="0.9s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            <circle cx="58" cy="94" r="2" fill="#ffffff" opacity="0.8">
              <animate attributeName="cy" values="94;35" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
              <animate attributeName="opacity" values="0.8;0" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
            </circle>
            <circle cx="42" cy="85" r="3" fill="#ffffff" opacity="0.8">
              <animate attributeName="cy" values="85;48" dur="1.1s" repeatCount="indefinite" begin="0.2s" />
              <animate attributeName="opacity" values="0.8;0" dur="1.1s" repeatCount="indefinite" begin="0.2s" />
            </circle>
          </g>
        )}

        {/* --- DYNAMIC VIOLENT EXPLOSION / FLASH FOR SODIUM --- */}
        {isViolent && (
          <g className="violent-flash">
            <circle cx="60" cy="65" r="20" fill="#ff7700" opacity="0.6">
              <animate attributeName="r" values="12;28;12" dur="0.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="0.4s" repeatCount="indefinite" />
            </circle>
            <polygon points="60,20 64,40 85,45 68,55 75,75 58,62 42,75 48,55 35,45 54,40" fill="#ffee55" opacity="0.9">
              <animateTransform attributeName="transform" type="rotate" from="0 60 55" to="360 60 55" dur="1.2s" repeatCount="indefinite" />
            </polygon>
          </g>
        )}
      </svg>
    </div>
  );
}

/**
 * Functional Assistive Devices & Tools SVG Renderers
 */
export function ToolGraphic({
  type = 'burner',
  isActive = false,
  readout = null,
  width = 110,
  height = 110
}) {
  return (
    <div style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>
      <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8a99a8" />
            <stop offset="50%" stopColor="#adbccb" />
            <stop offset="100%" stopColor="#5d6c7b" />
          </linearGradient>
          <radialGradient id="flameInner" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#64d8ff" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
          </radialGradient>
          <radialGradient id="flameOuter" cx="50%" cy="70%" r="60%">
            <stop offset="0%" stopColor="#ffea00" />
            <stop offset="50%" stopColor="#ff7700" />
            <stop offset="100%" stopColor="#ff2200" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. BUNSEN BURNER */}
        {(type === 'burner' || type === 'heater') && (
          <g>
            {/* Cast Iron Heavy Hex Base */}
            <path d="M 32 108 L 40 96 L 80 96 L 88 108 Z" fill="#2d3748" stroke="#1a202c" strokeWidth="2" />
            {/* Gas Inlet Pipe */}
            <path d="M 75 99 L 105 102 L 105 106 L 75 103 Z" fill="url(#metalGrad)" stroke="#4a5568" strokeWidth="1" />
            {/* Air Collar */}
            <rect x="52" y="86" width="16" height="10" rx="1" fill="#4a5568" stroke="#2d3748" strokeWidth="1" />
            <circle cx="60" cy="91" r="2.5" fill="#1a202c" />
            {/* Brass Barrel Stem */}
            <rect x="54" y="45" width="12" height="42" fill="url(#metalGrad)" stroke="#4a5568" strokeWidth="1.5" />
            {/* Burner Nozzle Tip */}
            <rect x="53" y="41" width="14" height="5" rx="1" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />

            {/* Glowing Flame when active */}
            {isActive && (
              <g className="burner-flame">
                {/* Outer Yellow Flame */}
                <path
                  d="M 60 8 C 50 20 44 32 52 41 L 68 41 C 76 32 70 20 60 8 Z"
                  fill="url(#flameOuter)"
                  opacity="0.9"
                >
                  <animate attributeName="d" values="M 60 8 C 50 20 44 32 52 41 L 68 41 C 76 32 70 20 60 8 Z; M 60 4 C 48 18 46 30 52 41 L 68 41 C 74 30 72 18 60 4 Z; M 60 8 C 50 20 44 32 52 41 L 68 41 C 76 32 70 20 60 8 Z" dur="0.25s" repeatCount="indefinite" />
                </path>
                {/* Inner Hot Blue Cone */}
                <path
                  d="M 60 22 C 55 28 53 35 56 41 L 64 41 C 67 35 65 28 60 22 Z"
                  fill="url(#flameInner)"
                >
                  <animate attributeName="d" values="M 60 22 C 55 28 53 35 56 41 L 64 41 C 67 35 65 28 60 22 Z; M 60 18 C 54 26 54 34 56 41 L 64 41 C 66 34 66 26 60 18 Z; M 60 22 C 55 28 53 35 56 41 L 64 41 C 67 35 65 28 60 22 Z" dur="0.2s" repeatCount="indefinite" />
                </path>
              </g>
            )}
          </g>
        )}

        {/* 2. TRIPOD & WIRE GAUZE */}
        {type === 'tripod' && (
          <g>
            {/* Tripod Iron Ring */}
            <ellipse cx="60" cy="40" rx="36" ry="10" fill="#334155" stroke="#1e293b" strokeWidth="3" />
            {/* Wire Gauze Ceramic Center */}
            <ellipse cx="60" cy="40" rx="26" ry="7" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
            <ellipse cx="60" cy="40" rx="14" ry="4" fill="#cbd5e1" opacity="0.8" />
            {/* Three Cast Iron Legs */}
            <line x1="28" y1="44" x2="16" y2="108" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="60" y1="48" x2="60" y2="106" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="92" y1="44" x2="104" y2="108" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        )}

        {/* 3. DIGITAL BALANCE */}
        {(type === 'balance') && (
          <g>
            {/* Balance Body */}
            <rect x="20" y="55" width="80" height="50" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            {/* Stainless Steel Weighing Pan */}
            <ellipse cx="60" cy="54" rx="34" ry="8" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="2" />
            {/* Digital LED Display Screen */}
            <rect x="35" y="72" width="50" height="18" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.2" />
            <text x="60" y="85" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {readout || '0.00 g'}
            </text>
            {/* Tare & Power Buttons */}
            <circle cx="36" cy="98" r="3" fill="#ef4444" />
            <circle cx="84" cy="98" r="3" fill="#22c55e" />
          </g>
        )}

        {/* 4. DIGITAL THERMOMETER */}
        {type === 'thermometer' && (
          <g>
            {/* Metal Stem */}
            <rect x="58" y="25" width="4" height="85" rx="2" fill="url(#metalGrad)" stroke="#475569" strokeWidth="1" />
            {/* Probe Sensor Tip */}
            <rect x="57" y="104" width="6" height="8" rx="2" fill="#0ea5e9" />
            {/* Top Digital Readout Head */}
            <rect x="42" y="10" width="36" height="24" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="46" y="15" width="28" height="14" rx="2" fill="#0f172a" />
            <text x="60" y="25" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {readout || '24.8°C'}
            </text>
          </g>
        )}

        {/* 5. DIGITAL PH METER */}
        {type === 'ph_meter' && (
          <g>
            {/* Electrode Stem */}
            <rect x="57" y="35" width="6" height="70" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            {/* Glass Bulb Tip */}
            <circle cx="60" cy="108" r="5" fill="#67e8f9" opacity="0.8" stroke="#38bdf8" strokeWidth="1" />
            {/* Handheld Meter Case */}
            <rect x="44" y="8" width="32" height="32" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <rect x="48" y="12" width="24" height="16" rx="2" fill="#0f172a" />
            <text x="60" y="24" fill="#a7f3d0" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {readout || 'pH 7.0'}
            </text>
          </g>
        )}

        {/* 6. GLASS DROPPER / PIPETTE */}
        {type === 'dropper' && (
          <g>
            {/* Rubber Bulb Teat */}
            <path d="M 52 10 Q 60 5 68 10 L 66 28 L 54 28 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
            {/* Glass Capillary Body */}
            <path d="M 55 28 L 55 85 L 59 105 L 61 105 L 65 85 L 65 28 Z" fill="#e0f2fe" fillOpacity="0.4" stroke="#7dd3fc" strokeWidth="1.5" />
            {/* Hanging droplet */}
            <circle cx="60" cy="112" r="3" fill="#38bdf8" opacity="0.9">
              <animate attributeName="cy" values="108;116;108" dur="1s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* 7. CHEMICAL SPATULA */}
        {type === 'spatula' && (
          <g>
            {/* Flat Stainless Handle */}
            <path d="M 35 20 L 75 90 L 78 88 L 38 18 Z" fill="url(#metalGrad)" stroke="#475569" strokeWidth="1" />
            {/* Spoon / Scoop Head */}
            <ellipse cx="82" cy="98" rx="8" ry="12" transform="rotate(-35 82 98)" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="1.5" />
            {/* Powder in spoon */}
            <circle cx="82" cy="98" r="4" fill="#e2e8f0" />
          </g>
        )}

        {/* 8. GLASS STIRRING ROD */}
        {type === 'stirring_rod' && (
          <g>
            <line x1="35" y1="15" x2="85" y2="105" stroke="#bae6fd" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.75" />
            <line x1="36" y1="16" x2="84" y2="104" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
          </g>
        )}

        {/* 9. DELIVERY TUBE & STOPPER */}
        {type === 'delivery_tube' && (
          <g>
            {/* Rubber Stopper Bung */}
            <polygon points="48,32 72,32 68,48 52,48" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
            {/* Bent Glass Delivery Tube */}
            <path
              d="M 60 55 L 60 20 Q 60 12 70 12 L 95 12 Q 105 12 105 24 L 105 95"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 60 55 L 60 20 Q 60 12 70 12 L 95 12 Q 105 12 105 24 L 105 95"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

/**
 * Solid Chemical Reagent Bottle / Powder Visualizer
 */
export function SolidChemicalGraphic({ chemical, width = 110, height = 110 }) {
  const color = chemical?.color || '#aebbc4';
  return (
    <div style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <defs>
          <filter id="reagentGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>
        <g filter="url(#reagentGlow)">
          {/* Amber Glass Chemical Bottle */}
          <rect x="35" y="42" width="50" height="62" rx="6" fill="#3b2b1a" stroke="#684724" strokeWidth="2" />
          {/* Screw Cap */}
          <rect x="44" y="24" width="32" height="18" rx="3" fill="#181b20" stroke="#333a42" strokeWidth="1.5" />
          <line x1="48" y1="28" x2="48" y2="38" stroke="#4a5568" strokeWidth="1" />
          <line x1="56" y1="28" x2="56" y2="38" stroke="#4a5568" strokeWidth="1" />
          <line x1="64" y1="28" x2="64" y2="38" stroke="#4a5568" strokeWidth="1" />
          <line x1="72" y1="28" x2="72" y2="38" stroke="#4a5568" strokeWidth="1" />

          {/* Solid Chemical Powder / Granules Visible Inside */}
          <path d="M 37 75 Q 60 70 83 75 L 83 100 Q 83 102 81 102 L 39 102 Q 37 102 37 100 Z" fill={color} opacity="0.9" />

          {/* Chemical Label on Jar */}
          <rect x="40" y="52" width="40" height="26" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <text x="60" y="64" fill="#0f172a" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            {chemical?.formula || 'Solid'}
          </text>
          <text x="60" y="73" fill="#64748b" fontSize="5.5" fontFamily="sans-serif" textAnchor="middle">
            {chemical?.state === 'solid' ? 'SOLID' : 'REAGENT'}
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Liquid Chemical Dropper Reagent Bottle
 */
export function LiquidChemicalGraphic({ chemical, width = 110, height = 110 }) {
  const liquidColor = chemical?.color || '#58aee8';
  return (
    <div style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <defs>
          <filter id="liqGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>
        <g filter="url(#liqGlow)">
          {/* Clear Glass Dropper Bottle */}
          <rect x="36" y="44" width="48" height="60" rx="6" fill="#e0f2fe" fillOpacity="0.25" stroke="#7dd3fc" strokeWidth="1.8" />
          {/* Liquid level */}
          <rect x="38" y="62" width="44" height="40" rx="3" fill={liquidColor} opacity="0.82" />
          <ellipse cx="60" cy="62" rx="22" ry="3" fill={liquidColor} stroke="#ffffff" strokeWidth="0.8" />

          {/* Dropper Pipette Pip Top */}
          <path d="M 52 14 Q 60 8 68 14 L 66 30 L 54 30 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.2" />
          <rect x="46" y="30" width="28" height="14" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />

          {/* Label */}
          <rect x="41" y="68" width="38" height="24" rx="2" fill="#ffffff" opacity="0.95" />
          <text x="60" y="79" fill="#0f172a" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            {chemical?.formula || 'Solution'}
          </text>
          <text x="60" y="87" fill="#0284c7" fontSize="5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            AQUEOUS
          </text>
        </g>
      </svg>
    </div>
  );
}
