var Loader = (function(){
    /**
     * Load a CSS file into the head of the page
     *
     * @param {string} filename the relative filename where to find the CSS file
     * @param {function} optional callback
     * 
     * @return {Loader} for chaining
     */
    var loadCss = function(filename, callback){
        if (cssExists(filename)) return;
        var fileref=document.createElement("link"), loaded;
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        console&&console.log('Loading css ' + filename);
        if (callback) {
            fileref.onreadystatechange = fileref.onload = function() {
                if (!loaded) {
                    callback();
                }
                loaded = true;
            };
        }
        document.getElementsByTagName("head")[0].appendChild(fileref);

        return Loader;
    },

    /**
     * Load a javascript file into the head of the page
     *
     * @param {string} filename the relative filename where to find the javascript file
     * @param {function} optional callback
     * 
     * @return {Loader} for chaining
     */
    loadJs = function(filename, callback){
        if (jsExists(filename)) return;
        var fileref=document.createElement("script"), loaded;

        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
        console&&console.log('Loading js ' + filename);
        if (callback) {
            fileref.onreadystatechange = fileref.onload = function() {
                if (!loaded) {
                    callback();
                }
                loaded = true;
            };
        }
        document.getElementsByTagName("head")[0].appendChild(fileref);

        return Loader;
    },

     /**
     * Load a resource based on it's filename
     * 
     * @param {string} filename the relative filename where to find the javascript file
     * @param {function} optional callback
     * 
     * @return {Loader} for chaining
     */
    load = function(filename, callback){
        var parts = filename.match(/.*\.(.*)/);
        if (parts.length >= 2){
            var ext = parts[1];
            switch(ext){
                case 'css':
                    return loadCss(filename, callback);
                case 'js':
                    return loadJs(filename, callback);
                default:
                    console.warn('Could not determine file type for ' + filename + '.\nPlease use loadJs or loadCss.');
            }
        }   
    },

    /**
     * Checks if a css file already exists on the page
     * 
     * @param {string} filename the relative filename where to find the CSS file
     * 
     * @return boolean
     */
    cssExists = function(filename){
        var css = document.getElementsByTagName("link");
        for ( var i = 0; i < css.length; i++)
            if (filename === css[i].attributes.href.nodeValue) return true;
        return false;
    },

    /**
     * Remove css from the current page
     */ 
    unloadCss = function(regex,callback){
        var css = document.getElementsByTagName("link");
        var parent = document.getElementsByTagName("head")[0];
        for ( var i = 0; i < css.length; i++){
            if (css[i].attributes.href.nodeValue.match(regex)){
                console.log('Removed stylesheet ' + css[i].attributes.href.nodeValue);
                if (callback) {
                   callback(regex, css[i].attributes.href.nodeValue);
                }
                parent.removeChild(css[i]);
            }
        }
    }
    /**
     * Checks if a js file already exists on the page
     * 
     * @param {string} filename the relative filename where to find the JavaScript file
     * 
     * @return boolean
     */
    jsExists = function(filename){
        var js = document.getElementsByTagName("script");
        for ( var i = 0; i < js.length; i++)
            if (filename === js[i].src) return true;
        return false;
    };

    return {
            load     : load,
            loadCss  : loadCss,
            loadJs   : loadJs,
            jsExists : jsExists,
            cssExists: cssExists,
            unloadCss: unloadCss
        }
})();
