function galleryBlur( canvasId ) {
    var that = this;
    this.canvas    = document.getElementById( canvasId );
    this.ctx       = this.canvas.getContext("2d");
    this.container = this.canvas.parentNode.parentNode;
    this.image     = this.container.firstChild;
    this.blurcomplete  = false;
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;

    this.ctx.drawImage( this.image, 0, ( this.image.naturalHeight / 2 ) * 0.9, this.image.naturalWidth, this.image.naturalHeight, 0, ( this.canvas.height / 2 ) * 0.9, this.canvas.width, this.canvas.height );

    this.getDims = function() {
        return { x : this.canvas.width, y : this.canvas.height }
    }

    this.resize = function() {
        this.canvas.width  = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    this.container.addEventListener("mouseover", function() {
        if ( ! that.blurcomplete ) {
            console.log( that.blurcomplete );
            // var imageData = this.getBlurredImageData();

            that.ctx.putImageData( stackBlurCanvasRGB( canvasId, 0, 0, that.container.offsetWidth, that.container.offsetHeight, 40 ).id, 0, 0 );
        }
        classie.add( that.canvas, "visible" );
        that.blurcomplete = true;
        console.log( that.blurcomplete );
    });

    this.container.addEventListener("mouseout", function() {
        classie.remove( that.canvas, "visible" );
    })

}


