from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from analisador import GeradorLabirinto

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

labirinto_atual = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/gerar', methods=['POST'])
def gerar():
    global labirinto_atual
    data = request.json or {}
    rows = int(data.get('rows', 10))
    cols = int(data.get('cols', 10))
    
    labirinto_atual = GeradorLabirinto(rows, cols)
    return jsonify(labirinto_atual.obter_dados_visjs())

@app.route('/api/resolver', methods=['GET'])
def resolver():
    if not labirinto_atual:
        return jsonify({"error": "Gere um labirinto primeiro"}), 400
    
    resultado = labirinto_atual.resolver_bfs()
    return jsonify(resultado)

if __name__ == '__main__':
    app.run(debug=True, port=5001)