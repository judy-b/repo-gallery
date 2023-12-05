// Profile information will appear here
const overview= document.querySelector(".overview");
const username = 'judy-b';
// unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

const getGitHubData= async function() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    displayData(data);
}   

const displayData = async function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure><img alt="user avatar" src=${data.avatar_url} /></figure><div><p><strong>Name:</strong> ${data.name}</p><p><strong>Bio:</strong> ${data.bio}</p><p><strong>Location:</strong> ${data.location}</p><p><strong>Number of public repos:</strong> ${data.public_repos}</p></div>`;
    overview.append(div);
    fetchRepos();
}
getGitHubData()

const fetchRepos = async function() {
    const data = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await data.json();
    console.log(repos);
    displayRepos(repos);
}

const displayRepos = function(repos) {
    for (let repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
    }
}
