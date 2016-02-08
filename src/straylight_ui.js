// I don't care much to do this, but for performance reasons
// this should definitely take an array of nodes and iterate
// over them using the same tempBlurredCanvas for each one
// rather than wasting resources creating a new element and
// resizing it for each overlay element

var StraylightUI = ( function() {

    function blurredOverlay() {
        this.log = function() {
            console.log( this );
        }
    }

    function getOffsets( innerElement, outerElement ) {
        var left   = innerElement.getBoundingClientRect().left - outerElement.getBoundingClientRect().left,
            top    = innerElement.getBoundingClientRect().top - outerElement.getBoundingClientRect().top,
            right  = innerElement.getBoundingClientRect().right - outerElement.getBoundingClientRect().right,
            bottom = innerElement.getBoundingClientRect().bottom - outerElement.getBoundingClientRect().bottom;
        return { left   : left
               , top    : top
               , right  : right
               , bottom : bottom
               }
    }

    function createBlurredTempCanvas( origin, radius ) {
        var blurryCanvas = new EasyCanvas();
        blurryCanvas.canvas.width  = Math.ceil( origin.width / 8 );
        blurryCanvas.canvas.height = Math.ceil( origin.height / 8 );
        blurryCanvas.ctx.drawImage( origin, 0, 0, blurryCanvas.canvas.width, blurryCanvas.canvas.height );
        if ( ( radius / 8 ) < 1 ) {
            return blurryCanvas;
        }
        blurryCanvas.blur( "stackblur", ( radius / 8 ) | 0 );
        blurryCanvas.cacheImageData();
        return blurryCanvas;
    }

    function createBoardImageBlurredOverlay( image, radius, saturation ) {
        var targetCanvas  = new EasyCanvas(), 
            blurredCanvas = createBlurredTempCanvas( image, radius ),
            container     = image.parentNode.parentNode;
        if ( saturation !== undefined ) {
            blurredCanvas.saturate( saturation );
        }
        targetCanvas.canvas.width = container.offsetWidth;
        targetCanvas.canvas.height = container.offsetHeight;
        targetCanvas.canvas.style.position = "absolute";
        targetCanvas.canvas.style.top = "0";
        targetCanvas.canvas.style.left = "0";
        targetCanvas.canvas.style.borderRadius = "3px";
        targetCanvas.ctx.drawImage( blurredCanvas.canvas,
                                    0,
                                    0,
                                    targetCanvas.canvas.width,
                                    targetCanvas.canvas.height );
        container.insertBefore( targetCanvas.canvas, container.firstChild );
    }

    function imageToCanvas( image, width, height ) {
        var tempBGCanvas = new EasyCanvas();
        tempBGCanvas.canvas.width = width;
        tempBGCanvas.canvas.height = height;
        tempBGCanvas.drawCover( image );
        return tempBGCanvas;
    }

    function getDrawOverlayDimensions( innerElement, outerElement ) {
        var offsets = getOffsets( innerElement, outerElement ),
            sWidth  = outerElement.offsetWidth  - offsets.left - offsets.right,
            sHeight = outerElement.offsetHeight - offsets.top  - offsets.bottom,
            dx      = 0,
            dy      = 0,
            dWidth  = outerElement.offsetWidth  - offsets.left - offsets.right,
            dHeight = outerElement.offsetHeight - offsets.top  - offsets.bottom;
        return { sx      : offsets.left 
               , sy      : offsets.top
               , sWidth  : sWidth
               , sHeight : sHeight
               , dx      : dx
               , dy      : dy
               , dWidth  : dWidth
               , dHeight : dHeight
               };
    }

    function styleAsOverlay( canvas ) {
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
    }

    function createOverlay( outerElement,
                            innerElement,
                            origin ) {
        var targetCanvas = new EasyCanvas(); 
        targetCanvas.styleAsBackground( innerElement );
        if ( origin.nodeName === "IMG" ) {
            origin = imageToCanvas( origin
                                  , outerElement.offsetWidth
                                  , outerElement.offsetHeight ).canvas;
        }

        var olDims = getDrawOverlayDimensions( innerElement, outerElement );
        console.log( targetCanvas );
        targetCanvas.ctx.drawImage( origin
                                  , olDims.sx
                                  , olDims.sy
                                  , olDims.sWidth
                                  , olDims.sHeight
                                  , olDims.dx
                                  , olDims.dy
                                  , olDims.dWidth
                                  , olDims.dHeight 
                                  );
        }

    function createBlurredOverlay( parentElement,
                                   childElement,
                                   origin,
                                   radius,
                                   saturation,
                                   contrast,
                                   lightness ) {
        // This is designed to accept any image (not just a canvas) in order
        // to provide a blurred overlay for parentElements that have CSS
        // backgrounds. Because I'm not completely reimplementing the CSS spec,
        // it defaults to 
        //
        // `parentElement {
        //     background-size: cover;
        //     background-position: center;`
        //  }`
        //
        // because it's the only decent background rule anyway. For backgrounds
        // concretely sized to their parent elements, this won't matter because
        // the drawCover method will do the logical thing.

        var targetCanvas = new EasyCanvas();
        targetCanvas.styleAsBackground( childElement );

        if ( origin.nodeName === "IMG" ) {
            origin = imageToCanvas( origin, 
                                    parentElement.offsetWidth,
                                    parentElement.offsetHeight ).canvas;
        }
        var blurredTempCanvas = createBlurredTempCanvas( origin, radius );
        blurredTempCanvas.cacheImageData();

        if ( saturation !== undefined ) {
            blurredTempCanvas.saturate( saturation );
        }
        if ( contrast !== undefined ) {
            blurredTempCanvas.contrast( contrast );
        }
        if ( lightness !== undefined ) {
            blurredTempCanvas.lighten( lightness );
        }

        var olDims = getDrawOverlayDimensions( childElement, parentElement );
        targetCanvas.ctx.drawImage( blurredTempCanvas.canvas
                                  , olDims.sx / 8 | 0
                                  , olDims.sy / 8 | 0
                                  , olDims.sWidth / 8 | 0
                                  , olDims.sHeight / 8 | 0
                                  , olDims.dx
                                  , olDims.dy
                                  , olDims.dWidth
                                  , olDims.dHeight 
                                  );
        }

    return { blurredOverlay                 : blurredOverlay 
           , createBlurredTempCanvas        : createBlurredTempCanvas
           , createOverlay                  : createOverlay
           , createBlurredOverlay           : createBlurredOverlay
           , createBoardImageBlurredOverlay : createBoardImageBlurredOverlay
           };
} )() ;
