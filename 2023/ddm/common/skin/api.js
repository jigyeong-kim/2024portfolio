/*jslint devel: true, browser: true*/
/*global define, $, localSynap, statusTimer, BROWSER*/
var api = (function () {
	"use strict";
	var member = {
		passwordTryCount : 0
    };
    var api = {
		loadCommon : function () {
			addScript('common_skin.js');
		},
		getSkinType : function (fileExt) {
            var cellType = ["xls", "xlsx", "csv", "nxls"];
            var slideType = ["ppt", "pptx", "nppt"];
            var wordType = ["doc", "docx", "hwp2k", "hwp97", "txt", "text", "ndoc", "hwpml", "odt"];
            var imageType = ["jpeg", "jpg", "png", "tiff", "gif", "bmp"];
            var pdfType = ["pdf"];
            var skinType = undefined;
			if (cellType.indexOf(fileExt) != -1) {
				skinType = "cell";
			} else if (slideType.indexOf(fileExt) != -1) {
				skinType = "slide";
			} else if (wordType.indexOf(fileExt) != -1) {
				skinType = "word";
			} else if (imageType.indexOf(fileExt) != -1) {
				skinType = "image";
			} else if (pdfType.indexOf(fileExt) != -1) {
				skinType = "pdf";
			} else { // 미지원 포맷
				skinType = "unknown";
			}
			return skinType;
		},
        redirectToException : function (contextPath) {
            location.href = contextPath + '/exception';
        },
		doAskPassword: function (inner) {

			//modal header와 back 생성 
			if (member.passwordTryCount === 0) { //이미 만들어져 있다면 생성하지 않는다.
				modalManager.createModal();
			}
			var wrapTag = document.getElementById('wrap');
			if(wrapTag === null) {
				wrapTag = document.getElementsByTagName('body')[0];
			}
			var makeModal = function () {
				var modal = document.createElement('div');
				modal.id = 'modal';
				var topMargin = 40;
				modal.style.height = ($(window).height() - $("#modalHeader").height() - topMargin)+'px';
				wrapTag.appendChild(modal);

				return modal;
			};

			//첫번째 콜백: modal을 제외한 Layout(header와 back)
			modalManager.setContents(makeModal, function (modalContent) { //두번째 콜백: modal창 안의 내용 

				//암호 입력에 대한 안내 문구
				var h1Tag = document.createElement('h1');
				var h1Text = document.createTextNode("문서의 암호를 입력해 주세요.");
				h1Tag.setAttribute('id', 'h1Tag');

				//잘못된 암호를 입력했을 경우
				if (member.passwordTryCount !== 0) {
					h1Text = document.createTextNode('암호가 올바르지 않습니다.');
					h1Tag.style.color = 'red';
				}

				h1Tag.appendChild(h1Text);
				modalContent.appendChild(h1Tag);

				//input tag 
				var inputTag = document.createElement('input');
				inputTag.setAttribute('class', 'input1');
				inputTag.setAttribute('id', 'input1');
				inputTag.setAttribute('type', 'password');
				modalContent.appendChild(inputTag);

				//div tag with <a>
				var aTagGroup = document.createElement('div');
				aTagGroup.setAttribute('class', 'btnArea');
				modalContent.appendChild(aTagGroup);

				//confirm <a>
				var confirmA = document.createElement('a');
				confirmA.setAttribute('href', '#');
				confirmA.setAttribute('class', 'btn btnSt2');
				confirmA.setAttribute('id', 'confirmA');
				var confirmText = document.createTextNode('확인');
				confirmA.appendChild(confirmText);
				aTagGroup.appendChild(confirmA);

				var cancelSpace = document.createTextNode(' ');
				aTagGroup.appendChild(cancelSpace);

				//cancel <a> 
				var cancelA = document.createElement('a');
				cancelA.setAttribute('href', '#');
				cancelA.setAttribute('class', 'btn btnSt1');
				cancelA.setAttribute('id', 'cancelA');
				var cancelText = document.createTextNode('취소');
				cancelA.appendChild(cancelText);
				aTagGroup.appendChild(cancelA);

				var confirm_btn = document.getElementById('confirmA');
				var inputPassword;

				inputTag.focus();

				$(inputTag).keypress(function (e) {
					if (e.which == 13) {
						confirm_btn.onclick();
					}
				});

				var modal = document.getElementById('modal');

				confirm_btn.onclick = function () {
					inputPassword = inputTag.value;

					//암호를 입력하지 않으면 화면의 변화가 없다.
					if (inputPassword.length !== 0) {
						//modal을 지운다.				
						modal.style.visibility = "hidden";

						member.passwordTryCount += 1; //암호 입력 시도 횟수를 기록한다.
						inner && inner(inputPassword);
					} else {
						inputTag.focus();
						h1Tag.style.color = 'red';
					}
				};

				cancelA.onclick = function () { //취소버튼 클릭 시				
					//modal을 지운다.				
					wrapTag.removeChild(modal);

					modalManager.setContents(makeModal, function (messageContent) {
						//취소 버튼 클릭하면 출력되는 안내 문구 
						var cancel_h1 = document.createElement('h1');
						var cancel_h1Text1 = document.createTextNode('문서 열기에 실패했습니다.');
						var cancel_h1Text2 = document.createTextNode('다시 시도하려면 새로고침을 해주세요.');
						var brText = document.createElement('br');
						cancel_h1.setAttribute('id', 'cancel_h1');

						cancel_h1.appendChild(cancel_h1Text1);
						cancel_h1.appendChild(brText); //개행
						cancel_h1.appendChild(cancel_h1Text2);
						messageContent.appendChild(cancel_h1);
					});
				};
			});
		},
        sendPassword : function (contextPath, jobId, passwd, callback) {
            var passwdApi = contextPath + "/passcode/" + jobId;
            $.post(passwdApi, { passcode: passwd },
                   function (data) {
                       callback && callback();
                   });
        },
         /*
          * status API 조회 후, 응답내용을 localSynap에 알맞게 설정해준다.
          * 그리고, convertType에 맞게 처리한다.
          */
        doAfterGetStatus : function (statusObj, id, contextPath) {
            /*
			  status객체에 담긴 정보들:
			  id: -1,
			  convertType: 0,
			  format: null,
			  fileName: "",
			  refererUrl: "",
			  downloadUrl: "",
			  pageNum: 0,
			  imgDone: false,
			  htmlDone: false,
			  pdfDone: false
            */
			if (statusObj.format === null) {
				localSynap.properties.fileType = 'docx';
			} else {
				localSynap.properties.fileType = statusObj.format.toLowerCase();
			}

			localSynap.properties.title = statusObj.fileName;
			localSynap.downloadUrl = statusObj.downloadUrl;
			localSynap.status = statusObj;

        },
		parseStatus : function (id, contextPath) {
			localSynap.jobId = id;
			localSynap.properties.contextPath = contextPath;
			var fileExt = "",
			    successProccess = function () {
				    removeSpinner();
				    if (localSynap.status.convertType === 0) {
					    api.getXmlFromServer(id, contextPath);
				    } else {
					    api.getImage(id, contextPath);
				    }
				    removeSpinner();
			    },
			    errProcess = function (errCode) {
                    var message = "";
				    // password 에러코드 3
				    if (errCode === 3) {
					    passwordProcess();
						return ;
				    } else if(errCode === 2) {
						message = '변환을 지원하지 않는 파일입니다.';
						
					} else if(errCode === 4) {
						message = 'DRM 문서는 지원하지 않습니다.';
				    } else if(errCode === 9) {
						message = '암호화된 문서는 지원하지 않습니다.';						
					} else if(errCode === 254) {
						message = '제품의 라이선스가 만료되었습니다.';
						
					} else if(errCode === 54 && localSynap.status.convertType === 0) {
						message = 'HTML 변환이 실패하였습니다.';
						
					} else if(errCode === 101 && localSynap.status.convertType === 1) {
						message = '이미지 변환이 실패하였습니다.';
					} else if(errCode === 255) {
						message = '알 수 없는 오류입니다.';
					}
					else {
					    api.redirectToException(contextPath);
						return ;
				    }
					modalManager.modalErrMsg(message);
			    },
			    passwordProcess = function () {
				    var jobId = localSynap.jobId;
				    var contextPath = localSynap.properties.contextPath;
		            // 암호입력하기 전에 0.5초정도만 remove를 미룬다.
					setTimeout(removeSpinner, 500);
					if(member.passwordTryCount === 0) {
						api.doAskPassword(passwordProcess_inner);
					}
					else {
						$("#h1Tag").text("암호가 올바르지 않습니다.");
						$("#h1Tag").css("color","red");
						$("#input1").val("");
						$("#modal").css("visibility","visible");
					}
				    
				  /*  if (passwd === null) {
					    api.redirectToException(contextPath);
				    } else {
			                    loadSpinner("loading");
					    api.sendPassword(contextPath, localSynap.status.id, passwd, function() {
						    statusTimer = setInterval(foo, 500);
					});
			    	} */
			    },
			 	passwordProcess_inner = function (passwd) {
			    	  if (passwd === null) {
					    api.redirectToException(contextPath);
				    } else {						
			            loadSpinner("loading");
					    api.sendPassword(contextPath, localSynap.status.id, passwd, function() {
						    statusTimer = setInterval(foo, 500);
					});
			    	}

			    },
				foo = function () {
					$.ajax({
						type: 'GET',
						url: contextPath + '/status/' + id,
						async: false,
						dataType: 'json',
						success: function (obj) {
                            // localSynap에 필요한 항목을 담는다.
                            api.doAfterGetStatus(obj, id, contextPath);
	                        if (obj.imgDone === true) {
                                clearInterval(statusTimer);
		                        if (localSynap.status.imgErrCode === 0) {
									//modal header와 back을 지워준다.
									modalManager.removeModal();
									successProccess();									
	                            } else if (localSynap.status.imgErrCode > 0) {
                                    console.log('image converting Error : Code ' + localSynap.status.imgErrCode);
		                            errProcess(localSynap.status.imgErrCode);
	                            }
                            } else if (obj.htmlDone === true) {
                                clearInterval(statusTimer);
	                            if (localSynap.status.htmlErrCode === 0) {
                                    modalManager.removeModal();
		                            successProccess();
	                            } else if (localSynap.status.htmlErrCode > 0) {
                                    console.log('HTML converting Error : Code ' + localSynap.status.htmlErrCode);
		                            errProcess(localSynap.status.htmlErrCode);
                                }
                            }
                        },
                        error: function (xhr, status, err) {
							// errCode 500번 처리
							clearInterval(statusTimer);
							console.log('Server Error : ' + err);
							var msg = '알 수 없는 오류입니다.';
                            if(xhr.status == 403){
                                msg = '접근할 수 있는 권한이 없습니다.';
                            }
							modalManager.modalErrMsg(msg);
                        }
					});
				},
				statusTimer = setInterval(foo, 500);
		},
		
		getImage : function (key, contextPath) {
			localSynap.jobId = key;
			localSynap.properties.contextPath = contextPath;
			var fileExt = localSynap.status.format.toLowerCase(),
				skinType = api.getSkinType(fileExt),
				htmlUrl,
				head,
				script;
			
			if(skinType === "unknown") { // 오류 팝업 제공
				var errText = '변환을 지원하지 않는 파일입니다.';
				modalManager.modalErrMsg(errText);
				return ;
			}
				
			if (skinType) {
				htmlUrl = skinType;
				if(skinType === "image" && localSynap.status.pageNum === 1) {
					htmlUrl = "image"
				}
				else if (skinType !== "cell") {
					htmlUrl = "pdf";
				}
				if (BROWSER.isMobile()) {
					htmlUrl = htmlUrl + '_skin_mobile.xhtml';
				} else {
					htmlUrl = htmlUrl + '_skin.html';
				}
				
				// text검색모듈
				// TODO: 이 위치에 있어도, 본문js 보다 먼저 import되리란 보장이 없다. document.html에 넣어야 할 수도 있다.
				addScript("pdf_search.js");
				
				$.ajax({
					type: 'GET',
					url: htmlUrl,
					dataType: 'text',
					success: function (html) {
						$('body').append(html);
						$('#headTitle').append('<span>' + localSynap.properties.title + '</span>');
						/*$.ajax({
							type: 'GET',
							url: skinType + '_skin.js',
							dataType: 'text',
							success:function(script){
								eval.call( window, script );
							},
							error:function(err){
								eval( err.responseText );
							}
						});*/
						// For debugging, not checked in all browser.
						//sns기능 사용시
						if(localSynap.properties.useSharedSns) {
							if(BROWSER.isMobile()) {
								addScript(localSynap.properties.kakaoScript);
							}
							addScript("sns.js");
						}
						if(skinType === "image") {
							addScript("jQueryRotate.min.js");
						}
						if (skinType === "cell") {
							addScript("cell_skin.js");
						} else if(skinType === "image" && localSynap.status.pageNum === 1) {
							addScript("image_skin.js");
						} else {
							addScript("pdf_skin.js");
						}
					},
					error: function (err) {
						console.log(err.responseText);
					}
				});
			}
		},
		getXmlFromServer : function (id, contextDir) {
			localSynap.properties.xmlUrl = contextDir + 'xml/' + id;
			localSynap.jobId = id;
			$.ajax({
				type: 'GET',
				async: false,
				url: localSynap.properties.xmlUrl,
				dataType: 'xml',
				success: function (xmlDoc) {
					api.loadDoc({xml: xmlDoc});
				},
				error: function (error) {
					console.log(error.responseText);
				}
			});
		},
		
		getXml : function (fileName, rsDir) {
			localSynap.properties.resultDir = rsDir[rsDir.length - 1] === '/' ? rsDir : rsDir + '/';
			localSynap.properties.fileName = fileName;
			// TODO(MINO) : 이미지일경우 xml 파일의 경로는 아래와 다르다.
			if (localSynap.properties.entireWithPartialConv == true) {			
				localSynap.properties.xmlUrl = localSynap.properties.resultDir + localSynap.properties.fileName + '.xml';
			} else {
				localSynap.properties.xmlUrl = localSynap.properties.resultDir + localSynap.properties.fileName + '.xml';
			}
			//localSynap.properties.xmlUrl = localSynap.properties.resultDir + localSynap.properties.fileName + '/' + localSynap.properties.fileName + '.xml';
			$.ajax({
				type: 'GET',
				async: false,
				url: encodeURI(localSynap.properties.xmlUrl),
				dataType: 'xml',
				success: function (xmlDoc) {
					api.loadDoc({xml: xmlDoc});
				},
				error: function (error) {
					console.log('Server Error : ' + error);
					var msg = '알 수 없는 오류입니다.';
					modalManager.modalErrMsg(msg);
				}
			});			
		},
		setCurrentSheet : function (sheetNo) {
			localSynap.curPage = sheetNo;
		},
		loadDoc : function (obj) {
			localSynap.properties.xmlObj = $(obj.xml);
			var xmlInfo = {},
				skinType = "",
				strHref,
				xmlFileName,
				htmlUrl,
				head,
				script;
			
			// 이미지변환기 or HTML변환기 선택
			xmlInfo.convType = $(obj.xml).find('convert_type').text();
			localSynap.properties.fileType = $(obj.xml).find('file_type').text();
			 
			if (xmlInfo.convType === "image") {
				// 이미지변환기도 pdf_skin을 사용한다.
				skinType = "pdf";
			} else { // if (xmlInfo.convType == "html")
				skinType = api.getSkinType(localSynap.properties.fileType);
			}
			if(skinType === "unknown") { // 오류 팝업 제공
				var errText = '변환을 지원하지 않는 파일입니다.';
				modalManager.modalErrMsg(errText);
				return ;
			}
			var mark = $(obj.xml).find('w_m').text() == "true" ? true : false;
			if(mark) {
				if(BROWSER.PC.isIE() && BROWSER.VERSION.IE()<=9) {
					var errText = "해당 브라우저를 지원하지 않습니다.";
					modalManager.modalErrMsg(errText);
					return;
				}
			}
			if ($(obj.xml).find('use_single_page').text() === 'true') {
				localSynap.properties.layout = 'single';
			} else {
				localSynap.properties.layout = 'withpage';
			}
			if (BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9 && skinType === "slide" && ieCompatible === 8) { // Todo : 9이상 브라우저를 체크를 해야하는지?
				strHref = location.href.replace(/doc.html/ , 'doc_7.html');
				location.href = strHref;
			} else if (BROWSER.PC.isIE() && skinType !== "slide" && ieCompatible === 7) {
				strHref = location.href.replace(/doc_7.html/, 'doc.html');
				location.href = strHref;
			}
			
			// 렌더서버가 있을 때는 status의 파일명을 사용한다. 
			if (localSynap.properties.isRenderServer === true) {
				localSynap.properties.title = localSynap.status.fileName;
				localSynap.properties.fileName = $(obj.xml).find('file_name').text();
			} else {
				// 없을 때에는 파일명>문서속성제목 순으로 한다.
				xmlInfo.title = $(obj.xml).find('doc_title').text();
				if (xmlInfo.title.length === 0) {
					xmlInfo.title = $(obj.xml).find('file_name').text();
				}
				localSynap.properties.title = xmlInfo.title;
			}
			
			if (localSynap.properties.isRenderServer === true) {
				if (localSynap.isImageMode()) {
					xmlFileName = localSynap.jobId;
				} else {
					xmlFileName = $(obj.xml).find('file_name').text();
				}

				localSynap.properties.resultDir = localSynap.properties.contextPath + 'result/' + xmlFileName + '/';
			}
			
			var multiImage = false;
			if (skinType === "cell" || skinType === "csv") {
				localSynap.pageSize = $(obj.xml).find('sheet_cnt').text();
			} else if (skinType === "slide") {
				localSynap.pageSize = $(obj.xml).find('slide_cnt').text();
			} else if (skinType === "pdf") {
				if (localSynap.properties.entireWithPartialConv == true) {
					localSynap.pageSize = $(obj.xml).find('pdf_cnt').text();
				} else {
					var $endPage = $(obj.xml).find('endPage');
					var $startPage = $(obj.xml).find('startPage');
					if ($endPage.length == 0 && $startPage.length == 0) {
						localSynap.pageSize = $(obj.xml).find('pdf_cnt').text();
					} else {
						localSynap.pageSize = 1 + $endPage - $startPage;
					}
				}
			} else {
				if(skinType == "image") {
					localSynap.pageSize = $(obj.xml).find('image_cnt').text();
					if(localSynap.pageSize > 1) {
						skinType = "pdf";
						multiImage = true;
					}
				}
			}
			
			if (!localSynap.properties.debug) {
				$.ajaxSetup({cache: true});
			}
			if (skinType) {
				htmlUrl = skinType;
				
				if (BROWSER.isMobile()) {
					htmlUrl = htmlUrl + '_skin_mobile.xhtml';
				} else {
					htmlUrl = htmlUrl + '_skin.html';
				}
				
				// pdf 검색모듈 로딩
				if (skinType === 'pdf') {
					addScript('pdf_search.js');
				}
				//imgSkin일 때
				if(skinType === "image" || multiImage === true) {
					addScript("jQueryRotate.min.js");
				}
				$.ajax({
					type: 'GET',
					url: htmlUrl,
					dataType: 'text',
					success: function (html) {
						$('body').append(html);
						$('#headTitle').append(localSynap.properties.title);
						/*$.ajax({
							type: 'GET',
							url: skinType + '_skin.js',
							dataType: 'text',
							success:function(script){
								eval.call( window, script );
							},
							error:function(err){
								eval( err.responseText );
							}
						});*/
						// For debugging, not checked in all browser.
						//sns기능 사용시
						if(localSynap.properties.useSharedSns) {
							if(BROWSER.isMobile()) {
								addScript(localSynap.properties.kakaoScript);
							}
							addScript("sns.js");
						}
						addScript(skinType + '_skin.js');
					},
					error: function (err) {
						console.log(err.responseText);
					}

				});
			}
		},
		// TODO : 한글 인코딩 지원
		getParameter : function (param) {
			var returnValue,
				url = location.href,
				parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'),
				i,
				varName;
			for (i = 0; i < parameters.length; i = i + 1) {
				varName = parameters[i].split('=')[0];
				if (varName.toUpperCase() === param.toUpperCase()) {
					returnValue = parameters[i].split('=')[1];
					return decodeURIComponent(returnValue);
				}
			}
			return undefined;
		},
		referrer : function (param) {
		},
		errorMsg : function () {
			// 잘못된 ***
			alert('잘못된 파일 이름입니다');
		},
		printDocFromServer : function(id, contextDir){
			var printUrl = contextDir + 'pdf/' + id;
			localSynap.jobId = id;
			if(localSynap.status.pdfErrCode > 0){
					alert("인쇄 작업에 실패했습니다.");
					return;
			}
			$.ajax({
					type: 'GET',
					async: false,
					url: printUrl,
					success: function(xmlDoc){
							// FIXME : Duplicate Download Call
							window.location = printUrl;
					},
					error: function(error){
							alert("인쇄 작업에 실패했습니다.");
					}
			});
		}
	};
	return api;
}());

function addScript(scriptName) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = scriptName;
	head.appendChild(script);
}

// 유닛테스트용
if (typeof exports !== "undefined") {
    exports.api = api;
}

