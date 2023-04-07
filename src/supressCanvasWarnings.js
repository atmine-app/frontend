const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;

CanvasRenderingContext2D.prototype.getImageData = function (...args) {
  const canvas = this.canvas;
  if (!canvas._willReadFrequently) {
    canvas._willReadFrequently = true;
    canvas.style.willChange = "pixel contents";
  }
  return originalGetImageData.apply(this, args);
};

if (process.env.NODE_ENV !== "production") {
  const ignoredWarnings = [
    "Canvas2D: Multiple readback operations using getImageData are faster",
  ];

  const originalConsoleWarn = console.warn;

  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      ignoredWarnings.some((ignored) => args[0].startsWith(ignored))
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}
