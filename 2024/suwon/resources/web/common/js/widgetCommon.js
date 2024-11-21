if(typeof(window.$) != 'function'){
    var jqueryIncludeSC = document.createElement("script");
    jqueryIncludeSC.setAttribute("src", "/resources/openworks/spi/jquery/jquery-1.7.1.min.js");
    jqueryIncludeSC.setAttribute("type", "text/javascript");
    document.getElementsByTagName('head')[0].appendChild(jqueryIncludeSC);
}
var webHideCheckInterval = setInterval(function(){
    try{
        $(document).ready(function(){
            $('.webHide').remove();
            clearInterval(webHideCheckInterval);
        });
    }catch(e){}
}, 1000);
