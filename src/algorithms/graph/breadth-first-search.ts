import { Graph } from '../../data-structures/graph';
import { Queue } from '../../data-structures/queue';
import { Callback, Color, Colors, initializeColors, SorthestPath, Vertex } from '../../models/graph-model';

export const breadthFirstSearchCallback = (graph: Graph, startVertex: Vertex, callbackFn: Callback): void => {
  const vertices: Vertex[] = graph.getVertices().values();
  const colors: Colors = initializeColors(vertices);
  const queue: Queue<Vertex> = new Queue<Vertex>();

  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const u: Vertex = queue.dequeue()!;
    const neighbors: Vertex[] = graph.getNeighbors(u)!.values();

    colors[u] = Color.GREY;

    for (let i: number = 0; i < neighbors.length; i++) {
      const w: Vertex = neighbors[i];

      if (colors[w] === Color.WHITE) {
        colors[w] = Color.GREY;
        queue.enqueue(w);
      }
    }

    colors[u] = Color.BLACK;

    callbackFn(u);
  }
};

export const breadthFirstSearchSorthestPath = (graph: Graph, startVertex: Vertex): SorthestPath => {
  const vertices: Vertex[] = graph.getVertices().values();
  const colors: Colors = initializeColors(vertices);
  const queue: Queue<Vertex> = new Queue<Vertex>();

  queue.enqueue(startVertex);

  const sorthestPath: SorthestPath = {
    distances: {},
    predecessors: {}
  };

  for (let i: number = 0; i < vertices.length; i++) {
    const vertex: Vertex = vertices[i];

    sorthestPath.distances[vertex] = 0;
    sorthestPath.predecessors[vertex] = undefined;
  }

  while (!queue.isEmpty()) {
    const u: Vertex = queue.dequeue()!;
    const neighbors: Vertex[] = graph.getNeighbors(u)!.values();

    colors[u] = Color.GREY;

    for (let i: number = 0; i < neighbors.length; i++) {
      const w: Vertex = neighbors[i];

      if (colors[w] === Color.WHITE) {
        colors[w] = Color.GREY;
        queue.enqueue(w);
        sorthestPath.distances[w] = sorthestPath.distances[u] + 1;
        sorthestPath.predecessors[w] = u;
      }
    }

    colors[u] = Color.BLACK;
  }

  return sorthestPath;
};
