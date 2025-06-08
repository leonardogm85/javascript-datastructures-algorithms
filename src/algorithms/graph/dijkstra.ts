const minDistance = (distance: number[], visited: boolean[]): number => {
  let minDistance: number = Infinity;
  let minIndex: number = -1;

  for (let v: number = 0; v < distance.length; v++) {
    if (!visited[v] && distance[v] <= minDistance) {
      minDistance = distance[v];
      minIndex = v;
    }
  }

  return minIndex;
};

export const dijkstra = (graph: number[][], source: number): number[] => {
  const distance: number[] = [];
  const visited: boolean[] = [];

  for (let v: number = 0; v < graph.length; v++) {
    distance[v] = Infinity;
    visited[v] = false;
  }

  distance[source] = 0;

  for (let i: number = 0; i < graph.length - 1; i++) {
    const u: number = minDistance(distance, visited);

    visited[u] = true;

    for (let v: number = 0; v < graph.length; v++) {
      if (!visited[v] && graph[u][v] !== 0 && distance[u] !== Infinity && distance[u] + graph[u][v] < distance[v]) {
        distance[v] = distance[u] + graph[u][v];
      }
    }
  }

  return distance;
};
