function lblur(img) {
  for (var i=0; i<30; i++) {
    var lightblur = new LightFX();
    lightblur.resizeTo(img);
    lightblur.drawCover(img);
    var qbb = lightblur.lightblur(40);
    document.body.appendChild(qbb);
  }
}

function sblur(img) {
  for (var i=0; i<30; i++) {
    var stackblur = new LightFX();
    stackblur.resizeTo(img);
    stackblur.drawCover(img);
    stackblur.blur("stackblur", 40);
    document.body.appendChild(stackblur.canvas);
  }
}

function binmoid(t) {
  return 255 / (1 + Math.pow(Math.E, -t));
} 


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
