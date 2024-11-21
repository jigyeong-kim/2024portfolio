'use strict';

$(function() {
    //sub-head 메뉴
    var $breadcrumbs = $('.breadcrumbs'),
        $breadcrumbsItem = $breadcrumbs.find('.breadcrumbs_item');
    $breadcrumbsItem.each(function(){
        var $this = $(this),
            $thisBtn = $this.find('.breadcrumbs_anchor'),
            $thisPanel = $this.find('.select_panel');
        $thisPanel.closest($breadcrumbsItem).addClass('has');
        $thisBtn.on('click', function(e){
            if($this.hasClass('has')){
                e.preventDefault();
            }
            $this.toggleClass('active').siblings().removeClass('active');
            $this.siblings().find('.select_panel').stop().slideUp(200);
            if($this.hasClass('active')){
                $thisBtn.attr('title','닫기');
                $thisPanel.attr('title','열림').stop().slideDown(200);

            } else {
                $thisBtn.attr('title','열기');
                $thisPanel.attr('title','닫힘').stop().slideUp(200);
            }
        })
    });

});