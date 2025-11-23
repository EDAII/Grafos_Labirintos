document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('graph-visualization');
    const results = document.getElementById('analysis-results');
    let network = null;

    window.gerarLabirinto = async () => {
        const rows = document.getElementById('rows').value;
        const cols = document.getElementById('cols').value;
        results.innerHTML = 'Gerando...';

        const response = await fetch('http://127.0.0.1:5001/api/gerar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rows, cols })
        });
        const data = await response.json();
        drawMaze(data);
        results.innerHTML = 'Labirinto gerado com DFS! Tente encontrar a saída.';
    };

    window.resolverLabirinto = async () => {
        const response = await fetch('http://127.0.0.1:5001/api/resolver');
        const data = await response.json();

        if (data.caminho) {
            // Pinta o caminho de amarelo
            const updates = data.caminho.map(id => ({ id: id, color: '#f1c40f' }));
            network.body.data.nodes.update(updates);
            results.innerHTML = `Solução encontrada pelo BFS em ${data.caminho.length} passos!`;
        }
    };

    function drawMaze(data) {
        const nodes = new vis.DataSet(data.nodes);
        const edges = new vis.DataSet(data.edges);
        const options = {
            physics: false, // Desliga a física para manter o formato de grade
            interaction: { dragNodes: false, zoomView: true },
            nodes: { shape: 'box', borderWidth: 0, label: '' },
            edges: { color: '#2c3e50', width: 2, smooth: false }
        };
        network = new vis.Network(container, { nodes, edges }, options);
    }

    // Gera um inicial
    window.gerarLabirinto();
});