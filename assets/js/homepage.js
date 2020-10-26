var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");


var getUserRepos = function(user) {
    //foramt the githib api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        });
    });
}

var formSubmitHandler = function(event) {
    event.preventDefault();
        // name input value trimed
    var username = nameInputEl.value.trim();
    if (username) {
            // if there's a username, go to getUserRepos function
        getUserRepos(username);
            // then clear the input
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);