function fetchUserInfo(userId){
    fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
        console.log(response.status);
        if(!response.ok){
            console.error("エラーレスポンス", response);
        }else{
            return response.json().then(userinfo => {
                console.log(userinfo);
            });
        }
        }).catch(error => {
            console.error(error);
        });
    }
