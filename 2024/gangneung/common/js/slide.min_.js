var Slide=function(selector,slideCount,slideControl,slideList,stepSize,animateSpeed,intervalTime,autoPlay,loop,direction,type,slidea){this._selector=selector;this._slideCount=slideCount;this._slideControl=slideControl;this._slideList=slideList;this._stepSize=stepSize;this._animateSpeed=animateSpeed;this._intervalTime=intervalTime;this._autoPlay=autoPlay;this._loop=loop;this._slideNumber=0;this._slidePosition=0;this._interval=null;this._animated=false;this._playing=false;this._direction=direction;this._type=type;this._basePosition='';this._orgLeft=0;this._slidea=slidea;this._assignElements();this._bindEvents();this._init();};Slide.prototype={_assignElements:function(){this._$selector=$(this._selector);this._$slideCount=this._$selector.find(this._slideCount.slideCount);this._$slideCurrent=this._$slideCount.find(this._slideCount.slideCurrent);this._$slideTotal=this._$slideCount.find(this._slideCount.slideTotal);this._$slideControl=this._$selector.find(this._slideControl.slideControl);this._$slideControlPlay=this._$slideControl.find(this._slideControl.slideControlPlay);this._$slideList=this._$selector.find(this._slideList.slideList);this._$slideItem=this._$slideList.find(this._slideList.slideItem);},resize:function(){this._assignElements();if(this._type==='horizontal'){this._stepSize=this._$slideItem[0].offsetWidth;if(this._$slideList.css(this._basePosition)!=='0px'){this._$slideList.css("left",-this._stepSize);}}else if(this._type==='vertical'){this._stepSize=this._$slideItem[0].offsetHeight;if(this._$slideList.css(this._basePosition)!=='0px'){this._$slideList.css("top",-this._stepSize);}}},_bindEvents:function(){this._$slideControl.on('click',this._slideControl.slideControlPrev,$.proxy(this.clickSlidePrev,this));this._$slideControl.on('click',this._slideControl.slideControlNext,$.proxy(this.clickSlideNext,this));this._$slideControl.on('click',this._slideControl.slideControlPlay,$.proxy(this.toggleAutoPlay,this));},_init:function(){this._orgLeft=parseInt(this._$slideList.css("left"),10);this._slideTotal=this._$slideItem.length;if(!this._slideTotal){return false;}if(this._type==='horizontal'){if(this._stepSize===0){this._stepSize=this._$slideItem[0].offsetWidth;}this._basePosition='left';}else if(this._type==='vertical'){if(this._stepSize===0){this._stepSize=this._$slideItem[0].offsetHeight;}this._basePosition='top';}else{return false;}if(this._slideTotal<=1){this._$slideCount.hide();this._$slideControl.hide();}else{this._$slideCurrent.html('1');this._$slideTotal.html(this._slideTotal);if(this._autoPlay){this._slideAutoPlay();}}},clickSlidePrev:function(){this._slideAutoPause();this._slidePrev();},_slidePrev:function(){var slided=false;if(this._animated){return false;}if(this._slideNumber<=0){if(this._loop){this._slideNumber=this._slideTotal-1;slided=true;}else{if(this._playing){this._slideAutoPause();}}}else{this._slideNumber=this._slideNumber-1;slided=true;}if(slided){if(this._$slideList.css(this._basePosition)!=='-'+this._stepSize+'px'){var lastItem=this._$slideList.children().eq(-2).nextAll().clone(true);lastItem.prependTo(this._$slideList);this._$slideList.children().eq(-2).nextAll().remove();this._$slideList.css(this._basePosition,'-'+this._stepSize+'px');}this._animated=true;this._slidePosition=0;this._slidePlay();}},clickSlideNext:function(){this._slideAutoPause();this._slideNext();},_slideNext:function(){var slided=false;if(this._animated){return false;}if(this._slideNumber>=this._slideTotal-1){if(this._loop){this._slideNumber=0;slided=true;}else{if(this._playing){this._slideAutoPause();}}}else{this._slideNumber=this._slideNumber+1;slided=true;}if(slided){if(parseInt(this._$slideList.css(this._basePosition),10)!==0){var firstChild=this._$slideList.children().filter(':lt(1)').clone(true);firstChild.appendTo(this._$slideList);this._$slideList.children().filter(':lt(1)').remove();this._$slideList.css(this._basePosition,'0px');}this._animated=true;this._slidePosition=-this._stepSize;this._slidePlay();}},_slidePlay:function(){var _self=this;this._$slideList.stop().animate(this._getAnimate(),this._animateSpeed,function(){_self._animated=false;});this._$slideCurrent.html(this._slideNumber+1);},_getAnimate:function(){var animate=null;if(this._type==='horizontal'){animate={left:this._slidePosition};}else if(this._type==='vertical'){animate={top:this._slidePosition};}else{return false;}return animate;},_slideAutoPlay:function(){if(this._direction==='next'){this._interval=setInterval($.proxy(this._slideNext,this),this._intervalTime);}else if(this._direction==='prev'){this._interval=setInterval($.proxy(this._slidePrev,this),this._intervalTime);}else{return false;}this._displaySlideControlPlay('btn_play','btn_pause','일시 정지');this._playing=true;},_slideAutoPause:function(){clearInterval(this._interval);this._interval=null;this._displaySlideControlPlay('btn_pause','btn_play','재생');this._playing=false;},_displaySlideControlPlay:function(removeClass,addClass,title){this._$slideControlPlay.removeClass(removeClass);this._$slideControlPlay.addClass(addClass);this._$slideControlPlay.attr('title',title);},toggleAutoPlay:function(){if(this._playing){this._playing=false;}else{this._playing=true;}if(this._playing){this._slideAutoPlay();}else{this._slideAutoPause();}}}