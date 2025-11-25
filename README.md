# Grafos - Gerador de Labirintos

**Número da Lista**: 18<br>
**Conteúdo da Disciplina**: Grafos <br>

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 20/2046229  |  Kallyne Macêdo Passos |
| 20/0022199  | Leonardo Sobrinho de Aguiar |
 
## Descrição do projeto

Este projeto tem como objetivo explorar a aplicação de algoritmos de travessia de grafos com a geração e resolução de labirintos. Dessa forma, foi desenvolvido um sistema que atua em duas etapas distintas, cada uma utilizando um algoritmo: A primeira etapa utiliza uma variação randomizada da Busca em Profundidade (DFS), em que o algoritmo escava/gera o labirinto iniciando com uma grade cheia de paredes, caminha aleatoriamente até ficar preso e, em seguida, realiza backtracking, garantindo um labirinto conexo, sem ciclos e com caminhos únicos entre quaisquer dois pontos; e a segunda etapa utiliza a Busca em Largura (BFS) para encontrar a saída. Através da exploração do grafo em camadas de distância, a BFS garante encontrar o caminho mais curto possível entre a origem e o destino, finalizando o desafio do labirinto.  

## Guia de instalação

**Linguagem**: Python, HTML, CSS (Bootstrap) e JavaScript<br>
**Framework**: Flask<br>
**Pré-requisitos**: Navegador instalado, Python, Flask e CORS presentes no computador; clonar o repositório localmente.

### Passo a Passo

### 1. Clonar repositório:
```bash
git clone https://github.com/EDAII/Grafos_Labirintos.git
```
### 2. Instale as Dependências:
Abra um terminal ou prompt de comando na pasta do projeto e execute:
```bash
pip install Flask Flask-CORS
```
### 3. Inicie o Servidor:
Digite no mesmo terminal:
```bash
python app.py
```
### 4. Acesse a Aplicação:
Abra seu navegador web e acesse o seguinte endereço: http://127.0.0.1:5001

## Uso

1. Na tela inicial, defina o número de Linhas e Colunas desejado para o labirinto (ex: 15x20).
2. Clique no botão azul "1. Gerar". O algoritmo criará um labirinto aleatório instantaneamente.
   - O quadrado Verde indica o início (0,0).
   - O quadrado Vermelho indica o fim (N,M).
3. Escolha a forma de resolução:
   - Clique no botão verde **"2. Resolver Rápido"** para destacar instantaneamente o caminho mais curto em amarelo.
   - Clique no botão amarelo **"3. Resolver Lento"** para visualizar a animação da busca (nós visitados em vermelho) antes de mostrar a solução.

## Capturas de tela

<div align="center">Página inicial com labirinto 10x15 </div>
<img width="1694" height="929" alt="image" src="https://github.com/user-attachments/assets/dea8acd4-dfa2-4a4b-8ba0-3b67725901d4" />
<br>

<div align="center">Labirinto 10x15 resolvido no modo rápido </div>
<img width="1604" height="928" alt="image" src="https://github.com/user-attachments/assets/e64bf391-dda8-419f-9152-2cff0fdf3e83" />

<br>

<div align="center">Labirinto 10x15 resolvido no modo lento</div>
<img width="1648" height="934" alt="image" src="https://github.com/user-attachments/assets/803710c3-150b-471c-a8c2-1603973bc842" />


## Conclusões
Toda a estrutura de dados (nós e arestas do grafo) é gerada matematicamente pelo Python a cada nova execução, o que demonstra a eficiência dos algoritmos trabalhados em cenários complexos. Assim, é possível testar inúmeras variações de grafos sem a necessidade de inserir dados manualmente.


## Gravação 

[Link da gravação](https://www.youtube.com/watch?v=2gZoB9Kt9CI)
