const canvas = document.getElementById("skyCanvas");
const ctx = canvas.getContext("2d");
let img = new Image();
img.src = "ocean-horizon.png";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Scale image to fit screen
  const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  const x = (canvas.width / 2) - (img.width / 2) * scale;
  const y = (canvas.height / 2) - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  requestAnimationFrame(draw);
}

img.onload = () => requestAnimationFrame(draw);

// Interactivity: slight parallax shift with mouse
window.addEventListener("mousemove", (e) => {
  const offsetX = (e.clientX / window.innerWidth - 0.5) * 20;
  const offsetY = (e.clientY / window.innerHeight - 0.5) * 10;
  canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.02)`;
});
