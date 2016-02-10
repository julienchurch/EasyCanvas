function qblur(img) {
  for (var i=0; i<30; i++) {
    var quickblur = new LightFX();
    quickblur.resizeTo(img);
    quickblur.drawCover(img);
    var qbb = quickblur.quickblur(40);
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
  // sblur(img);
  qblur(img);
});
