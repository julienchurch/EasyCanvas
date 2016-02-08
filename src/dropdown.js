
var dropdown = function(target, dropdown) {

    window.addEventListener("mouseup", function(e) {

        if ((classie.has(dropdown, "visible")) && (! classie.has(e.target.parentElement, "dropdown-wrap"))) {
            // Basically, only remove it if it's not part of the 
            // dropdown enemble. If it is, do nothing; the toggling
            // should be handled in a separate function anyway. 
            var btnFx = target.parentElement.querySelector(".btn-fx");
            var btn = target.parentElement.querySelector(".btn");
            classie.remove(dropdown, "visible");
            classie.remove(btnFx, "visible");
            classie.remove(btn, "gaussian-blur");
        }
    }, false);

    target.addEventListener("mouseover", function(e) {
        // var dropdown = this.parentElement.querySelector(".dropdown");
        var btnFx = this.parentElement.querySelector(".btn-fx");
        var btn = this.parentElement.querySelector(".btn");

        if (! classie.has(dropdown, "visible")) {
           classie.add(btnFx, "visible");
           classie.add(btn, "gaussian-blur");
        }

    }, false);

    target.addEventListener("mouseup", function(e) {

        classie.toggle(dropdown, "visible");

    }, false);

    target.addEventListener("mouseout", function(e) {

        var btnFx = this.parentElement.querySelector(".btn-fx");
        var btn = this.parentElement.querySelector(".btn");

        if (! classie.has(dropdown, "visible")) {
            classie.remove(btnFx, "visible");
            classie.remove(btn, "gaussian-blur");
        }
    }, false);
};


// dropdown(document.querySelector(".layout-header .dropdown-wrap .target"), document.querySelector(".layout-header .dropdown-wrap .dropdown"));

