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

window.addEventListener("load", function() {
  var img = document.getElementById("image");
  var lblur = new LightFX(img);
  lblur.lightblur(200);
  lblur.contrast(20);
  var sblur = new LightFX(img);
  sblur.stackblur(170);
  sblur.contrast(20);
  document.body.appendChild(lblur.canvas);
  document.body.appendChild(sblur.canvas);
});
