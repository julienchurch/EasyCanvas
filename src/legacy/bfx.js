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
    
    this.animateF = function( speed ) {
        // `i` is one because we can disregard stack[0], which is the original
        // image data.
        var that = this, 
            i = 1,
            // This `intervalSpeed` is broken; 4 should be `blurStack.length - 2`, I think
            // but considering the performance of the function overall it might actually
            // mess things up if I do it...
            frameTransitions = blurStack.length - 2,
            intervalSpeed = ( speed / frameTransitions ) | 0 ? 
                            ( speed / frameTransitions ) | 0 :
                            10 ;
        var intervalId = setInterval( function() {
            if ( i < blurStack.length ) {
                window.requestAnimationFrame( function() {
                    that.ctx.drawImage( blurStack[i].canvas,
                                        0,
                                        0,
                                        // Apparently this math has some trouble keeping
                                        // its shit together so I'm stretching it a teeny
                                        // bit with the +10
                                        blurStack[i].canvas.width * 8 + 10,
                                        blurStack[i].canvas.height * 8 | 0 );
                    i++;
                } );
            } else {
                 clearInterval( intervalId );  
            }
        }, intervalSpeed );
    } 

    this.animateB = function( speed ) {
        // `i` is stack.length - 2 because we can disregard the last item in
        // in the stack, which is the fully blurred image
        var that = this, 
            i = blurStack.length - 2,
            frameTransitions = blurStack.length - 2,
            intervalSpeed = ( speed / frameTransitions ) | 0 ? 
                            ( speed / frameTransitions ) | 0 :
                            10 ;
        var intervalId = setInterval( function() {
            if ( i > 0 ) {
                // Temporarily commenting rAF to see what effect it has on
                // the canvas-being-drawn-too-big-in-only-the-last-drawImage-call
                // bug...
                // window.requestAnimationFrame( function() {
                    that.ctx.drawImage( blurStack[i].canvas,
                                        0,
                                        0,
                                        blurStack[i].canvas.width * 8 | 0,
                                        blurStack[i].canvas.height * 8 | 0 );
                i--;
                // } );
            } else {
                // window.requestAnimationFrame( function() {
                    that.ctx.drawImage( blurStack[i].canvas,
                                        0,
                                        0,
                                        that.canvas.width,
                                        that.canvas.height );
                // } );
                // Put the original image data, then exit
                clearInterval( intervalId );
            }
        }, intervalSpeed );
    }
}

