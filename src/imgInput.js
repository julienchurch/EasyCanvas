function uploadImage(form) {
    var reader  = new FileReader();
    var input   = form.querySelector(".file-input");
    var img     = form.querySelector(".img-uploadable");

    function isAllowedType (file) {
         var allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
         if (allowedTypes.indexOf(file.type) > -1) {
             return true;
         } 
         return false;
     }

    function showImage(reader, img) {
        console.log(img);
        reader.onload = function(e) {
            img.setAttribute('src', e.target.result); 
        };
    }

    function hasFiles(input) {
        if (input.files && input.files[0]) {
            return true;
        } 
        return false; 
    }

    input.addEventListener("change", function() {
        if (hasFiles(input)) {
            var file = input.files[0];
            if (isAllowedType(file)) {
                showImage(reader, img);
                // readAsDataURL changes the readystate,
                // thereby invoking `reader.onload`
                reader.readAsDataURL(file);
            }
        }
    });
}

if ( ! document.getElementById("upload-form") === undefined ) {
    uploadImage(document.querySelector(".form-wrap"));
}
