/**
 * @author (주)한신정보기술 퍼블리셔팀 권정현
 * @since 2019-03-18
 * @version 1.0.0
 */
(function($) {
    'use strict';

    /**
     * @name 파일 분할
     * @since 2018-07-10
     * @param {string} value
     * @return {object} {
     *     name : string,
     *     ext : string
     * }
     */
    function parseFile(value) {
        var result = {
            name : '',
            ext : ''
        };

        //문자일 때
        if(typeof value === 'string') {
            var file = value.split('/');

            file = file[file.length - 1];

            var name = file.split('.'),
                ext = name[name.length - 1];

            //파일과 확장자가 같을 때
            if(file === ext) {
                ext = '';
            }else{
                name.pop();
            }

            name = name.join('.');

            result.name = name;
            result.ext = ext;
        }

        return result;
    }

    //확장자가 html일 때
    if(parseFile(location.pathname).ext === 'html') {
        var $ajax = $.ajax,
            $isNumeric = $.isNumeric,
            id = site.id,
            key = site.key,

            /**
             * @name 콘텐츠 얻기
             * @param {object} options {id : string, key : string || number}
             * @return {object}
             * @since 2018-07-13
             */
            getContents = function(options) {
                var result = {};

                //객체일 때
                if(options) {
                    $ajax({
                        url : '/repository/' + options.id + '/contents/' + options.key + '.html',
                        async : false,
                        cache : false,
                        success : function(data, textStatus, jqXHR) {
                            options.data = data;
                        },
                        error : function(jqXHR, textStatus, errorThrown) {
                            options.errorThrown = errorThrown;
                        },
                        complete : function(jqXHR, textStatus) {
                            options.textStatus = textStatus;

                            result = options;
                        }
                    });
                }

                return result;
            },
            contents = getContents({
                id : id,
                key : key
            }),
            $contents = $('#contents'),
            $contentsWrap = $contents.children('.wrap'),
            $main = ($contentsWrap.length) ? $contentsWrap : $contents;
console.log(site);
        //오류가 있을 때
        if(contents.textStatus === 'error') {
            $main.text(contents.errorThrown);
        }else{
            var data = contents.data;

            //숫자가 아닐 때
            if(!$isNumeric(key)) {
                key = '_' + key;
            }

            //클래스 추가
            $contents.addClass('cts' + key);

            $('body').addClass('page' + key);

            //스타일 추가
            data = '<link rel="stylesheet" href="/site/' + id + '/css/sub_contents.css" />' + data;

            //데이터 추가
            $main.append(data);
        }
    }
})(window.jQuery);