function main(){
    fetchUserInfo("makototama24")
    .then((userinfo) => createView(userinfo))
    .then((view) => displayView(view))
    .catch(error => {
        console.erro(`エラーが発生しました　(${error})`);
    });
}

function fetchUserInfo(userId){
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
        if(!response.ok){
           return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
        }else{
            return response.json();
        };
    });
}

function displayView(view){
    const result = document.getElementById("result");
    result.innerHTML = view;
}

function createView(userinfo){
    return  escapeHTML`
    <h4>${userinfo.name} (@${userinfo.login})</h4>
    <img src="${userinfo.avatar_url}"alt="${userinfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userinfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userinfo.public_repos}</dd>
    </dl>
    `;
}

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(string, ...values){
    return string.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string"){
            return result + escapeSpecialChars(value) + str;
        }else{
            return result + String(value) + str;
        }
    })
}