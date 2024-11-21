/** 화면에서 구현 시작 */
var overMouse=true;
var loop = 1; // 초기 팝업이미지 번호
var bennerToggle = 0;
var bennerLength = 20;
bennerLength = Number(bennerLength); //알림판 수량
var bennerArray = new Array(bennerLength);
/** 화면에서 구현 종료 */



var LoopCnt = bennerArray.length;  // 회전되는 팝업이미지 개수    
var clearTimer;     

function goBennerPlay() {
    this.overMouse=true;        
    this.bennerToggle = 0;
    this.clearTimer = window.setInterval("bennerScrolling();",2000);
}

function goBennerStop() {
    clearTimeout(this.clearTimer);
}   

function bennerScrolling() {         
    if (overMouse) {                                
        bennerMove(loop);        
        loop++;
        if(loop > LoopCnt) loop = 1;                 
    } else {
        clearTimeout(clearTimer);
    }
}

if(overMouse){
    goBennerPlay();     
} else {
    goBennerStop();     
}

function bennerMove(indexNum){
    for(var i=1; i<this.bennerLength+1; i++) {                      
        if(i == indexNum)   {
            document.getElementById("bennericon"+i).className = "on";
            document.getElementById("bennerimage"+i).style.display = "block";
        } else {                
            if(document.getElementById("bennericon"+i) != null)     
                document.getElementById("bennericon"+i).className = "";
            if(document.getElementById("bennerimage"+i) != null)
                document.getElementById("bennerimage"+i).style.display = "none";
        }       
    }
}

function bennerPrev(){
    loop--;
    if(loop <= 0){ loop = this.bennerLength;}
    bennerMove(loop);
    clearTimeout(clearTimer);
}

function bennerNext(){
    loop++;
    if(loop > LoopCnt) loop = 1;
    bennerMove(loop);
    clearTimeout(clearTimer);
}