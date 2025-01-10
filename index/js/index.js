$('.contact_btn').on('click', function(){
    $(this).parents('.contact_wrap').siblings('.contact_box').addClass('active');
});
$('.contact_close').on('click', function(){
    $(this).parents('.contact_box').removeClass('active');
});

$('.tab_btn').on('click', function(){
    var index = $(this).parent('.tab_item').index();

    $(this).parent('.tab_item').addClass('active').siblings('.tab_item').removeClass('active');
    $('.tab_box').eq(index).addClass('active').siblings('.tab_box').removeClass('active')
});