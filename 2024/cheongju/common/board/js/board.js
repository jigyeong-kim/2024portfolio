/*  게시판 */
function addCellHeader(table) {
    if (!table) {
        return false;
    }
    console.log(table);
    var trs = table.getElementsByTagName('tr');
    var trsChild;
    var grid = {};
    var cells;

    for (var i = 0, cntI = trs.length; i < cntI; i++) {
        if (!grid[i]) {
            grid[i] = {};
        }
        trsChild = trs.item(i).childNodes;
        cells = 0;
        for (var j = 0, cntJ = trsChild.length; j < cntJ; j++) {
            if (trsChild[j].nodeType == 1) {
                grid[i][cells++] = trsChild[j];
            }
        }
    }

    var cellHeader = '';
    for (row in grid) {
        if (row == 0) {
            continue;
        }
        for (cell in grid[row]) {
            if (cell == 0) {
                continue;
            }
            //cellHeader = grid[0][cell].innerHTML + ' - ' + grid[row][0].innerHTML
            cellHeader = grid[0][cell].innerHTML + '：' ;
            grid[row][cell].setAttribute('data-cell-header', cellHeader);
        }
    }
}

$( document ).ready(function() {
    var bbsTableRwdb   = $("table[data-rwdb='yes']");
    if(bbsTableRwdb.length > 0){
        var thisTable = bbsTableRwdb.attr('class').replace(/ /g, '.');
            if(navigator.appVersion.indexOf("MSIE 7.")==-1 && navigator.appVersion.indexOf("MSIE 8.")==-1) {
                addCellHeader(document.querySelector('.'+ thisTable));
            }
    }
});



/* faq */
function faqList(list) {
    var faqList = $(list).find(".list > dt");
    var faqBtn_Qpen = faqList.find("button");

    faqBtn_Qpen.on("click", function () {

        var item = $(this).parent('dt');

        if (item.hasClass('active')) {
            item.removeClass("active");
            item.next("dd").slideUp('fast');
        }
        else {
            faqList.not(item).each(function () {
                $(this).removeClass("active");
                $(this).next("dd").slideUp('fast');
            });
            item.addClass("active");
            item.next("dd").slideDown('fast');
        }
    });
}

$(function () {
    var faq   = $("[data-list='faq']");

    if(faq.length > 0) {
        var list = faq.attr('class').replace(/ /g, '.');
        $(window).on({
            load: function () {
                faqList('.'+ list)
            }
        });
    }
});

$(function () {
    $(".bbs_gallery .list  a").on('mouseenter',function () {
        $(this).find('.photo').addClass("hover");
    });
    $(".bbs_gallery .list  a").on('mouseleave',function () {
        $(this).find('.photo').removeClass("hover");
    });
});


// 동영상 체크
function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    // If IE, return version number.
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;

    else
        return 99; //It is not IE
}

function checkIE(ver,seletor) {
    var ver = ver,
        seletor = seletor;

    if (GetIEVersion() <= ver) { //IE브라우전 체크 버전보다 작으면
        $(seletor + " video").remove();
    } else{
        $(seletor + " object").remove();
    }
    console.log('a');
}