// DOM objects
let btn = document.getElementById("btn");
let generatedWord = document.getElementById("text");
let userInput = document.getElementById("input");
let result = document.getElementById("result");

// declerating program variables
let interval;
let x = 100; // x represents the number of generated words
let score = 0;
let words; // this is an array contains all wordes generated from the API
let userInputArray = [];
let generatedArray = [];


// requesting a random number from an API 
let request = new XMLHttpRequest();
request.open('GET', 'https://random-word-api.herokuapp.com/word?number=400', true);
request.responseType = "";
// add event listener to our request
request.onload = function () {
  words = request.response.split('","');
  btn.style.visibility = "visible";
};
request.send(null);


// send request to a server to update user count
// requesting a random number from an API 
//let req = new XMLHttpRequest();
//req.open('GET', 'http://localhost:9090', true);
//req.send();


// we should put both words and sentences in an outer files 
// also we should make changeable between words and sentences 
// we also should add the high score element

// when user click the btn button start the app
btn.onclick = start;

// Entery point function
function start(){
	if(!btn.classList.contains("stop")){
			changeState(btn);
	        generate();
	        result.style.visibility ="hidden";
	        result.innerText="";
	        interval = setInterval(generate, 5000);
	}
	else if(btn.classList.contains("stop")){
		generatedWord.innerText = "Click Start Button To Begin";
		clearInterval(interval);
		showResult();
		changeState(btn);
	    userInputArray =[];
	    generatedArray =[];
	    score = 0;
	}
}

// generate random word from words array
function generate(){
	if(x>0){
			let word = words[Math.floor(Math.random()*400)];
			generatedWord.innerText = word;
			generatedArray.push(word.toLowerCase());
		    userInputArray.push(userInput.value.toLowerCase());
	        userInput.value = "";
	        x--;
    }else{
  	clearInterval(interval);
  	changeState(btn);
  	showResult();
    }
}

// when clicking the button => change his state
function changeState(btn){
	if(btn.classList.contains("stop")){
		btn.classList.remove("stop");
		btn.innerText = "start";
	}else{
		btn.classList.toggle("stop");
		btn.innerText = "stop";
	}
}

// finally we show the test result
function showResult(){
	generatedArray.forEach( i => {
		if(userInputArray.includes(i)){
			score++;
		}
	});

	let finalResult =( score/generatedArray.length )*100;
	result.innerText = `result ${finalResult.toFixed(2)}%`;
	result.style.visibility = "visible";
}
