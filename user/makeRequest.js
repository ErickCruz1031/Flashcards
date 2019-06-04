"strict mode";

// Do a CORS request to get Davis weather hourly forecast

let cards = null 
function renderCard(){
  console.log("In here");
}


// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}



// Make the actual CORS request to retrieve cards
function makeCorsRequestGetCards(event) {

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
