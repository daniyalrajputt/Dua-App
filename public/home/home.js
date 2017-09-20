var database = firebase.database().ref();
var getName = document.getElementById('exampleFormControlInput1')
var getInput = document.getElementById('exampleFormControlTextarea1');
// above code is for firebase
var user = localStorage.getItem("loggedInUser");
var convertToParse = JSON.parse(user);
var heading = document.getElementById("heading").innerHTML = (convertToParse.firstName+ " "+convertToParse.lastName).toUpperCase();
var fname = document.getElementById("firstName").innerHTML = convertToParse.firstName;
var lname = document.getElementById("lastName").innerHTML = convertToParse.lastName;
var email = document.getElementById("emailid").innerHTML = convertToParse.email;
var phone = document.getElementById("phone").innerHTML = convertToParse.phone;
var gender = document.getElementById("gender").innerHTML = convertToParse.gender;
var age = document.getElementById("age").innerHTML = convertToParse.age;




console.log(convertToParse);

// function that submit post in firebase
function submitPray() {
    var userInput = getInput.value;
    var prayer = {
        username: convertToParse.firstName + " " + convertToParse.lastName,
        pray: userInput
    }
    if (userInput !== "") {
        database.child('post').push(prayer).then(function () {
            alert("SuccessFully Send");
        });
        getInput.value = "";
        getInput.focus();
    }
    else {
        alert("You have to Write Something")
    }
}


// for feeds
function feed() {
    window.location.replace("../feed/feed.html")

}

// for signout
function signOut() {
    window.location.replace("../login/login.html")
    localStorage.clear()

}