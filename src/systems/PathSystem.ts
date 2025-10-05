export interface PathWaypoint {
  x: number;
  y: number;
}

export class PathSystem {
  static readonly PATH_1: PathWaypoint[] = [
    { x: 200, y: 1000 },   // Spawn (bottom-left)
    { x: 400, y: 800 },
    { x: 600, y: 600 },
    { x: 800, y: 400 },
    { x: 960, y: 200 }     // Gate (top-center)
  ];

  static readonly PATH_2: PathWaypoint[] = [
    { x: 1720, y: 1000 },  // Spawn (bottom-right)
    { x: 1520, y: 800 },
    { x: 1320, y: 600 },
    { x: 1120, y: 400 },
    { x: 960, y: 200 }     // Gate (top-center)
  ];

  static getAllPaths(): PathWaypoint[][] {
    return [this.PATH_1, this.PATH_2];
  }

  static getRandomPath(): PathWaypoint[] {
    const paths = this.getAllPaths();
    return paths[Math.floor(Math.random() * paths.length)];
  }
}
