/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license Use it if you like it
 */
function RGBColor(color_string)
{
    this.ok = false;

    // strip any leading #
    if (color_string.charAt(0) == '#') { // remove # if any
        color_string = color_string.substr(1,6);
    }

    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred : 'cd5c5c',
        indigo : '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    for (var key in simple_colors) {
        if (color_string == key) {
            color_string = simple_colors[key];
        }
    }
    // emd of simple type-in colors

    // array of color definition objects
    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            this.ok = true;
        }

    }

    // validate/cleanup values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);

    // some getters
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }

    // help
    this.getHelpXML = function () {

        var examples = new Array();
        // add regexps
        for (var i = 0; i < color_defs.length; i++) {
            var example = color_defs[i].example;
            for (var j = 0; j < example.length; j++) {
                examples[examples.length] = example[j];
            }
        }
        // add type-in colors
        for (var sc in simple_colors) {
            examples[examples.length] = sc;
        }

        var xml = document.createElement('ul');
        xml.setAttribute('id', 'rgbcolor-examples');
        for (var i = 0; i < examples.length; i++) {
            try {
                var list_item = document.createElement('li');
                var list_color = new RGBColor(examples[i]);
                var example_div = document.createElement('div');
                example_div.style.cssText =
                        'margin: 3px; '
                        + 'border: 1px solid black; '
                        + 'background:' + list_color.toHex() + '; '
                        + 'color:' + list_color.toHex()
                ;
                example_div.appendChild(document.createTextNode('test'));
                var list_item_value = document.createTextNode(
                    ' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex()
                );
                list_item.appendChild(example_div);
                list_item.appendChild(list_item_value);
                xml.appendChild(list_item);

            } catch(e){}
        }
        return xml;

    }

}


if(!window.console) {
	window.console = {};
	window.console.log = function(str) {};
	window.console.dir = function(str) {};
}

if(!Array.indexOf){
	Array.prototype.indexOf = function(obj){
		for(var i=0; i<this.length; i++){
			if(this[i]==obj){
				return i;
			}
		}
		return -1;
	}
}

var DrawPage = function(imgSrcArr, drawCanvasFunc) {
	this.imgSrcList = [];
	this.imgLoadedList = [];
	this.imgSrcArr = imgSrcArr;
	this.imgLoadComplete = false;
	this.drawCanvasFunc = drawCanvasFunc;
	
	this.getImageElementBySrc = function(imgSrc) {
		for (var i=0; i<this.imgLoadedList.length; i++) {
			if(this.imgLoadedList[i].orgsrc == imgSrc) {
				return this.imgLoadedList[i];
			}
		}
		
		return new Image();
	}
	
	this.draw = function(canvasId, drawCanvasFunc) {
		if (this.imgLoadComplete || this.imgSrcArr.length == 0) {
			this.drawCanvasFunc(canvasId);
		} else {
			for(var i = 0; i < this.imgSrcArr.length; i++){
				var img = new Image();
				img.onload = function(){ this.state = 'load'; };
				img.onerror = function(){this.state = 'load'; };
			
				img.state = 'ready';
				img.src = this.imgSrcArr[i];
				img.orgsrc = this.imgSrcArr[i];
			
				this.imgLoadedList.push(img);
			}
		
			var that = this;
			var intervalId = setInterval(function() {
				for(var i = 0; i < that.imgLoadedList.length; i++){
					if(that.imgLoadedList[i].state != 'load'){
						return; 
					}
				}
		
				clearInterval(intervalId);
				that.imgLoadComplete = true;
				that.drawCanvasFunc(canvasId);
			}, 50);	
		}
	};
	
	this.clear = function(canvasId) {
		var canvas = document.getElementById(canvasId);
		var ctx = document.getElementById(canvasId).getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}

var APowerPoint = function(drawSlideObjectList, opts, id, element) {
	this.drawSlideObjectList = drawSlideObjectList;
	this.slideCnt = this.drawSlideObjectList.length - 1;
	this.opts = function(opts) {
		if (!opts) {
			opts = {};
		}
		
		if (!opts['width']) {
			opts['width'] = 800;
		}
		if (!opts['height']) {
			opts['height'] = 600;
		}
		if (!opts['abovePageCnt']) {
			opts['abovePageCnt'] = 5;
		}
		if (!opts['underPageCnt']) {
			opts['underPageCnt'] = 5;
		}
		
		return opts;
	}(opts);

	if (id) {
    this.id = id;
  } else {
  	this.id = 'powerpoint';
  }

	this.viewPageNumber = 1;
  if (element) {
    this.element = element;
  } else {
  	this.element = $(document);
  }
	this.canvasCnt = Math.min((opts['abovePageCnt'] + opts['underPageCnt'] + 1), this.slideCnt);
	this.canvasManager = null;
	this.aSlides = [];
	
  

	this.load = function(callback) {
		this.createSlides(this.opts['width'], this.opts['height']);
		this.canvasManager = new CanvasManager(this.aSlides);
		this.createCanvases(this.opts['width'], this.opts['height']);

		var that = this;

    this.onscrollstop = function(e) {
      var doc = $(this);
      var scrollTop = doc.scrollTop();
      if (typeof e == "number") {
        scrollTop = e;
      }

	  	var viewPageTopPos = scrollTop + opts['height'];/*+ ($(window).height() / 2)*/;
  		var newViewPageNumber = parseInt(viewPageTopPos / opts['height']) + 1;

		  var isPageMove = (newViewPageNumber != that.viewPageNumber);
	  	if (isPageMove) {
  			that.viewPageNumber = newViewPageNumber;
			  var pageIndexes = that.getPageIndexes(that.viewPageNumber);
		  	that.canvasManager.drawCanvases(pageIndexes['s'], pageIndexes['e']);
	  	}
    };

		this.element.bind('scrollstop', this.onscrollstop);

    callback();
	}

	this.createSlides = function(w, h) {
		for (var i=0; i<this.slideCnt; i++) {
			var aSlide = new ASlide($('#' + this.id), i+1, w, h, this.drawSlideObjectList[(i+1)]);
			this.aSlides.push(aSlide);
		}
	}

	this.createCanvases = function(w, h) {
		for (var i=0; i<this.canvasCnt; i++) {
			var aCanvas = this.canvasManager.createCanvas(w, h);
			this.aSlides[i].appendACanvas(aCanvas);
			this.aSlides[i].drawCanvas();
		}
	}
	
	this.getPageIndexes = function(pageNumber) {
		var startPageIdx = Math.max(pageNumber - this.opts['abovePageCnt'] - 1, 0);
		var endPageIdx = Math.min(pageNumber + this.opts['underPageCnt'], this.slideCnt);
		endPageIdx = Math.max(endPageIdx, this.canvasCnt);
		startPageIdx = Math.min(startPageIdx, (endPageIdx - this.canvasCnt));
		
		return {'s' : startPageIdx, 'e' : endPageIdx};
	}
}

var ACanvasUseInfo = function() {
	this.canvasUseInfoMap = {};
	
	this.init = function() {
		var that = this;
		$.each(this.canvasUseInfoMap, function(key, value) {
			that.canvasUseInfoMap[key] = false;
		});
	}
	
	this.setUse = function(canvasId, isUse) {
		this.canvasUseInfoMap[canvasId] = isUse;
	}
	
	this.isUse = function(canvasId) {
		return this.canvasUseInfoMap[canvasId];
	}
	
	this.getNotUseCanvasIds = function() {
		var canvasIds = [];
		var that = this;
		$.each(this.canvasUseInfoMap, function(key, value) {
			if (!that.isUse(key)) {
				canvasIds.push(key);
			}
		});
		return canvasIds;
	}
	
	this.length = function() {
		var len = 0;
		$.each(this.canvasUseInfoMap, function(key, value) {
			len++;
		});
		
		return len;
	}
}

var ASlide = function(parentElem, pageNum, width, height, drawSlideObject) {
	this.drawSlideObject = drawSlideObject;
	this.pageNum = pageNum;
	this.width = width;
	this.height = height;
	this.id = 'aSlide_' + (this.pageNum);
	this.aCanvas = null;
	this.slideDiv = null;
	this.loadingImageDiv = $('<div style="width:100%; height:100%; text-align:center;"><div style="font-size:30pt; margin: 30% auto auto; color:#A9A9A9;">Loading...</div></div>');
	
	this.init = function() {
		this.element = $('<div></div>');
		this.element.attr('id', this.id);
		this.element.addClass('aSlide');
		this.element.css('width', this.width + 'px');
		this.element.css('height', this.height + 'px');
		this.element.append(this.loadingImageDiv);
		parentElem.append(this.element);
	}
	
	this.getTop = function() {
		return this.element.position().top;
	}
	
	this.getLeft = function() {
		return this.element.position().left;
	}
	
	this.appendACanvas = function(aCanvas) {
		this.aCanvas = aCanvas;
		this.aCanvas.parentSlide = this;
		this.element.children().first().before(aCanvas.element);
	}
	
	this.removeACanvas = function() {
		// aCanvas.clear();
		this.drawSlideObject.clear(this.aCanvas.id);
		this.aCanvas.parentSlide = null;
		this.aCanvas = null;
		this.hideTextHtml();
		this.loadingImageDiv.show();
	}
	
	
	this.drawCanvas = function() {
		if (this.aCanvas) {
			// this.aCanvas.clear();
			this.showTextHtml(pageNum);
			this.drawSlideObject.clear(this.aCanvas.id);
			this.drawSlideObject.draw(this.aCanvas.id);
			this.loadingImageDiv.hide();
		}
	}
	
	this.showTextHtml = function(pageNum) { 
		if (this.drawSlideObject.getHTML) {
			if (this.slideDiv) {
				this.slideDiv.show();
			} else {
				this.slideDiv = $('<div id="slide" class="slide" style="border:0px none; background-color:#FFFFFF; left:0px; top:0px; width:100%; height:100%; font-size:8.3pt"></div>');
				var html = this.drawSlideObject.getHTML();
				this.slideDiv.append(html);
				this.element.append(this.slideDiv);
			}
		}
	}
	
	this.hideTextHtml = function() {
		this.slideDiv.hide();
	}
	
	this.init();
}

var ACanvas = function(id, width, height) {
	this.id = id;
	this.width = width;
	this.height = height;
	this.parentSlide = null;
	
	
	this.init = function() {
		this.element = $('<canvas></canvas>');
		this.element.attr('id', this.id);
		this.element.addClass('aCanvas');
		this.element.attr('width', this.width);
		this.element.attr('height', this.height);
	}
	
	this.init();
}

var CanvasManager = function(aSlides) {
	this.aSlides = aSlides;
	this.aCanvasUseInfo = new ACanvasUseInfo();
	this.aCanvasIdMap = {};
	this.aCanvasCnt = 0;
	
	this.createCanvas = function(w, h) {
		this.aCanvasCnt++;
		var canvasId = 'aCanvas_' + this.aCanvasCnt;
		this.aCanvasUseInfo.setUse(canvasId, true);
		
		var aCanvas = new ACanvas(canvasId, w, h);
		this.aCanvasIdMap[canvasId] = aCanvas;
		return aCanvas;
	}
	
	this.getACanvas = function(canvasId) {
		return this.aCanvasIdMap[canvasId];
	}
	
	this.drawCanvases = function(startPageIndex, endPageIndex) {
		this.aCanvasUseInfo.init();
		
		var noDrawASlides = this.getNoDrawASlide(startPageIndex, endPageIndex); 
		var notUseCanvasIds = this.aCanvasUseInfo.getNotUseCanvasIds();
		
		var that = this;
		$(notUseCanvasIds).each(function(index, canvasId) {
			var aCanvas = that.getACanvas(canvasId);
			var parentSlide = aCanvas.parentSlide;
			if (parentSlide) {
				parentSlide.removeACanvas();
			}
			
			var drawASlide = noDrawASlides[index];
			if (drawASlide) {
				drawASlide.appendACanvas(aCanvas);
				drawASlide.drawCanvas();
			}
		});
	}
	
	this.getNoDrawASlide = function(startPageIdx, endPageIdx) {
		var noDrawASlides = []; 
		for (var i=startPageIdx; i<endPageIdx; i++) {
			var aCanvas = this.aSlides[i].aCanvas;
			if (aCanvas) {
				var canvasId = aCanvas.id;
				
				this.aCanvasUseInfo.setUse(canvasId, true);
			} else {
				noDrawASlides.push(this.aSlides[i]);
			}
		}
		
		return noDrawASlides;
	}
}

var isSvgFile = function(fileName) {
	if (fileName != null) {
		var lastIndex = fileName.lastIndexOf('.');
		if(fileName.substr(lastIndex+1) == 'svg') {
			return true;
		}
	}
	
	return false;
}
var safariBlipFill2Image = function() {
	$('[class~=HasBlipFill]').hide();
	$('[class~=SafariBlipFillImage]').show();
}
var androidBlipFill2Image = function() {
	//$('[class~=HasBlipFill]').hide();
	//$('[class~=AndroidBlipFillImage]').show();
	var fillList = $('[class~=HasBlipFill]');
	var fillLen = fillList.length;
	for (var i=0; i<fillLen; i++) {
		fillList[i].setAttribute('style', 'display:none');
	}

	var imgList = $('[class~=AndroidBlipFillImage]');
	var imgLen = imgList.length;
	for (var i=0; i<imgLen; i++) {
		var styleAttr = imgList[i].getAttribute('style');
		styleAttr = styleAttr.replace('display:none', '');
		imgList[i].setAttribute('style', styleAttr);
	}
}

var onesvg2canvas = function(canvasObj, svgParentId) {

	 this.svg2canvas = function(index, svgObj) {
		 if ( !svgObj ) {
			 return;
		 }

		 var opts = {}
		 opts['ignoreMouse'] = true;
		 opts['ignoreAnimation'] = true;
		 opts['ignoreClear'] = true;
		 opts['ignoreDimensions'] = true;

		 var svgData = null;

		 if(svgObj.nodeName.toUpperCase() == 'OBJECT') {
			 svgData = svgObj.data;
			 opts['width'] = $(svgObj).width();
			 opts['height'] = $(svgObj).height();
			 opts['offsetX'] = $(svgObj).offset().left - $(canvasObj).offset().left;
			 opts['offsetY'] = $(svgObj).offset().top - $(canvasObj).offset().top;
			 if ( !isSvgFile(svgData) ) return; 
		 } else if(svgObj.nodeName.toUpperCase() == 'IMG') {
			 svgData = svgObj.src;
			 opts['width'] = $(svgObj).width();
			 opts['height'] = $(svgObj).height();
			 opts['offsetX'] = $(svgObj).offset().left - $(canvasObj).offset().left;
			 opts['offsetY'] = $(svgObj).offset().top - $(canvasObj).offset().top;
			 if ( !isSvgFile(svgData) ) return;
		 }

		 if ( svgData == null ) {
			 svgData = $.trim(svgParentObj.innerHTML);
		 }
		 /*svgParentObj.removeChild(svgObj);*/
		 $(svgObj).css('display', 'none');

		 var canvasSvg = canvg(canvasObj, svgData, opts);
		 canvasSvg.draw();
	 }

	 var svgParentObj = document.getElementById(svgParentId);
	 if ( !svgParentObj ) {
		 return;
	 }

	 var svgObjs = $(svgParentObj).children();
	 svgObjs.each(this.svg2canvas);
}
var allsvg2canvas = function(drawAreaId) {
	if( BROWSER.GRAPHIC.isDrawVML() ) {
		document.namespaces.add('v', 'urn:schemas-microsoft-com:vml');
		var v_css = document.createElement('style');
		v_css.setAttribute('type', 'text/css');
		v_css.styleSheet.cssText = 'v\:shape,v\:fill,v\:stroke,v\:line,v\:path,v\:textpath,v\:group,v\:image,v\:rect,v\:imagedata { behavior: url(#default#VML);display:inline-block; }';
		document.getElementsByTagName('head')[0].appendChild(v_css);
	}
	
	var allSvgs = [];
	this.allImagesLoaded = function() {
		for (var i=0; i<allSvgs.length; i++) {
			if (!allSvgs[i].ImagesLoaded()) return false;
		}
		return true;
	}
	
	var svgObjs = $('[class~=svg]');
	
	 var drawArea = document.getElementById(drawAreaId);
	
	 if ( drawArea ) {
		var c = document.createElement('canvas');
		if( BROWSER.GRAPHIC.isDrawVML() ) G_vmlCanvasManager.initElement(c);
		c.width = $(drawArea).width();
		c.style.width = c.width
		c.height = $(drawArea).height() + 30;
		c.style.height = c.height;
		c.style.top = 0;
		c.style.left = 0;
		/*if (drawAreaId == 'slide') { 
			c.width = drawArea.clientWidth * 3;
			c.height = drawArea.clientHeight * 3;
			c.style.left = (drawArea.clientWidth * -1) + 'px';
			c.style.top = (drawArea.clientHeight * -1) + 'px';
		}*/
		c.style.position = 'absolute'; 
	
		drawArea.insertBefore(c, drawArea.firstChild);
		var len = svgObjs.length;
		for (var i=0; i < len; i++) {
			var svgObj = svgObjs[i];
			if ( BROWSER.GRAPHIC.isDrawVML() ) {
				if ($(svgObj).attr('class').indexOf('noIE') > -1) {
					continue;
				}
			}
			if (!svgObj) {
				break;
			}
			
			var offsetX = $(svgObj).offset().left;
			var offsetY = $(svgObj).offset().top;
			var opts = {}
			opts['ignoreMouse'] = true;
			opts['ignoreAnimation'] = true;
			opts['ignoreClear'] = true;
			opts['ignoreDimensions'] = true;
			opts['offsetX'] = offsetX;
			opts['offsetY'] = offsetY;
			//opts['scaleWidth'] = c.width;
			//opts['scaleHeight'] = c.height;
			
			var svgData = null;
			
			if(svgObj.nodeName.toUpperCase() == 'OBJECT') {
				svgData = svgObj.data;
				opts['width'] = $(svgObj).width();
				opts['height'] = $(svgObj).height();
				if ( !isSvgFile(svgData) ) continue; 
			} else if(svgObj.nodeName.toUpperCase() == 'IMG') {
				svgData = svgObj.src;
				opts['width'] = $(svgObj).width();
				opts['height'] = $(svgObj).height();
				if ( !isSvgFile(svgData) ) continue;
			} 
			
			svgObj.parentNode.removeChild(svgObj);
			if ( svgData == null ) {
				var div = document.createElement('div');
				div.appendChild(svgObj);
				svgData = $.trim(div.innerHTML);
			}
			
			var canvasSvg = canvg(c, svgData, opts);
			allSvgs.push(canvasSvg);
		}
		
			this.intervalID = setInterval(function() {
				var needUpdate = false;

				if (allImagesLoaded()) {
					needUpdate = true;
				}

				// render if needed
				if (needUpdate) {
					for (var i=0; i<allSvgs.length; i++) {
						allSvgs[i].draw();
					}
					clearInterval(this.intervalID);
					return;
				}
			}, 50);
	}
}





var svg2canvg = function(img, forceFlag) {
	if( (forceFlag==null || forceFlag==false) && !BROWSER.GRAPHIC.isDrawCanvas() ) return;
	if(img == null) return;
	
   var url = null;
	if(img.nodeName.toUpperCase() == 'OBJECT') url = img.data;
	else if(img.nodeName.toUpperCase() == 'IMG') url = img.src;
   if(url == null) return;
   
	if (!isSvgFile(url)) return;
	
	var imgObj = $(img);
	var c = document.createElement('canvas');
   if( BROWSER.GRAPHIC.isDrawVML() ) G_vmlCanvasManager.initElement(c);
	var imgWidth = imgObj.width();
   var imgHeight = imgObj.height();
	c.width = imgWidth;
	c.height = imgHeight;
	
	var opts = {};
	opts['ignoreMouse'] = true;
	opts['ignoreAnimation'] = true;
	opts['ignoreClear'] = true;
	opts['ignoreDimensions'] = true;
	opts['width'] = imgWidth;
	opts['height'] = imgHeight;
	
	$(c).insertBefore(imgObj);
	imgObj.remove();
	
	var svgObj = canvg(c, url, opts);
	svgObj.draw();
}

var img2vml = function(img) {
	if( !BROWSER.GRAPHIC.isDrawVML() ) return;
	if(img == null) return;
	
	var lastIndex = img.src.lastIndexOf('.');
	if(img.src.substr(lastIndex+1) != 'svg') return;
	
	var v = document.createElement('v:rect');
	img.parentNode.insertBefore(v, img);
	v.style.width = img.width;
	v.style.height = img.height;
	v.style.top = img.offsetTop;
	v.style.left = img.offsetLeft;
	v.style.position = 'relative';
   v.stroked = false;
	var imageData = document.createElement('v:imagedata');
	imageData.setAttribute('src', img.src.substr(0, lastIndex));
	v.appendChild(imageData);
	img.parentNode.replaceChild(v, img);
}
var img2object = function(img) {
	var $img = $(img);
	var src = $img.attr('src');
	var $object = $('<object>');
	$object.width($img.width())
		.height($img.height())
		.attr('data', $img.attr('src'))
		.attr('style', $img.attr('style'))
		.attr('type', 'image/svg+xml');
	$img.replaceWith($object);
}

var objsvg2canvas = function() {
	var svgObjs = $('object[class~=svg]');
	var len = svgObjs.length;

	for(var i=0; i<len; i++) {
		svg2canvg(svgObjs[i], true);
	}
}
var deferLoadImage = function(initFlag) {
   if( BROWSER.GRAPHIC.isDrawVML() ) {
		document.namespaces.add('v', 'urn:schemas-microsoft-com:vml');
		var v_css = document.createElement('style');
		v_css.setAttribute('type', 'text/css');
		v_css.styleSheet.cssText = 'v\\:shape,v\\:fill,v\\:stroke,v\\:line,v\\:path,v\\:textpath,v\\:group,v\\:image,v\\:rect,v\\:imagedata { behavior: url(#default#VML);display:inline-block; }';
		document.getElementsByTagName('head')[0].appendChild(v_css);
	}
	var imgTags = document.getElementsByTagName('img');
	var len = imgTags.length;
	var top, viewHeight;
	
	if(initFlag==true) top = 0;
	else top = document.documentElement.scrollTop || document.body.scrollTop;
	
	if(self.innerHeight) {
		viewHeight = self.innerHeight;
	} else if(document.documentElement && document.documentElement.clientHeight) {
		viewHeight = document.documentElement.clientHeight;
	} else if(document.body) {
		viewHeight = document.body.clientHeight;
	}
	
   var curIdx = 0;
	for(var i=0; i<len; i++) {
		if(top <= imgTags[curIdx].offsetTop && imgTags[curIdx].offsetTop <= top + viewHeight) {
			if( BROWSER.GRAPHIC.isDrawVML() ) {
				var lastIndex = imgTags[curIdx].src.lastIndexOf('.');
				if(imgTags[curIdx].src.substr(lastIndex+1)=='svg') {
					img2vml(imgTags[curIdx]);
                   curIdx--;
				}
			} else if ( BROWSER.GRAPHIC.isDrawSVG() ) {
				var lastIndex = imgTags[curIdx].src.lastIndexOf('.');
				if(imgTags[curIdx].src.substr(lastIndex+1)=='svg') {
					img2object(imgTags[curIdx]);
					curIdx--;
				}
			} else if ( BROWSER.GRAPHIC.isDrawCanvas() ) {
				svg2canvg(imgTags[curIdx]);
				curIdx--;
			}
		}
       curIdx++;
	}
   // chart
	if( BROWSER.GRAPHIC.isDrawCanvas() ) {
		var obejctTags = document.getElementsByTagName('object');
		len = obejctTags.length;
	
		for(var i=0; i<len; i++) {
			svg2canvg(obejctTags[0], true);
		}
	}
}
var loadWebView = function(param){
	if( BROWSER.MOBILE.isIOS() ) {
		window.setTimeout(function () {
			document.location = 'iosBridge:loadWebView:'+param;
		}, 50);
	}
}

function showHiddenImage() {
	if ( !BROWSER.GRAPHIC.isDrawCanvas() ) {
		$('.hiddenImage').each(function() {
			$(this).css('visibility', 'visible');
		});
	}
}
String.prototype.endsWith = function(str)
{return (this.match(str+"$")==str)}

var APPTPageLoader = function(htmlPath, filesDirPath, width, height, containerId, containerWrapId) {
	this.htmlPath = htmlPath;
	this.filesDirPath = filesDirPath;
  if (containerWrapId == undefined) {
    containerWrap = undefined;
  } else {
    containerWrap = $('#' + containerWrapId);
  }
	this.aPowerPoint = new APowerPoint(DRAW_SLIDE_OBJECT_LIST, {'abovePageCnt':2, 'underPageCnt':2, 'width':width, 'height':height}, containerId, containerWrap);
	
	this.slideLoadedList = [true];
	
	this.init = function() {
		
		var len = this.aPowerPoint.drawSlideObjectList.length;
		for (var i=1; i<len; i++) {
			this.slideLoadedList.push(false);
		}
		
		var that = this;
		$.get(this.htmlPath, function(html) {
			
			$(html).find('div[id^="slide_"].slide').each(function(index) {
				var slideHtml = $(this).html();
				var pageNum = (index + 1);
				
				if (that.aPowerPoint.drawSlideObjectList[pageNum]) {
					that.aPowerPoint.drawSlideObjectList[pageNum].getHTML = function() {
						return slideHtml;
					}
					that.slideLoadedList[pageNum] = true;	
				}
			});
		});
	}
	
	this.loadPowerPoint = function(callBack) {
		var that = this;
		
		var intervalId = setInterval(function() {
			for (var i=1; i<that.slideLoadedList.length; i++) {
				if (!that.slideLoadedList[i]) {
					return;
				}
			}
			
			clearInterval(intervalId);
			that.aPowerPoint.load(callBack);
		}, 50);
	}
	
	this.init();
}
