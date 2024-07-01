//업엔 다운 게임-2회차

//도큐먼트 요소를 객체로 가져오자
let userInput = document.getElementById("user_input")
let playButton = document.getElementById("play_go")
let resultlabel = document.getElementById("result_label")
let resetButton = document.getElementById("reset_game")
let chancelabel = document.getElementById("chance_label")
let trylabel = document.getElementById("try_label")
let answerLabel = document.getElementById("answer_label")
let mainImg = document.getElementById("mainimg")

let chance = 3
let gameOver = false
let history = []

//랜덤 숫자를 뽑아보자
let randomNum = 0
//랜덤 숫자 출력 함수
function popRandomNumber(){
    randomNum = Math.floor(Math.random()*100)+1
    console.log(`랜덤 숫자는 : ${randomNum}`)
    answerLabel.textContent = `정답 : ${randomNum}`
}
popRandomNumber()//랜덤 숫자 함수 호출


//playButton에 이벤트 리스너 추가
playButton.addEventListener('click', playrun)

//userinput 이벤트 리스너 추가(인풋창 자동 초기화)
userInput.addEventListener('focus',function(){userInput.value=""})

//playrun 함수
function playrun(){
    mainImg.setAttribute("src","/image/ing.gif")
    //userInput 값 가져오기
    let tempInput = userInput.value

    //유효성 검사.1 : 1~100 초과시
    if(tempInput < 1 || tempInput > 100){
        resultlabel.textContent = "앗 ! 다시 입력해주세요.(1~100까지)"
        return
    }
    //유효성 검사.2 : 중복입력 검사
    if(history.includes(tempInput)){
        resultlabel.textContent = "이미 입력한 값입니다. 다시 입력해주세요."
        return
    }

    //클릭 후, 기회 1 차감
    chance--
    chancelabel.textContent = `남은 기회 : ${chance} 회`

    //랜덤 값과 사용자 값 비교후 결과 출력
    if(tempInput > randomNum){
        resultlabel.textContent = `Down ↓↓↓`
    }else if(tempInput < randomNum){
        resultlabel.textContent = `Up ↑↑↑`
    }else {
        resultlabel.textContent = "축하합니다. 정답입니다."
        playButton.disabled = true
        mainImg.setAttribute("src","/image/answer.gif")
        return //정답이면  버튼 비활성화, 이미지 변경후 리턴문으로 빠져나감.
    }
 
    //기회 소진시 버튼 차단
    if(chance < 1){
        playButton.disabled = true
        gameOver = true
    }
    //사용자 입력값을 히스토리에 저장
    history.push(tempInput)
    trylabel.textContent = `입력값 : ${history}`
    
    //정답 시 게임 오버
    if(gameOver){
        playButton.disabled = true
        resultlabel.textContent = `아쉽네요~ 정답은 ${randomNum} 이었습니다.`
        mainImg.setAttribute("src","/image/fail.png")
    }
}

//resetButton에 이벤트 리스너 추가
resetButton.addEventListener('click', reset)

//reset 함수 생성
function reset(){
    userInput.value = "" //input창 초기화
    resultlabel.textContent = "1부터 100까지 숫자를 입력하세요~!"
    //새로운 랜덤 번호 생성
    popRandomNumber()
    //히스토리 초기화
    history = []
    //입력값,남은기회 초기화
    chance = 3
    trylabel.textContent = `입력값 : ${history}`
    chancelabel.textContent = `남은 기회 : ${chance} 회`
    //버튼 다시 활성화, 메인이미지 원래 이미지로 되돌림
    gameOver = false;
    playButton.disabled = false;
    mainImg.setAttribute("src","/image/main2.png")
}