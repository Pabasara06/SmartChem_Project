from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def evaluate_reaction(chemicals):
    # රසායනික ද්‍රව්‍යවල Categories වෙන් කර ගැනීම
    categories = [chem.get('category', 'unknown') for chem in chemicals]
    names = [chem.get('name', '') for chem in chemicals]

    # Rule 1: Alkali Metal + Water -> Strong Base + Hydrogen Gas + Fire
    if 'alkali_metal' in categories and 'water' in categories:
        metal = next(c['name'] for c in chemicals if c['category'] == 'alkali_metal')
        return {
            "status": "violent",
            "equation": f"2{metal} + 2H₂O → 2{metal}OH + H₂ ↑",
            "message": f"🔥 VIOLENT REACTION: {metal} reacts explosively with water to release Hydrogen gas!",
            "color": "rgba(255, 255, 255, 0.4)",
            "effects": ["fire", "smoke", "bubbles"]
        }

    # Rule 2: Strong Acid + Strong Base -> Salt + Water (Neutralization)
    if 'strong_acid' in categories and 'strong_base' in categories:
        acid = next(c for c in chemicals if c['category'] == 'strong_acid')
        base = next(c for c in chemicals if c['category'] == 'strong_base')
        return {
            "status": "neutralization",
            "equation": f"{acid['formula']} + {base['formula']} → Salt + H₂O",
            "message": f"⚗️ NEUTRALIZATION: {acid['name']} and {base['name']} neutralized to form salt and water.",
            "color": "rgba(200, 247, 197, 0.3)",
            "effects": ["bubbles"]
        }

    # Rule 3: Base + Indicator (e.g. Phenolphthalein)
    if ('strong_base' in categories or 'weak_base' in categories) and 'indicator' in categories:
        return {
            "status": "color_change",
            "equation": "Base + Indicator → Pink Solution",
            "message": "🩸 INDICATOR CHANGE: Solution turned pink indicating alkaline pH.",
            "color": "rgba(233, 30, 99, 0.7)",
            "effects": []
        }

    # වෙනත් කිසිදු රීතියකට අදාළ නොවේ නම් (No Reaction)
    return {
        "status": "idle",
        "equation": "No Reaction",
        "message": f"Mixed {', '.join(names)}. No visible chemical reaction occurred.",
        "color": "rgba(189, 195, 199, 0.3)",
        "effects": []
    }

@app.route('/api/simulate', methods=['POST'])
def simulate():
    data = request.json
    chemicals = data.get('chemicals', [])
    
    if len(chemicals) < 2:
        return jsonify({"success": False, "message": "Need at least 2 chemicals to react.", "reaction": None})
    
    result = evaluate_reaction(chemicals)
    return jsonify({"success": True, "reaction": result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)