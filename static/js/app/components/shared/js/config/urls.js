var CLIENT_CONFIG = {}
var LoadConfig = function(){
    CLIENT_CONFIG = { 
        SERVCIE_BASE: function(){
            var base = window.location.protocol + "//" + window.location.host;
            return base;
        }
    };
}();

var Url = {
    resolveTemplateUrl: function(path){
        var internalPath = '/static/js/app/components/';
        var resolvedPath = CLIENT_CONFIG.SERVCIE_BASE() + internalPath + path;
        return resolvedPath;
    }
}