
function dd( target, dropdown, indicator ) {
    var isOpened = false;
    // this.getState = function() { return isOpened };
    this.target   = target;
    this.dropdown = dropdown;

    function hasAncestor( element, ancestor ) {
        if ( element === null ) {
            return false;
        }
        if ( element.parentNode === ancestor ) {
            return true;
        } else {
            return hasAncestor( element.parentNode, ancestor );
        }
        // return element.parentNode === ancestor ?
        // true :
        // hasAncestor( element.parentNode, ancestor );
    }

    function _open( element ) {
        if ( classie.has( element, "closed" ) ) {
            classie.remove( element, "closed" );
        }
        classie.add( element, "opened" );
        isOpened = true;
    }

    this.open = function() {
        args = Array.prototype.slice.call( arguments ).filter( function( arg ) {
            return arg !== undefined;
        } );
        args.map( _open );
    }

    function _close( element ) {
        if ( classie.has( element, "opened" ) ) {
            classie.remove( element, "opened" );
        }
        classie.add( element, "closed" );
        isOpened = false;
    }

    this.close = function() {
        args = Array.prototype.slice.call( arguments );
        args.map( _close );
    }

    window.addEventListener( "mouseup", function( e ) {
        if ( ( e.target === dropdown || hasAncestor( e.target, dropdown ) ) && isOpened ) {
            return;
        } else if ( ( e.target === target || hasAncestor( e.target, target ) ) && isOpened ) {
            this.close( target, dropdown );
        } else if ( ( e.target === target || hasAncestor( e.target, target ) ) && !isOpened ) {
            this.open( target, dropdown )
        } else if ( e.target !== dropdown && isOpened ) {
            this.close( target, dropdown );
        } 
    }.bind( this ) );
}

