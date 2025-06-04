import { Graph } from '../../data-structures/graph';
import { Callback, Color, Colors, initializeColors, Time, TopologicalSort, Vertex } from '../../models/graph-model';

const depthFirstSearchCallbackVisit = (graph: Graph, u: Vertex, colors: Colors, callbackFn: Callback): void => {
  colors[u] = Color.GREY;

  callbackFn(u);

  const neighbors: Vertex[] = graph.getNeighbors(u)!.values();

  for (let i: number = 0; i < neighbors.length; i++) {
    const w: Vertex = neighbors[i];

    if (colors[w] === Color.WHITE) {
      depthFirstSearchCallbackVisit(graph, w, colors, callbackFn);
    }
  }

  colors[u] = Color.BLACK;
};

export const depthFirstSearchCallback = (graph: Graph, callbackFn: Callback): void => {
  const vertices: Vertex[] = graph.getVertices().values();
  const colors: Colors = initializeColors(vertices);

  for (let i: number = 0; i < vertices.length; i++) {
    if (colors[vertices[i]] === Color.WHITE) {
      depthFirstSearchCallbackVisit(graph, vertices[i], colors, callbackFn);
    }
  }
};

const depthFirstSearchTopologicalSortVisit = (graph: Graph, u: Vertex, colors: Colors, topologicalSort: TopologicalSort, time: Time): void => {
  colors[u] = Color.GREY;

  topologicalSort.discovery[u] = ++time.count;

  const neighbors: Vertex[] = graph.getNeighbors(u)!.values();

  for (let i: number = 0; i < neighbors.length; i++) {
    const w: Vertex = neighbors[i];

    if (colors[w] === Color.WHITE) {
      topologicalSort.predecessors[w] = u;
      depthFirstSearchTopologicalSortVisit(graph, w, colors, topologicalSort, time);
    }
  }

  topologicalSort.finished[u] = ++time.count;

  colors[u] = Color.BLACK;
};

export const depthFirstSearchTopologicalSort = (graph: Graph): TopologicalSort => {
  const vertices: Vertex[] = graph.getVertices().values();
  const colors: Colors = initializeColors(vertices);

  const topologicalSort: TopologicalSort = {
    discovery: {},
    finished: {},
    predecessors: {}
  }

  const time: Time = {
    count: 0
  };

  for (let i: number = 0; i < vertices.length; i++) {
    topologicalSort.discovery[vertices[i]] = 0;
    topologicalSort.finished[vertices[i]] = 0;
    topologicalSort.predecessors[vertices[i]] = undefined;
  }

  for (let i: number = 0; i < vertices.length; i++) {
    if (colors[vertices[i]] === Color.WHITE) {
      depthFirstSearchTopologicalSortVisit(graph, vertices[i], colors, topologicalSort, time);
    }
  }

  return topologicalSort;
};
