export enum Color {
  WHITE = 0,
  GREY = 1,
  BLACK = 2
};

export type Vertex = string | number;

export type Callback = (vertex: Vertex) => void;

export type Colors = { [vertex: Vertex]: Color };

export type Distances = { [vertex: Vertex]: number };

export type Discovery = { [vertex: Vertex]: number };

export type Finished = { [vertex: Vertex]: number };

export type Predecessors = { [vertex: Vertex]: Vertex | undefined };

export type SorthestPath = {
  distances: Distances,
  predecessors: Predecessors
};

export type TopologicalSort = {
  discovery: Discovery,
  finished: Finished,
  predecessors: Predecessors
};

export type Time = {
  count: number
};

export const initializeColors = (vertices: Vertex[]): Colors => {
  const color: Colors = {};

  for (let i: number = 0; i < vertices.length; i++) {
    color[vertices[i]] = Color.WHITE;
  }

  return color;
};
