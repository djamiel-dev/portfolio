// Sunlight through a window, projected on a wall: the material of this page.
// Pure SVG geometry, rendered on the server; motion is added in CSS.

export type Window = {
  x: number; // top-left of the projected window
  y: number;
  w: number;
  h: number;
  shear: number; // how far the bottom edge shifts sideways; the sun's angle
  cols: number;
  rows: number;
  bar: number; // width of the window bars between panes
};

// Each pane is a parallelogram: the window grid, sheared by the angle of the light
function panes({ x, y, w, h, shear, cols, rows, bar }: Window) {
  const pw = (w - bar * (cols - 1)) / cols;
  const ph = (h - bar * (rows - 1)) / rows;
  const at = (u: number, v: number) => `${(x + u - (v / h) * shear).toFixed(1)},${(y + v).toFixed(1)}`;
  const out: string[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u0 = c * (pw + bar);
      const v0 = r * (ph + bar);
      out.push(`M${at(u0, v0)}L${at(u0 + pw, v0)}L${at(u0 + pw, v0 + ph)}L${at(u0, v0 + ph)}Z`);
    }
  }
  return out.join("");
}

type Props = {
  id: string;
  width: number;
  height: number;
  window: Window;
  blur: number;
  light: string; // colour of the sunlit panes
  lightOpacity: number;
  shade?: string; // optional room shade around the light
  shadeOpacity?: number;
  className?: string;
  preserve?: string;
};

export function WindowLight({ id, width, height, window: win, blur, light, lightOpacity, shade, shadeOpacity = 0, className, preserve = "xMidYMid slice" }: Props) {
  const lit = panes(win);
  const room = `M${-width},${-height}H${width * 2}V${height * 2}H${-width}Z`;
  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio={preserve} aria-hidden="true" focusable="false">
      <defs>
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>
        {shade && <path d={room + lit} fill={shade} fillOpacity={shadeOpacity} fillRule="evenodd" />}
        <path d={lit} fill={light} fillOpacity={lightOpacity} />
      </g>
    </svg>
  );
}
