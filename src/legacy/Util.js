
var Util = (function() {
 
    function getDims( elem ) {
        return {
               width  : elem.offsetWidth,
               height : elem.offsetHeight
               };
    }

    function callAfterFinalResize() {

            var callAfterFinalResizeTimeoutId,
                callback,
                delay;

            function createEnv( callbackArg, delayArg ) {
                callback = callbackArg;
                delay    = delayArg;
            }

            function execute() {
                clearTimeout( callAfterFinalResizeTimeoutId ); 
                callAfterFinalResizeTimeoutId = setTimeout( callback, delay );
            }

            return {
                   createEnv : createEnv,
                   execute   : execute
                   };
    }

    return {
           getDims              : getDims,
           callAfterFinalResize : callAfterFinalResize
           };
})();

