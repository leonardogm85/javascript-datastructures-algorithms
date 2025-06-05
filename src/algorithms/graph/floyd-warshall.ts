export const floydWarshall = (graph: number[][]): number[][] => {
  const distance: number[][] = [];

  for (let i: number = 0; i < graph.length; i++) {
    distance[i] = [];

    for (let j: number = 0; j < graph.length; j++) {
      if (i === j) {
        distance[i][j] = 0;
      } else if (isFinite(graph[i][j])) {
        distance[i][j] = graph[i][j];
      } else {
        distance[i][j] = Infinity;
      }
    }
  }

  for (let k: number = 0; k < graph.length; k++) {
    for (let i: number = 0; i < graph.length; i++) {
      for (let j: number = 0; j < graph.length; j++) {
        if (distance[i][k] + distance[k][j] < distance[i][j]) {
          distance[i][j] = distance[i][k] + distance[k][j];
        }
      }
    }
  }

  return distance;
};
