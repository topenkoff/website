import { useEffect, useRef } from "react";

interface GliderProps {
  size?: number;
  bg?: string;
  fg?: string;
  gridColor?: string;
  cellSize?: number;
  stepMs?: number;
  fadeEdge?: number;
}

export default function Glider({
  size = 280,
  bg = "#000000",
  fg = "#ffffff",
  gridColor = "rgba(255,255,255,0.18)",
  cellSize = 28,
  stepMs = 260,
  fadeEdge = 0.28,
}: GliderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const DPR = window.devicePixelRatio || 1;
    const PX = size * DPR;
    canvas.width = PX;
    canvas.height = PX;

    const CELL = cellSize * DPR;
    const R = PX / 2;

    type Key = string;
    const key = (x: number, y: number): Key => `${x},${y}`;
    const parse = (k: Key): [number, number] => {
      const [a, b] = k.split(",");
      return [+a, +b];
    };

    const DIRS: [number, number][] = [
      [-1, -1], [0, -1], [1, -1],
      [-1,  0],          [1,  0],
      [-1,  1], [0,  1], [1,  1],
    ];

    function stepLife(s: Set<string>): Set<string> {
      const counts: Record<string, number> = {};
 
      Array.from(s).forEach((k) => {
        const [x, y] = parse(k);
        DIRS.forEach(([dx, dy]) => {
          const nk = key(x + dx, y + dy);
          counts[nk] = (counts[nk] ?? 0) + 1;
        });
      });
 
      const next = new Set<string>();
      Object.keys(counts).forEach((k) => {
        const c = counts[k];
        if (c === 3 || (c === 2 && s.has(k))) next.add(k);
      });
      return next;
    }

    function gliderCenter(s: Set<string>): [number, number] {
      let sx = 0, sy = 0;
      Array.from(s).forEach((k) => {
        const [x, y] = parse(k);
        sx += x; sy += y;
      });
      return [(sx / s.size) * CELL, (sy / s.size) * CELL];
    }

    // Seed glider centered at world origin.
    // Pattern cells: [1,0],[2,1],[0,2],[1,2],[2,2] — bbox center ~(1,1)
    // Offset by -1,-1 so centroid sits near (0,0)
    let cells = new Set<Key>();
    [[1, 0],[2, 1],[0, 2],[1, 2],[2, 2]].forEach(([x, y]) =>
      cells.add(key(x - 1, y - 1))
    );

    let [camX, camY] = gliderCenter(cells);
    let tcx = camX, tcy = camY;
    let lastStep = 0;
    let rafId: number;

    function draw(ts: number) {
      rafId = requestAnimationFrame(draw);

      if (ts - lastStep > stepMs) {
        cells = stepLife(cells);
        lastStep = ts;
        [tcx, tcy] = gliderCenter(cells);
      }

      camX += (tcx - camX) * 0.07;
      camY += (tcy - camY) * 0.07;

      ctx.clearRect(0, 0, PX, PX);
      ctx.save();

      // Clip to circle
      ctx.beginPath();
      ctx.arc(R, R, R, 0, Math.PI * 2);
      ctx.clip();

      // Background
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, PX, PX);

      // World-aligned grid
      const gox = ((-camX + R) % CELL + CELL) % CELL;
      const goy = ((-camY + R) % CELL + CELL) % CELL;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = DPR * 0.5;
      for (let x = gox - CELL; x < PX + CELL; x += CELL) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, PX); ctx.stroke();
      }
      for (let y = goy - CELL; y < PX + CELL; y += CELL) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(PX, y); ctx.stroke();
      }

      // Cells
      const pad = DPR * 4;
      const cs = CELL - pad * 2;
      const cr = DPR * 3;
      Array.from(cells).forEach((k) => {
        const [cx2, cy2] = parse(k);
        const sx = cx2 * CELL - camX + R;
        const sy = cy2 * CELL - camY + R;
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.roundRect(sx + pad, sy + pad, cs, cs, cr);
        ctx.fill();
      });

      // Radial vignette fade — bg color bleeds in from the edge
      const fadeStart = Math.max(0, 1 - fadeEdge) * R;
      const grd = ctx.createRadialGradient(R, R, fadeStart, R, R, R);
      grd.addColorStop(0, "transparent");
      grd.addColorStop(1, bg);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(R, R, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [size, bg, fg, gridColor, cellSize, stepMs, fadeEdge]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "block",
      }}
    />
  );
}
