/**
 * 슬라이드 생성자
 * @param {string} selector 고유한 ID를 입력 #포함
 * @param {object} slideCount
 *                  {
 *                      slideCount: countWrap,
 *                      slideCurrent: 현재 슬라이드,
 *                      slideTotal: 전체 슼라이드
 *                  }
 * @param {object} slideControl
 *                  {
 *                      slideControl: controlWrap,
 *                      slideControlPrev: 이전 버튼,
 *                      slideControlNext: 다음 버튼,
 *                      slideControlPlay: 자동 플레이 토글 버튼
 *                  }
 * @param {object} slideList
 *                  {
 *                      slideList: 슬라이드 목록,
 *                      slideItem: 슬라이드 항목
 *                  }
 * @param {int} stepSize 이동 크기
 * @param {int} animateSpeed 애니메이션 속도
 * @param {boolean} autoPlay 자동 플레이 여부
 * @param {boolean} loop 반복 여부
 * @param {string} direction 방향 { 'prev' : 이전, 'next' : 다음 }
 * @param {string} type 슬라이드 타입 { 'horizontal' : 가로, 'vertical' : 세로 }
 * @constructor
 */
var Slide = function(selector, slideCount, slideControl, slideList, stepSize, animateSpeed, intervalTime, autoPlay, loop, direction, type) {

    this._selector = selector;
    this._slideCount = slideCount;
    this._slideControl = slideControl;
    this._slideList = slideList;
    this._stepSize = stepSize;
    this._animateSpeed = animateSpeed;
    this._intervalTime = intervalTime;
    this._autoPlay = autoPlay;
    this._loop = loop;
    this._slideNumber = 0;
    this._slidePosition = 0;
    this._interval = null;
    this._animated = false;
    this._playing = false;
    this._direction = direction;
    this._type = type;
    this._basePosition = '';

    // 엘리먼트 할당
    this._assignElements();
    // 이벤트 바인드
    this._bindEvents();
    // 슬라이드 초기화
    this._init();
};

Slide.prototype = {

    /**
     * 엘리먼트를 할당 한다.
     * @private
     */
    _assignElements: function() {
        this._$selector = $(this._selector);
        this._$slideCount = this._$selector.find(this._slideCount.slideCount);
        this._$slideCurrent = this._$slideCount.find(this._slideCount.slideCurrent);
        this._$slideTotal = this._$slideCount.find(this._slideCount.slideTotal);
        this._$slideControl = this._$selector.find(this._slideControl.slideControl);
        this._$slideControlPlay = this._$slideControl.find(this._slideControl.slideControlPlay);
        this._$slideList = this._$selector.find(this._slideList.slideList);
        this._$slideItem = this._$slideList.find(this._slideList.slideItem);
    },

    /**
     * 이벤트를 바인드 한다
     * @private
     */
    _bindEvents: function() {
        this._$slideControl.on('click', this._slideControl.slideControlPrev, $.proxy(this.clickSlidePrev, this));
        this._$slideControl.on('click', this._slideControl.slideControlNext, $.proxy(this.clickSlideNext, this));
        this._$slideControl.on('click', this._slideControl.slideControlPlay, $.proxy(this.toggleAutoPlay, this));
    },

    /**
     * 슬라이드 초기화
     * @private
     */
    _init: function() {

        // 목록 전체 수
        this._slideTotal = this._$slideItem.length;
        if( !this._slideTotal ) {
            return false;
        }

        // type에 맞게 넓이/높이를 가져옴 stepSize 가 0 이면 자동
        if( this._type === 'horizontal' ) {
            if( this._stepSize === 0 ) {
                this._stepSize = this._$slideItem[0].offsetWidth;
            }
            this._basePosition = 'left';
        } else if( this._type === 'vertical' ) {
            if( this._stepSize === 0 ) {
                this._stepSize = this._$slideItem[0].offsetHeight;
            }
            this._basePosition = 'top';
        } else {
            return false;
        }

        // 목록이 없다면 카운트와 컨트롤 숨김
        if( this._slideTotal <= 1 ) {
            this._$slideCount.hide();
            this._$slideControl.hide();
        } else {
            // 현재
            this._$slideCurrent.html('1');
            // 목록 수 표출
            this._$slideTotal.html(this._slideTotal);
            // 자동 재생이면 slideAutoPlay 실행
            if( this._autoPlay ) {
                this._slideAutoPlay();
            }
        }
    },

    /**
     * 이전 슬라이드 클릭
     */
    clickSlidePrev: function() {

        // 슬리이드 일시정지
        this._slideAutoPause();
        // 이전 슬라이드
        this._slidePrev();

    },

    /**
     * 이전 슬라이드
     * @returns {boolean}
     * @private
     */
    _slidePrev: function() {

        // 반복 여부에 따른 슬라이드 flag
        var slided = false;

        // 애니메이션중이라면 리턴, 애니메이션이 중복되면 위치값 엉킴...
        if( this._animated ) {
            return false;
        }

        // 맨 처음 이라면
        if( this._slideNumber <= 0 ) {
            // 반복이라면 맨 마지막 값 설정
            if( this._loop ) {
                this._slideNumber = this._slideTotal - 1;
                slided = true;
            // 반복이 아니라면
            } else {
                // 자동 플레이중 이라면
                if( this._playing ) {
                    // 자동 플레이 일시 정지!
                    this._slideAutoPause();
                }
            }
        // 맨 처음이 아니라면
        } else {
            // 이전 슬라이드
            this._slideNumber = this._slideNumber - 1;
            slided = true;
        }

        // 슬라이드 해야 된다면
        if( slided ) {

            // 현재 슬라이드 앞에 슬라이드가 없다면
            if (this._$slideList.css(this._basePosition) !== '-' + this._stepSize + 'px') {
                // 맨뒤 슬라이드 복사함
                var lastItem = this._$slideList.children().eq(-2).nextAll().clone(true);
                // 만 앞으로 추가함
                lastItem.prependTo(this._$slideList);
                // 맨뒤 슬라이드 제거함
                this._$slideList.children().eq(-2).nextAll().remove();
                // 슬라이드 위치 정렬
                this._$slideList.css(this._basePosition, '-' + this._stepSize + 'px');
            }

            // 애니메이션 실행중으로 변경
            this._animated = true;
            // 슬라이드 위치 0으로
            this._slidePosition = 0;
            // 슬라이드 함!!!
            this._slidePlay();

        }

    },

    /**
     * 다음 슬라이드 클릭
     */
    clickSlideNext: function() {

        // 슬라이드 일시정지
        this._slideAutoPause();
        // 다음 슬라이드
        this._slideNext();

    },

    /**
     * 다음 슬라이드
     * @returns {boolean}
     * @private
     */
    _slideNext: function() {

        // 반목 여부에 따른 슬라이드 flag
        var slided = false;

        // 애니메이션중이라면 리턴 애니메이션이 중복되면 위치값 엉킴..
        if( this._animated ) {
            return false;
        }

        // 맨 마지막 이라면
        if( this._slideNumber >= this._slideTotal - 1 ) {
            // 반복이라면 맨 처음 값 설정
            if( this._loop ) {
                this._slideNumber = 0;
                slided = true;
            // 반복이 아니라면
            } else {
                // 자동 플레이중 이라면
                if( this._playing ) {
                    // 자동 플레이 일시 정지!
                    this._slideAutoPause();
                }
            }
        // 맨 마지막이 아니라면
        } else {
            // 다음 슬라이드
            this._slideNumber = this._slideNumber + 1;
            slided = true;
        }

        // 슬라이드 해야 된다면
        if( slided ) {

            // 현재 슬라이드 앞에 슬라이드가 있다면
            if (this._$slideList.css(this._basePosition) !== '0px') {
                // 맨 앞에 슬라이드 복사함
                var firstChild = this._$slideList.children().filter(':lt(1)').clone(true);
                // 맨 뒤로 추가함
                firstChild.appendTo(this._$slideList);
                // 맨 앞 슬라이드 제거함
                this._$slideList.children().filter(':lt(1)').remove();
                // 슬라이드 위치 정렬
                this._$slideList.css(this._basePosition, '0px');
            }

            // 애니메이션 실행중으로 변경
            this._animated = true;
            // 슬라이드 위치 조정함
            this._slidePosition = -this._stepSize;
            // 슬라이드 함!!!
            this._slidePlay();

        }

    },

    /**
     * 슬라이드 재생
     * @private
     */
    _slidePlay: function() {
        var _self = this;
        // 애니메이션 속성 가져와서 속도에 맞게 실행시키고 애니메이션 실행중을 false로 변경함, animated를 false로 변경해야 이전/다음 슬라이드가 먹힘!!
        this._$slideList.stop().animate( this._getAnimate(), this._animateSpeed, function() {
            _self._animated = false;
        });
        // 현재 슬라이드 번호 표시 +1은 0부터 시작했기 때문에 1을 더해줌!!!
        this._$slideCurrent.html(this._slideNumber+1);
    },

    /**
     * type에 맞는 애니메이션 속성을 가져옴
     * @returns {object} jquery animate
     * @private
     */
    _getAnimate: function() {

        var animate = null;
        // 가로인 경우
        if( this._type === 'horizontal' ) {
            // 좌측을 기준으로 이동
            animate = { left: this._slidePosition };
        // 세로인 경우
        } else if( this._type === 'vertical' ) {
            // 상단을 기준으로 이동
            animate = { top: this._slidePosition };
        } else {
            return false;
        }

        return animate;

    },

    /**
     * 슬라이드 자동 재생
     * @private
     */
    _slideAutoPlay: function() {
        // 방향이 다음이면
        if( this._direction === 'next' ) {
            // 다음 슬라이드를 interval 함
            this._interval = setInterval($.proxy(this._slideNext, this), this._intervalTime);
        // 방향이 이전이면
        } else if( this._direction === 'prev' ) {
            // 이전 슬라이드를 interval 함
            this._interval = setInterval($.proxy(this._slidePrev, this), this._intervalTime);
        } else {
            return false;
        }
        // 자동 플레이 토글 버튼 변경 : 일시 정지
        this._displaySlideControlPlay('btn_play', 'btn_pause', '일시 정지');
        // 자동 플레이 변수 true 로 변경
        this._playing = true;
    },

    /**
     * 슬라이드 일시정지
     * @private
     */
    _slideAutoPause: function() {
        // interval 제거
        clearInterval(this._interval);
        this._interval = null;
        // 자동 플레이 토글 버튼 변경 : 재생
        this._displaySlideControlPlay('btn_pause', 'btn_play', '재생');
        // 자동 플레이 변수 false 로 변경
        this._playing = false;
    },

    /**
     * 자동 플레이 토글 버튼 변경
     * @param {string} removeClass 제거할 클래스
     * @param {string} addClass 등록할 클래스
     * @param {string} alt 이미지 대체텍스트
     * @private
     */
    _displaySlideControlPlay: function(removeClass, addClass, alt) {
        this._$slideControlPlay.removeClass(removeClass);
        this._$slideControlPlay.addClass(addClass);
        this._$slideControlPlay.attr('alt', alt);
    },

    /**
     * 자동 재생 토글
     * @private
     */
    toggleAutoPlay: function() {

        // play 토글 변경
        if( this._playing ) {
            this._playing = false;
        } else {
            this._playing = true;
        }

        // play면 자동 플레이 실행 아니면 일시정지
        if( this._playing ) {
            this._slideAutoPlay();
        } else {
            this._slideAutoPause();
        }

    }

}