// Profile information will appear here
const overview= document.querySelector(".overview");
const username = 'judy-b';
// unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
// the section where all the repo info appears
const repoSection = document.querySelector(".repos");
// the section where the individual repo data will appear
const repoData = document.querySelector(".repo-data");

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

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
})

const getRepoInfo = async function(repoName) {
    const data = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
    const repoInfo = await data.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (const language in languageData) {
        languages.push(language)
    }

    displayRepoInfo(repoInfo, languages)
}

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
            `;
    repoData.append(div);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
}