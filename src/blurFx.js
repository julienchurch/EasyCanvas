
var blurFx = function() {

    var canvas,
        ctx,
        blurredImgDataCallback,
        blurStack,
        radius,
        originalImgData;

    function createEnv( canvasVal, radius, BIDCallback ) {
        canvas                     = canvasVal; 
        ctx                        = canvasVal.getContext("2d");
        blurredImgDataCallback     = BIDCallback;
        originalImgData            = {
                                     id : ctx.getImageData( 0, 0, canvas.width, canvas.height ),
                                     tx : 0,
                                     ty : 0  
                                     };
        blurStack = createBlurStack( radius );
    }

    function updateRadius( radiusVal ) {
        radius = radiusVal;
    }

    function createBlurStack( radius ) {
        var s = [ originalImgData,
                  blurredImgDataCallback( Math.round( radius / 5) ),
                  blurredImgDataCallback( Math.round( radius / 4 ) ),
                  blurredImgDataCallback( Math.round( radius / 3 ) ),
                  blurredImgDataCallback( Math.round( radius / 2 ) ),
                  blurredImgDataCallback( Math.round( radius ) ) ];
        return s;
    }

    function updateBlurStack( idx, imgData ) {
        blurStack[idx] = imgData;
    }

    function getBlurStack() {
        return blurStack;
    }

    function animateBlurF( speed ) {
        // `i` is one because we can disregard stack[0], which is the original
        // image data.
        var i = 1,
            intervalSpeed = ( Math.round( speed / 4 ) === 0 ) ? 1 : ( Math.round( speed / 4 ) );
        return setInterval(function() {
            if ( i < blurStack.length ) {
                ctx.putImageData( blurStack[i].id, blurStack[i].tx, blurStack[i].ty );
                i++;
            } else {
                 clearInterval( animateBlurF );  
            }
        }, intervalSpeed );
    } 

    function animateBlurB( speed ) {
        // `i` is stack.length - 2 because we can disregard the last item in
        // in the stack, which is the fully blurred image
        var i = blurStack.length - 2,
            intervalSpeed = ( Math.round( speed / 4 ) === 0 ) ? 1 : ( Math.round( speed / 4 ) );
        return setInterval( function() {
            if ( i >= 0 ) {
                ctx.putImageData( blurStack[i].id, blurStack[i].tx, blurStack[i].ty );
                i--;
            } else {
                // Put the original image data, then exit
                clearInterval( animateBlurB );
            }
        }, intervalSpeed );
    }

    return {
        createEnv       : createEnv,
        canvas          : canvas,
        ctx             : ctx,
        createBlurStack : createBlurStack,
        updateBlurStack : updateBlurStack,
        getBlurStack    : getBlurStack,
        animateBlurF    : animateBlurF,
        animateBlurB    : animateBlurB
    };

};

