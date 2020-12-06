
function setup() {
    createCanvas(700, 700)   

    var startlang = 'EN';
    var targetlang = 'ES';
    var input = 'i am somewhat sad today';
    input = encodeURIComponent(input.trim())

    var fetchstring = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=${startlang}&target=${targetlang}&input=${input}`

    var bearer = 'Bearer ' + 'a_FFbq1a4TseFykNTHyyLY5BlkemVauxOsLjokYirAmLdqOSzTlCk0NBQvYJla7X2x7WOaUY1KH3x4r8QH';



    fetch("https://api-b2b.backenster.com/b1/api/v3/translate", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer,
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Credentials": true,

        // "x-rapidapi-key": "07962b290bmsh4d15364210a18a2p112e9bjsnc2d02bc8d152",
        // "x-rapidapi-host": "lingvanex-translate.p.rapidapi.com"
      },
      "body": {
        "from": "en_GB",
        "to": "de_DE",
        "data": "London is the capital and largest city of England and of the United Kingdom.",
        "platform": "api"
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);

  })

}


// function draw() {

// }

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}