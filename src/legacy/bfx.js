function BlurFx( easyCanvas ) {

    var originalImageData, 
        cachedImageData,
        blurStack;
    this.canvas = easyCanvas.canvas;
    this.ctx = easyCanvas.ctx;
    // This creates a clone of the original `easyCanvas` (i.e., a new EasyCanvas object
    // that has the same width, height, imageData, and methods, but which is distinct).
    // Have to do it this way because there's no easy way to pass JS objects by value.
    var clone = cloneCanvas( easyCanvas );
    originalImageData = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height );

    function cloneCanvas( original ) {
        var clone = new EasyCanvas();
        clone.canvas.width = original.canvas.width;
        clone.canvas.height = original.canvas.height;
        clone.ctx.drawImage( original.canvas, 0, 0 );
        clone.cacheImageData();
        return clone;
    }

    this.cacheImageData = function() {
        cachedImageData = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height );
    }

    this.getCachedImageData = function() {
        return cachedImageData;
    }

    this.setBlurStack = function( newBlurStack ) {
        blurStack = newBlurStack;
    }

    this.getBlurStack = function() {
        return blurStack;
    }

    this.setCanvas = function( element ) {
        if ( element.nodeName === "CANVAS" ) {
            this.canvas = element;
            this.ctx = this.canvas.getContext("2d");
        } else {
            // TODO: Raise exception if it's not a CANVAS
        }
    }

    this.createBlurStack = function( blurMethod, radius ) {
        if ( blurMethod === "stackblur" ) {
            var scaledCanvas = new EasyCanvas(),
                stack = [ clone ];
            scaledCanvas.canvas.width = this.canvas.width / 8 | 0;
            scaledCanvas.canvas.height = this.canvas.height / 8 | 0;
            scaledCanvas.ctx.drawImage( this.canvas,
                                        0,
                                        0,
                                        scaledCanvas.canvas.width,
                                        scaledCanvas.canvas.height );
            scaledCanvas.cacheImageData();

            // Why 6? It just seems to look nice.
            for ( i = 1; i < 6; i ++ ) {
                var iterationRadius;
                ( ( radius / 8 | 0) / 6 ) * i < 1 ?
                iterationRadius = 1 :
                iterationRadius = ( ( radius / 8 ) / 6 ) * i;
                var blurryImageData = stackBlurCanvasRGB( scaledCanvas.canvas, 
                                                          0,
                                                          0,
                                                          scaledCanvas.canvas.width,
                                                          scaledCanvas.canvas.height,
                                                          iterationRadius ).id;
                stack[i] = new EasyCanvas();
                stack[i].width = scaledCanvas.canvas.width;
                stack[i].height = scaledCanvas.canvas.height;
                stack[i].ctx.putImageData( blurryImageData, 0, 0 );
                stack[i].cacheImageData();
                stack[i].blurLayerId = i;
            }

            blurStack = stack;
        }
    }
    
