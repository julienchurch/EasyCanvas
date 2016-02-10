window.addEventListener("load", function() {
  var sCanvas = new LightFX(),
      sImage = document.getElementById("blue_lumen");
  sCanvas.resizeTo(sImage);
  sCanvas.drawCover(sImage);
  sCanvas.contrast(30);
  sCanvas.lightness(-40);
  sCanvas.blur("stackblur", 90);
  document.body.appendChild(sCanvas.canvas);
});
