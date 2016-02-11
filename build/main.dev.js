function LightFX(image) {
  this.canvas = document.createElement("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.tempCanvas = undefined;
  this.imageData = undefined;
  this.cachedImageData = undefined;
  this._init(image);
}

LightFX.prototype._init = function(image) {
  if (image !== undefined) {
    this._resizeTo(this.canvas, image);
    this.ctx.drawImage(image
                      ,0
                      ,0
                      ,this.canvas.width
                      ,this.canvas.height);
  }
};

LightFX.prototype.createCanvas = function(width, height, imageData, ox, oy) {
  var data,
      canvas,
      ctx;
  if (imageData !== undefined) {
    data = imageData.data || imageData;
  }
  canvas = document.createElement("canvas");
  ctx    = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(imageData, ox, oy);
  this.canvas = canvas;
  this.ctx = ctx;
};

LightFX.prototype.replaceCanvas = function(foreignCanvas) {
  this.canvas = foreignCanvas;
  this.ctx = foreignCanvas.getContext("2d");
};

LightFX.prototype._createTempCanvas = function() {
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d");
  return {canvas : canvas
         ,ctx : ctx};
};

LightFX.prototype.resize = function(width, height) {
  this.canvas.width = width;
  this.canvas.heght = height;
};

LightFX.prototype._resizeTo = function(canvas, element) {
  canvas.width  = element.offsetWidth || element.naturalWidth || element.width;
  canvas.height = element.offsetHeight || element.naturalHeight || element.height;
};

LightFX.prototype.resizeTo = function(element) {
  this._resizeTo(this.canvas, element);
};

LightFX.prototype.styleAsBackground = function(parent, image) {
  this.canvas.style.position = "absolute";
  this.canvas.style.top = "0";
  this.canvas.style.left = "0";
  this.resizeTo(parent);
  parent.insertBefore(this.canvas, parent.firstChild);
  this.drawCover(image);
};

LightFX.prototype.createCanvasAndResizeTo = function(imageData, ox, oy) {
  var canvasParent = this.canvas.parentNode,
      canvasParentDims = { width  : canvasParent.offsetWidth
                         , height : canvasParent.offsetHeight };
  createCanvas(canvasParentDims.width
              ,canvasParentDims.height
              ,imageData
              ,ox
              ,oy);
};

LightFX.prototype.putImageData = function(imageData, x, y) {
  this.ctx.putImageData(imageData, x, y);
  this.imageData = imageData;
};

LightFX.prototype.cacheImageData = function() {
  // Breaking change: cache was originally sent to
  // this.imageData, but I'm going to deprecate that
  // property entirely because it's stupid
  this.cachedImageData = this.ctx.getImageData(0
                                              ,0
                                              ,this.canvas.width
                                              ,this.canvas.height);
};

LightFX.prototype._getImageData = function() {
  return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

LightFX.prototype.drawImage = function(image, x, y) {
  this.ctx.drawImage(image, x, y);
  this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

LightFX.prototype.draw = function(image) {
  this.ctx.drawImage(image, 0, 0);
  this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

LightFX.prototype.getDimensions = function(element) {
  if (element.nodeName === "IMG") {
    return {width  : element.naturalWidth
           ,height : element.naturalHeight};
  }
  if (element.nodeName === "CANVAS") {
    return {width  : element.width
           ,height : element.height};
  }
};

LightFX.prototype.getAspectRatio = function(element) {
  dims = this.getDimensions(element);
  return dims.width / dims.height;
};

// Methods prefixed with an underscore are loosely coupled and preserved
// in the case that they may need to be called elsewhere. The canvas is
// therefore parameterized here, and passed in by the public drawCover 
// API
LightFX.prototype._drawCover = function(canvas, image) {
  var ctx          = canvas.getContext("2d"),
      canvasDims   = this.getDimensions(canvas),
      imageDims    = this.getDimensions(image),
      aspectCanvas = this.getAspectRatio(canvas),
      aspectImage  = this.getAspectRatio(image),
      offset,
      scaledWidth;
  if ( aspectImage > aspectCanvas) {
    scaledWidth = (imageDims.width * ( canvasDims.height / imageDims.height));
    offset      = (canvasDims.width - scaledWidth) / 2;
    ctx.drawImage(image, offset, 0, scaledWidth, canvasDims.height);
  } else if (aspectImage < aspectCanvas) {
    scaledHeight = (imageDims.height * (canvasDims.width / imageDims.width));
    offset       = (canvasDims.height - scaledHeight) / 2;
    ctx.drawImage(image, 0, offset, canvasDims.width, scaledHeight);
  } else {
    ctx.drawImage(image, 0, 0, canvasDims.width, canvasDims.height);
  }
};

LightFX.prototype.drawCover = function(image) {
  this._drawCover(this.canvas, image);
  this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

LightFX.prototype.createRoundedRect = function(ctx, x, y, width, height, radius) {
  var tlh = { x : x + radius, y : y + radius },
      trh = { x : x + width - radius, y : y + radius },
      brh = { x : x + width - radius, y : y + height - radius },
      blh = { x : x + radius, y : y + height - radius };
  ctx.save();
  ctx.beginPath();
  ctx.moveTo( tlh.x, y );
  ctx.lineTo( trh.x, y );
  ctx.arc( trh.x, trh.y, radius, Math.PI * 1.5, 0 );
  ctx.lineTo( x + width, brh.y );
  ctx.arc( brh.x, brh.y, radius, 0, Math.PI * 0.5 );
  ctx.lineTo( blh.x, y + height );
  ctx.arc( blh.x, blh.y, radius, Math.PI * 0.5, Math.PI );
  ctx.lineTo( x, trh.y );
  ctx.arc( tlh.x, tlh.y, radius, Math.PI, Math.PI * 1.5 );
  ctx.closePath();
};

LightFX.prototype.saturateP = function(imageData, satVal, width, height) {
  var data;
  data = imageData.data || imageData;
  var area;
  var lumR = (1 - satVal) * 0.3,
      lumG = (1 - satVal) * 0.6,
      lumB = (1 - satVal) * 0.1;
  var r, g, b;
  // A marginal performance increase exists if the
  // height and width values are passed in directly
  if ( width === undefined && height === undefined ) {
    area = data.length / 4;
  } else {
    area = width * height;
  }

  for (var i = 0; i < area; i++) {
    var j = i << 2;
    r = data[j];
    g = data[j + 1];
    b = data[j + 2];
    data[j] = ((lumR + satVal) * r) + (lumG * g) + (lumB * b);
    data[j + 1] = (lumR * r) + ((lumG + satVal) * g) + (lumB * b);
    data[j + 2] = (lumR * r) + (lumG * g) + ((lumB + satVal) * b);
  }
  return imageData;
};

LightFX.prototype.saturate = function(satVal, width, height) {
  var id = this.saturateP(this.imageData, satVal, width, height);
  this.ctx.putImageData(id, 0, 0);
};

LightFX.prototype._contrast = function(imageData, contrast) {
  var data = imageData.data;
  var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  for(var i=0;i<data.length;i+=4) {
    data[i] = factor * (data[i] - 128) + 128;
    data[i+1] = factor * (data[i+1] - 128) + 128;
    data[i+2] = factor * (data[i+2] - 128) + 128;
  }
  return imageData;
};

LightFX.prototype.contrast = function(contrastVal) {
  var id = this._contrast(this._getImageData(), contrastVal);
  this.ctx.putImageData(id, 0, 0);
};

LightFX.prototype.stackblur = function(radius) {
  var imda = stackBlurCanvasRGB(this.canvas
                               ,0
                               ,0
                               ,this.canvas.width
                               ,this.canvas.height
                               ,radius).id;
  this.ctx.putImageData(imda, 0, 0);
};

LightFX.prototype._lightblur = function(canvas, radius) {
  var scaled = this._createTempCanvas(),
      blurryImageData,
      blurry,
      output;
  scaled.canvas.width = canvas.width / 8 | 0;
  scaled.canvas.height = canvas.height / 8 | 0;
  scaled.ctx.drawImage(canvas
                      ,0
                      ,0
                      ,scaled.canvas.width
                      ,scaled.canvas.height);
  blurryImageData = stackBlurCanvasRGB(scaled.canvas
                                      ,0
                                      ,0
                                      ,scaled.canvas.width
                                      ,scaled.canvas.height
                                      ,radius / 8 | 0).id;
  blurry = this._createTempCanvas();
  this._resizeTo(blurry.canvas, scaled.canvas);
  blurry.ctx.putImageData(blurryImageData, 0, 0);
  output = this._createTempCanvas();
  this._resizeTo(output.canvas, canvas);
  output.ctx.drawImage(blurry.canvas
                      ,0
                      ,0
                      ,blurry.canvas.width * 8
                      ,blurry.canvas.height * 8);
  // Returning canvas itself instead of image data
  // because drawImage is supposed to be faster
  // TODO: verify this claim
  return output.canvas;
};

LightFX.prototype.lightblur = function(radius) {
  var imda = this._lightblur(this.canvas, radius);
  this.canvas = imda;
  this.ctx = imda.getContext("2d");
};

LightFX.prototype._lightness = function(imageData, lightnessVal) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    data[i] += lightnessVal;
    data[i+1] += lightnessVal;
    data[i+2] += lightnessVal;
  }
  return imageData;
};

LightFX.prototype.lightness = function(lightnessVal) {
  var id = this._lightness(this._getImageData(),lightnessVal);
  this.ctx.putImageData(id, 0, 0);
};

LightFX.prototype._createBlurStack = function(canvas, radius) {
  var scaled = this._createTempCanvas(),
      stack        = [ this.canvas ],
      iterationRadius,
      blurryImageData,
      blurry;
  // Why 8? Honestly, I don't have a reason. But it looks good.
  // Monkeycode. TODO: figure out how to improve.
  scaled.canvas.width  = canvas.width  / 8 | 0;
  scaled.canvas.height = canvas.height / 8 | 0;
  scaled.ctx.drawImage(canvas
                      ,0
                      ,0
                      ,scaled.canvas.width
                      ,scaled.canvas.height);
  for (var i = 1; i < 6; i++) {
    if (((radius / 8 | 0) / 6) * i < 1) {
      console.log(true);
      iterationRadius = 1;  
    } else {
      iterationRadius = ((radius / 8) / 6) * i;
      console.log(iterationRadius);
    }
    blurryImageData = stackBlurCanvasRGB(scaled.canvas
                                        ,0
                                        ,0
                                        ,scaled.canvas.width
                                        ,scaled.canvas.height
                                        ,iterationRadius).id;
    blurry = this._createTempCanvas();
    this._resizeTo(blurry.canvas, scaled.canvas);
    blurry.ctx.putImageData(blurryImageData, 0, 0);
    console.log(iterationRadius);
    document.body.appendChild(blurry.canvas);
    stack.push(blurry.canvas);
    stack[i].blurLayerId = i;
  }
  return stack;
};

LightFX.prototype.createBlurStack = function(radius) {
  return this._createBlurStack(this.canvas, radius);
};

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
