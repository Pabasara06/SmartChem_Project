from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Comprehensive Laboratory Chemical Reaction Simulation Knowledge Base
REACTION_RULES_BACKEND = [
    # 1. Lead(II) nitrate + Potassium iodide -> Lead(II) iodide (Golden Rain)
    {
        "id": "golden_rain",
        "reactants": [["lead_salt", "lead_nitrate_s", "lead_nitrate_aq"], ["iodide_sol", "potassium_iodide_s", "ki_aq"]],
        "status": "precipitation",
        "name": "Precipitation of Lead(II) Iodide (Golden Rain)",
        "equation": "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂↓ (yellow) + 2KNO₃(aq)",
        "message": "🟡 PRECIPITATION: Brilliant, glittering golden-yellow flakes of lead(II) iodide precipitated.",
        "color": "#ffe600",
        "after_color": "rgba(255, 215, 0, 0.88)",
        "precipitate_color": "#ffd700",
        "effects": ["precipitate", "settling_crystals"],
        "products": ["PbI₂ yellow precipitate", "KNO₃ solution"],
        "temperatureChange": 1.5,
        "deltaH": -24.5
    },
    # 2. Silver nitrate + Hydrochloric acid -> Silver chloride (Curdy white)
    {
        "id": "silver_chloride",
        "reactants": [["silver_salt", "agno3_aq"], ["strong_acid", "hcl"]],
        "status": "precipitation",
        "name": "Precipitation of Silver Chloride",
        "equation": "AgNO₃(aq) + HCl(aq) → AgCl↓ (curdy white) + HNO₃(aq)",
        "message": "⚪ PRECIPITATION: A dense, curdy milk-white precipitate of silver chloride formed instantaneously.",
        "color": "#ffffff",
        "after_color": "rgba(240, 245, 250, 0.85)",
        "precipitate_color": "#ffffff",
        "effects": ["precipitate", "dense_cloud"],
        "products": ["AgCl white precipitate", "HNO₃ solution"],
        "temperatureChange": 2.0,
        "deltaH": -65.7
    },
    # 3. Copper sulfate + Sodium hydroxide -> Copper(II) hydroxide (Gelatinous blue)
    {
        "id": "copper_hydroxide",
        "reactants": [["salt_solution", "cuso4_aq", "cuso4_s"], ["strong_base", "naoh"]],
        "status": "precipitation",
        "name": "Precipitation of Copper(II) Hydroxide",
        "equation": "CuSO₄(aq) + 2NaOH(aq) → Cu(OH)₂↓ (gelatinous blue) + Na₂SO₄(aq)",
        "message": "🔵 PRECIPITATION: Flocculent, gelatinous sky-blue copper(II) hydroxide precipitate formed.",
        "color": "#1e90ff",
        "after_color": "rgba(30, 144, 255, 0.82)",
        "precipitate_color": "#0070e0",
        "effects": ["precipitate", "bubbles"],
        "products": ["Cu(OH)₂ gelatinous precipitate", "Na₂SO₄ solution"],
        "temperatureChange": 4.2,
        "deltaH": -52.0
    },
    # 4. Barium chloride + Sulfuric acid -> Barium sulfate
    {
        "id": "barium_sulfate",
        "reactants": [["barium_salt", "bacl2_aq"], ["strong_acid", "h2so4"]],
        "status": "precipitation",
        "name": "Barium Sulfate Sulfate Test",
        "equation": "BaCl₂(aq) + H₂SO₄(aq) → BaSO₄↓ (heavy white) + 2HCl(aq)",
        "message": "⚪ PRECIPITATION: Dense milky-white barium sulfate precipitate formed.",
        "color": "#f8fafc",
        "after_color": "rgba(245, 250, 255, 0.9)",
        "precipitate_color": "#ffffff",
        "effects": ["precipitate"],
        "products": ["BaSO₄ dense precipitate", "2HCl(aq)"],
        "temperatureChange": 3.0,
        "deltaH": -26.0
    },
    # 5. Complexation: Iron(III) chloride + Potassium thiocyanate -> [Fe(SCN)]2+ (Blood Red)
    {
        "id": "iron_thiocyanate",
        "reactants": [["iron_salt", "fecl3_aq"], ["thiocyanate", "kscn_aq"]],
        "status": "color_change",
        "name": "Blood-Red Thiocyanatoiron(III) Complex",
        "equation": "FeCl₃(aq) + 3KSCN(aq) ⇌ [Fe(SCN)]²⁺ (blood red) + 3KCl(aq)",
        "message": "🩸 COMPLEXATION: Intense velvety blood-red coordination complex [Fe(SCN)]²⁺ formed.",
        "color": "#8b0000",
        "after_color": "rgba(165, 0, 0, 0.92)",
        "effects": ["deep_color_shift"],
        "products": ["[Fe(SCN)]²⁺ blood-red complex", "KCl solution"],
        "temperatureChange": 1.0,
        "deltaH": -10.5
    },
    # 6. Complexation: Copper sulfate + Excess Ammonia -> Tetraamminecopper(II) (Royal Azure)
    {
        "id": "tetraamminecopper",
        "reactants": [["salt_solution", "cuso4_aq"], ["weak_base", "nh3_aq"]],
        "status": "color_change",
        "name": "Deep Royal Blue Tetraamminecopper(II)",
        "equation": "CuSO₄(aq) + 4NH₃(aq) → [Cu(NH₃)₄]²⁺ (deep azure blue) + SO₄²⁻",
        "message": "💎 COORDINATION: Light sky-blue turned into deep, radiant royal azure [Cu(NH₃)₄]²⁺.",
        "color": "#001fa3",
        "after_color": "rgba(0, 31, 163, 0.92)",
        "effects": ["deep_color_shift", "bubbles"],
        "products": ["[Cu(NH₃)₄]²⁺ complex", "Sulfate solution"],
        "temperatureChange": 3.5,
        "deltaH": -88.0
    },
    # 7. Gas Evolution: Zinc + Hydrochloric Acid -> Hydrogen Gas
    {
        "id": "zinc_hcl",
        "reactants": [["metal", "zinc"], ["strong_acid", "hcl", "h2so4"]],
        "status": "gas_evolution",
        "name": "Single Displacement of Hydrogen by Zinc",
        "equation": "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂↑ (effervescent bubbles)",
        "message": "💨 GAS EVOLUTION: Zinc displaced hydrogen gas, bubbling briskly from granule surfaces.",
        "color": "#edf6fa",
        "after_color": "rgba(235, 248, 255, 0.75)",
        "effects": ["bubbles", "gas", "rapid_fizzing"],
        "products": ["ZnCl₂ solution", "H₂ gas ↑"],
        "temperatureChange": 18.5,
        "deltaH": -153.9
    },
    # 8. Gas Evolution: Magnesium + Hydrochloric Acid -> Hydrogen Gas (Rapid Exothermic)
    {
        "id": "magnesium_hcl",
        "reactants": [["metal", "magnesium"], ["strong_acid", "hcl", "h2so4"]],
        "status": "gas_evolution",
        "name": "Vigorous Reaction of Magnesium with Acid",
        "equation": "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂↑ + heat (ΔH = -462 kJ/mol)",
        "message": "💨 EXOTHERMIC DISPLACEMENT: Violent effervescence of hydrogen gas and significant heat release.",
        "color": "#f0fbff",
        "after_color": "rgba(230, 248, 255, 0.7)",
        "effects": ["bubbles", "gas", "heat_wave", "rapid_fizzing"],
        "products": ["MgCl₂ solution", "H₂ gas ↑"],
        "temperatureChange": 38.0,
        "deltaH": -462.0
    },
    # 9. Gas Evolution: Calcium carbonate + Hydrochloric acid -> Carbon Dioxide
    {
        "id": "carbonate_acid",
        "reactants": [["carbonate", "calcium_carbonate", "sodium_bicarbonate"], ["strong_acid", "hcl", "h2so4"]],
        "status": "gas_evolution",
        "name": "Acid Decomposition of Calcium Carbonate",
        "equation": "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂↑",
        "message": "🫧 EFFERVESCENCE: Rapid frothing and evolution of carbon dioxide gas.",
        "color": "#f5fafc",
        "after_color": "rgba(235, 245, 250, 0.7)",
        "effects": ["bubbles", "gas", "frothing"],
        "products": ["CaCl₂ solution", "CO₂ gas ↑", "H₂O"],
        "temperatureChange": 4.5,
        "deltaH": -16.0
    },
    # 10. Alkali Metal: Sodium metal + Water -> Violent Explosion / Flame
    {
        "id": "sodium_water",
        "reactants": [["alkali_metal", "sodium"], ["water", "water"]],
        "status": "violent",
        "name": "Violent Reaction of Sodium with Water",
        "equation": "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂↑ + yellow flame",
        "message": "🔥 VIOLENT REACTION: Sodium skitters, releases hydrogen gas, and ignites with an intense yellow flame!",
        "color": "#ff6600",
        "after_color": "rgba(255, 200, 150, 0.65)",
        "effects": ["fire", "smoke", "bubbles", "gas", "sparks"],
        "products": ["NaOH alkaline solution", "H₂ gas ↑", "Heat & flame"],
        "temperatureChange": 65.0,
        "deltaH": -368.0
    },
    # 11. Strong Acid + Strong Base -> Neutralization
    {
        "id": "neutralization",
        "reactants": [["strong_acid", "hcl", "h2so4"], ["strong_base", "naoh"]],
        "status": "neutralization",
        "name": "Acid-Base Neutralization",
        "equation": "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l) (ΔH = -57.3 kJ/mol)",
        "message": "⚗️ NEUTRALIZATION: Acid and base neutralized each other to form neutral salt and water.",
        "color": "#c2f2dc",
        "after_color": "rgba(195, 240, 220, 0.7)",
        "effects": ["bubbles"],
        "products": ["NaCl neutral salt", "H₂O water"],
        "temperatureChange": 8.5,
        "deltaH": -57.3
    },
    # 12. Base + Phenolphthalein
    {
        "id": "phenolphthalein_base",
        "reactants": [["strong_base", "weak_base", "naoh", "nh3_aq"], ["indicator_pp", "phenolphthalein"]],
        "status": "color_change",
        "name": "Phenolphthalein Alkaline Indicator Change",
        "equation": "In⁻ + OH⁻ ⇌ In²⁻ (vibrant fuchsia pink, pH > 8.2)",
        "message": "🌸 INDICATOR CHANGE: Solution flashed vivid fuchsia pink, indicating alkaline pH.",
        "color": "#e91e63",
        "after_color": "rgba(233, 30, 99, 0.82)",
        "effects": ["deep_color_shift"],
        "products": ["Pink alkaline solution"],
        "temperatureChange": 0.5,
        "deltaH": 0.0
    }
]

def evaluate_reaction(chemicals, is_heated=False):
    categories = [chem.get('category', 'unknown') for chem in chemicals]
    ids = [chem.get('id', '') for chem in chemicals]

    for rule in REACTION_RULES_BACKEND:
        group_a, group_b = rule["reactants"]
        has_a = any(cat in group_a or chem_id in group_a for cat, chem_id in zip(categories, ids))
        has_b = any(cat in group_b or chem_id in group_b for cat, chem_id in zip(categories, ids))
        if has_a and has_b:
            return rule

    names = [chem.get('name', '') for chem in chemicals]
    return {
        "status": "idle",
        "name": "No Chemical Reaction",
        "equation": "No Reaction",
        "message": f"Mixed {', '.join(names)}. Reagents are chemically compatible or non-reactive at standard conditions.",
        "color": "rgba(189, 195, 199, 0.3)",
        "effects": []
    }

@app.route('/api/simulate', methods=['POST'])
def simulate():
    data = request.json or {}
    chemicals = data.get('chemicals', [])
    is_heated = data.get('is_heated', False)
    
    if len(chemicals) < 2:
        return jsonify({"success": False, "message": "Need at least 2 chemicals to evaluate a reaction.", "reaction": None})
    
    result = evaluate_reaction(chemicals, is_heated)
    return jsonify({"success": True, "reaction": result})

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "SmartChem Simulation Engine"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
