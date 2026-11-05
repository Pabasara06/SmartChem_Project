import React from 'react';

/**
 * High-Fidelity SVG Visualizations for Laboratory Glassware
 */
export function GlassVesselGraphic({
  type = 'beaker_250',
  liquidLevel = 0, // 0 to 1
  liquidColor = '#58aee8',
  solidContent = null, // { color: string, type: string }
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
  const hasGas = reaction?.effects?.includes('gas') || reaction?.gasProduced;
  const hasSmoke = reaction?.effects?.includes('smoke');
  const hasFire = reaction?.effects?.includes('fire') || reaction?.effects?.includes('sparks');

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
          <linearGradient id="glassSpecular" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="15%" stopColor="#d2eaf5" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#a5cde3" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e6f5ff" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#c0e2f5" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#e6f5ff" stopOpacity="0.28" />
          </linearGradient>

          <linearGradient id="amberGlassBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#78350f" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#92400e" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#451a03" stopOpacity="0.9" />
          </linearGradient>

          <filter id="glassGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#08101a" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* --- 1. BEAKER (100mL or 250mL) --- */}
        {(type === 'beaker_100' || type === 'beaker_250' || type === 'beaker') && (
          <g filter="url(#glassGlow)">
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

            {hasPrecipitate && (
              <path
                d="M 30 98 Q 60 93 90 98 Q 88 104 80 105 L 40 105 Q 32 104 30 98 Z"
                fill={reaction?.precipitate_color || '#ffd700'}
                opacity="0.9"
              />
            )}

            {solidContent && (
              <path
                d="M 36 102 Q 60 90 84 102 L 78 104 L 42 104 Z"
                fill={solidContent.color || '#9ba7af'}
                opacity="0.95"
              />
            )}

            <path
              d="M 23 20 L 28 24 L 28 98 Q 28 106 36 106 L 84 106 Q 92 106 92 98 L 92 24 L 97 20"
              fill="url(#glassBody)"
              stroke="#dff4ff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <ellipse cx="60" cy="24" rx="32" ry="4.5" fill="none" stroke="#eef8ff" strokeWidth="1.8" />
            <line x1="32" y1="42" x2="44" y2="42" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.75" />
            <line x1="32" y1="58" x2="40" y2="58" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="32" y1="74" x2="44" y2="74" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.75" />
            <line x1="32" y1="90" x2="40" y2="90" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
            <text x="50" y="44" fill="#ffffff" fillOpacity="0.6" fontSize="6" fontFamily="sans-serif">
              {type === 'beaker_100' ? '100mL' : '250mL'}
            </text>
            <path d="M 31 28 L 31 98" stroke="url(#glassSpecular)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 89 28 L 89 98" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
          </g>
        )}

        {/* --- 2. ROUND BOTTOMED FLASK --- */}
        {(type === 'round_flask' || type === 'flask_round') && (
          <g filter="url(#glassGlow)">
            {hasLiquid && (
              <g>
                <circle cx="60" cy="74" r={34 * Math.min(1, Math.max(0.4, liquidLevel))} fill={liquidColor} opacity="0.82" />
                <ellipse cx="60" cy={74 - 30 * liquidLevel} rx="26" ry="4" fill={liquidColor} stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.6" />
              </g>
            )}
            <circle cx="60" cy="74" r="35" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="2.2" />
            <path d="M 52 14 L 52 45 M 68 14 L 68 45" stroke="#dff4ff" strokeWidth="2.2" fill="none" />
            <ellipse cx="60" cy="14" rx="9" ry="2.5" fill="#eaf6ff" fillOpacity="0.2" stroke="#eef8ff" strokeWidth="1.8" />
            <path d="M 36 60 A 30 30 0 0 1 54 44" stroke="url(#glassSpecular)" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* --- 3. CONICAL FLASK (Erlenmeyer) --- */}
        {(type === 'conical_flask' || type === 'flask_conical' || type === 'flask') && (
          <g filter="url(#glassGlow)">
            {hasLiquid && (
              <g>
                <polygon
                  points={`
                    ${60 - (12 + liquidLevel * 25)},${102 - liquidLevel * 64}
                    ${60 + (12 + liquidLevel * 25)},${102 - liquidLevel * 64}
                    88,102 32,102
                  `}
                  fill={liquidColor}
                  opacity="0.82"
                />
                <ellipse
                  cx="60"
                  cy={102 - liquidLevel * 64}
                  rx={12 + liquidLevel * 25}
                  ry="3.5"
                  fill={liquidColor}
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  strokeOpacity="0.6"
                />
              </g>
            )}
            {hasPrecipitate && (
              <ellipse cx="60" cy="101" rx="26" ry="3.5" fill={reaction?.precipitate_color || '#ffd700'} opacity="0.9" />
            )}
            <path
              d="M 51 14 L 51 34 L 28 100 Q 28 106 36 106 L 84 106 Q 92 106 92 100 L 69 34 L 69 14 Z"
              fill="url(#glassBody)"
              stroke="#dff4ff"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <ellipse cx="60" cy="14" rx="10" ry="2.8" fill="#eaf6ff" fillOpacity="0.2" stroke="#eef8ff" strokeWidth="1.8" />
            <line x1="42" y1="84" x2="52" y2="84" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.75" />
            <line x1="46" y1="68" x2="54" y2="68" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="50" y1="52" x2="56" y2="52" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="33" y1="96" x2="52" y2="40" stroke="url(#glassSpecular)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* --- 4. SEPARATORY FUNNEL --- */}
        {(type === 'separatory_funnel' || type === 'separatory') && (
          <g filter="url(#glassGlow)">
            {hasLiquid && (
              <path d="M 38 48 C 38 72 56 82 58 88 L 62 88 C 64 82 82 72 82 48 Z" fill={liquidColor} opacity="0.82" />
            )}
            <path
              d="M 53 14 L 53 25 C 40 28 36 40 36 50 C 36 72 57 84 57 90 L 57 108 L 63 108 L 63 90 C 63 84 84 72 84 50 C 84 40 80 28 67 25 L 67 14 Z"
              fill="url(#glassBody)"
              stroke="#dff4ff"
              strokeWidth="2.2"
            />
            <ellipse cx="60" cy="14" rx="8" ry="2.5" fill="#dff4ff" stroke="#eef8ff" strokeWidth="1.5" />
            <rect x="52" y="93" width="16" height="5" rx="1" fill="#38bdf8" />
            <circle cx="60" cy="95.5" r="3" fill="#0f172a" />
          </g>
        )}

        {/* --- 5. TEST TUBES (Small, Large, Side Arm) --- */}
        {(type === 'small_test_tube' || type === 'large_test_tube' || type === 'side_arm_tube' ||
          type === 'testtube_small' || type === 'testtube_large' || type === 'testtube_sidearm' || type === 'test_tube') && (
          <g filter="url(#glassGlow)">
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

            {hasPrecipitate && (
              <path
                d={`M ${type === 'large_test_tube' ? 45 : 49} 98 
                    A ${type === 'large_test_tube' ? 15 : 11} ${type === 'large_test_tube' ? 10 : 8} 0 0 0 ${type === 'large_test_tube' ? 75 : 71} 98 Z`}
                fill={reaction?.precipitate_color || '#ffd700'}
                opacity="0.95"
              />
            )}

            {solidContent && (
              <ellipse
                cx="60"
                cy="100"
                rx={type === 'large_test_tube' ? 12 : 9}
                ry="4"
                fill={solidContent.color || '#9ba7af'}
              />
            )}

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

            {(type === 'side_arm_tube' || type === 'testtube_sidearm') && (
              <g>
                <path d="M 72 32 L 94 22 L 96 26 L 73 38" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="1.8" />
                <ellipse cx="95" cy="24" rx="2" ry="2.5" fill="#dff4ff" stroke="#ffffff" strokeWidth="1" />
              </g>
            )}

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

        {/* --- 6. MEASURING CYLINDER --- */}
        {(type === 'measuring_cylinder') && (
          <g filter="url(#glassGlow)">
            {/* Hexagonal base */}
            <polygon points="35,108 85,108 92,114 85,116 35,116 28,114" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
            {hasLiquid && (
              <g>
                <rect x="44" y={106 - liquidLevel * 80} width="32" height={liquidLevel * 80} fill={liquidColor} opacity="0.82" />
                <ellipse cx="60" cy={106 - liquidLevel * 80} rx="16" ry="2.5" fill={liquidColor} stroke="#ffffff" strokeWidth="0.8" />
              </g>
            )}
            {/* Tall cylinder body */}
            <rect x="43" y="24" width="34" height="84" rx="2" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="2" />
            {/* Spout at rim */}
            <path d="M 41 24 L 35 20 L 43 24" fill="none" stroke="#dff4ff" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="60" cy="24" rx="17" ry="3" fill="#eaf6ff" fillOpacity="0.2" stroke="#eef8ff" strokeWidth="1.6" />
            {/* Calibration graduations */}
            {[34, 44, 54, 64, 74, 84, 94].map((y, i) => (
              <g key={y}>
                <line x1="45" y1={y} x2={i % 2 === 0 ? "55" : "50"} y2={y} stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.8" />
                {i % 2 === 0 && (
                  <text x="58" y={y + 2.5} fill="#ffffff" fillOpacity="0.75" fontSize="4.5" fontFamily="monospace">
                    {(7 - i) * 10}
                  </text>
                )}
              </g>
            ))}
            <line x1="46" y1="28" x2="46" y2="102" stroke="url(#glassSpecular)" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {/* --- 7. VOLUMETRIC FLASK --- */}
        {(type === 'volumetric_flask') && (
          <g filter="url(#glassGlow)">
            {hasLiquid && (
              <g>
                <path
                  d={`M 34 88 C 34 68 52 58 56 46 L 64 46 C 68 58 86 68 86 88 Q 86 104 60 104 Q 34 104 34 88 Z`}
                  fill={liquidColor}
                  opacity="0.84"
                />
                <ellipse cx="60" cy={liquidLevel > 0.7 ? 40 : 100 - liquidLevel * 60} rx={liquidLevel > 0.7 ? 5 : 22} ry="2.5" fill={liquidColor} stroke="#ffffff" strokeWidth="0.8" />
              </g>
            )}
            {/* Pear-shaped flask body & long neck */}
            <path
              d="M 55 16 L 55 52 C 40 60 32 72 32 88 Q 32 106 60 106 Q 88 106 88 88 C 88 72 80 60 65 52 L 65 16 Z"
              fill="url(#glassBody)"
              stroke="#dff4ff"
              strokeWidth="2.2"
            />
            {/* Ground glass rim and etched ring mark */}
            <ellipse cx="60" cy="16" rx="6.5" ry="2" fill="#dff4ff" stroke="#eef8ff" strokeWidth="1.6" />
            <line x1="55" y1="38" x2="65" y2="38" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="1.5 1" />
            <text x="60" y="78" fill="#ffffff" fillOpacity="0.65" fontSize="5.5" fontFamily="sans-serif" textAnchor="middle">
              250mL
            </text>
            {/* Ground glass stopper */}
            <polygon points="56,6 64,6 62,14 58,14" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.2" />
            <ellipse cx="60" cy="6" rx="5" ry="2" fill="#94a3b8" />
          </g>
        )}

        {/* --- 8. REAGENT BOTTLE --- */}
        {(type === 'reagent_bottle') && (
          <g filter="url(#glassGlow)">
            {/* Amber or Clear Heavy Glass Bottle */}
            <rect x="36" y="38" width="48" height="66" rx="6" fill="url(#amberGlassBody)" stroke="#78350f" strokeWidth="2.2" />
            {hasLiquid && (
              <rect x="38" y={102 - liquidLevel * 58} width="44" height={liquidLevel * 58} rx="3" fill={liquidColor} opacity="0.85" />
            )}
            {/* Heavy octagonal glass stopper */}
            <rect x="52" y="24" width="16" height="15" fill="#5c2c06" stroke="#451a03" strokeWidth="1.5" />
            <polygon points="50,14 70,14 74,24 46,24" fill="#92400e" stroke="#5c2c06" strokeWidth="1.5" />
            {/* Chemical Label */}
            <rect x="42" y="54" width="36" height="28" rx="2" fill="#fffbeb" stroke="#d97706" strokeWidth="1" />
            <text x="60" y="66" fill="#78350f" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              REAGENT
            </text>
            <text x="60" y="75" fill="#92400e" fontSize="5" fontFamily="monospace" textAnchor="middle">
              BOTTLE
            </text>
            <line x1="39" y1="42" x2="39" y2="98" stroke="#fcd34d" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
          </g>
        )}

        {/* --- 9. FILTER FLASK (Büchner Flask) --- */}
        {(type === 'filter_flask') && (
          <g filter="url(#glassGlow)">
            {hasLiquid && (
              <polygon
                points={`
                  ${60 - (14 + liquidLevel * 23)},${102 - liquidLevel * 60}
                  ${60 + (14 + liquidLevel * 23)},${102 - liquidLevel * 60}
                  88,102 32,102
                `}
                fill={liquidColor}
                opacity="0.82"
              />
            )}
            {/* Heavy-wall Erlenmeyer with side tubulation */}
            <path
              d="M 50 16 L 50 34 L 28 98 Q 28 106 36 106 L 84 106 Q 92 106 92 98 L 70 34 L 70 16 Z"
              fill="url(#glassBody)"
              stroke="#dff4ff"
              strokeWidth="2.5"
            />
            {/* Side-arm vacuum tubulation */}
            <path d="M 68 32 L 88 26 L 89 31 L 69 37" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="1.8" />
            <ellipse cx="88" cy="28.5" rx="2" ry="3" fill="#dff4ff" stroke="#ffffff" strokeWidth="1" />
            <ellipse cx="60" cy="16" rx="11" ry="3" fill="#eaf6ff" fillOpacity="0.3" stroke="#eef8ff" strokeWidth="2" />
          </g>
        )}

        {/* --- 10. DESICCATOR --- */}
        {(type === 'desiccator') && (
          <g filter="url(#glassGlow)">
            {/* Bottom bowl chamber */}
            <path d="M 24 64 Q 24 104 60 104 Q 96 104 96 64 Z" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="2.4" />
            {/* Heavy domed lid */}
            <path d="M 22 62 Q 22 30 60 30 Q 98 30 98 62 Z" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="2.4" />
            {/* Flanged ground glass rim */}
            <rect x="20" y="60" width="80" height="6" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Top glass knob handle */}
            <circle cx="60" cy="22" r="8" fill="#dff4ff" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Internal perforated porcelain plate */}
            <line x1="30" y1="78" x2="90" y2="78" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="4 3" />
            {/* Desiccant silica gel beads in bottom */}
            {[38, 46, 54, 62, 70, 78, 82].map((cx, i) => (
              <circle key={i} cx={cx} cy="94" r="3.2" fill={i % 2 === 0 ? '#38bdf8' : '#cbd5e1'} opacity="0.85" />
            ))}
          </g>
        )}

        {/* --- 11. GAS JAR --- */}
        {type === 'gas_jar' && (
          <g filter="url(#glassGlow)">
            {hasLiquid && (
              <rect x="36" y={100 - liquidLevel * 60} width="48" height={liquidLevel * 60} fill={liquidColor} opacity="0.75" />
            )}
            <rect x="35" y="24" width="50" height="80" rx="3" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="2.2" />
            <ellipse cx="60" cy="24" rx="26" ry="4" fill="#e2f3fc" stroke="#ffffff" strokeWidth="2" />
            <ellipse cx="60" cy="104" rx="28" ry="4.5" fill="#cce8f8" stroke="#dff4ff" strokeWidth="2" />
            <line x1="39" y1="28" x2="39" y2="100" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.6" />
          </g>
        )}

        {/* --- 12. GAS CYLINDER (Multi-Chamber) --- */}
        {type === 'gas_cylinder' && (
          <g filter="url(#glassGlow)">
            <rect x="25" y="30" width="20" height="74" rx="3" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="1.8" />
            <rect x="50" y="24" width="20" height="80" rx="3" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="1.8" />
            <rect x="75" y="30" width="20" height="74" rx="3" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="1.8" />
            <line x1="28" y1="45" x2="42" y2="45" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="28" y1="60" x2="42" y2="60" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="53" y1="40" x2="67" y2="40" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="53" y1="55" x2="67" y2="55" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="78" y1="45" x2="92" y2="45" stroke="#ff4757" strokeWidth="1.5" />
            <line x1="78" y1="60" x2="92" y2="60" stroke="#ff4757" strokeWidth="1.5" />
            <path d="M 45 48 L 50 48 M 70 48 L 75 48" stroke="#dff4ff" strokeWidth="2.5" />
            <ellipse cx="60" cy="24" rx="8" ry="2.5" fill="#dff4ff" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        )}

        {/* --- 13. WATCH GLASS --- */}
        {type === 'watch_glass' && (
          <g filter="url(#glassGlow)">
            <path d="M 20 80 Q 60 102 100 80" fill="url(#glassBody)" stroke="#dff4ff" strokeWidth="2.4" />
            <path d="M 20 80 Q 60 88 100 80" fill="url(#glassBody)" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
            {solidContent && (
              <ellipse cx="60" cy="85" rx="22" ry="6" fill={solidContent.color || '#e4c83c'} opacity="0.95" />
            )}
            <line x1="28" y1="84" x2="55" y2="92" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.7" strokeLinecap="round" />
          </g>
        )}

        {/* --- 14. CRUCIBLE & EVAPORATING DISH --- */}
        {(type === 'crucible' || type === 'evaporating_dish') && (
          <g filter="url(#glassGlow)">
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
            {solidContent && (
              <ellipse
                cx="60"
                cy={82}
                rx={type === 'crucible' ? 14 : 22}
                ry="5"
                fill={solidContent.color || '#6f4a35'}
              />
            )}
          </g>
        )}

        {/* --- DYNAMIC PARTICLES DURING REACTION --- */}
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
          </g>
        )}

        {hasGas && (
          <g className="gas-release-visual">
            <path d="M 48 30 C 42 21 55 18 51 9" fill="none" stroke="#d9f6ff" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="0;-18" dur="0.8s" repeatCount="indefinite" />
            </path>
            <path d="M 67 31 C 74 22 63 17 70 7" fill="none" stroke="#d9f6ff" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="0;-18" dur="0.9s" repeatCount="indefinite" />
            </path>
            <text x="60" y="6" textAnchor="middle" fill="#d9f6ff" fontSize="5.5" fontFamily="monospace" fontWeight="bold">
              {reaction.gasProduced || 'GAS'}
            </text>
          </g>
        )}

        {hasSmoke && (
          <g className="smoke-visual" opacity="0.7">
            <circle cx="51" cy="21" r="5" fill="#c6d0d8">
              <animate attributeName="cy" values="25;8" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.65;0" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="68" cy="19" r="4" fill="#aebbc5">
              <animate attributeName="cy" values="24;6" dur="1.3s" repeatCount="indefinite" begin="0.3s" />
              <animate attributeName="opacity" values="0.6;0" dur="1.3s" repeatCount="indefinite" begin="0.3s" />
            </circle>
          </g>
        )}

        {hasFire && (
          <g className="reaction-fire-visual">
            <path d="M 52 35 C 43 27 57 23 57 14 C 66 23 72 29 65 37 C 63 42 54 42 52 35 Z" fill="#ff8a24">
              <animateTransform attributeName="transform" type="scale" values="1 1;1.08 1.12;1 1" dur="0.45s" repeatCount="indefinite" additive="sum" />
            </path>
            <path d="M 57 34 C 53 29 60 26 60 21 C 65 27 66 31 63 35 C 61 38 58 37 57 34 Z" fill="#ffe45c" />
          </g>
        )}

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
 * Functional Laboratory Tools & Instruments SVG Renderers
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
            <path d="M 32 108 L 40 96 L 80 96 L 88 108 Z" fill="#2d3748" stroke="#1a202c" strokeWidth="2" />
            <path d="M 75 99 L 105 102 L 105 106 L 75 103 Z" fill="url(#metalGrad)" stroke="#4a5568" strokeWidth="1" />
            <rect x="52" y="86" width="16" height="10" rx="1" fill="#4a5568" stroke="#2d3748" strokeWidth="1" />
            <circle cx="60" cy="91" r="2.5" fill="#1a202c" />
            <rect x="54" y="45" width="12" height="42" fill="url(#metalGrad)" stroke="#4a5568" strokeWidth="1.5" />
            <rect x="53" y="41" width="14" height="5" rx="1" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />

            {isActive && (
              <g className="burner-flame">
                <path
                  d="M 60 8 C 50 20 44 32 52 41 L 68 41 C 76 32 70 20 60 8 Z"
                  fill="url(#flameOuter)"
                  opacity="0.9"
                >
                  <animate attributeName="d" values="M 60 8 C 50 20 44 32 52 41 L 68 41 C 76 32 70 20 60 8 Z; M 60 4 C 48 18 46 30 52 41 L 68 41 C 74 30 72 18 60 4 Z; M 60 8 C 50 20 44 32 52 41 L 68 41 C 76 32 70 20 60 8 Z" dur="0.25s" repeatCount="indefinite" />
                </path>
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

        {/* 2. DIGITAL CERAMIC HOT PLATE */}
        {type === 'hot_plate' && (
          <g>
            <rect x="20" y="62" width="80" height="44" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <rect x="24" y="52" width="72" height="12" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {isActive && (
              <circle cx="60" cy="58" r="18" fill="#ef4444" opacity="0.35">
                <animate attributeName="opacity" values="0.25;0.5;0.25" dur="1s" repeatCount="indefinite" />
              </circle>
            )}
            <rect x="30" y="74" width="28" height="14" rx="2" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1" />
            <text x="44" y="84" fill="#38bdf8" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {isActive ? '85.0°C' : 'OFF'}
            </text>
            <circle cx="70" cy="81" r="5" fill="#475569" stroke="#64748b" strokeWidth="1" />
            <circle cx="85" cy="81" r="5" fill="#475569" stroke="#64748b" strokeWidth="1" />
            <circle cx="28" cy="98" r="2.5" fill={isActive ? '#22c55e' : '#64748b'} />
          </g>
        )}

        {/* 3. TRIPOD & WIRE GAUZE */}
        {type === 'tripod' && (
          <g>
            <ellipse cx="60" cy="40" rx="36" ry="10" fill="#334155" stroke="#1e293b" strokeWidth="3" />
            <ellipse cx="60" cy="40" rx="26" ry="7" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
            <ellipse cx="60" cy="40" rx="14" ry="4" fill="#cbd5e1" opacity="0.8" />
            <line x1="28" y1="44" x2="16" y2="108" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="60" y1="48" x2="60" y2="106" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="92" y1="44" x2="104" y2="108" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        )}

        {/* 4. WIRE GAUZE */}
        {type === 'wire_gauze' && (
          <g>
            <rect x="25" y="40" width="70" height="40" rx="2" fill="#334155" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="60" cy="60" r="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="60" y="63" fill="#64748b" fontSize="5" fontFamily="sans-serif" textAnchor="middle">CERAMIC</text>
          </g>
        )}

        {/* 5. DIGITAL BALANCE */}
        {type === 'balance' && (
          <g>
            <rect x="20" y="55" width="80" height="50" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <ellipse cx="60" cy="54" rx="34" ry="8" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="2" />
            <rect x="35" y="72" width="50" height="18" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.2" />
            <text x="60" y="85" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {readout || '0.00 g'}
            </text>
            <circle cx="36" cy="98" r="3" fill="#ef4444" />
            <circle cx="84" cy="98" r="3" fill="#22c55e" />
          </g>
        )}

        {/* 6. DIGITAL THERMOMETER */}
        {type === 'thermometer' && (
          <g>
            <rect x="58" y="25" width="4" height="85" rx="2" fill="url(#metalGrad)" stroke="#475569" strokeWidth="1" />
            <rect x="57" y="104" width="6" height="8" rx="2" fill="#0ea5e9" />
            <rect x="42" y="10" width="36" height="24" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="46" y="15" width="28" height="14" rx="2" fill="#0f172a" />
            <text x="60" y="25" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {readout || '25.0°C'}
            </text>
          </g>
        )}

        {/* 7. DIGITAL PH METER */}
        {type === 'ph_meter' && (
          <g>
            <rect x="57" y="35" width="6" height="70" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <circle cx="60" cy="108" r="5" fill="#67e8f9" opacity="0.8" stroke="#38bdf8" strokeWidth="1" />
            <rect x="44" y="8" width="32" height="32" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <rect x="48" y="12" width="24" height="16" rx="2" fill="#0f172a" />
            <text x="60" y="24" fill="#a7f3d0" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {readout || 'pH 7.0'}
            </text>
          </g>
        )}

        {/* 8. GLASS DROPPER / PIPETTE */}
        {type === 'dropper' && (
          <g>
            <path d="M 52 10 Q 60 5 68 10 L 66 28 L 54 28 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
            <path d="M 55 28 L 55 85 L 59 105 L 61 105 L 65 85 L 65 28 Z" fill="#e0f2fe" fillOpacity="0.4" stroke="#7dd3fc" strokeWidth="1.5" />
            <circle cx="60" cy="112" r="3" fill="#38bdf8" opacity="0.9">
              <animate attributeName="cy" values="108;116;108" dur="1s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* 9. CHEMICAL SPATULA */}
        {type === 'spatula' && (
          <g>
            <path d="M 35 20 L 75 90 L 78 88 L 38 18 Z" fill="url(#metalGrad)" stroke="#475569" strokeWidth="1" />
            <ellipse cx="82" cy="98" rx="8" ry="12" transform="rotate(-35 82 98)" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="82" cy="98" r="4" fill="#e2e8f0" />
          </g>
        )}

        {/* 10. GLASS STIRRING ROD */}
        {type === 'stirring_rod' && (
          <g>
            <line x1="35" y1="15" x2="85" y2="105" stroke="#bae6fd" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.75" />
            <line x1="36" y1="16" x2="84" y2="104" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
          </g>
        )}

        {/* 11. CRUCIBLE TONGS */}
        {type === 'tongs' && (
          <g>
            <path d="M 38 98 C 42 75 52 60 60 52 L 48 24 C 44 26 40 32 44 38" fill="none" stroke="url(#metalGrad)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 82 98 C 78 75 68 60 60 52 L 72 24 C 76 26 80 32 76 38" fill="none" stroke="url(#metalGrad)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="52" r="3.5" fill="#334155" />
            <circle cx="36" cy="102" r="6" fill="none" stroke="url(#metalGrad)" strokeWidth="2.5" />
            <circle cx="84" cy="102" r="6" fill="none" stroke="url(#metalGrad)" strokeWidth="2.5" />
          </g>
        )}

        {/* 12. FORCEPS / TWEEZERS */}
        {type === 'forceps' && (
          <g>
            <polygon points="56,12 64,12 66,22 54,22" fill="#334155" />
            <path d="M 57 22 L 54 85 L 59 108" fill="none" stroke="url(#metalGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 63 22 L 66 85 L 61 108" fill="none" stroke="url(#metalGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="53" y1="52" x2="57" y2="52" stroke="#475569" strokeWidth="1" />
            <line x1="63" y1="52" x2="67" y2="52" stroke="#475569" strokeWidth="1" />
          </g>
        )}

        {/* 13. MORTAR AND PESTLE */}
        {type === 'mortar_pestle' && (
          <g>
            <path d="M 25 55 Q 25 102 60 102 Q 95 102 95 55 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2.2" />
            <ellipse cx="60" cy="55" rx="35" ry="9" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
            <ellipse cx="60" cy="85" rx="18" ry="6" fill="#cbd5e1" opacity="0.8" />
            {/* Pestle rod */}
            <path d="M 78 22 L 56 80 L 64 84 L 86 26 Z" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="82" cy="24" r="6" fill="#94a3b8" />
          </g>
        )}

        {/* 14. WASH BOTTLE */}
        {type === 'wash_bottle' && (
          <g>
            <rect x="38" y="44" width="44" height="64" rx="8" fill="#e0f2fe" fillOpacity="0.45" stroke="#38bdf8" strokeWidth="1.8" />
            <rect x="48" y="32" width="24" height="12" rx="2" fill="#0284c7" stroke="#0369a1" strokeWidth="1.2" />
            {/* Swan-neck dispensing tube */}
            <path d="M 60 32 L 60 16 Q 60 8 72 8 L 88 14 L 92 18" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            <text x="60" y="78" fill="#0284c7" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">H₂O</text>
          </g>
        )}

        {/* 15. BURETTE */}
        {type === 'burette' && (
          <g>
            <rect x="56" y="10" width="8" height="85" fill="#e0f2fe" fillOpacity="0.3" stroke="#7dd3fc" strokeWidth="1.4" />
            {[20, 30, 40, 50, 60, 70, 80].map((y) => (
              <line key={y} x1="56" y1={y} x2="60" y2={y} stroke="#ffffff" strokeWidth="1" />
            ))}
            {/* Stopcock */}
            <rect x="52" y="92" width="16" height="6" rx="1" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            <path d="M 59 98 L 60 112 L 61 98 Z" fill="#7dd3fc" stroke="#38bdf8" strokeWidth="1" />
          </g>
        )}

        {/* 16. FUNNEL & FILTER FUNNEL */}
        {(type === 'funnel' || type === 'filter_funnel') && (
          <g>
            <polygon points="30,28 90,28 64,68 56,68" fill="#e0f2fe" fillOpacity="0.35" stroke="#7dd3fc" strokeWidth="2" />
            <ellipse cx="60" cy="28" rx="30" ry="5" fill="#e0f2fe" fillOpacity="0.2" stroke="#bae6fd" strokeWidth="1.5" />
            <rect x="57" y="68" width="6" height="42" fill="#e0f2fe" fillOpacity="0.4" stroke="#7dd3fc" strokeWidth="1.8" />
            <path d="M 57 110 L 63 104" stroke="#7dd3fc" strokeWidth="1.5" />
          </g>
        )}

        {/* 17. FILTER PAPER */}
        {type === 'filter_paper' && (
          <g>
            <circle cx="60" cy="60" r="38" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 2" />
            <line x1="22" y1="60" x2="98" y2="60" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="60" y1="22" x2="60" y2="98" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="60" y="52" fill="#94a3b8" fontSize="6" fontFamily="sans-serif" textAnchor="middle">FILTER</text>
            <text x="60" y="72" fill="#94a3b8" fontSize="6" fontFamily="sans-serif" textAnchor="middle">PAPER</text>
          </g>
        )}

        {/* 18. TEST TUBE RACK */}
        {type === 'test_tube_rack' && (
          <g>
            <rect x="18" y="48" width="84" height="8" rx="2" fill="#854d0e" stroke="#713f12" strokeWidth="1.5" />
            <rect x="18" y="94" width="84" height="12" rx="2" fill="#854d0e" stroke="#713f12" strokeWidth="1.5" />
            <rect x="18" y="52" width="8" height="46" fill="#a16207" />
            <rect x="94" y="52" width="8" height="46" fill="#a16207" />
            {/* 3 mini test tubes inside rack */}
            {[36, 60, 84].map((tx) => (
              <g key={tx}>
                <rect x={tx - 4} y="28" width="8" height="66" rx="4" fill="#e0f2fe" fillOpacity="0.4" stroke="#7dd3fc" strokeWidth="1.2" />
                <rect x={tx - 3} y="64" width="6" height="28" rx="3" fill="#38bdf8" opacity="0.65" />
              </g>
            ))}
          </g>
        )}

        {/* 19. RETORT STAND & CLAMP */}
        {type === 'stand' && (
          <g>
            <rect x="25" y="102" width="70" height="12" rx="2" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            <rect x="36" y="16" width="6" height="88" fill="url(#metalGrad)" stroke="#334155" strokeWidth="1.5" />
            {/* Clamp holding ring */}
            <rect x="33" y="44" width="12" height="8" rx="1" fill="#475569" />
            <line x1="42" y1="48" x2="68" y2="48" stroke="url(#metalGrad)" strokeWidth="3" />
            <circle cx="78" cy="48" r="12" fill="none" stroke="url(#metalGrad)" strokeWidth="2.5" />
          </g>
        )}

        {/* 20. PIPETTES (Measuring, Volumetric, Graduated) */}
        {(type === 'measuring_pipette' || type === 'volumetric_pipette' || type === 'graduated_pipette') && (
          <g>
            <rect x="57" y="14" width="6" height="96" rx="2" fill="#e0f2fe" fillOpacity="0.35" stroke="#7dd3fc" strokeWidth="1.4" />
            {type === 'volumetric_pipette' && (
              <ellipse cx="60" cy="55" rx="12" ry="16" fill="#e0f2fe" fillOpacity="0.4" stroke="#7dd3fc" strokeWidth="1.5" />
            )}
            <circle cx="60" cy="12" r="5" fill="#ef4444" />
            {[30, 40, 50, 70, 80].map((y) => (
              <line key={y} x1="57" y1={y} x2="60" y2={y} stroke="#ffffff" strokeWidth="1" />
            ))}
          </g>
        )}

        {/* 21. VACUUM FILTRATION APPARATUS */}
        {type === 'vacuum_filtration' && (
          <g>
            {/* Filter Flask */}
            <polygon points="52,50 68,50 84,104 36,104" fill="#e0f2fe" fillOpacity="0.35" stroke="#7dd3fc" strokeWidth="2" />
            <path d="M 66 58 L 82 54 L 83 58 L 67 62" fill="#7dd3fc" />
            {/* Buchner porcelain funnel on top */}
            <polygon points="42,20 78,20 66,45 54,45" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="56" y="45" width="8" height="12" fill="#334155" />
            <text x="60" y="32" fill="#64748b" fontSize="5" fontFamily="sans-serif" textAnchor="middle">BÜCHNER</text>
          </g>
        )}

        {/* 22. DELIVERY TUBE */}
        {type === 'delivery_tube' && (
          <g>
            <polygon points="48,32 72,32 68,48 52,48" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
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

        {/* Fallback for any unknown tool */}
        {![
          'burner', 'heater', 'hot_plate', 'tripod', 'wire_gauze', 'balance',
          'thermometer', 'ph_meter', 'dropper', 'spatula', 'stirring_rod',
          'tongs', 'forceps', 'mortar_pestle', 'wash_bottle', 'burette',
          'funnel', 'filter_funnel', 'filter_paper', 'test_tube_rack',
          'stand', 'measuring_pipette', 'volumetric_pipette', 'graduated_pipette',
          'vacuum_filtration', 'delivery_tube'
        ].includes(type) && (
          <g>
            <rect x="22" y="34" width="76" height="62" rx="10" fill="#1d344c" stroke="#8bb4ca" strokeWidth="2" />
            <path d="M 32 48 H 88 M 32 60 H 76 M 32 72 H 84" stroke="#bfe7f3" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            <circle cx="87" cy="82" r="7" fill="#62e5db" opacity={isActive ? '1' : '0.55'} />
            <text x="60" y="25" textAnchor="middle" fill="#dcefff" fontSize="7" fontFamily="monospace">
              LAB TOOL
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

export function HumanHandGraphic({ pose = 'hold', width = 72, height = 72 }) {
  const poseTransform = {
    pour: 'rotate(-28 48 48)',
    scoop: 'rotate(-22 48 48)',
    stir: 'rotate(18 48 48)',
    heat: 'rotate(-12 48 48)',
    measure: 'rotate(-8 48 48)',
    hold: 'rotate(0 48 48)'
  }[pose] || 'rotate(0 48 48)';

  return (
    <svg
      className={`human-hand human-hand-${pose}`}
      viewBox="0 0 96 96"
      width={width}
      height={height}
      aria-label={`Hand performing ${pose} action`}
      style={{ overflow: 'visible' }}
    >
      <g transform={poseTransform} filter="url(#handShadow)">
        <defs>
          <filter id="handShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#06111d" floodOpacity="0.5" />
          </filter>
          <linearGradient id="skinGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8c7a6" />
            <stop offset="55%" stopColor="#e9a47f" />
            <stop offset="100%" stopColor="#bd735d" />
          </linearGradient>
        </defs>
        <path
          d="M37 78 C27 73 23 64 26 55 L31 38 C32 34 37 34 39 38 L39 22 C39 18 45 18 46 22 L47 39 L48 16 C48 12 54 12 55 16 L56 40 L58 20 C58 16 64 16 65 20 L64 44 L68 29 C69 25 75 26 75 30 L72 53 C70 68 62 78 52 82 Z"
          fill="url(#skinGradient)"
          stroke="#9d5d51"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M40 43 C46 48 52 51 61 51" fill="none" stroke="#b86e5e" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        <path d="M34 59 C42 64 50 66 58 64" fill="none" stroke="#b86e5e" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
        <ellipse cx="46" cy="24" rx="2" ry="5" fill="#ffe0c5" opacity="0.55" />
      </g>
    </svg>
  );
}

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
          <rect x="35" y="42" width="50" height="62" rx="6" fill="#3b2b1a" stroke="#684724" strokeWidth="2" />
          <rect x="44" y="24" width="32" height="18" rx="3" fill="#181b20" stroke="#333a42" strokeWidth="1.5" />
          <line x1="48" y1="28" x2="48" y2="38" stroke="#4a5568" strokeWidth="1" />
          <line x1="56" y1="28" x2="56" y2="38" stroke="#4a5568" strokeWidth="1" />
          <line x1="64" y1="28" x2="64" y2="38" stroke="#4a5568" strokeWidth="1" />
          <line x1="72" y1="28" x2="72" y2="38" stroke="#4a5568" strokeWidth="1" />
          <path d="M 37 75 Q 60 70 83 75 L 83 100 Q 83 102 81 102 L 39 102 Q 37 102 37 100 Z" fill={color} opacity="0.9" />
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
          <rect x="36" y="44" width="48" height="60" rx="6" fill="#e0f2fe" fillOpacity="0.25" stroke="#7dd3fc" strokeWidth="1.8" />
          <rect x="38" y="62" width="44" height="40" rx="3" fill={liquidColor} opacity="0.82" />
          <ellipse cx="60" cy="62" rx="22" ry="3" fill={liquidColor} stroke="#ffffff" strokeWidth="0.8" />
          <path d="M 52 14 Q 60 8 68 14 L 66 30 L 54 30 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.2" />
          <rect x="46" y="30" width="28" height="14" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />
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

export function GasChemicalGraphic({ chemical, width = 110, height = 110 }) {
  const gasColor = chemical?.color || '#93c5fd';
  return (
    <div className="gas-chemical-graphic" style={{ width: `${width}px`, height: `${height}px` }}>
      <svg viewBox="0 0 120 120" width="100%" height="100%" aria-label={chemical?.name || 'Gas chemical'}>
        <defs>
          <radialGradient id={`gas-${chemical?.id || 'sample'}`} cx="50%" cy="45%" r="52%">
            <stop offset="0%" stopColor={gasColor} stopOpacity="0.62" />
            <stop offset="72%" stopColor={gasColor} stopOpacity="0.18" />
            <stop offset="100%" stopColor={gasColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="58" r="42" fill={`url(#gas-${chemical?.id || 'sample'})`} />
        <circle cx="42" cy="48" r="10" fill={gasColor} opacity="0.38">
          <animate attributeName="cy" values="58;40;58" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="72" cy="68" r="7" fill={gasColor} opacity="0.34">
          <animate attributeName="cy" values="76;52;76" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="82" cy="42" r="5" fill={gasColor} opacity="0.42">
          <animate attributeName="cy" values="50;30;50" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="60" y="106" textAnchor="middle" fill="#dcefff" fontSize="9" fontFamily="monospace" fontWeight="bold">
          {chemical?.formula || 'GAS'}
        </text>
      </svg>
    </div>
  );
}
