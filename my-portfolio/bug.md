# p5.js Bug Report: bezierVertex Friendly Error System Crash

## Overview
When using `p5.js` (specifically observed in version `1.11.3`), attempting to draw complex shapes using `p.bezierVertex()` inside a `p.beginShape()` and `p.endShape(p.CLOSE)` block can trigger a fatal crash related to the library's Friendly Error System (FES).

## The Error
The crash is accompanied by the following console outputs:

1. **Validation Warning**:
   ```
   🌸 p5.js says: Expected at most 5 arguments, but received more in bezierVertex().
   ```
2. **Fatal TypeError**:
   ```
   Uncaught (in promise) TypeError: can't access property "position", v3 is undefined
   visitBezierSegment custom_shapes.js:1273
   accept custom_shapes.js:267
   ...
   endShape p5.Renderer-dYA8ZX3P.js:2476
   ```

## Root Cause
In 2D mode, `bezierVertex(cx1, cy1, cx2, cy2, x, y)` legitimately requires exactly **6 parameters** (two control points and one anchor point). 

However, the Friendly Error System (`fes_core.js` and `param_validator.js`) mistakenly validates this function call against an incorrect parameter limit ("Expected at most 5 arguments"). 

When FES intercepts this call and flags it as an error, it disrupts the internal tracking of the shape's vertices. By the time `p.endShape()` is called, the renderer tries to process the bezier segment (`visitBezierSegment`) but finds that the internal vertex objects (like `v3`) are `undefined` because they were improperly handled or discarded by the FES intercept. This causes the entire `p.draw()` loop to crash and permanently halt the sketch.

## Suggested Fixes & Workarounds

### 1. Disable the Friendly Error System (Quickest Workaround)
You can completely disable FES before the p5 instance is created. This stops `param_validator.js` from intercepting the `bezierVertex` call, allowing the native drawing logic to execute normally.
```javascript
p5.disableFriendlyErrors = true; 
// Place this before initializing your p5 sketch
```

### 2. Use Primitive Shapes (Most Robust Workaround)
Avoid `beginShape()`, `curveVertex()`, and `bezierVertex()` entirely. Instead, compose your graphics using native primitive shapes that are highly stable and don't trigger complex FES validations.
```javascript
// Instead of a complex bezier body, use layered primitives:
p.ellipse(x, y, width, height);
p.triangle(x1, y1, x2, y2, x3, y3);
```
*(Note: This is the approach currently implemented in the Aquarium to ensure maximum stability without sacrificing visuals).*

### 3. Manual Bezier Interpolation
If you absolutely need a bezier curve but want to avoid `bezierVertex()`, you can calculate the points mathematically using `p.bezierPoint()` and draw them using standard `p.vertex()` calls inside a loop.
```javascript
p.beginShape();
for (let t = 0; t <= 1; t += 0.1) {
  let x = p.bezierPoint(x1, cx1, cx2, x2, t);
  let y = p.bezierPoint(y1, cy1, cy2, y2, t);
  p.vertex(x, y);
}
p.endShape(p.CLOSE);
```

### 4. Change p5.js Version (Long-term Fix)
Check the p5.js GitHub repository issues regarding `bezierVertex` and FES. Downgrading to a stable older version (e.g., `1.9.0`) or upgrading to a future patch release (`>1.11.3`) where the FES validation rules are corrected will permanently solve the problem.
