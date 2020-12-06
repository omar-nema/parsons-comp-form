
function setup() {
    createCanvas(700, 700)   
}



// function draw() {

// }

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}



var firstWords = [];
const model = generateModel(bill_of_rights);
const model2 = generateModel2([{text: bill_of_rights, source: 'bor', weight: 0.6}, {text: seuss, source: 'seuss', weight: 0.4}]);

const output_text = generateText("Congress", model);
const txt = generateText2(model2);


document.body.innerHTML = output_text;
// console.log(output_text);



function generateModel2(input_arr) {

  //first word either has ton of links or is well, first word

  //word, src, weighmodet, nextWorsd
  var words = [];
  input_arr.forEach(srcobj => {

    var src = srcobj.source;
    
    var weight = src.weight;

    //generate first words
    var sentences = srcobj.text.split('. ');
    sentences.forEach(s => {
      sArray = s.split(' ');
      firstWords.push(sArray[0]);
      sArray.forEach(word => {
        wordObj = {
          word: word,
          src: src,
          firstWordInd: (word == sArray[0]) ? 1: 0,
          weight: weight
        };
        words.push(wordObj);
      });//end sentence
    }); //end sentences
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
        firstWordInd: nextwordObj.firstWordInd,
        src: nextwordObj.src 
      });
  }

  return model;
}


function generateText2(model) {

  var first_word = firstWords[Math.floor(Math.random() * firstWords.length)];

  //start with the word passed in
  let output_text = first_word;
  let current_word = first_word;
  
  for (let i = 0; i < 120; i++) {
      // choose the next word by sampling from options in the model
      current_word = sample(model[current_word]).word;

      // append word to output
      output_text += " ";
      output_text += current_word;

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

//pick a first wordo n its own







function generateModel(input_text) {
  const words = input_text.split(" ");
  const model = {};
  

  // loop through all the words except the last one.
  for (let i = 0; i < words.length - 1; i++) {
      const target_word = words[i];
      const next_word = words[i + 1];

      // if the model doesn't contain the target word, add it.
      if (!model[target_word]) {
          model[target_word] = [];
      }

      // add the next word to the possibilities for target_word
      model[target_word].push(next_word);
  }

  return model;
}


function generateText(first_word, model) {
    // start with the word passed in
    let output_text = first_word;
    let current_word = first_word;
    for (let i = 0; i < 120; i++) {
        // choose the next word by sampling from options in the model
        current_word = sample(model[current_word]);

        // append word to output
        output_text += " ";
        output_text += current_word;

        // if we get to a word that ends with "." we are done.
        const last_character = current_word.substr(current_word.length - 1);
        if (last_character === ".") {
            break;
        }
    }
    return output_text;
}


