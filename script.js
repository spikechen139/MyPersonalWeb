const canvas = document.querySelector("#signal-canvas");
const context = canvas.getContext("2d");

let width = 0;
let height = 0;
let points = [];

function resize() {
  const ratio = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(110, Math.max(48, Math.floor((width * height) / 18000)));
  points = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.34,
    vy: (Math.random() - 0.5) * 0.34,
    pulse: Math.random() * Math.PI * 2,
  }));
}

function draw() {
  context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(7, 16, 19, 0.12)";
  context.fillRect(0, 0, width, height);

  for (const point of points) {
    point.x += point.vx;
    point.y += point.vy;
    point.pulse += 0.018;

    if (point.x < -20) point.x = width + 20;
    if (point.x > width + 20) point.x = -20;
    if (point.y < -20) point.y = height + 20;
    if (point.y > height + 20) point.y = -20;
  }

  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const a = points[i];
      const b = points[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 138) {
        const alpha = (1 - distance / 138) * 0.26;
        context.strokeStyle = `rgba(87, 215, 201, ${alpha})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }
  }

  for (const point of points) {
    const glow = 1.8 + Math.sin(point.pulse) * 0.8;
    context.fillStyle = "rgba(155, 232, 111, 0.72)";
    context.beginPath();
    context.arc(point.x, point.y, glow, 0, Math.PI * 2);
    context.fill();
  }

  requestAnimationFrame(draw);
}

resize();
draw();
window.addEventListener("resize", resize);
