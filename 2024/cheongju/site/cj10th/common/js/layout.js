/**
 * @author (주)한신정보기술 퍼블리셔팀 권정현
 * @since 2019-03-18
 * @version 1.0.0
 */
(function($) {
    'use strict';

    window.element = {};

    var $window = element.$window = $(window),
        $document = element.$document = $(document),
        $html = element.$html = $('html'),
        $head = element.$head = $('head'),
        $screen = $.screen;

    $document.on('ready.layout', function(event) {
        $screen({
            state : [{
                name : 'wide',
                horizontal : {
                    from : 9999,
                    to : 1241
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1240,
                    to : 1001
                }
            }, {
                name : 'tablet',
                horizontal : {
                    from : 1000,
                    to : 641
                }
            }, {
                name : 'phone',
                horizontal : {
                    from : 640,
                    to : 0
                }
            }]
        });
    });
})(window.jQuery);