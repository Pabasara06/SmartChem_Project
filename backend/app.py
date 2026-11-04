from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/calculate', methods=['POST'])
def calculate_reaction():
    data = request.json
    mass_na = float(data.get('na_mass', 0))
    mass_h2o = float(data.get('h2o_mass', 0))

    MM_Na = 23.0
    MM_H2O = 18.0
    MM_NaOH = 40.0

    mol_na = mass_na / MM_Na
    mol_h2o = mass_h2o / MM_H2O

    if mol_h2o < mol_na:
        limiting = 'Water (H₂O)'
        moles_reacting = mol_h2o
    else:
        limiting = 'Sodium (Na)'
        moles_reacting = mol_na

    mass_naoh = moles_reacting * MM_NaOH
    moles_h2 = moles_reacting / 2
    vol_h2 = moles_h2 * 22.4 

    return jsonify({
        "mol_na": round(mol_na, 3),
        "mol_h2o": round(mol_h2o, 3),
        "limiting": limiting,
        "mass_naoh": round(mass_naoh, 2),
        "vol_h2": round(vol_h2, 2)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
