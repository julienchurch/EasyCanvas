
var canvasIP = (function() {

    function getDimensions( elem ) {
        if ( elem.nodeName === "IMG" ) {
            return {
                   width  : elem.naturalWidth,
                   height : elem.naturalHeight
                   };
        } 
        if ( elem.nodeName === "CANVAS" ) {
            return {
                   width  : elem.offsetWidth,
                   height : elem.offsetHeight
                   };
        }
    }

    function getAspectRatio( elem ) {
        dims = getDimensions( elem );
        return ( dims.width / dims.height );
    }

    function getImageData( canvas ) {
        // TODO: get a dump of the canvas's current image data
    }

    function drawCover( canvas, img ) {
        
        var ctx = canvas.getContext("2d"),
            canvasDims   = getDimensions( canvas ),
            imgDims      = getDimensions( img ),
            aspectCanvas = getAspectRatio( canvas ),
            aspectImage  = getAspectRatio( img );

        if ( aspectImage > aspectCanvas) {
            var scaledWidth = ( imgDims.width * ( canvasDims.height / imgDims.height ) ),
                offset      = ( canvasDims.width - scaledWidth ) / 2;
            ctx.drawImage( img, offset, 0, scaledWidth, canvasDims.height );
        } else if ( aspectImage < aspectCavnas ) {
            var scaledHeight = ( imgDims.height * ( canvasDims.width / imgDims.width ) ),
                offset       = ( canvasDims.height - scaledHeight ) / 2;
            ctx.drawImage( img, 0, offset, canvasDims.width, scaledHeight );
        } else {
            ctx.drawImage( img, 0, 0, canvasDims.width, canvasDims.height );
        }
    }

    return {
           drawCover : drawCover
           };

})();
