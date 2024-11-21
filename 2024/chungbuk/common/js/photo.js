//version1
/*$(function() {
	var $photoView = $("#photo.view").children(".photo_view");
	var $photoImg = $photoView.children(".photo_img");
	var $photoList = $photoImg.children(".photo_list");
	var $photoListUl = $photoList.children("ul");
	var $photoListUlLeftVal = 0;
	var $photoListLi = $photoListUl.children("li");
	var $photoCtrl = $photoImg.children(".photo_control");
	var $photoLeft = $photoCtrl.children(".photo_left");
	var $photoRight = $photoCtrl.children(".photo_right");
	var isRun = true;
	var limit = 4;

	$(window).on("resize.photoImg", function() {
		var $newPhotoListLi = $photoListUl.children("li");
		var photoImgWidth = $photoImg.width();
		var $photoLeftWidth = $photoLeft.width();
		
		$newPhotoListLi.width(photoImgWidth-($photoLeftWidth*2));
		$photoListUlLeftVal = -photoImgWidth+($photoLeftWidth*3);
		$photoListUl.css("left", $photoListUlLeftVal);
	});
	
	$(window).trigger("resize.photoImg");

	$photoLeft.click(function() {
		if(isRun) {
			isRun = false;
			var $newPhotoListLi = $photoListUl.children("li");
			var photoListLiWidth = $newPhotoListLi.last().width();
			
			$newPhotoListLi.last().clone(true).prependTo($photoListUl);
			$newPhotoListLi.last().remove();
			$photoListUl.css("left", $photoListUlLeftVal-photoListLiWidth);

			$photoListUl.stop().animate({"left": $photoListUlLeftVal}, 1000, function() {
				isRun = true;
			});
		}
	});

	$photoRight.click(function() {
		if(isRun) {
			isRun = false;
			var $newPhotoListLi = $photoListUl.children("li");
			var photoListLiWidth = $newPhotoListLi.eq(0).width();

			$photoListUl.stop().animate({"left": $photoListUlLeftVal-photoListLiWidth}, 1000, function() {
				$newPhotoListLi.eq(0).clone(true).appendTo($photoListUl);
				$newPhotoListLi.eq(0).remove();
				$photoListUl.css("left", $photoListUlLeftVal);
				isRun = true;
			});
		}
	});
	
	//롤링이 돌아가려면 최소 사진이 limit변수값만큼 필요함
	if($photoListLi.length < limit) {
		//사진이 0장일때 none_img클래스 부여
		if($photoListLi.length == 0) {
			$photoImg.remove();
			$photoView.addClass("none_img");
		}else{
			//사진이 1장이라도 있을때
			var photoListMod = limit - $photoListLi.length;
			
			//나머지 limit-사진갯수의 값만큼
			for(var i=0; i<photoListMod; i++) {
				var $newPhotoListLi = $photoListUl.children("li");
				
				//사진이 한장일때 첫번째 사진으로 복사
				if($photoListLi.length == 1) {
					$newPhotoListLi.eq(0).clone(true).appendTo($photoListUl);
				}else{
					//사진이 두장이상일 때 역순으로 홀짝복사
					if(i % 2 == 0) {
						$newPhotoListLi.eq(1).clone(true).appendTo($photoListUl);
					}else{
						$newPhotoListLi.eq(0).clone(true).appendTo($photoListUl);
					}
				}
			}
		}
	}
});*/

//version2
$(function() {
	var $photoView = $("#photo.view").children(".photo_view");
	var $photoImg = $photoView.children(".photo_img");
	var $photoList = $photoImg.children(".photo_list");
	var $photoListUl = $photoList.children("ul");
	var $photoListUlLeftVal = 0;
	var $photoListLi = $photoListUl.children("li");
	var $photoCtrl = $photoImg.children(".photo_control");
	var $photoLeft = $photoCtrl.children(".photo_left");
	var $photoRight = $photoCtrl.children(".photo_right");
	var isRun = true;
    var $clubIdx = 1;
    var $clubview =1;
    var $clubSize = $photoListLi.length;
    var $clubpst = 0;
	var winWidth = $(window).width();
	var firstLoad = 1;

	$(window).on("resize.photoImg", function() {
		var newWinWidth = $(window).width();

		if(newWinWidth != winWidth || firstLoad) {
			var photoImgWidth = $photoImg.width();
			var $photoLeftWidth = $photoLeft.width();
			
			if($photoListLi.length == 1) {
				$photoRight.addClass("unable");
				$photoLeft.addClass("unable");
				$photoListUl.css("left", $photoLeftWidth);
			}else if($photoListLi.length == 2) {
				$photoRight.addClass("unable");
				$photoListUl.css("left", -photoImgWidth+($photoLeftWidth*3));
			}else{
				$photoLeft.removeClass("unable");
				$photoRight.removeClass("unable");
				$clubIdx = 1;
				$clubpst = 0;
				$photoListUl.css("left", -photoImgWidth+($photoLeftWidth*3));
			}
			$photoListLi.width(photoImgWidth-($photoLeftWidth*2));
			winWidth = newWinWidth;
			firstLoad = 0;
		}
	});
	
	$(window).trigger("resize.photoImg");

    $photoLeft.click(function() {
		if(isRun) {
			isRun = false;
			var $clubwidth = $photoListLi.eq($clubIdx).width();
			$photoListUlLeftVal = parseInt($photoListUl.css("left"));

			if($clubIdx >= 1) {
					$clubpst = $photoListUlLeftVal + $clubwidth;
					$photoListUl.animate({"left":$clubpst}, 500, function() {
						$clubIdx--;
						if($clubIdx == 0) {
							$photoLeft.addClass("unable");
							if($photoListLi.length == 2) {
								$photoRight.removeClass("unable");
							}
						}else{
							$photoRight.removeClass("unable");
						}
						isRun = true;
					});
			}else{
				isRun = true;
				//alert('처음입니다.');
			}
		}
    });

    $photoRight.click(function() {
		if(isRun) {
			isRun = false;
			var $clubwidth = $photoListLi.eq($clubIdx).width();
			$photoListUlLeftVal = parseInt($photoListUl.css("left"));

			if($clubIdx < $clubSize-$clubview) {
					$clubpst =  $photoListUlLeftVal - $clubwidth;
					$photoListUl.animate({"left":$clubpst}, 500, function() {
						$clubIdx++;

						if($clubIdx == $clubSize-$clubview) {
							$photoRight.addClass("unable");
							if($photoListLi.length == 2) {
								$photoLeft.removeClass("unable");
							}
						}else{
							$photoLeft.removeClass("unable");
						}

						isRun = true;
					});
			}else{
				isRun = true;
				//alert('마지막입니다.');
			}
		}
    });

	//사진이 0장일때 none_img클래스 부여
	if($photoListLi.length == 0) {
		$photoImg.remove();
		$photoView.addClass("none_img");
	}
});


//지도 위치보기
$(function() {
	var $photoView = $("#photo.view");
	var $moreInfo = $photoView.children(".more_info");
	var $moreInfoBtn = $moreInfo.children("button");
	var $map = $photoView.children(".map");
	
	//document load시 숨김 (display:none처리시 지도 안나옴)
	$map.hide();

	$moreInfoBtn.click(function() {
		$map.slideToggle("fast");
		$moreInfo.toggleClass("active");
		$(window).trigger("resize");
	});
});