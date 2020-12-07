var txt = [''];
let container;
var s = new Sentimood();

function drawText(){
    let str = txt.join('');
    document.querySelector('#container').innerHTML = str;
}

function randItem(arr){
    return arr[Math.floor(Math.random() * arr.length)];
};

var negReactions =
['sounds juicy tell me more', 'pls stop talking to yourself and go find a therapist', "what a downer you are", 'cry me a..', 'like so emo -_-']

var posReactions = 
["glad you're feeling good but like where's the goss", 'good 4 u', "ugh i'm jealous being human sounds fun", 'can you stop bragging?']

var neutralReactions = 
['go on..', 'yawnnn', 'what else?', 'ookkaay and..?'];

function detectSentiment(){
    let str = txt.join('');
    var lastSentArr = str.split('.');
    var lastSent = lastSentArr[lastSentArr.length-2];
    var sent = s.analyze(lastSent);
    var judge = document.querySelector('.judge');

    if (sent.score < 0){
        judge.innerHTML = randItem(negReactions);
    } else if (sent.score > 0){
        judge.innerHTML = randItem(posReactions);
    } else {
        judge.innerHTML = randItem(neutralReactions);
    }
}


document.onkeydown = function (e) {

    e = e || window.event;
  
    if (e.key == "Backspace"){
        txt = txt.slice(0, -1);
    } 
    else if (e.key.length == 1) {
        txt.push(e.key);
    }
    drawText();
    if (e.key == '.'){
        detectSentiment();
    }
    
};

