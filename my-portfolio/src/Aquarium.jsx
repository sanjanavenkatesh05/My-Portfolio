import { useEffect, useRef, useCallback } from 'react';
import p5 from 'p5';

/*
 * Aquarium Background — p5.js Instance Mode
 * 
 * Features:
 * - Pink LED ambient lighting with downward glow
 * - Tropical fish with realistic swimming behavior (flocking / boids)
 * - Fish follow the cursor gently
 * - Feed button drops food particles that fish swim toward
 * - Bubbles rise from the bottom
 * - Seaweed / kelp swaying at the bottom
 * - Caustic light patterns on the "floor"
 */

// ─── Cute Tropical Fish Species (Kawaii & Adorable) ───────────
const FISH_SPECIES = [
  { id: 'clown', name: 'Clownfish', src: '/fish/clownfish.svg', baseW: 170, baseH: 122, speed: 2.0, sizeVar: [0.92, 1.12] },
  { id: 'blue_tang', name: 'Blue Tang', src: '/fish/blue_tang.svg', baseW: 175, baseH: 125, speed: 2.1, sizeVar: [0.92, 1.12] },
  { id: 'angel', name: 'Regal Angelfish', src: '/fish/angelfish.svg', baseW: 180, baseH: 135, speed: 1.8, sizeVar: [0.92, 1.12] },
  { id: 'moorish', name: 'Moorish Idol', src: '/fish/moorish_idol.svg', baseW: 188, baseH: 142, speed: 1.9, sizeVar: [0.92, 1.12] },
  { id: 'discus', name: 'Golden Discus', src: '/fish/discus.svg', baseW: 178, baseH: 150, speed: 1.6, sizeVar: [0.92, 1.15] },
  { id: 'yellow_tang', name: 'Yellow Tang', src: '/fish/yellow_tang.svg', baseW: 172, baseH: 132, speed: 2.0, sizeVar: [0.90, 1.12] },
];

// Preload high-definition cute fish sprites
const FISH_SPRITES = {};
if (typeof window !== 'undefined') {
  FISH_SPECIES.forEach(sp => {
    const img = new Image();
    img.src = sp.src;
    FISH_SPRITES[sp.id] = img;
  });
}

// Shared refs accessible from sketch closure
let _foodParticles = [];
let _mousePos = { x: -9999, y: -9999 };

export default function Aquarium() {
  const containerRef = useRef(null);
  const p5Ref = useRef(null);

  const dropFood = useCallback(() => {
    const count = 8 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      _foodParticles.push({
        x: Math.random() * window.innerWidth,
        y: -10 - Math.random() * 30,
        vy: 0.4 + Math.random() * 0.6,
        size: 2.5 + Math.random() * 2.5,
        alpha: 255,
        color: [255, 200 + Math.floor(Math.random() * 55), 80 + Math.floor(Math.random() * 60)],
      });
    }
  }, []);

  useEffect(() => {
    // Robust global mouse and pointer tracking
    const handleMouseMove = (e) => {
      _mousePos = { x: e.clientX, y: e.clientY };
    };
    const handlePointerMove = (e) => {
      _mousePos = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      _mousePos = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    if (!containerRef.current || p5Ref.current) {
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    const sketch = (p) => {
      let fishes = [];
      let bubbles = [];
      let seaweeds = [];
      let causticPhase = 0;

      // Lesser quantity & bigger size for majestic presentation
      const FISH_COUNT = 6;
      const BUBBLE_COUNT = 20;
      const SEAWEED_COUNT = 14;

      // ─── Big, Cute Majestic Tropical Fish ─────────────────────────
      class Fish {
        constructor() {
          const species = FISH_SPECIES[Math.floor(p.random(FISH_SPECIES.length))];
          this.species = species;
          this.x = p.random(140, p.width - 140);
          this.y = p.random(p.height * 0.16, p.height * 0.76);
          this.preferredY = this.y; // Dedicated depth layer prevents clumping

          let dir = p.random() > 0.5 ? 1 : -1;
          let speed = p.random(1.2, species.speed);
          this.vx = dir * speed;
          this.vy = p.random(-0.15, 0.15);
          this.ax = 0;
          this.ay = 0;
          this.maxSpeed = species.speed;
          this.maxForce = 0.06;

          let s = p.random(species.sizeVar[0], species.sizeVar[1]);
          this.w = species.baseW * s;
          this.h = species.baseH * s;

          // Facing: 1 = left (SVG native orientation), -1 = right
          this.facing = this.vx > 0 ? -1 : 1;

          // Organic non-distracting turn state:
          // Fishes smoothly glide and bank over ~22 frames instead of squashing into a 2D line
          this.isTurning = false;
          this.turnProgress = 1;
          this.turnStartFacing = this.facing;
          this.turnTargetFacing = this.facing;
          this.turnCooldown = Math.floor(p.random(60, 180)); // Cooldown prevents jittery flipping

          // Curiosity: purposeful intent when following cursor
          this.curiosity = p.random(0.6, 0.95);

          this.swimPhase = p.random(p.TWO_PI);
          this.swimSpeed = p.random(0.05, 0.08);
          this.bobPhase = p.random(p.TWO_PI);
          this.noiseOffset = p.random(1000);
        }

        applyForce(fx, fy) {
          this.ax += fx;
          this.ay += fy;
        }

        flock(allFish) {
          // Generous personal space: strong dispersion so fish NEVER clump or group
          let sepX = 0, sepY = 0, sepCount = 0;
          let sepDist = this.w * 1.35;

          for (let other of allFish) {
            if (other === this) continue;
            let dx = this.x - other.x;
            let dy = this.y - other.y;
            let d = Math.hypot(dx, dy);

            if (d > 0 && d < sepDist) {
              let diffX = dx / d;
              let diffY = dy / d;
              let weight = (sepDist - d) / sepDist;
              sepX += diffX * weight;
              sepY += diffY * weight;
              sepCount++;
            }
          }

          if (sepCount > 0) {
            sepX /= sepCount;
            sepY /= sepCount;
            let mag = Math.hypot(sepX, sepY);
            if (mag > 0) {
              sepX = (sepX / mag) * this.maxSpeed - this.vx;
              sepY = (sepY / mag) * this.maxSpeed - this.vy;
            }
            let m = Math.hypot(sepX, sepY);
            if (m > this.maxForce) {
              sepX = (sepX / m) * this.maxForce;
              sepY = (sepY / m) * this.maxForce;
            }
            this.applyForce(sepX * 1.6, sepY * 1.2);
          }

          // Gentle pull toward preferred vertical depth layer to keep fish well-spaced across the tank
          let dyPreferred = this.preferredY - this.y;
          this.applyForce(0, dyPreferred * 0.001);
        }

        followCursor(mx, my) {
          if (mx < 0 || mx > window.innerWidth || my < 0 || my > window.innerHeight) return;
          let dx = mx - this.x;
          let dy = my - this.y;
          let d = Math.hypot(dx, dy);

          // Follow cursor with clear, purposeful intent when within 650px
          if (d > 75 && d < 650) {
            let speed = this.maxSpeed * (d < 160 ? (d / 160) * 0.75 + 0.25 : 1.0);
            let desiredX = (dx / d) * speed;
            let desiredY = (dy / d) * speed;
            let steerX = desiredX - this.vx;
            let steerY = desiredY - this.vy;
            let m = Math.hypot(steerX, steerY);
            let maxF = this.maxForce * 1.5;
            if (m > maxF) {
              steerX = (steerX / m) * maxF;
              steerY = (steerY / m) * maxF;
            }
            // Decisive intent: fish actively navigate towards the cursor
            this.applyForce(steerX * 1.2 * this.curiosity, steerY * 1.2 * this.curiosity);
          }
        }

        seekFood(foods) {
          let closest = null;
          let closestDist = Infinity;
          for (let food of foods) {
            let d = Math.hypot(this.x - food.x, this.y - food.y);
            if (d < closestDist && d < 350) {
              closestDist = d;
              closest = food;
            }
          }
          if (closest) {
            let dx = closest.x - this.x;
            let dy = closest.y - this.y;
            let d = Math.hypot(dx, dy);
            if (d > 0) {
              let steerX = (dx / d) * this.maxSpeed - this.vx;
              let steerY = (dy / d) * this.maxSpeed - this.vy;
              let m = Math.hypot(steerX, steerY);
              if (m > this.maxForce) {
                steerX = (steerX / m) * this.maxForce;
                steerY = (steerY / m) * this.maxForce;
              }
              this.applyForce(steerX * 2.5, steerY * 2.5);
              if (closestDist < this.w * 0.45) closest.alpha = 0;
            }
          }
        }

        update() {
          this.bobPhase += 0.018;
          this.noiseOffset += 0.006;

          let driftY = (p.noise(this.noiseOffset + 100) - 0.5) * 0.08;
          this.ay += Math.sin(this.bobPhase) * 0.015 + driftY;

          this.vx += this.ax;
          this.vy += this.ay;
          this.vy *= 0.96; // keep smooth horizontal orientation

          let speed = Math.hypot(this.vx, this.vy);
          if (speed > this.maxSpeed) {
            this.vx = (this.vx / speed) * this.maxSpeed;
            this.vy = (this.vy / speed) * this.maxSpeed;
          }

          this.x += this.vx;
          this.y += this.vy;
          this.ax = 0;
          this.ay = 0;

          // ─── Non-Distracting Turn Logic ───
          // Cooldown countdown: prevents constant back-and-forth fidgeting
          if (this.turnCooldown > 0) {
            this.turnCooldown--;
          }

          // Advance active turn animation
          if (this.isTurning) {
            this.turnProgress += 0.045; // ~22 frames smooth arc glide
            if (this.turnProgress >= 1.0) {
              this.isTurning = false;
              this.facing = this.turnTargetFacing;
              this.turnProgress = 1.0;
            }
          } else if (this.turnCooldown <= 0) {
            // Only initiate a turn when velocity STRONGLY opposes current facing direction
            // (facing = 1 swims left/negative vx, facing = -1 swims right/positive vx)
            if (this.facing === 1 && this.vx > 0.45) {
              this.isTurning = true;
              this.turnProgress = 0;
              this.turnStartFacing = 1;
              this.turnTargetFacing = -1;
              this.turnCooldown = 150 + Math.floor(Math.random() * 100); // 2.5 - 4s cooldown
            } else if (this.facing === -1 && this.vx < -0.45) {
              this.isTurning = true;
              this.turnProgress = 0;
              this.turnStartFacing = -1;
              this.turnTargetFacing = 1;
              this.turnCooldown = 150 + Math.floor(Math.random() * 100); // 2.5 - 4s cooldown
            }
          }

          // Wrap edges smoothly
          let margin = this.w * 1.2;
          if (this.x < -margin) { this.x = p.width + margin; }
          if (this.x > p.width + margin) { this.x = -margin; }
          if (this.y < 45) { this.y = 45; this.vy = Math.abs(this.vy) * 0.4; }
          if (this.y > p.height - 95) { this.y = p.height - 95; this.vy = -Math.abs(this.vy) * 0.4; }

          this.swimPhase += this.swimSpeed * (1 + speed * 0.3);

          // Occasional tiny mouth bubble
          if (p.random() < 0.002 && bubbles.length < 30) {
            let mouthFacing = this.isTurning
              ? (this.turnProgress < 0.5 ? this.turnStartFacing : this.turnTargetFacing)
              : this.facing;
            let mouthX = this.x + (mouthFacing >= 0 ? -this.w * 0.45 : this.w * 0.45);
            bubbles.push(new Bubble(mouthX, this.y - this.h * 0.05));
          }
        }

        draw() {
          p.push();
          p.translate(this.x, this.y);

          // Natural tail beat
          let gentleTailWiggle = Math.sin(this.swimPhase * 2) * 0.015;

          // Non-distracting turn calculation:
          // The fish NEVER squashes into a paper-thin card (never approaches 0 width)!
          // Instead, it stays at 84%-100% width with a soft banking tilt as if arcing through 3D water.
          let currentFacing = this.facing;
          let scaleX = 1.0;
          let bankTilt = 0;

          if (this.isTurning) {
            let t = this.turnProgress;
            // Gentle foreshortening: only dips to ~0.84 at apex (never 0!)
            scaleX = 1.0 - 0.16 * Math.sin(t * Math.PI);
            // Seamlessly flip direction at apex of arc
            currentFacing = t < 0.5 ? this.turnStartFacing : this.turnTargetFacing;
            // Soft organic banking tilt (subtle roll in water)
            bankTilt = Math.sin(t * Math.PI) * (this.turnStartFacing * 0.07);
          }

          p.rotate(gentleTailWiggle + bankTilt);
          p.scale(currentFacing * scaleX, 1);

          const sprite = FISH_SPRITES[this.species.id];
          if (sprite && sprite.complete && sprite.naturalWidth > 0) {
            // Ambient soft water shadow underneath
            p.noStroke();
            p.fill(0, 5, 20, 35);
            p.ellipse(0, this.h * 0.48, this.w * 0.7, this.h * 0.18);

            // Draw fish sprite with clean, subtle aquatic translucency
            // (natural ambient tank light, bubbles, and seaweed filter through without any artificial glow)
            p.drawingContext.save();
            p.drawingContext.globalAlpha = 0.88;
            p.drawingContext.drawImage(sprite, -this.w / 2, -this.h / 2, this.w, this.h);
            p.drawingContext.restore();
          }

          p.pop();
        }
      }

      // ─── Bubble class ────────────────────────────────────────
      class Bubble {
        constructor(startX, startY) { this.reset(startX, startY); }
        reset(startX, startY) {
          this.x = startX !== undefined ? startX : p.random(p.width);
          this.y = startY !== undefined ? startY : p.random(p.height, p.height + 200);
          this.r = startX !== undefined ? p.random(1.8, 3.8) : p.random(2.5, 7.5);
          this.speed = p.random(0.4, 1.1);
          this.wobblePhase = p.random(p.TWO_PI);
          this.wobbleAmp = p.random(0.3, 1.2);
          this.alpha = p.random(50, 110);
        }
        update() {
          this.y -= this.speed;
          this.wobblePhase += 0.03;
          this.x += Math.sin(this.wobblePhase) * this.wobbleAmp;
          if (this.y < -20) this.reset();
        }
        draw() {
          p.noFill();
          p.stroke(200, 230, 255, this.alpha);
          p.strokeWeight(0.9);
          p.ellipse(this.x, this.y, this.r * 2);
          p.noStroke();
          p.fill(255, 255, 255, this.alpha * 0.6);
          p.ellipse(this.x - this.r * 0.28, this.y - this.r * 0.28, this.r * 0.5);
        }
      }

      // ─── Seaweed class ───────────────────────────────────────
      class Seaweed {
        constructor() {
          this.x = p.random(p.width);
          this.baseY = p.height;
          this.segments = Math.floor(p.random(6, 14));
          this.segLen = p.random(12, 22);
          this.phase = p.random(p.TWO_PI);
          this.speed = p.random(0.01, 0.025);
          this.thickness = p.random(3, 6);
        }
        draw() {
          this.phase += this.speed;
          let px = this.x;
          let py = this.baseY;
          p.noFill();
          p.strokeWeight(this.thickness);
          p.beginShape();
          for (let i = 0; i <= this.segments; i++) {
            let sway = Math.sin(this.phase + i * 0.5) * (4 + i * 1.5);
            let cx = px + sway;
            let cy = py - i * this.segLen;
            let green = p.map(i, 0, this.segments, 80, 200);
            p.stroke(30, green, 60, 150 - i * 8);
            p.vertex(cx, cy);
          }
          p.endShape();
          for (let i = 2; i < this.segments; i += 2) {
            let sway = Math.sin(this.phase + i * 0.5) * (4 + i * 1.5);
            let lx = px + sway;
            let ly = py - i * this.segLen;
            p.noStroke();
            p.fill(20, p.map(i, 0, this.segments, 100, 180), 50, 100);
            p.ellipse(lx + (i % 3 === 0 ? 6 : -6), ly, 8, 5);
          }
        }
      }

      // ─── p5 SETUP ────────────────────────────────────────────
      p.setup = () => {
        const cnv = p.createCanvas(window.innerWidth, window.innerHeight);
        cnv.id('aquarium-canvas');
        // Let CSS handle the positioning via #aquarium-canvas styles
        for (let i = 0; i < FISH_COUNT; i++) fishes.push(new Fish());
        for (let i = 0; i < BUBBLE_COUNT; i++) bubbles.push(new Bubble());
        for (let i = 0; i < SEAWEED_COUNT; i++) seaweeds.push(new Seaweed());
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };

      // ─── p5 DRAW LOOP ───────────────────────────────────────
      p.draw = () => {
        // ─── Glowing Pink Neon Aquarium Water Background ─────
        p.background(24, 6, 26);

        // Water depth gradient (rich deep magenta/pink twilight)
        for (let y = 0; y < p.height; y += 4) {
          let inter = p.map(y, 0, p.height, 0, 1);
          let r = p.lerp(50, 14, inter);
          let g = p.lerp(8, 3, inter);
          let b = p.lerp(56, 22, inter);
          p.noStroke();
          p.fill(r, g, b, 230);
          p.rect(0, y, p.width, 4);
        }

        // ─── Pink LED lighting from above ────────────────────
        for (let i = 0; i < 5; i++) {
          let alpha = p.map(i, 0, 4, 24, 6);
          p.noStroke();
          for (let lx = p.width * 0.1; lx < p.width * 0.9; lx += p.width * 0.18) {
            let gy = i * p.height * 0.12;
            let gw = 140 + i * 90;
            p.fill(255, 60, 160, alpha);
            p.ellipse(lx, gy, gw, gy * 0.8 + 70);
          }
        }

        // Vibrant top-edge pink LED strip glow
        let ledGradientH = p.height * 0.38;
        for (let y = 0; y < ledGradientH; y += 3) {
          let a = p.map(y, 0, ledGradientH, 36, 0);
          p.noStroke();
          p.fill(255, 70, 170, a);
          p.rect(0, y, p.width, 3);
        }

        // ─── Caustic light patterns on floor ─────────────────
        causticPhase += 0.008;
        p.noStroke();
        for (let x = 0; x < p.width; x += 40) {
          for (let y = p.height * 0.7; y < p.height; y += 40) {
            let n = p.noise(x * 0.01, y * 0.01, causticPhase);
            let sz = n * 35;
            let alpha = n * 22;
            p.fill(255, 110, 190, alpha);
            p.ellipse(x + Math.sin(causticPhase + x * 0.01) * 10, y, sz, sz * 0.6);
          }
        }

        // ─── Sandy bottom ───────────────────────────────────
        p.noStroke();
        for (let x = 0; x < p.width; x += 3) {
          let sandH = 20 + p.noise(x * 0.02) * 15;
          let sandBright = 15 + p.noise(x * 0.05 + 100) * 12;
          p.fill(sandBright + 8, sandBright + 3, sandBright - 2, 180);
          p.rect(x, p.height - sandH, 3, sandH);
        }

        // Small pebbles
        p.randomSeed(42);
        for (let i = 0; i < 30; i++) {
          let px = p.random(p.width);
          let py = p.height - p.random(5, 22);
          let pr = p.random(2, 5);
          p.fill(p.random(20, 40), p.random(15, 30), p.random(10, 25), 120);
          p.ellipse(px, py, pr * 2, pr);
        }
        p.randomSeed(p.millis());

        // ─── Seaweed ────────────────────────────────────────
        for (let sw of seaweeds) sw.draw();

        // ─── Food particles ──────────────────────────────────
        for (let i = _foodParticles.length - 1; i >= 0; i--) {
          let f = _foodParticles[i];
          f.y += f.vy;
          f.alpha -= 0.3;
          if (f.alpha <= 0 || f.y > p.height) {
            _foodParticles.splice(i, 1);
            continue;
          }
          p.noStroke();
          p.fill(f.color[0], f.color[1], f.color[2], f.alpha);
          p.ellipse(f.x, f.y, f.size);
          p.fill(f.color[0], f.color[1], f.color[2], f.alpha * 0.3);
          p.ellipse(f.x, f.y, f.size * 2.5);
        }

        // ─── Fish ────────────────────────────────────────────
        let mx = _mousePos.x;
        let my = _mousePos.y;

        for (let fish of fishes) {
          fish.flock(fishes);
          fish.followCursor(mx, my);
          if (_foodParticles.length > 0) fish.seekFood(_foodParticles);
          fish.update();
          fish.draw();
        }

        // ─── Bubbles ─────────────────────────────────────────
        for (let b of bubbles) {
          b.update();
          b.draw();
        }

        // ─── Subtle animated light rays ──────────────────────
        p.blendMode(p.ADD);
        for (let i = 0; i < 5; i++) {
          let rx = p.width * 0.15 + i * p.width * 0.17;
          let sway = Math.sin(p.frameCount * 0.005 + i * 1.2) * 30;
          p.noStroke();
          p.fill(255, 80, 180, 3);
          p.beginShape();
          p.vertex(rx + sway - 15, 0);
          p.vertex(rx + sway + 15, 0);
          p.vertex(rx + sway + 60, p.height);
          p.vertex(rx + sway - 60, p.height);
          p.endShape(p.CLOSE);
        }
        p.blendMode(p.BLEND);

        // ─── Vignette at edges ───────────────────────────────
        let vigSize = Math.max(p.width, p.height) * 1.2;
        p.noFill();
        for (let i = 0; i < 20; i++) {
          p.stroke(5, 5, 15, 12 - i * 0.5);
          p.strokeWeight(vigSize * 0.03);
          p.ellipse(p.width / 2, p.height / 2, vigSize - i * vigSize * 0.03);
        }
        p.noStroke();
      };
    };

    p5Ref.current = new p5(sketch, containerRef.current);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* p5 canvas container - p5 creates its <canvas> element here */}
      <div ref={containerRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }} />

      {/* Feed button */}
      <button
        id="feed-fish-btn"
        onClick={dropFood}
        title="Feed the fish!"
      >
        <span className="feed-icon">🐟</span>
        <span>Feed Fish</span>
      </button>
    </>
  );
}
