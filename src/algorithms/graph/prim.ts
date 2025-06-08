const minKey = (graph: number[][], key: number[], visited: boolean[]): number => {
  let minKey: number = Infinity;
  let minIndex: number = 0;

  for (let v: number = 0; v < graph.length; v++) {
    if (!visited[v] && key[v] < minKey) {
      minKey = key[v];
      minIndex = v;
    }
  }

  return minIndex;
};

export const prim = (graph: number[][]): number[] => {
  const parent: number[] = [];
  const key: number[] = [];
  const visited: boolean[] = [];

  for (let i: number = 0; i < graph.length; i++) {
    key[i] = Infinity;
    visited[i] = false;
  }

  key[0] = 0;
  parent[0] = -1;

  for (let i: number = 0; i < graph.length - 1; i++) {
    const u: number = minKey(graph, key, visited);

    visited[u] = true;

    for (let v: number = 0; v < graph.length; v++) {
      if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
    }
  }

  return parent;
};
