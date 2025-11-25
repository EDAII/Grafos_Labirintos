document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('graph-visualization');
    const results = document.getElementById('analysis-results');
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    let network = null;

    let linhasAtuais = 10;
    let colunasAtuais = 15;

    window.gerarLabirinto = async () => {
        const rows = document.getElementById('rows').value;
        const cols = document.getElementById('cols').value;

        linhasAtuais = parseInt(rows);
        colunasAtuais = parseInt(cols);

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

    function resetarCores() {
        if (!network) return;

        const allNodes = network.body.data.nodes.getIds();
        const updates = allNodes.map(id => {
            let cor = '#ecf0f1';

            // Início do labirinto
            if (id === '0-0') cor = '#2ecc71';

            // Fim do labirinto
            else if (id === `${linhasAtuais - 1}-${colunasAtuais - 1}`) cor = '#e74c3c';

            return { id: id, color: cor };
        });

        network.body.data.nodes.update(updates);
    }

    window.resolverLabirinto = async (animado = false) => {
        resetarCores();

        const response = await fetch('http://127.0.0.1:5001/api/resolver');
        const data = await response.json();

        if (data.caminho && data.visitados) {
            results.innerHTML = 'Resolvendo...';

            if (animado) {
                for (let i = 0; i < data.visitados.length; i++) {
                    const nodeId = data.visitados[i];
                    network.body.data.nodes.update({ id: nodeId, color: '#e74c3c' });

                    // Delay para animação
                    if (i % 2 === 0) await sleep(20);
                }
            }

            // Pinta o caminho final
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