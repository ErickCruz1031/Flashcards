"use strict"

const APIrequest = require('request');
const express = require('express');
const app = express();
const port = 53232;
const urlParse = require('url');
const http = require('http');
const cors = require('cors');
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');

const db = new sqlite3.Database('Flashcards.db');
//These two will be continually used throughout execution
const APIkey = "AIzaSyAd_ygAfqMtL2kbMXpsBd_9KPSxi_wwQn8";
const url_total = "https://translation.googleapis.com/language/translate/v2?key="+ APIkey;

// Google login credentials, used when the user contacts
// Google, to tell them where he is trying to login to, and show
// that this domain is registered for this service. 
// Google will respond with a key we can use to retrieve profile
// information, packed into a redirect response that redirects to
// server162.site:[port]/auth/redirect
const googleLoginData = {
    clientID: "841912612744-t4ispgph8n8j4lmcgv1uhp1l0hg2oans.apps.googleusercontent.com",
    clientSecret: "TQdFiw7Jqv_5rvBOrrmhCiYI",
    callbackURL: '/auth/redirect'
};

// Strategy configuration. 
// Tell passport we will be using login with Google, and
// give it our data for registering us with Google.
// The gotProfile callback is for the server's HTTPS request
// to Google for the user's profile information.
// It will get used much later in the pipeline. 
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );


// Let's build a server pipeline!

// app is the object that implements the express server
//const app = express();

// pipeline stage that just echos url, for debugging
app.use('/', printURL);

// Check validity of cookies at the beginning of pipeline
// Will get cookies out of request, decrypt and check if 
// session is still going on. 
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']  
}));

// Initializes request object for further handling by passport
app.use(passport.initialize()); 

// If there is a valid cookie, will call deserializeUser()
app.use(passport.session()); 



//app.get('/translate', handler);
//app.post('/store', storeHandle);
// Public static files
app.get('/*',express.static('public'));

// next, handler for url that starts login with Google.
// The app (in public/login.html) redirects to here (not an AJAX request!)
// Kicks off login process by telling Browser to redirect to
// Google. The object { scope: ['profile'] } says to ask Google
// for their user profile information.
app.get('/auth/google',
	passport.authenticate('google',{ scope: ['profile'] }) );
// passport.authenticate sends off the 302 response
// with fancy redirect URL containing request for profile, and
// client ID string to identify this app. 

// Google redirects here after user successfully logs in
// This route has three handler functions, one run after the other. 
app.get('/auth/redirect',
	// for educational purposes
	function (req, res, next) {
	    console.log("at auth/redirect");
	    next();
	},
	// This will issue Server's own HTTPS request to Google
	// to access the user's profile information with the 
	// temporary key we got in the request. 
	passport.authenticate('google'),
	// then it will run the "gotProfile" callback function,
	// set up the cookie, call serialize, whose "done" 
	// will come back here to send back the response
	// ...with a cookie in it for the Browser! 
	function (req, res) {
	    console.log('Logged in and using cookies!')
	    res.redirect('/user/lango.html');
	});

// static files in /user are only available after login
app.get('/user/*',
    isAuthenticated, // only pass on to following function if
	// user is logged in 
	// serving files that start with /user from here gets them from ./
	express.static('.') 
       ); 

// next, all queries (like translate or store or get...
//app.get('/query', function (req, res) { res.send('HTTP query!') });

//app.use(express.static('public'));
app.get('/user/translate', handler);
app.post('/user/store', storeHandle);
//app.get('/translate', handler);
//app.post('/store', storeHandle);



// finally, not found...applies to everything
app.use( fileNotFound );


// Pipeline is ready. Start listening!  
//app.listen(53232, function (){console.log('Listening...');} );


// middleware functions

// print the url of incoming HTTP request
function printURL (req, res, next) {
    console.log(req.url);
    next();
}

// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
    if (req.user) {
	console.log("Req.session:",req.session);
	console.log("Req.user:",req.user);
	next();
    } else {
	res.redirect('/login.html');  // send response telling
	// Browser to go to login page
    }
}


// function for end of server pipeline
function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }

// Some functions Passport calls, that we can use to specialize.
// This is where we get to write our own code, not just boilerplate. 
// The callback "done" at the end of each one resumes Passport's
// internal process. 

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google. 
function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile ID is ",profile);
    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
	// should be key to get user out of database.
	
	//Check if the user is already in the database


	/*
	let searchCmd = "SELECT * FROM UserInformation WHERE GoogleID ='"+ profile.id + "'";
	//let searchCmd = 'SELECT ' +  profile.id + ' FROM UserInformation';
	console.log("THe search command was ", searchCmd);
	db.get(searchCmd, tableSearchCallback(profile));
	*/

	let searchCmd = "SELECT * FROM UserInformation WHERE GoogleID ='"+ profile.id + "'";
	console.log("THe search command was ", searchCmd);
	db.all(searchCmd, (err, row) => {
		if (err){
			console.log("There was an error in this");
		}
		if (row){
			console.log("IT IS HER");
			console.log(row);
			done(null, dbRowID); 
		}
		else{
			console.log("WE NEED TO ADD IT");
			done(null, dbRowID); 
		}
	});

    let dbRowID = profile.id;  // temporary! Should be the real unique
    // key for db Row for this user in DB table.
    // Note: cannot be zero, has to be something that evaluates to
    // True.  


	//THis was comemnted out
    //done(null, dbRowID); 
}

// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function tableSearchCallback(prof, err, rowdata) {
    if (err) {
	console.log("Table creation error",err);
    } else {
		console.log("ZThis was returned:", rowdata)
		if (rowdata == null)
		{
			console.log("We are adding the new user");
			console.log("ERR is ", err);
			/*
			
			let cmdStr = 'INSERT INTO UserInformation(GoogleID, firstName, lastName) VALUES(@0, @1, @2)';

			//console.log("The command is the following: \n" + cmdStr);
			db.run(cmdStr, prof.id , prof.name.givenName,  prof.name.familyName, tableInsertCallback);
			*/

			
			let cmdStr = 'INSERT INTO UserInformation(GoogleID, firstName, lastName) VALUES(@0, @1, @2)';

			//console.log("The command is the following: \n" + cmdStr);
			db.run(cmdStr, prof.id , prof.name.givenName,  prof.name.familyName, tableInsertCallback);


			console.log("IT WAS NULLLLL");
		}//This is when you add a new user
		console.log("the ID is ", prof.id);

		dumpDBUser();
	}
	
	
}



function dumpDBUser() {
	db.all ( 'SELECT * FROM UserInformation', dataCallback);
	function dataCallback( err, data ) {console.log(data)}
}



function tableInsertCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
		console.log("We added the new user!");
    }
}

// Part of Server's sesssion set-up.  
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie. 
passport.serializeUser((dbRowID, done) => {
    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie. 
// Where we should lookup user database info. 
// Whatever we pass in the "done" callback becomes req.user
// and can be used by subsequent middleware.
passport.deserializeUser((dbRowID, done) => {
    console.log("deserializeUser. Input is:", dbRowID);
    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
    // as the property "user" of the "req" object. 
    let userData = {userData: dbRowID};
    done(null, userData);
});












function dumpDB() {
	db.all ( 'SELECT * FROM flashcards', dataCallback);
	function dataCallback( err, data ) {console.log(data)}
}

function storeHandle(req, res){
	function insertCallback(err){
		if (err) {console.log(err);}
		else{
			dumpDB();
			res.send("Finished");
		}
	}




	let queryData = urlParse.parse(req.url, true).query;
	console.log(queryData)
	//console.log("we got a storing function")

	//console.log("The english is " + queryData.english);
	//console.log("The spanish was " + queryData.spanish);
	let cmdStr = 'INSERT INTO Flashcards (user, english, spanish, seen, correct) VALUES(@0, @1, @2, 0, 0)';

	//console.log("The command is the following: \n" + cmdStr);
	db.run(cmdStr, req.user.userData, queryData.english, queryData.spanish,  insertCallback);

}
function handler(req, res){
	let queryData = urlParse.parse(req.url, true).query;

//	console.log(queryData)

//	console.log("The whole url is the following: " + url);

	console.log("This is a translation");
	console.log("The user if is ", req.user.userData);
	let requestObject =
	{
	"source": "en",
	"target": "es",
	"q": [
		queryData.english
	]
	}

	callAPI(res, requestObject);




}




function callAPI(res, reqObj){
	function APIcallback(err, APIresHead, APIresBody) {
		// gets three objects as input
		if ((err) || (APIresHead.statusCode != 200)) {
			// API is not working
			console.log("Got API error");
			console.log(APIresBody);
			res.send("There was an error");
		} else {
			if (APIresHead.error) {
			// API worked but is not giving you data
			console.log(APIresHead.error);
			} else {
			console.log("In Spanish: ",
				APIresBody.data.translations[0].translatedText);
			console.log("\n\nJSON was:");
			console.log(JSON.stringify(APIresBody, undefined, 2));
			res.json({
					english : reqObj.q[0],
					spanish : APIresBody.data.translations[0].translatedText
			});

			// print it out as a string, nicely formatted
			}
		}
	} // end callback function

	APIrequest(
		{ // HTTP header stuff
			url: url_total,
			method: "POST",
			headers: {"content-type": "application/json"},
			// will turn the given object into JSON
			json: reqObj},
		// callback function for API request
		APIcallback
	);


}

app.listen(port, function(){console.log('Listening...')});