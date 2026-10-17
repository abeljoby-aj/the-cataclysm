import * as THREE from "three";
import { mulberry32 } from "@/lib/random";

/** Irregular extruded arc plate in the XY plane, depth along +Z. */
export function createFracturedPlate(seed: number, a0: number, a1: number, innerR: number, outerR: number, depth: number) {
  const rnd = mulberry32(seed);
  const shape = new THREE.Shape();
  const steps = 3 + Math.floor(rnd() * 3);
  const pt = (angle: number, r: number) => new THREE.Vector2(Math.cos(angle) * r, Math.sin(angle) * r);

  const outer: THREE.Vector2[] = [];
  const inner: THREE.Vector2[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = a0 + (a1 - a0) * t + (i > 0 && i < steps ? (rnd() - 0.5) * 0.05 : 0);
    outer.push(pt(angle, outerR * (1 + (rnd() - 0.5) * 0.18)));
    inner.push(pt(angle + (rnd() - 0.5) * 0.04, innerR * (1 + (rnd() - 0.5) * 0.22)));
  }
  // A chipped corner breaks the otherwise regular silhouette.
  outer[steps] = pt(a1 - (a1 - a0) * (0.12 + rnd() * 0.18), outerR * (0.72 + rnd() * 0.2));

  shape.moveTo(outer[0].x, outer[0].y);
  for (let i = 1; i < outer.length; i++) shape.lineTo(outer[i].x, outer[i].y);
  for (let i = inner.length - 1; i >= 0; i--) shape.lineTo(inner[i].x, inner[i].y);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 1 });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

/** Jagged crystalline shard; non-uniform scale and vertex jitter give distinct silhouettes. */
export function createShard(seed: number, detail = 0) {
  const rnd = mulberry32(seed);
  const geometry = new THREE.IcosahedronGeometry(1, detail);
  const pos = geometry.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const k = 0.65 + rnd() * 0.7;
    pos.setXYZ(i, v.x * k * (0.5 + rnd() * 0.25), v.y * k * 1.5, v.z * k * 0.45);
  }
  // IcosahedronGeometry is already non-indexed, so vertex jitter keeps faces flat.
  geometry.computeVertexNormals();
  return geometry;
}

/** Armored mask silhouette: hood, faceplate and eye slits built from extruded polygons. */
export function createMaskParts() {
  const mirror = (half: [number, number][]) => {
    const left = half.map(([x, y]) => [-x, y] as [number, number]).reverse();
    return [...half, ...left];
  };
  const toShape = (pts: [number, number][]) => {
    const s = new THREE.Shape();
    pts.forEach(([x, y], i) => (i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)));
    s.closePath();
    return s;
  };
  const extrude = (shape: THREE.Shape, depth: number) => {
    const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 1 });
    g.computeVertexNormals();
    return g;
  };

  const hood = extrude(toShape(mirror([[0, 8.2], [4.2, 7.0], [6.1, 3.2], [6.4, -1.5], [5.0, -5.5], [2.6, -8.4], [0, -9.2]])), 1.0);
  const face = extrude(toShape(mirror([[0, 5.8], [2.5, 5.0], [3.6, 3.0], [3.7, 0.2], [3.1, -2.4], [2.0, -4.6], [0.9, -6.0], [0, -6.3]])), 0.9);
  const brow = extrude(toShape(mirror([[0, 3.2], [3.3, 3.7], [3.5, 2.7], [0.6, 2.0], [0, 2.3]])), 1.1);
  const eyes = extrude(toShape(mirror([[0.55, 1.0], [2.9, 1.5], [3.0, 1.1], [1.3, 0.35], [0.55, 0.45]])), 1.15);
  const nose = extrude(toShape(mirror([[0, 1.2], [0.4, 0.2], [0.55, -2.2], [0, -2.8]])), 1.2);
  const grille = extrude(toShape(mirror([[0, -3.9], [1.2, -3.7], [1.5, -5.0], [0, -5.6]])), 1.05);
  return { hood, face, brow, eyes, nose, grille };
}

/** Small tileable noise texture used for scratched roughness/bump variation. */
export function createScratchTexture(size = 128) {
  const rnd = mulberry32(90210);
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const grain = 90 + rnd() * 120;
      const scratch = rnd() > 0.992 ? 255 : 0;
      const v = Math.max(grain, scratch);
      data[i] = data[i + 1] = data[i + 2] = v;
      data[i + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(0.35, 0.35);
  tex.needsUpdate = true;
  return tex;
}
