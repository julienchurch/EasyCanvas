// This is actually pretty useful and almost kinda sorta well written.
// I mean, at least the API is decent.
// Somewhere in here I reimplemented `drawImage` and `putImageData`,
// which was a dumb idea. The thought was good, but to make the API
// consistent/intuitive I'd have to judiciously reimplement all the
// 2d context methods and hope that no one called a native method on 
// `ctx` because if they did they'd probs end up very confused.
// The intent was to make them accessible without calling them on `ctx`
// (easier) and to modify or add imageData each time they were called in
// order to sync everything up right (easier and less error prone).
// I think instead of that there should be a `cacheImageData` method
// which is more explicit and meaningful than the current `setImageData`
// method, and then the filter methods should first look to the `imageData`
// property as the cache and fall back on pulling the image data directly
// from the context (which, I imagine, has a performance penalty).
function EasyCanvas() {
    
    this.canvas = document.createElement( "canvas" );
    this.ctx = this.canvas.getContext("2d");
    this.tempCanvas = undefined;
    this.imageData = undefined;

    // Create a canvas element
    this.createCanvas = function( width, height, imageData, ox, oy ) {
        var data;
        if ( imageData !== undefined ) {
            imageData.data ? data = imageData.data : data = imageData;
        }
        var canvas = document.createElement( "canvas" ),
            ctx    = canvas.getContext("2d");
        
        if ( width !== undefined && height !== undefined ) {
            canvas.width  = width;
            canvas.height = height;
        }
        if ( data !== undefined ) {
            ctx.putImageData( imageData,
            ox !== undefined ? ox : 0,
            oy !== undefined ? oy : 0 );
        }

        this.canvas = canvas;
        this.ctx = ctx;
    }

    this.setCanvas = function( foreignCanvas ) {
        this.canvas = foreignCanvas;
        this.ctx = foreignCanvas.getContext( "2d" );
    }

    this.size = function( width, height ) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    this.sizeTo = function( element ) {
        this.canvas.width  = element.offsetWidth; 
        this.canvas.height = element.offsetHeight;
    }

    this.styleAsBackground = function( parent, image ) {
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.sizeTo( parent );
        parent.insertBefore( this.canvas, parent.firstChild );
        if ( image !== undefined ) {
            this.drawCover( image );
        }
    }

    // `createTemp` will either create a canvas with the given dimensions
    // or create a scaled canvas with the same aspect ratio if given only
    // one argument
    // this.createTempCanvas = function( arg0, arg1 ) {
        // TODO: write the width/height logic 
        // this.tempCanvas = document.createElement( "canvas" );
        // this.tempCanvasCtx = this.tempCanvas.getContext( "2d" );
        // this.tempCanvas.width = this.canvas.width * arg0;
        // this.tempCanvas.height = this.canvas.height * arg0;
    // }

    this.createCanvasAndSizeTo = function( imageData, ox, oy ) {
        var canvasParent     = this.canvas.parentNode,
            canvasParentDims = {
                               width  : canvasParent.offsetWidth,
                               height : canvasParent.offsetHeight
                               };
        createCanvas( canvasParentDims.width,
                      canvasParentDims.height,
                      imageData,
                      ox,
                      oy );
    }

    this.putImageData = function( imageData, x, y ) {
        this.ctx.putImageData( imageData, x, y );
        this.imageData = imageData;
    }

    this.cacheImageData = function() {
        this.imageData = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height );
    }

    this.drawImage = function( image, x, y ) {
        this.ctx.drawImage( image, x, y );
        this.imageData = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height );
    }

    this.draw = function( img ) {
        this.ctx.drawImage( img, 0, 0 );
        this.imageData = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height );
    }

    // Get the dimensions of an image or canvas element
    function getDimensions( elem ) {
        if ( elem.nodeName === "IMG" ) {
            return {
                   width  : elem.naturalWidth,
                   height : elem.naturalHeight
                   };
        } 
        if ( elem.nodeName === "CANVAS" ) {
            return {
                   width  : elem.width,
                   height : elem.height
                   };
        }
    }

    // Get aspect ratio of an image or canvas element
    function getAspectRatio( elem ) {
        dims = getDimensions( elem );
        return ( dims.width / dims.height );
    }

    function drawCoverP( canvas, img ) {
        
        var ctx = canvas.getContext("2d"),
            canvasDims   = getDimensions( canvas ),
            imgDims      = getDimensions( img ),
            aspectCanvas = getAspectRatio( canvas ),
            aspectImage  = getAspectRatio( img );

        if ( aspectImage > aspectCanvas) {
            var scaledWidth = ( imgDims.width * ( canvasDims.height / imgDims.height ) ),
                offset      = ( canvasDims.width - scaledWidth ) / 2;
            ctx.drawImage( img, offset, 0, scaledWidth, canvasDims.height );
        } else if ( aspectImage < aspectCanvas ) {
            var scaledHeight = ( imgDims.height * ( canvasDims.width / imgDims.width ) ),
                offset       = ( canvasDims.height - scaledHeight ) / 2;
            ctx.drawImage( img, 0, offset, canvasDims.width, scaledHeight );
        } else {
            ctx.drawImage( img, 0, 0, canvasDims.width, canvasDims.height );
        }
    }

    this.drawCover = function( img ) {
        drawCoverP( this.canvas, img );
        this.imageData = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height );
    }

    function createRoundedRect( ctx, x, y, width, height, radius ) {

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
    }

    function saturateP( imageData, satVal, width, height  ) {
        var data;
        imageData.data ? data = imageData.data : data = imageData;
        var area;
        var lumR = ( 1 - satVal ) * 0.3,
            lumG = ( 1 - satVal ) * 0.6,
            lumB = ( 1 - satVal ) * 0.1;
        var r, g, b;
        // A marginal performance increase exists if the
        // height and width values are passed in directly
        ( width === undefined && height === undefined   ) ? 
        area = data.length / 4 : 
        area = width * height;
    
        for ( var i = 0; i < area; i++ ) {
            var j = i << 2;
            r = data[j];
            g = data[j + 1];
            b = data[j + 2];
            data[j] = (( lumR + satVal ) * r) + ( lumG * g ) + ( lumB * b );
            data[j + 1] = ( lumR * r ) + (( lumG + satVal ) * g ) + ( lumB * b );
            data[j + 2] = ( lumR * r ) + ( lumG * g ) + (( lumB + satVal) * b );
        }
        return imageData;
    }

    this.saturate = function( satVal, width, height ) {
        var id = saturateP( this.imageData, satVal, width, height );
        this.ctx.putImageData( id, 0, 0 );
    }

    function contrastP( imageData, contrast ) {
        var data = imageData.data;
        var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        for(var i=0;i<data.length;i+=4) {
            data[i] = factor * (data[i] - 128) + 128;
            data[i+1] = factor * (data[i+1] - 128) + 128;
            data[i+2] = factor * (data[i+2] - 128) + 128;
        }
        return imageData;
    }

    this.contrast = function( contrastVal ) {
        var id = contrastP( this.imageData, contrastVal );
        this.ctx.putImageData( id, 0, 0 );
    }

    this.blur = function( blurtype, radius ) {
        var canvas = this.canvas;
        if ( blurtype === "stackblur" ) {
            var imda = stackBlurCanvasRGB( canvas, 0, 0, canvas.width, canvas.height, radius );
            this.ctx.putImageData( imda.id, 0, 0 );
            this.imageData = imda.id;
        }
    }

    function lightenP( imageData, lightnessVal ) {
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            data[i] += lightnessVal;
            data[i+1] += lightnessVal;
            data[i+2] += lightnessVal;
        }
        return imageData;
    }
    this.lighten =function( lightnessVal ) {
        var id = lightenP( this.imageData, lightnessVal );
        this.ctx.putImageData( id, 0, 0 );
    }
}
