export const noiseGLSL = /* glsl */ `
float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1,0)), u.x), mix(hash21(i + vec2(0,1)), hash21(i + vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; }
  return v;
}
`;

export const membraneVertex = /* glsl */ `
varying vec2 vP;
void main(){
  vP = position.xy / 3.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Dimensional membrane: irregular edge, energy veins, shockwave and flash, all driven by uniforms.
export const membraneFragment = /* glsl */ `
precision highp float;
uniform float uTime, uBreach, uPulse, uFlash, uIntro;
uniform vec2 uPulseOrigin;
varying vec2 vP;
${noiseGLSL}
void main(){
  vec2 p = vP;
  float r = length(p);
  float ang = atan(p.y, p.x);
  float n = fbm(p * 3.0 + uTime * 0.12);
  float edgeR = (0.2 + 0.9 * uBreach) * (0.82 + 0.26 * n + 0.05 * sin(ang * 7.0 + uTime * 0.7));
  float inside = smoothstep(edgeR, edgeR - 0.2, r);

  float v = fbm(p * 5.0 + vec2(uTime * 0.32, -uTime * 0.18));
  float ridge = pow(1.0 - abs(v * 2.0 - 1.0), 7.0);
  float swirl = fbm(vec2(ang * 1.6 + uTime * 0.35, r * 4.0 - uTime * 0.8));

  vec3 emerald = vec3(0.12, 0.86, 0.48);
  vec3 coreCol = vec3(0.88, 1.0, 0.78);

  vec3 col = vec3(0.0, 0.05, 0.03) * inside;
  col += emerald * ridge * inside * 1.25;
  col += emerald * swirl * inside * 0.32 * (1.0 - r);
  col += coreCol * pow(smoothstep(0.5, 0.0, r), 2.4) * (0.15 + uBreach * 0.55);

  float rim = smoothstep(edgeR - 0.1, edgeR, r) * smoothstep(edgeR + 0.05, edgeR, r);
  col += emerald * rim * 1.5;

  float d = length(p - uPulseOrigin);
  float wave = smoothstep(0.06, 0.0, abs(d - (1.0 - uPulse) * 1.7)) * uPulse;
  col += emerald * wave * inside * 1.4;

  col += coreCol * uFlash * 0.55 * smoothstep(1.2, 0.0, r);
  gl_FragColor = vec4(col * uIntro, 1.0);
}
`;

export const shaftVertex = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

export const shaftFragment = /* glsl */ `
precision highp float;
uniform float uTime, uStrength;
uniform vec3 uColor;
varying vec2 vUv;
${noiseGLSL}
void main(){
  float across = smoothstep(0.0, 0.5, vUv.x) * smoothstep(1.0, 0.5, vUv.x);
  float along = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.1, vUv.y);
  float flicker = 0.7 + 0.3 * fbm(vec2(vUv.x * 4.0, vUv.y * 2.0 - uTime * 0.12));
  float a = pow(across, 2.0) * along * flicker * uStrength;
  gl_FragColor = vec4(uColor * a, 1.0);
}
`;

