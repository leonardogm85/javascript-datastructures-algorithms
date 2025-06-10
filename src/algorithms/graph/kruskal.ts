const find = (u: number, parent: number[]): number => {
  if (parent[u] !== u) {
    parent[u] = find(parent[u], parent);
  }

  return parent[u];
};

const union = (u: number, v: number, parent: number[]): boolean => {
  const uParent: number = find(u, parent);
  const vParent: number = find(v, parent);

  if (uParent === vParent) {
    return false;
  }

  parent[vParent] = uParent;

  return true;
};


function initializeEdges(graph: number[][]): number[][] {
  const edges: number[][] = [];

  for (let i: number = 0; i < graph.length; i++) {
    for (let j: number = i + 1; j < graph.length; j++) {
      const weight: number = graph[i][j];

      if (weight !== 0) {
        edges.push([i, j, weight]);
      }
    }
  }

  return edges.sort((a: number[], b: number[]) => {
    const aWeight: number = a[2];
    const bWeight: number = b[2];

    return aWeight - bWeight;
  });
}

export function kruskal(graph: number[][]): number[][] {
  const parent: number[] = [];

  for (let i: number = 0; i < graph.length; i++) {
    parent[i] = i;
  }

  const allEdges: number[][] = initializeEdges(graph);

  const edges: number[][] = [];

  for (let i: number = 0; i < allEdges.length; i++) {
    const u: number = allEdges[i][0];
    const v: number = allEdges[i][1];

    if (union(u, v, parent)) {
      edges.push(allEdges[i]);

      if (edges.length == graph.length - 1) {
        break;
      }
    }
  }

  return edges;
}
