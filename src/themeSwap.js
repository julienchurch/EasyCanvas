
var theme = (function() {
    var toggles        = [],
        themes         = [],
        themedElements = [];

    function nodeListToArray( nl ) {
        if ( nl instanceof NodeList || nl instanceof HTMLCollection ) {
            nl = Array.prototype.slice.call( nl, 0 );
        }
        return nl;
    }

    // addthemes -> []
    function addThemes( arr ) {
        arr = nodeListToArray( arr );
        themes = themes.concat( arr );
    }

    // addThemedElements -> []
    function addThemedElements( arr ) {
        arr = nodeListToArray( arr );
        themedElements = themedElements.concat( arr );
    }

    function addToggle( toggle, eventListener, newTheme ) {
        toggles.push( toggle );
        toggle.addEventListener( eventListener, function() {
            for ( var t in themes ) {
                for ( var te in themedElements ) {
                    if ( classie.has( themedElements[te], "theme-" + themes[t] ) ) {
                        classie.remove( themedElements[te], "theme-" + themes[t] );
                    }
                    classie.add( themedElements[te], newTheme );
                }
            }
        } );
    }

    function getToggles() {
        return toggles;
    }

    function getThemes() {
        return themes;
    }

    function getThemedElements() {
        return themedElements;
    }

    return {
           addThemes         : addThemes,
           addThemedElements : addThemedElements,
           addToggle         : addToggle,
           getToggles        : getToggles,
           getThemes         : getThemes,
           getThemedElements : getThemedElements
           };

})();



// var themeMidnightToggle = document.getElementById("theme-midnight-toggle");
// theme.addThemes( ["theme-default", "theme-midnight"] );
// theme.addThemedElements( document.getElementsByClassName("themed") );
// theme.addToggle( themeMidnightToggle, "click", "theme-midnight" );

// The following is just to test that everything works across themes
// var teli = Array.prototype.slice.call( document.getElementsByClassName("themed"), 0 );
// for ( te in teli ) {
    // console.log("The thing is: " + teli[te]);
    // classie.remove( teli[te], "theme-default" );
    // classie.add( teli[te], "theme-midnight" );
// }
