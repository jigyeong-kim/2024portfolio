var SlideButton = function(selector, slideList, slideControl, slideButton) {

	this._selector = selector;
	this._slideList = slideList;
	this._slideControl = slideControl;
	this._slideButton = slideButton;
	this._moveFlag = true;
	this._orgLeft = 0;

	this._assignElements();
	this._bindEvents();
	this._init();

};

SlideButton.prototype = {

	_assignElements: function() {
		this._$selector = $(this._selector);
		this._$slideList = this._$selector.find(this._slideList);
		this._$slideControl = this._$selector.find(this._slideControl);
		this._$slideButton = this._$selector.find(this._slideButton);
		this._$slideButton.each(function(idx) {
			$(this).attr("idx", idx+1);
		});
	},

	_bindEvents: function() {
		this._$slideControl.on('click', '.visual_prev', $.proxy(this.clickSlidePrev, this));
		this._$slideControl.on('click', '.visual_next', $.proxy(this.clickSlideNext, this));
		this._$slideButton.on('click', $.proxy(this.clickButton, this));
	},

	_init: function() {

		var tmpItem;

		this._$slideItems = this._$slideList.find("li");
		this._slideCount = this._$slideItems.length;
		this._slideItemWidth = this._$slideItems[0].offsetWidth;

		if( this._orgLeft === 0 ) {

			this.setCurrentCount(1);

			tmpItem = this._$slideItems.last();
			this._$slideList.prepend(tmpItem);
			this._$slideList.css("left", -this._slideItemWidth);

		}

	},

	resize: function() {
		this._orgLeft = 1;
		this._assignElements();
		this._init();
		this._$slideList.css("left", -this._slideItemWidth);
	},

	getCurrentCount: function() {
		return parseInt(this._$slideList.attr("cnt"),10);
	},

	setCurrentCount: function(cnt) {
		this._$slideList.attr("cnt", cnt);
	},

	_focusButton: function(idx) {
		this._$slideButton.removeClass("current");
		this._$slideButton.eq(idx-1).addClass("current");
	},

	_focusItem: function() {
		var slideItems = this._$slideList.find("li");
		slideItems.removeClass("active");
		slideItems.eq(1).addClass("active");
	},

	_countPrev: function() {
		var count = this.getCurrentCount();
		if( count <= 1 ) {
			count = this._slideCount;
		} else {
			count--;
		}
		return count;
	},

	_countNext: function() {
		var count = this.getCurrentCount();
		if( count >= this._slideCount ) {
			count = 1;
		} else {
			count++;
		}
		return count;
	},

	clickSlidePrev: function() {

		if( !this._moveFlag ) {
			return;
		}

		this._moveFlag = false;

		var slideItems = this._$slideList.find("li"),
			tmpItem = slideItems.last(),
			self = this;

		this._$slideList.prepend(tmpItem.clone()).css("left", -( this._slideItemWidth * 2 ));

		var count = this._countPrev();
		this.setCurrentCount(count);
		this._focusButton(count);

		this._$slideList.stop().animate({left: -this._slideItemWidth}, 'slow', function () {
			tmpItem.remove();
			self._focusItem();
			self._moveFlag = true;
		});

	},

	clickSlideNext: function() {

		if( !this._moveFlag ) {
			return;
		}

		this._moveFlag = false;

		var slideItems = this._$slideList.find("li"),
			tmpItem = slideItems.first(),
			self = this;

		this._$slideList.append(tmpItem.clone());

		var count = this._countNext();
		this.setCurrentCount(count);
		this._focusItem();
		this._focusButton(count);

		var tmp = parseInt(this._$slideList.css("left"), 10) - this._slideItemWidth;

		this._$slideList.stop().animate({left: tmp}, 'slow', function () {
			tmpItem.remove();
			self._$slideList.css("left", tmp + self._slideItemWidth);
			self._focusItem();
			self._moveFlag = true;
		});

	},

	clickButton: function(obj) {

		if( !this._moveFlag ) {
			return;
		}

		var $button = $(obj.currentTarget),
			idx = parseInt($button.attr("idx"),10),
			cnt = parseInt(this._$slideList.attr("cnt"),10),
			step = 0, items, i, self = this;

		if( idx < cnt ) {

			this._moveFlag = false;
			step = cnt - idx;
			items = this._$slideList.find("li");
			for( i=this._slideCount -1; i>=this._slideCount-step; i-- ) {
				this._$slideList.prepend(items.eq(i).clone());
			}
			this._focusButton(idx);
			this._$slideList.css("left", - ((step+1) * this._slideItemWidth));
			this._$slideList.stop().animate({left: - this._slideItemWidth}, 'slow', function() {
				items = self._$slideList.find("li");
				for( i=self._slideCount; i<items.length; i++ ) {
					items.eq(i).remove();
				}
				self.setCurrentCount(idx);
				self._focusItem();
				self._moveFlag = true;
			});

		} else if( idx > cnt ) {

			this._moveFlag = false;
			step = idx - cnt;
			items = this._$slideList.find("li");
			for( i=0; i<step; i++ ) {
				this._$slideList.append(items.eq(i).clone());
			}
			this._focusButton(idx);
			this._$slideList.stop().animate({left: - (this._slideItemWidth * (step+1))}, 'slow', function() {
				self._$slideList.css("left", -self._slideItemWidth);
				items = self._$slideList.find("li");
				for( i=0; i<step; i++ ) {
					items.eq(i).remove();
				}
				self.setCurrentCount(idx);
				self._focusItem();
				self._moveFlag = true;
			});

		}

	}

};