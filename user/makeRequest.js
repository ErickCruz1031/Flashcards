"strict mode";

// Do a CORS request to get Davis weather hourly forecast

let cards = null;
let scores = null;
let lastIndex = 0;

function getScore(index){
  let score = Math.max(1, 5 - cards[index].correct) + Math.max (1, 5 - cards[index].seen) + 5*((cards[index].seen - cards[index].corrext)/cards[index].seen);
  return score;
}


function nextCard(){

  let randIndex = Math.floor(Math.random() * cards.length); //random number between 0 and the length of cards
  let current_score = getScore(randIndex);
  let random_num =  Math.floor(Math.random() * 16); //random number between 0 and 15 

  while(random_num > current_score)
  {
    randIndex = Math.floor(Math.random() * cards.length);
    current_score = getScore(randIndex);
    random_num =  Math.floor(Math.random() * 16); 
  }

  lastIndex = randIndex;
  console.log("The size of the cards is ", cards.length, " and we chose ", lastIndex);
  console.log("Value going in " ,document.getElementById("box-two-review").value );
  if (lastIndex >= cards.length)
  {
    console.log("We ran out of cards");
    return;
  } //Check if you are out of cards
  document.getElementById("box-one-review").placeholder = cards[lastIndex].spanish;
  document.getElementById("box-one-review").style.background = "white";
  //document.getElementById("box-one-review").placeholder.style.color = "black";
  document.getElementById("box-two-review").placeholder = "Answer";


}

function renderCard(event){
  if(event.charCode != 13)
  {
    return;
  }

  if (lastIndex >= cards.length)
  {
    console.log("We ran out of cards Broo");
    return;
  } 

  event.preventDefault();

  console.log("Now the index is ", lastIndex);

  let input = document.getElementById("box-two-review").value; //The user input
  document.getElementById("box-two-review").value = ""; //The user input
  let answerString = cards[lastIndex].english;
  let an_key = answerString.toLowerCase();
  input = input.toLowerCase();
  console.log("The key is ", an_key, " and the input is ", input);
  console.log("The index is ", lastIndex);
  if (input == an_key)
  {
    console.log("It was right!");
    document.getElementById("box-one-review").placeholder = "Correct!";
    document.getElementById("box-one-review").style.background = "rgb(155, 245, 202)";
    document.getElementById("box-two-review").value = "";
    document.getElementById("box-two-review").placeholder = cards[lastIndex].english;
  }
  else
  {
    //document.getElementById("box-two-review").value = cards[lastIndex].english;
    document.getElementById("box-two-review").value = "";
    document.getElementById("box-two-review").placeholder = cards[lastIndex].english;

    console.log("WE put inside ",cards[lastIndex].english );
    console.log("Value is " ,document.getElementById("box-two-review").value );
  }

  return;
}


// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}



// Make the actual CORS request to retrieve cards
function makeCorsRequestGetCards() {

  let url = "getCards";

  let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string   // turn it into an object
      let object = JSON.parse(responseStr);  // turn it into an object
      console.log("The object is " + object.name);
      console.log("The othe rone is ", responseStr);
      console.log("The length is ",object.length)
      console.log("The other one with length is ",responseStr.length)
      cards = object;
      console.log("Now the cards object is ", cards);
      //console.log(responseStr);  // print it out as a string, nicely formatted
      //console.log("The spanish is " + object.spanish);
      nextCard(); //To render the new card

  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}




// Make the actual CORS request.
function makeCorsRequestTranslate(event) {

  if(event.charCode != 13)
  {
    return;
  }



  let phrase = document.getElementById("box-one").value;
  //console.log("the input was " + phrase);

  let url = "translate?english=" + phrase;

  let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string   // turn it into an object
      let object = JSON.parse(responseStr);  // turn it into an object
      //console.log(responseStr);  // print it out as a string, nicely formatted
      //console.log("The spanish is " + object.spanish);
      document.getElementById("box-two").value = object.spanish;
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

// Make the actual CORS request.
function makeCorsRequestSave() {

  console.log("requested to save");

  let english = document.getElementById("box-one").value;
  let spanish = document.getElementById("box-two").value;

  let url = "store?english=" + english + "&spanish=" + spanish;

  let xhr = createCORSRequest('POST', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string   // turn it into an object
      console.log(responseStr);  // print it out as a string, nicely formatted
      document.getElementById("box-one").value = '';
      document.getElementById("box-one").placeholder = "English";
      document.getElementById("box-two").value = '';
      document.getElementById("box-two").placeholder = "Translation";
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}
