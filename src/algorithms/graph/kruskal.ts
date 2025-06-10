const find = (u: number, parent: number[]): number => {
  if (parent[u] !== u) {
    parent[u] = find(parent[u], parent);
  }

  return parent[u];
};

const union = (u: number, v: number, parent: number[], rank: number[]): boolean => {
  const uRoot: number = find(u, parent);
  const vRoot: number = find(v, parent);

  if (uRoot === vRoot) {
    return false;
  }

  if (rank[uRoot] < rank[vRoot]) {
    parent[uRoot] = vRoot;
  } else if (rank[uRoot] > rank[vRoot]) {
    parent[vRoot] = uRoot;
  } else {
    parent[vRoot] = uRoot;
    rank[uRoot]++;
  }

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
  const rank: number[] = [];

  for (let i: number = 0; i < graph.length; i++) {
    parent[i] = i;
    rank[i] = 0;
  }

  const sortedEdges: number[][] = initializeEdges(graph);

  const mstEdges: number[][] = [];

  for (let i: number = 0; i < sortedEdges.length; i++) {
    const u: number = sortedEdges[i][0];
    const v: number = sortedEdges[i][1];

    if (union(u, v, parent, rank)) {
      mstEdges.push(sortedEdges[i]);

      if (mstEdges.length == graph.length - 1) {
        break;
      }
    }
  }

  return mstEdges;
}
