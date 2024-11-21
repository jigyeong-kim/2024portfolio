/****************************************************************************
상수도 모의요금 계산 스크립트
****************************************************************************/

var biztypes = new Array("가정용","일반용","대중탕용","전용공업용");
var sewertypes = new Array("해당없음","가정용","일반용","대중탕용","전용공업용");

function calculate() {
	var frm = document.forms[0];
	var biztype = frm.biztype.value;//업종
	var sewertype = frm.sewertype.value;//업종
	var sidebiz = frm.sidebiz.checked;//다른업종과겸업
	var householdnum = frm.householdnum.value;//세대수
	var caliber = frm.caliber.value;//구경
	var consumed = frm.consumed.value;//사용량
	var water_amount; //상수도료

	if(!consumed) {
		alert("사용량을 입력해 주세요.");
		frm.consumed.focus();
	} else {

		//업종별 요금계산
		if(!sidebiz) {
			water_amount = tariff(biztype, householdnum, consumed);
			sewer_amount = sewerRs(sewertype, householdnum, consumed);
		} else { //겸업시 요금계산
			var chkConsumed = 15 * householdnum;
			if(consumed > chkConsumed) { //15톤 초과시
				var home_amount = tariff(1, householdnum, chkConsumed); //15톤까지 가정용 적용
				var biz_amount = tariff(biztype, householdnum, consumed - chkConsumed); //업종별 요율 적용
				water_amount = home_amount + biz_amount;
				sewer_amount = sewerRs(sewertype, householdnum, consumed);
			} else { //15톤 이하
				water_amount = tariff(1, householdnum, consumed);
				sewer_amount = sewerRs(sewertype, householdnum, consumed);
			}
		}

		var waterPay; // 상수도료
		var sewerPay; // 하수도료
		var caliberPay; // 구경별 정액
		var waterUsePay; // 물이용부담금
		
		waterPay = water_amount;
		sewer = sewer_amount - ( sewer_amount % 10 ); // 하수도 요금 원단위 절사
		sewerPay = sewer;

		//구경별 정액료
		var caliberType = new Array(13,20,25,32,40,50,75,100,150,200);
		var amount_caliber = new Array(690,1270,2050,4940,6120,9460,22970,39190,86080,119790);

		/////구경별 정액료 합산
		for(var i=0; i <= caliberType.length; i++) {
			if(caliber == caliberType[i]) {
				caliberPay = amount_caliber[i]; // 구경별정액
			}
		}
		
		//물이용 부담금
		var d = new Date();
		var tax = d.getYear() > 2006 ? 160 : 150;	
		waterUsePay = tax * consumed;
		
		/////총수도요금
		waterTotalPay = waterPay + sewerPay + caliberPay + waterUsePay;
		

		var dc1 = frm.dc1.checked;
		var dc2 = frm.dc2.checked;
		var dc3 = frm.dc3.checked;
		var dc4 = frm.dc4.checked;

		var water_pay = waterTotalPay;
		var dcTxt = "총 납부금액 :: " + formatNum(water_pay.toString()) + " 원\n";

		if(dc1 && householdnum >= 20) {
			var dc1_amount = householdnum * 200;
			waterTotalPay -= dc1_amount;
			dcTxt += "공동주택 할인 :: " + formatNum(dc1_amount.toString()) + " 원\n";
		} else if (dc1 && householdnum < 20) {
			dcTxt += "공동주택 할인 :: 20호이상만 할인 적용이 됩니다.";
		}
		if(dc2) {
			var dc2_amount = Math.floor(waterPay * 0.01) > 1000 ? 1000 : Math.floor(waterPay * 0.01);
			dc2_amount = dc2_amount - ( dc2_amount % 10 );
			waterTotalPay -= dc2_amount;
			dcTxt += "자동이체 할인 ::" + formatNum(dc2_amount.toString()) + " 원\n";
		}
		if(dc3) {
			var dc3_amount = consumed > 5 ? 5 : consumed;
			var dc3_pay = dc3_amount * 560;
			waterTotalPay -= dc3_pay;
			dcTxt += "국민기초생활보호대상자 할인 ::" + formatNum(dc3_pay.toString()) + " 원\n";
		}

		if(dc4 && !dc3) {
			var dc4_amount = consumed > 5 ? 5 : consumed;
			var dc4_pay = dc4_amount * 560;
			waterTotalPay -= dc4_pay;
			dcTxt += "국가보훈대상자 할인 ::" + formatNum(dc4_pay.toString()) + " 원\n";
		}
		
		//납부액 출력
		result(
			biztypes[biztype-1],
			formatNum(householdnum.toString()),
			formatNum(consumed.toString()),
			formatNum(waterPay.toString()),//상수도료
			caliber,
			formatNum(sewerPay.toString()),//하수도료
			formatNum(caliberPay.toString()),
			formatNum(waterUsePay.toString()),
			formatNum(waterTotalPay.toString()),
			dcTxt
		);
	}
}

function result(bt, hn, cs, cb, csm, ct, cbm, txm, ttm, dcTxt) {
	var args = result.arguments;
	for(var i=0; i<args.length; i++) {
		document.getElementById("water"+(i+1)).innerText = args[i];
	}
}

function onlyNum(obj) {
	var val = obj.value;
	var re = /[^0-9\.]/gi;
	obj.value = val.replace(re,"");
	obj.value = obj.value ? parseFloat(obj.value) : 0;
}

function formatNum(num) {
	var temp = (num.length % 3 == 0) ? 3 : (num.length % 3);
	for (var i = 0; i < 3-temp; i++) {
		num = " " + num;
	}
	var arr = [];
	for (var i = 0; i < num.length; i += 3){
		arr.push(num.substr(i, 3));
	}
	return arr.join(",");
}

///// 상수도 요금 계산 ///////////////
function tariff(bt, hn, cs) {
	var biztype = bt;//상수업종
	var householdnum = hn;//세대수
	var consumed = cs;//사용량
	var amount = 0;

	//톤당 사용료 - 상수도
	var amount1 = new Array(560,670,910);
	var amount2 = new Array(1300,2100,2570);
	var amount3 = new Array(1260,1620,2100,2690);
	var amount4 = new Array(820,1400,1610);
	var amount5 = new Array(500,670);

	var	capacity1 =  20*householdnum;
	var	capacity2 =  30*householdnum;

	/////가정용일 경우
	if(biztype==1) {
		if(consumed <= capacity1) {
			amount = consumed * amount1[0];
		}
		if(consumed>capacity1 && consumed<=capacity2) {
			amount = capacity1 * amount1[0];
			amount += (consumed-capacity1) * amount1[1];
		}
		if(consumed>capacity2) {
			amount = capacity1 * amount1[0];
			amount += (capacity2 - capacity1) * amount1[1];
			amount +=  (consumed - capacity2) * amount1[2];
		}
	}

	/////일반용일 경우
	if(biztype == 2) {
		if(consumed <= 50 * householdnum) {
			amount = consumed * amount2[0];
		}
		if(consumed > 50 * householdnum && consumed <= 100 * householdnum) {
			amount = 50 * amount2[0];
			amount += (consumed - (50 * householdnum)) * amount2[1];
		}
		if(consumed > 100 * householdnum) {
			amount = 50 * amount2[0];
			amount += 50 * amount2[1];
			amount += (consumed - (50 * householdnum + 50 * householdnum)) * amount2[2];
		}
	}

	/////영업용일 경우
	if(biztype == 3) {
		if(consumed <= 30 * householdnum) {
			amount = consumed * amount3[0];
		}
		if(consumed > 30 * householdnum && consumed <= 50 * householdnum) {
			amount = 30 * amount3[0];
			amount += (consumed - (30 * householdnum)) * amount3[1];
		}
		if(consumed > 50 * householdnum && consumed <= 100 * householdnum) {
			amount = 30 * amount3[0];
			amount += 20 * amount3[1];
			amount += (consumed - (30 * householdnum + 20 * householdnum)) * amount3[2];
		}
		if(consumed > 100 * householdnum) {
			amount = 30 * amount3[0];
			amount += 20 * amount3[1];
			amount += 50 * amount3[2];
			amount += (consumed - (30 * householdnum + 20 * householdnum + 50 * householdnum)) * amount3[3];
		}
	}

	/////대중탕용일 경우
	if(biztype == 4) {
		if(consumed <= 200 * householdnum) {
			amount = consumed * amount4[0];
		}
		if(consumed > 200 * householdnum && consumed <= 500 * householdnum) {
			amount = 200 * amount4[0];
			amount += (consumed - (300 * householdnum)) * amount4[1];
		}
		if(consumed > 500 * householdnum) {
			amount = 200 * amount4[0];
			amount += 300 * amount4[1];
			amount += (consumed - (200 * householdnum + 300 * householdnum)) * amount4[2];
		}
	}

	/////전용공업용일 경우
	if(biztype == 5) {
		if(consumed <= 200 * householdnum) {
			amount = consumed * amount5[0];
		}
		if(consumed > 200 * householdnum) {
			amount = 200 * amount5[0];

			amount += (consumed - (200 * householdnum)) * amount5[1];
		}
	}
	
	return amount;
}


///// 하수도 요금 계산 ///////////////
function sewerRs(bt, hn, cs) {
	var sewerType = bt;//하수업종
	var householdnum = hn;//세대수
	var consumed = cs;//사용량
	var amount = 0;

	//톤당 사용료 - 하수도
	var sewer1 = new Array(165,230,325);
	var sewer2 = new Array(220,330,440);
	var sewer3 = new Array(195,279,357,451);
	var sewer4 = new Array(230,320,440);
	var sewer5 = new Array(127,138);

	var	capacity1 =  20*householdnum;
	var	capacity2 =  30*householdnum;

	/////해당없을 경우
	if(sewerType==0) {
		amount = 0;
	}
	
	/////가정용일 경우
	if(sewerType == 1) {
		if(consumed <= capacity1) {
			amount = consumed * sewer1[0];
		}
		if(consumed>capacity1 && consumed<=capacity2) {
			amount = capacity1 * sewer1[0];
			amount += (consumed-capacity1) * sewer1[1];
		}
		if(consumed>capacity2) {
			amount = capacity1 * sewer1[0];
			amount += (capacity2 - capacity1) * sewer1[1];
			amount +=  (consumed - capacity2) * sewer1[2];
		}
	}

	/////일반용일 경우
	if(sewerType == 2) {
		if(consumed <= 50 * householdnum) {
			amount = consumed * sewer2[0];
		}
		if(consumed > 50 * householdnum && consumed <= 100 * householdnum) {
			amount = 50 * sewer2[0];
			amount += (consumed - (50 * householdnum)) * sewer2[1];
		}
		if(consumed > 100 * householdnum ) {
			amount = 50 * sewer2[0];
			amount += 50 * sewer2[1];
			amount += (consumed - (50 * householdnum + 50 * householdnum)) * sewer2[2];
		}
	}

	/////영업용일 경우
	if(sewerType == 3) {
		if(consumed <= 30 * householdnum) {
			amount = consumed * sewer3[0];
		}
		if(consumed > 30 * householdnum && consumed <= 50 * householdnum) {
			amount = 30 * sewer3[0];
			amount += (consumed - (30 * householdnum)) * sewer3[1];
		}
		if(consumed > 50 * householdnum && consumed <= 100 * householdnum) {
			amount = 30 * sewer3[0];
			amount += 20 * sewer3[1];
			amount += (consumed - (30 * householdnum + 20 * householdnum)) * sewer3[2];
		}
		if(consumed > 100 * householdnum) {
			amount = 30 * sewer3[0];
			amount += 20 * sewer3[1];
			amount += 50 * sewer3[2];
			amount += (consumed - (30 * householdnum + 20 * householdnum + 50 * householdnum)) * sewer3[3];
		}
	}

	/////대중탕용일 경우
	if(sewerType == 4) {
		if(consumed <= 200 * householdnum) {
			amount = consumed * sewer4[0];
		}
		if(consumed > 200 * householdnum && consumed <= 500 * householdnum) {
			amount = 200 * sewer4[0];
			amount += (consumed - (500 * householdnum)) * sewer4[1];
		}
		if(consumed > 500 * householdnum) {
			amount = 200 * sewer4[0];
			amount += 300 * sewer4[1];
			amount += (consumed - (200 * householdnum + 300 * householdnum)) * sewer4[2];
		}
	}

	/////전용공업용일 경우
	if(sewerType == 5) {
		if(consumed <= 200 * householdnum) {
			amount = consumed * sewer5[0];
		}
		if(consumed > 200 * householdnum) {
			amount = 200 * sewer5[0];

			amount += (consumed - (200 * householdnum)) * sewer5[1];
		}
	}
	
	return amount;
}