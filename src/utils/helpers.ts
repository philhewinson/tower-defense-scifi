import { PathWaypoint } from '../systems/PathSystem';

/**
 * Check if a point is too close to any path
 * Returns true if point is ON a path (invalid placement)
 */
export function isOnPath(x: number, y: number, allPaths: PathWaypoint[][]): boolean {
  const pathWidth = 50; // Half the visual path width

  for (const path of allPaths) {
    for (let i = 0; i < path.length - 1; i++) {
      const p1 = path[i];
      const p2 = path[i + 1];

      // Calculate distance from point to line segment
      const distance = distanceToLineSegment(x, y, p1.x, p1.y, p2.x, p2.y);

      if (distance < pathWidth) {
        return true; // Too close to path
      }
    }
  }

  return false; // Safe to place
}

/**
 * Calculate perpendicular distance from point to line segment
 */
function distanceToLineSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSquared = dx * dx + dy * dy;

  if (lengthSquared === 0) {
    // Line segment is a point
    return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));
  }

  // Calculate projection of point onto line
  let t = ((px - x1) * dx + (py - y1) * dy) / lengthSquared;
  t = Math.max(0, Math.min(1, t)); // Clamp to segment

  // Find closest point on segment
  const closestX = x1 + t * dx;
  const closestY = y1 + t * dy;

  // Return distance to closest point
  return Math.sqrt((px - closestX) * (px - closestX) + (py - closestY) * (py - closestY));
}
