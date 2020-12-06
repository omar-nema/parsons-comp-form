var firstWords = [];

var weightedSources = [];
var sourceWeights = {
  'kanye': 5,
  'drake': 0
};
function updateWeightedSources(){
  wtTotal = 0;
  weightedSources = [];
  for (src in sourceWeights){
    wt = sourceWeights[src];
    for (var i=0; i<wt; i++){
      weightedSources.push(src);
    }
  } 
}
updateWeightedSources();

function cleanText(str){
  str = str.replace(/(?:\r\n|\r|\n)/g, '. ')
  str = str.replace(' . ', '');
  return str;
}


 
Promise.all([
  fetch("kanye.txt").then(r => r.text()),
  fetch("drake.txt").then(r => r.text()),
]).then(([kanye, drake]) => {

  kanye = cleanText(kanye);
  drake = cleanText(drake);
  var model = generateModel([{text: kanye, source: 'kanye'}, {text: drake, source: 'drake'}]);
  var txt = generateText(model);

  console.log(generateText(model), ' - ', generateText(model),generateText(model), ' - ', generateText(model),generateText(model), ' - ', generateText(model))

  document.body.innerHTML = txt;

});


function generateModel(input_arr) {

  //first word either has ton of links or is well, first word

  var words = [];
  input_arr.forEach(srcobj => {

    var src = srcobj.source;
    var weight = src.weight;

    //generate first words
    var sentences = srcobj.text.split('. ');
    sentences.forEach(s => {
      sArray = s.split(' ');
      firstWords.push(sArray[0]);
    }); 

    //generate word + source obj
    var srcwords = srcobj.text.split(' ');
    srcwords.forEach(word => {
      words.push({
        word: word,
        source: src
      })
    });

  });

  var model = {};
  // loop through all the words except the last one.
  for (let i = 0; i < words.length - 1; i++) {
      
      const target_word = words[i].word;
      const next_word = words[i + 1].word;
      const nextwordObj = words[i+1];

      // if the model doesn't contain the target word, add it.
      if (!model[target_word]) {
          model[target_word] = [];
      }

      // add the next word to the possibilities for target_word
      model[target_word].push({
        word: next_word,
        source: nextwordObj.source 
      });
  }

  return model;
}


function generateText(m) {

  var first_word = firstWords[Math.floor(Math.random() * firstWords.length)];

  var first_word =  "Get"

  //better off getting something capitalized

  //start with the word passed in
  let output_text = first_word;
  let current_word = first_word;
  
  for (let i = 0; i < 120; i++) {
      // choose the next word by sampling from options in the model
      var source = sample(weightedSources);
      current_word = sample(m[current_word]).word;

      current_word = weightedSample(source, m[current_word]);
     
      if (!current_word ){
        break;
      } else {
        current_word = current_word.word;
      }
  

      // append word to output
      output_text += " ";
      output_text += current_word.toLowerCase();

      // if we get to a word that ends with "." we are done.
      const last_character = current_word.substr(current_word.length - 1);
      if (last_character === ".") {
          break;
      }

      
  }
  return output_text;

}

function sample(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function weightedSample(source, array){
  var array = array.filter(d=> d.source == source);
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

