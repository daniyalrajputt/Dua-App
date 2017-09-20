var user = localStorage.getItem("loggedInUser");
var convertToParse = JSON.parse(user);
var database = firebase.database().ref("/");
var heading = document.getElementById("heading").innerHTML = (convertToParse.firstName + " " + convertToParse.lastName).toUpperCase();

var body = document.getElementById("body");


database.child('post').on("child_added", function (snap) {
    var obj = snap.val();
    obj.key = snap.key

    var div1 = document.createElement("DIV")
    div1.setAttribute("class", "card text-center");
    div1.setAttribute("id", obj.key);
    // div1.setAttribute("style", "width: 20rem")
    var div2 = document.createElement("DIV")
    div2.setAttribute("class", "card-body")
    var h4 = document.createElement('H4')
    h4.setAttribute("class", "card-header card-title")
    var p = document.createElement('P')
    p.setAttribute("class", "card-text")


    // comment code
    var commentDiv = document.createElement("DIV")
    commentDiv.className = "input-group"

    var input = document.createElement("INPUT");
    input.className = "form-control";

    var span = document.createElement("SPAN");
    span.className = "input-group-btn"

    var button = document.createElement("INPUT")
    button.type = "button"
    button.className = "btn btn-outline-success my-2 my-sm-0"
    button.value = "Comment"
    button.addEventListener("click", function () {
        var commentData = {
            comment: input.value,
            senderName: convertToParse.firstName + " " + convertToParse.lastName,
            key: obj.key
        }
        database.child('Comments').push(commentData).then(function(){
            alert("Comment send")
            input.value = ""
        })
    })

    // LIKE button
    var spanLike = document.createElement("SPAN");
    spanLike.className = "input-group-btn";

    var likeBtn = document.createElement("INPUT")
    likeBtn.type = "button"
    likeBtn.className = "btn btn-outline-primary my-2 my-sm-0"
    likeBtn.value = "Like"

    spanLike.appendChild(likeBtn)


    span.appendChild(button)
    commentDiv.appendChild(likeBtn)
    commentDiv.appendChild(input)
    commentDiv.appendChild(span)

    // Comments rendering
    var commentList = document.createElement('DIV')
    commentList.className = "list-group"

    var textH4 = document.createTextNode(obj.username)
    var textP = document.createTextNode(obj.pray)
    h4.appendChild(textH4)
    p.appendChild(textP)
    div2.appendChild(h4)
    div2.appendChild(p)
    div2.appendChild(commentDiv)
    div1.appendChild(div2)
    div1.appendChild(commentList)
    body.appendChild(div1)

})

database.child('Comments').on("child_added", function(snap) {
    comment = snap.val().comment
    key = snap.val().key
    name = snap.val().senderName
    renderComment(comment, key, name)
})

function renderComment(comment, key, name) {
    var ul = document.createElement("ul");
    var commentli = document.createElement("li");
    var nameli = document.createElement("li");
    ul.setAttribute("class", "list-group list-group-flush")
    nameli.setAttribute("class", "list-group-item")
    nameli.setAttribute("style", "background:#F0FAE4")
    commentli.setAttribute("class", "list-group-item")
    var liText2 = document.createTextNode(name.toUpperCase() + " Commented")
    var liText = document.createTextNode('"' + comment + '"')
    nameli.appendChild(liText2)
    commentli.appendChild(liText)
    var parent = document.getElementById(key)
    ul.appendChild(nameli)
    ul.appendChild(commentli)
    parent.appendChild(ul)
}

// for home
function home() {
    window.location.replace("../home/home.html")

}
// for signout
function signOut() {
    window.location.replace("../login/login.html")
    localStorage.clear()

}