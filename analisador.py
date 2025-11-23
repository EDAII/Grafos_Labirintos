import random
from collections import deque

class GeradorLabirinto:
    def __init__(self, linhas, colunas):
        self.linhas = linhas
        self.colunas = colunas
        self.grafo = {} 
        self.gerar_dfs() 

    # O gerador do labirinto (DFS)
    def gerar_dfs(self):
        # Inicia o grafo sem arestas
        self.grafo = {(r, c): [] for r in range(self.linhas) for c in range(self.colunas)}
        
        start_node = (0, 0)
        visited = {start_node}
        stack = [start_node]

        while stack:
            r, c = stack[-1]
            # Vizinhos possíveis
            vizinhos = [
                (r-1, c), (r+1, c), (r, c-1), (r, c+1)
            ]
            random.shuffle(vizinhos)
            
            encontrou = False
            for nr, nc in vizinhos:
                if 0 <= nr < self.linhas and 0 <= nc < self.colunas:
                    if (nr, nc) not in visited:
                        # cria conexão
                        self.grafo[(r, c)].append((nr, nc))
                        self.grafo[(nr, nc)].append((r, c))
                        
                        visited.add((nr, nc))
                        stack.append((nr, nc))
                        encontrou = True
                        break 
            
            if not encontrou:
                stack.pop() # Backtracking

    # O explorador (BFS)
    def resolver_bfs(self):
        inicio = (0, 0)
        fim = (self.linhas - 1, self.colunas - 1)
        
        queue = deque([(inicio, [inicio])])
        visited = {inicio}
        
        while queue:
            (atual, caminho) = queue.popleft()
            
            if atual == fim:
                # Retorna IDs string formatados para o frontend
                return [f"{n[0]}-{n[1]}" for n in caminho]
            
            for vizinho in self.grafo.get(atual, []):
                if vizinho not in visited:
                    visited.add(vizinho)
                    queue.append((vizinho, caminho + [vizinho]))
        return []

    # Formata para o Vis.js
    def obter_dados_visjs(self):
        nodes = []
        edges = []
        added_edges = set()
        tamanho = 50 # Espaçamento

        for r in range(self.linhas):
            for c in range(self.colunas):
                node_id = f"{r}-{c}"
                # Define cor: Verde (Início), Vermelho (Fim), Cinza (Caminho)
                color = "#ecf0f1"
                if (r, c) == (0, 0): color = "#2ecc71"
                elif (r, c) == (self.linhas-1, self.colunas-1): color = "#e74c3c"

                # Define posição X, Y fixa para ser um grid
                nodes.append({
                    "id": node_id,
                    "x": c * tamanho,
                    "y": r * tamanho,
                    "color": color,
                    "size": 10
                })

                for vr, vc in self.grafo.get((r, c), []):
                    viz_id = f"{vr}-{vc}"
                    edge_key = tuple(sorted((node_id, viz_id)))
                    if edge_key not in added_edges:
                        edges.append({"from": edge_key[0], "to": edge_key[1]})
                        added_edges.add(edge_key)

        return {"nodes": nodes, "edges": edges}