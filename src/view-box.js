
var viewBoxCanvas     = new EasyCanvas(),
    tmpCanvas         = new EasyCanvas(),
    dropdownCanvas    = new EasyCanvas(),
    dropdownTmpCanvas = new EasyCanvas();
viewBoxCanvas.canvas.setAttribute("id", "view-box--canvas");
tmpCanvas.canvas.setAttribute("id", "view-box--canvas-tmp");
dropdownCanvas.canvas.setAttribute("id", "layout-header--dropdown-canvas");
dropdownTmpCanvas.canvas.setAttribute("id", "layout-header--dropdown-canvas-tmp");

function viewBoxBlurCallback() {
    var viewBoxImage         = document.getElementById("view-box--image"),
        viewBox              = document.getElementById("view-box"),
        viewBoxOverlay       = document.getElementById("view-box--overlay");

    viewBox.insertBefore( viewBoxCanvas.canvas, viewBoxOverlay );
    viewBox.insertBefore( tmpCanvas.canvas, viewBoxCanvas.canvas );
    viewBoxCanvas.canvas.style.position = "absolute";
    tmpCanvas.canvas.style.position = "absolute";
    viewBoxCanvas.sizeTo( viewBox );
    tmpCanvas.size( viewBox.offsetWidth >> 3, viewBox.offsetHeight >> 3 );
    tmpCanvas.drawCover( viewBoxImage);
    tmpCanvas.lighten( 100 );
    tmpCanvas.saturate( 3 );
    tmpCanvas.blur( "stackblur", 90 >> 3 );
    // viewBoxOverlay.style.background = "rgba(0,0,0,0.2)";
    viewBoxCanvas.ctx.drawImage( tmpCanvas.canvas, 0, 0, viewBoxCanvas.canvas.width, viewBoxCanvas.canvas.height );
    // This must be added for the header button function to work!
    window.UICanvas = tmpCanvas;
}

window.addEventListener("resize", function() {
    var viewBox = document.getElementById("view-box");
    viewBoxCanvas.sizeTo( viewBox );
    viewBoxCanvas.drawCover( tmpCanvas.canvas );
});

function viewBoxLayoutHeaderDropdownCallback() {
    var viewBoxImage = document.getElementById("view-box--image"),
        layoutHeaderDropdown = document.getElementById("layout-header--dropdown");
    layoutHeaderDropdown.insertBefore( dropdownCanvas.canvas, layoutHeaderDropdown.firstChild );
    dropdownCanvas.canvas.style.position = "absolute";
    dropdownCanvas.canvas.style.top = "0";
    dropdownCanvas.canvas.style.left = "0";
    dropdownCanvas.canvas.style.borderRadius = "3px";
    dropdownCanvas.canvas.width = layoutHeaderDropdown.offsetWidth; 
    dropdownCanvas.canvas.height = layoutHeaderDropdown.offsetHeight;
    dropdownCanvas.ctx.fillStyle = "black";
    dropdownCanvas.ctx.fillRect( 0, 0, dropdownCanvas.canvas.width, dropdownCanvas.canvas.height );
    dropdownCanvas.ctx.drawImage( viewBoxImage,
                                  275 + ((viewBoxImage.width - Math.min( 970, document.body.offsetWidth) ) / 2) - viewBoxImage.width, 
                                  131,
                                  viewBoxImage.width,
                                  viewBoxImage.height );
    dropdownCanvas.imageData = dropdownCanvas.ctx.getImageData( 0, 0, dropdownCanvas.canvas.width, dropdownCanvas.canvas.height );
    // A bit of tweaking went into these saturation and lightness values.
    // The result is good, but a better one would probably be obtained by
    // using this technique then making a second pass with an algo for
    // selectively bumping up the lightness and saturation of only the
    // darkest colors. I think the finished product would be marginally
    // better because going overboard with it would be too jarring. 
    // Might be worth looking into though.
    dropdownCanvas.saturate( 4 );
    dropdownCanvas.lighten( 50 );
    dropdownCanvas.blur( "stackblur", 50 );

}
