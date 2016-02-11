window.addEventListener("load", function() {
  var img = document.getElementById("image");
  var lblur = new LightFX(img);
  lblur.canvas.addEventListener("mouseenter", function() {
    lblur.blurIn(150, 140);
  });
  lblur.canvas.addEventListener("mouseleave", function() {
    lblur.blurOut(150, 140);
  });
  var sblur = new LightFX(img);
  document.body.appendChild(lblur.canvas);
});
