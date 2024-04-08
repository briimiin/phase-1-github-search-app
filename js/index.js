const baseURL = 'https://api.github.com';

document.getElementById('searchForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('usernameInput').value;
  try {
    const userResponse = await fetch(`${baseURL}/search/users?q=${username}&accept=application/vnd.github.v3+json`);
    const userData = await userResponse.json();
    const user = userData.items[0]; // Assuming the first result is the one we want
    const reposResponse = await fetch(`${baseURL}/users/${user.login}/repos?accept=application/vnd.github.v3+json`);
    const reposData = await reposResponse.json();
    displayUserInfo(user, reposData);
  } catch (error) {
    console.error('Error:', error);
  }
});

function displayUserInfo(user, repos) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = `
    <h2>${user.login}</h2>
    <img src="${user.avatar_url}" alt="${user.login}" width="100">
    <p>Repositories:</p>
    <ul>
      ${repos.map(repo => `<li>${repo.name}</li>`).join('')}
    </ul>
  `;
}
