var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function(user) {
    //foramt the githib api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
                // request successful
            if (response.ok) {
                response.json().then(function(data) {
                    // sends data to displayRepos
                displayRepos(data, user);
                });
            } else {
                alert("ERROR: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to GitHub");
        })
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

var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);

    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
            // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

            // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

            // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

            // append to container
        repoEl.appendChild(titleEl);

            // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center"

            // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);

            // check if api returened any repos
        if (repos.length === 0) {
            repoContainerEl.textContent = "No repositories found.";
            return;
        }
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);