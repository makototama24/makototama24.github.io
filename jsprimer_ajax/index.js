function fetchUserInfo(userId){
    fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
        console.log(response.status);
        if(!response.ok){
            console.error("エラーレスポンス", response);
        }else{
            return response.json().then(userinfo => {
                const view = escapeHTML`
                <h4>${userinfo.name} (@${userinfo.login})</h4>
                <img src="${userinfo.avatar_url}"alt="${userinfo.login}" height="100">
                <dl>
                    <dt>Location</dt>
                    <dd>${userinfo.location}</dd>
                    <dt>Repositories</dt>
                    <dd>${userinfo.public_repos}</dd>
                </dl>
                `;
                
                const result = document.getElementById("result")
                result.innerHTML = view;
            });
        }
        }).catch(error => {
            console.error(error);
        });
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