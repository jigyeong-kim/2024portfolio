var viewProp = function () {
    var allHtml = "";

    for (var x = 0 ; x < arguments.length ; x++) {
        var obj = arguments[x];

        var names = "<table border='1' cellspacing='1' cellpadding='1'><tr>";
        if (obj.toString().substr(0,8) === '[object ') {
            names += "<td>name</td><td>value</td></tr>";
            var arr = new Array();
            for (var name in obj) {
                arr.push(name);
            }
            arr.sort();
            for (var i = 0 ; i < arr.length ; i++) {
                var key = arr[i];
                names += "<tr><td>";
                names += key;
                names +='</td><td>' ;
                names += obj[key];
                names += '</td></tr>';
            }
            names += "</table>";
            arr = null;
        } else {
            names += "<td>value</td></tr>";
            names += "<tr><td>";
            names += obj;
            names += '</td></tr>';
        }
        allHtml += names + "<br/>";
    }

    var pop = window.open("", "viewProperty", "", "");
    pop.focus();
    pop.document.body.innerHTML = allHtml.fixed();

};

/**
 * Openworks.is는 Ext.is(vers.4.1) 소스를 사용하였음.
 * Extjs 3.4 버전에서는 모바일 기기에 대한 처리가 없어서 4.1버전을 사용함
 */
var Openworks = Openworks || {};
Openworks.is = {
    init : function(navigator) {
        var platforms = this.platforms,
            ln = platforms.length,
            i, platform;

        navigator = navigator || window.navigator;

        for (i = 0; i < ln; i++) {
            platform = platforms[i];
            this[platform.identity] = platform.regex.test(navigator[platform.property]);
        }

        /**
         * @property Desktop True if the browser is running on a desktop machine
         * @type {Boolean}
         */
        this.Desktop = this.Mac || this.Windows || (this.Linux && !this.Android);
        /**
         * @property Tablet True if the browser is running on a tablet (iPad)
         */
        this.Tablet = this.iPad;
        /**
         * @property Phone True if the browser is running on a phone.
         * @type {Boolean}
         */
        this.Phone = !this.Desktop && !this.Tablet;
        /**
         * @property iOS True if the browser is running on iOS
         * @type {Boolean}
         */
        this.iOS = this.iPhone || this.iPad || this.iPod;
        
        /**
         * @property Standalone Detects when application has been saved to homescreen.
         * @type {Boolean}
         */
        this.Standalone = !!window.navigator.standalone;
    },
    
    /**
     * @property iPhone True when the browser is running on a iPhone
     * @type {Boolean}
     */
    platforms: [{
        property: 'platform',
        regex: /iPhone/i,
        identity: 'iPhone'
    },
    
    /**
     * @property iPod True when the browser is running on a iPod
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /iPod/i,
        identity: 'iPod'
    },
    
    /**
     * @property iPad True when the browser is running on a iPad
     * @type {Boolean}
     */
    {
        property: 'userAgent',
        regex: /iPad/i,
        identity: 'iPad'
    },
    
    /**
     * @property Blackberry True when the browser is running on a Blackberry
     * @type {Boolean}
     */
    {
        property: 'userAgent',
        regex: /Blackberry/i,
        identity: 'Blackberry'
    },
    
    /**
     * @property Android True when the browser is running on an Android device
     * @type {Boolean}
     */
    {
        property: 'userAgent',
        regex: /Android/i,
        identity: 'Android'
    },
    
    /**
     * @property Mac True when the browser is running on a Mac
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /Mac/i,
        identity: 'Mac'
    },
    
    /**
     * @property Windows True when the browser is running on Windows
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /Win/i,
        identity: 'Windows'
    },
    
    /**
     * @property Linux True when the browser is running on Linux
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /Linux/i,
        identity: 'Linux'
    }]
};

Openworks.is.init();

function get_version_of_IE () { 
    var word; 
    var version = "N/A"; 
    var agent = navigator.userAgent.toLowerCase(); 
    var name = navigator.appName; 
     
    if (name == "Microsoft Internet Explorer"){
        // IE old version ( IE 10 or Lower )
        word = "msie ";
    } else { 
        if (agent.search("trident") > -1){
            // IE 11
            word = "trident/.*rv:"; 
        } else if (agent.search("edge/") > -1){
            // Microsoft Edge
            word = "edge/"; 
        }
    } 

    var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 

    if (  reg.exec( agent ) != null  ){
        version = RegExp.$1 + RegExp.$2;
    }

    return version; 
}
    
var anlzBorwserName = '';
var anlzBorwserVers = '';
var anlzOSName = '';
var anlzBorwserDetector = function() {
    
    var userAgent = navigator.userAgent.toLowerCase();
    $.browser.edge = /edge|edg/.test(userAgent);
    $.browser.chrome = /chrome/.test(userAgent);
    
    var msieVer = get_version_of_IE();
    
    if(msieVer != "N/A"){
        if($.browser.edge){
            anlzBorwserName = 'Edge';
            anlzBorwserVers = '';
        }else{
            anlzBorwserName = 'Internet Explorer';
            anlzBorwserVers = msieVer.substring(0, msieVer.indexOf(".")) + ".x";
        }
    } else if($.browser.edge){
        anlzBorwserName = 'Edge';
        anlzBorwserVers = '';
    } else if($.browser.chrome){
        anlzBorwserName = 'Chrome';
        anlzBorwserVers = '';
    } else {
        var vers = String($.browser.version);
        if ($.browser.msie){
            anlzBorwserName = 'Internet Explorer';
            anlzBorwserVers = vers.substring(0, vers.indexOf(".")) + ".x";
        } else if ($.browser.safari){
            anlzBorwserName = 'Safari';
            //anlzBorwserVers = vers.substring(0, 2) + ".x";
            anlzBorwserVers = '';
        } else if ($.browser.mozilla){
            if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
                anlzBorwserName = 'Firefox';
                //anlzBorwserVers = vers.substring(0, 2) + ".x";
                anlzBorwserVers = '';
            } else {
                anlzBorwserName = 'Mozilla';
                //anlzBorwserVers = vers.substring(0, 2) + ".x";
                anlzBorwserVers = '';
            }
        } else if ($.browser.opera){
            anlzBorwserName = 'Opera';
            //anlzBorwserVers = vers.substring(0, 2) + ".x";
            anlzBorwserVers = '';
        }
    }
};

var anlzOSDetector = function() {
    if (Openworks.is.Android) {
        anlzOSName = 'Android';
    } else if (Openworks.is.Blackberry) {
        anlzOSName = 'Blackberry';
//    } else if (Openworks.is.Desktop) {
//        anlzOSName = 'Desktop';
    } else if (Openworks.is.Linux) {
        anlzOSName = 'Linux';
    } else if (Openworks.is.Mac) {
        anlzOSName = 'Mac';
//    } else if (Openworks.is.Phone) {
//        anlzOSName = 'Phone';
//    } else if (Openworks.is.Tablet) {
//        anlzOSName = 'Tablet';
    } else if (Openworks.is.Windows) {
        anlzOSName = 'Windows';
    } else if (Openworks.is.iOS) {
        anlzOSName = 'iOS';
//    } else if (Openworks.is.iPad) {
//        anlzOSName = 'iPad';
//    } else if (Openworks.is.iPhone) {
//        anlzOSName = 'iPhone';
//    } else if (Openworks.is.iPod) {
//        anlzOSName = 'iPod';
    } else {
//        var _userAgent = 
//        if
        anlzOSName = 'etc';
    }
};

$(document).ready(function() {
    anlzBorwserDetector(); 
    anlzOSDetector();
});