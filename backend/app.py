from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Comprehensive Laboratory Chemical Reaction Simulation Knowledge Base
REACTION_RULES_BACKEND = [
    # 1. Lead(II) nitrate + Potassium iodide -> Lead(II) iodide (Golden Rain)
    {
        "id": "golden_rain",
        "name": "Precipitation of Lead(II) Iodide (Golden Rain)",
        "category": "precipitation",
        "reactants": [["lead_salt", "lead_nitrate_s", "lead_nitrate_aq"], ["iodide_sol", "potassium_iodide_s", "ki_aq"]],
        "status": "precipitation",
        "title": "Golden Rain Reaction",
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
        "name": "Precipitation of Silver Chloride",
        "category": "precipitation",
        "reactants": [["silver_salt", "agno3_aq"], ["strong_acid", "hcl"]],
        "status": "precipitation",
        "title": "Curdy White AgCl Precipitate",
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
        "name": "Precipitation of Copper(II) Hydroxide",
        "category": "precipitation",
        "reactants": [["salt_solution", "copper_salt", "cuso4_aq", "cuso4_s"], ["strong_base", "naoh"]],
        "status": "precipitation",
        "title": "Gelatinous Blue Cu(OH)₂ Precipitate",
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
        "name": "Barium Sulfate Sulfate Test",
        "category": "precipitation",
        "reactants": [["barium_salt", "bacl2_aq"], ["strong_acid", "h2so4"]],
        "status": "precipitation",
        "title": "Dense Barium Sulfate Precipitate",
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
        "name": "Blood-Red Thiocyanatoiron(III) Complex",
        "category": "complexation",
        "reactants": [["iron_salt", "fecl3_aq"], ["thiocyanate", "kscn_aq"]],
        "status": "color_change",
        "title": "Blood-Red Coordination Complex",
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
        "name": "Deep Royal Blue Tetraamminecopper(II)",
        "category": "complexation",
        "reactants": [["salt_solution", "copper_salt", "cuso4_aq"], ["weak_base", "nh3_aq"]],
        "status": "color_change",
        "title": "Deep Azure Tetraammine Complex",
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
        "name": "Single Displacement of Hydrogen by Zinc",
        "category": "gas_evolution",
        "reactants": [["metal", "zinc"], ["strong_acid", "hcl", "h2so4"]],
        "status": "gas_evolution",
        "title": "Vigorous Hydrogen Gas Effervescence",
        "equation": "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂↑ (effervescent bubbles)",
        "message": "💨 GAS EVOLUTION: Zinc displaced hydrogen gas, bubbling briskly from granule surfaces.",
        "color": "#edf6fa",
        "after_color": "rgba(235, 248, 255, 0.75)",
        "effects": ["bubbles", "gas", "rapid_fizzing"],
        "products": ["ZnCl₂ solution", "H₂ gas ↑"],
        "gasProduced": "H₂",
        "temperatureChange": 18.5,
        "deltaH": -153.9
    },
    # 8. Gas Evolution: Magnesium + Hydrochloric Acid -> Hydrogen Gas (Rapid Exothermic)
    {
        "id": "magnesium_hcl",
        "name": "Vigorous Reaction of Magnesium with Acid",
        "category": "gas_evolution",
        "reactants": [["metal", "magnesium"], ["strong_acid", "hcl", "h2so4"]],
        "status": "gas_evolution",
        "title": "Violent Effervescence & Steam Release",
        "equation": "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂↑ + heat (ΔH = -462 kJ/mol)",
        "message": "💨 EXOTHERMIC DISPLACEMENT: Violent effervescence of hydrogen gas and significant heat release.",
        "color": "#f0fbff",
        "after_color": "rgba(230, 248, 255, 0.7)",
        "effects": ["bubbles", "gas", "heat_wave", "rapid_fizzing"],
        "products": ["MgCl₂ solution", "H₂ gas ↑"],
        "gasProduced": "H₂",
        "temperatureChange": 38.0,
        "deltaH": -462.0
    },
    # 9. Gas Evolution: Calcium carbonate + Hydrochloric acid -> Carbon Dioxide
    {
        "id": "carbonate_acid",
        "name": "Acid Decomposition of Calcium Carbonate",
        "category": "gas_evolution",
        "reactants": [["carbonate", "calcium_carbonate", "sodium_bicarbonate"], ["strong_acid", "hcl", "h2so4"]],
        "status": "gas_evolution",
        "title": "Carbon Dioxide Frothing & Fizzing",
        "equation": "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂↑",
        "message": "🫧 EFFERVESCENCE: Rapid frothing and evolution of carbon dioxide gas.",
        "color": "#f5fafc",
        "after_color": "rgba(235, 245, 250, 0.7)",
        "effects": ["bubbles", "gas", "frothing"],
        "products": ["CaCl₂ solution", "CO₂ gas ↑", "H₂O"],
        "gasProduced": "CO₂",
        "temperatureChange": 4.5,
        "deltaH": -16.0
    },
    # 10. Alkali Metal: Sodium metal + Water -> Violent Explosion / Flame
    {
        "id": "sodium_water",
        "name": "Violent Reaction of Sodium with Water",
        "category": "violent",
        "reactants": [["alkali_metal", "sodium"], ["water", "water"]],
        "status": "violent",
        "title": "Explosive Flame & Hydrogen Ignition",
        "equation": "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂↑ + yellow flame",
        "message": "🔥 VIOLENT REACTION: Sodium skitters, releases hydrogen gas, and ignites with an intense yellow flame!",
        "color": "#ff6600",
        "after_color": "rgba(255, 200, 150, 0.65)",
        "effects": ["fire", "smoke", "bubbles", "gas", "sparks"],
        "products": ["NaOH alkaline solution", "H₂ gas ↑", "Heat & flame"],
        "gasProduced": "H₂",
        "temperatureChange": 65.0,
        "deltaH": -368.0
    },
    # 11. Strong Acid + Strong Base -> Neutralization
    {
        "id": "neutralization",
        "name": "Acid-Base Neutralization",
        "category": "neutralization",
        "reactants": [["strong_acid", "hcl", "h2so4"], ["strong_base", "naoh"]],
        "status": "neutralization",
        "title": "Neutralization & Salt Water Formation",
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
        "name": "Phenolphthalein Alkaline Indicator Change",
        "category": "neutralization",
        "reactants": [["strong_base", "weak_base", "naoh", "nh3_aq"], ["indicator_pp", "phenolphthalein"]],
        "status": "color_change",
        "title": "Fuchsia Pink Alkaline Indicator",
        "equation": "In⁻ + OH⁻ ⇌ In²⁻ (vibrant fuchsia pink, pH > 8.2)",
        "message": "🌸 INDICATOR CHANGE: Solution flashed vivid fuchsia pink, indicating alkaline pH.",
        "color": "#e91e63",
        "after_color": "rgba(233, 30, 99, 0.82)",
        "effects": ["deep_color_shift"],
        "products": ["Pink alkaline solution"],
        "temperatureChange": 0.5,
        "deltaH": 0.0
    },
    # 13. Universal Indicator + Acid
    {
        "id": "universal_acid",
        "name": "Universal Indicator with Acid (Red)",
        "category": "neutralization",
        "reactants": [["strong_acid", "hcl", "h2so4"], ["indicator_ui", "universal_indicator"]],
        "status": "color_change",
        "title": "Acidic Red Indicator Hue",
        "equation": "Universal Indicator + H⁺ → Vivid Ruby Red (pH 1 - 2)",
        "message": "🔴 INDICATOR CHANGE: Solution turned deep ruby red, confirming strong acidity.",
        "color": "#e53935",
        "after_color": "rgba(229, 57, 53, 0.85)",
        "effects": ["deep_color_shift"],
        "products": ["Acidic red solution (pH ~ 1)"],
        "temperatureChange": 0.5,
        "deltaH": 0.0
    },
    # 14. Universal Indicator + Base
    {
        "id": "universal_base",
        "name": "Universal Indicator with Base (Purple/Violet)",
        "category": "neutralization",
        "reactants": [["strong_base", "naoh"], ["indicator_ui", "universal_indicator"]],
        "status": "color_change",
        "title": "Alkaline Purple Indicator Hue",
        "equation": "Universal Indicator + OH⁻ → Deep Royal Violet (pH 12 - 14)",
        "message": "🟣 INDICATOR CHANGE: Solution turned rich royal purple, confirming strong alkalinity.",
        "color": "#7b1fa2",
        "after_color": "rgba(123, 31, 162, 0.85)",
        "effects": ["deep_color_shift"],
        "products": ["Alkaline violet solution (pH ~ 13)"],
        "temperatureChange": 0.5,
        "deltaH": 0.0
    },
    # 15. Thermal Decomposition of Calcium Carbonate
    {
        "id": "thermal_decomposition_cu",
        "name": "Thermal Decomposition of Calcium Carbonate",
        "category": "decomposition",
        "reactants": [["carbonate", "calcium_carbonate"], ["heater", "burner"]],
        "requires_heat": True,
        "status": "decomposition",
        "title": "Thermal Decomposition to Quicklime & CO₂",
        "equation": "CaCO₃(s) + heat → CaO(s) + CO₂↑",
        "message": "♨️ DECOMPOSITION: High temperature broke down calcium carbonate, evolving carbon dioxide.",
        "color": "#2a2a2a",
        "after_color": "rgba(40, 40, 40, 0.95)",
        "effects": ["heat_wave", "smoke", "gas"],
        "products": ["CaO white solid", "CO₂ gas ↑"],
        "gasProduced": "CO₂",
        "temperatureChange": 95.0,
        "deltaH": 178.0
    },
    # 16. Combustion of Ethanol
    {
        "id": "ethanol_combustion",
        "name": "Combustion of Ethanol",
        "category": "combustion",
        "reactants": [["alcohol", "ethanol"], ["heater", "burner"]],
        "requires_heat": True,
        "status": "combustion",
        "title": "Luminous Blue-Yellow Clean Flame",
        "equation": "C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(g) + heat",
        "message": "🔥 COMBUSTION: Ethanol ignited with clean, radiant blue-yellow flame releasing CO₂ and H₂O.",
        "color": "#ff9900",
        "after_color": "rgba(255, 170, 0, 0.6)",
        "effects": ["fire", "smoke", "heat_wave"],
        "products": ["CO₂ gas", "H₂O vapor", "Radiant heat"],
        "temperatureChange": 85.0,
        "deltaH": -1367.0
    },
    # 17. Thermal Decomposition of Copper Carbonate
    {
        "id": "copper_carbonate_thermal",
        "name": "Thermal Decomposition of Copper Carbonate",
        "category": "decomposition",
        "reactants": [["carbonate", "copper_carbonate"], ["heater", "burner"]],
        "requires_heat": True,
        "status": "decomposition",
        "title": "Green Powder Becomes Black on Heating",
        "equation": "CuCO₃(s) → CuO(s) (black) + CO₂(g)↑",
        "message": "♨️ DECOMPOSITION: Green copper carbonate decomposed into black copper(II) oxide and carbon dioxide.",
        "color": "#292929",
        "after_color": "rgba(42, 42, 42, 0.94)",
        "effects": ["heat_wave", "smoke", "gas"],
        "products": ["CuO black solid powder", "CO₂ gas ↑"],
        "gasProduced": "CO₂",
        "temperatureChange": 95.0,
        "deltaH": 48.0
    },
    # 18. Dissolution: Copper sulfate crystals + Water
    {
        "id": "cuso4_dissolution",
        "name": "Aqueous Hydration of Copper(II) Sulfate",
        "category": "dissolution",
        "reactants": [["salt_solid", "cuso4_s"], ["water", "water"]],
        "status": "dissolution",
        "title": "Hydration to Sky Blue Solution",
        "equation": "CuSO₄(s) + 6H₂O(l) → [Cu(H₂O)₆]²⁺(aq) + SO₄²⁻(aq)",
        "message": "💧 DISSOLUTION: Blue crystals dissolved smoothly, forming turquoise-blue hexaaquacopper(II).",
        "color": "#2b8fe0",
        "after_color": "rgba(43, 143, 224, 0.8)",
        "effects": ["dissolving_crystals"],
        "products": ["[Cu(H₂O)₆]²⁺ copper sulfate solution"],
        "temperatureChange": -1.2,
        "deltaH": -66.0
    },
    # 19. Dissolution: Potassium Permanganate + Water
    {
        "id": "kmno4_dissolution",
        "name": "Dissolution of Potassium Permanganate",
        "category": "dissolution",
        "reactants": [["oxidizer_solid", "potassium_permanganate_s"], ["water", "water"]],
        "status": "dissolution",
        "title": "Vivid Magenta Permanganate Solution",
        "equation": "KMnO₄(s) + H₂O(l) → K⁺(aq) + MnO₄⁻(aq)",
        "message": "💜 DISSOLUTION: Dark crystals diffused instantly into rich, radiant royal magenta plumes.",
        "color": "#7b1178",
        "after_color": "rgba(123, 17, 120, 0.88)",
        "effects": ["deep_color_shift", "dissolving_crystals"],
        "products": ["Intense purple KMnO₄ solution"],
        "temperatureChange": -0.8,
        "deltaH": 43.6
    },
    # 20. Carbon Dioxide Limewater Test
    {
        "id": "carbon_dioxide_limewater",
        "name": "Carbon Dioxide Limewater Test",
        "category": "precipitation",
        "reactants": [["gas_co2", "carbon_dioxide_gas"], ["limewater", "limewater"]],
        "status": "precipitation",
        "title": "Limewater Turns Milky",
        "equation": "CO₂(g) + Ca(OH)₂(aq) → CaCO₃↓ (milky) + H₂O(l)",
        "message": "🥛 PRECIPITATION: Carbon dioxide reacted with limewater to form a characteristic milky white suspension.",
        "color": "#edf7f4",
        "after_color": "rgba(230, 242, 238, 0.82)",
        "precipitate_color": "#f5f7f2",
        "effects": ["precipitate", "gas"],
        "products": ["CaCO₃ white precipitate", "H₂O"],
        "temperatureChange": 0.5,
        "deltaH": -112.5
    },
    # 21. Iron Displacement of Copper
    {
        "id": "iron_copper_displacement",
        "name": "Iron Displacement of Copper",
        "category": "displacement",
        "reactants": [["metal", "iron_filings"], ["copper_salt", "salt_solution", "cuso4_aq"]],
        "status": "color_change",
        "title": "Blue Solution Fades as Copper Deposits",
        "equation": "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
        "message": "⚙️ DISPLACEMENT: Iron reduced copper ions, depositing reddish copper metal as the blue solution faded.",
        "color": "#b7d7c5",
        "after_color": "rgba(154, 204, 180, 0.74)",
        "effects": ["deep_color_shift", "settling_crystals"],
        "products": ["Pale green FeSO₄ solution", "Reddish copper metal deposit"],
        "temperatureChange": 2.5,
        "deltaH": -152.0
    },
    # 22. Ethanoic Acid + Sodium Bicarbonate
    {
        "id": "acetic_bicarbonate",
        "name": "Ethanoic Acid and Sodium Bicarbonate",
        "category": "gas_evolution",
        "reactants": [["weak_acid", "acetic_acid"], ["carbonate", "sodium_bicarbonate"]],
        "status": "gas_evolution",
        "title": "Weak Acid Carbon Dioxide Effervescence",
        "equation": "CH₃COOH(aq) + NaHCO₃(s) → CH₃COONa(aq) + H₂O(l) + CO₂(g)↑",
        "message": "🫧 EFFERVESCENCE: Rapid bubbling of carbon dioxide gas from weak acid-carbonate reaction.",
        "color": "#eaf7f4",
        "after_color": "rgba(222, 245, 239, 0.72)",
        "effects": ["bubbles", "gas", "rapid_fizzing"],
        "products": ["Sodium ethanoate solution", "CO₂ gas ↑", "H₂O"],
        "gasProduced": "CO₂",
        "temperatureChange": -2.0,
        "deltaH": 28.0
    }
]

def evaluate_reaction(chemicals, is_heated=False):
    """
    Evaluates reaction between chemicals on the bench, taking temperature/heating into account.
    Returns matching rule dictionary or None if no reaction occurs.
    """
    if not chemicals:
        return None
    if len(chemicals) < 2 and not is_heated:
        return None

    categories = [chem.get('category', chem.get('type', '')) for chem in chemicals]
    ids = [chem.get('id', '') for chem in chemicals]

    # Thermal / heat-driven reactions (can occur with single reagent or mixtures)
    if is_heated:
        for rule in REACTION_RULES_BACKEND:
            if rule.get("requires_heat"):
                group_a, group_b = rule["reactants"]
                # For heat reactions, group_b is usually heater/burner, which is satisfied by is_heated=True
                has_a = any(cat in group_a or chem_id in group_a for cat, chem_id in zip(categories, ids))
                if has_a:
                    return rule

    # Multi-reagent reactions require at least 2 chemicals
    if len(chemicals) < 2:
        return None

    # Standard reaction rules
    for rule in REACTION_RULES_BACKEND:
        if rule.get("requires_heat") and not is_heated:
            continue

        group_a, group_b = rule["reactants"]
        has_a = any(cat in group_a or chem_id in group_a for cat, chem_id in zip(categories, ids))
        has_b = any(cat in group_b or chem_id in group_b for cat, chem_id in zip(categories, ids))

        if has_a and has_b:
            return rule

    return None

@app.route('/api/simulate', methods=['POST'])
def simulate():
    data = request.json or {}
    chemicals = data.get('chemicals', [])
    is_heated = data.get('is_heated', False)

    if not chemicals or (len(chemicals) < 2 and not is_heated):
        return jsonify({
            "success": False,
            "message": "Need at least 2 chemicals (or 1 heated reagent for thermal decomposition) to evaluate a reaction.",
            "reaction": None
        })

    reaction = evaluate_reaction(chemicals, is_heated)
    if reaction:
        return jsonify({
            "success": True,
            "reaction": reaction,
            "message": reaction.get("message", "Reaction detected.")
        })

    names = [chem.get('name', chem.get('formula', 'sample')) for chem in chemicals]
    return jsonify({
        "success": True,
        "reaction": None,
        "message": f"Mixed {', '.join(names)}. Reagents are chemically compatible or non-reactive under current bench conditions."
    })

@app.route('/api/reactions', methods=['GET'])
def get_reactions():
    return jsonify({
        "success": True,
        "total": len(REACTION_RULES_BACKEND),
        "reactions": REACTION_RULES_BACKEND
    })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "SmartChem Chemical Simulation & Kinetic Engine",
        "version": "2.0.0",
        "available_rules": len(REACTION_RULES_BACKEND)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
