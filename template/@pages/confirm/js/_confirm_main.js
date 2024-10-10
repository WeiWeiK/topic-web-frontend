/* custom variable */

/* custom dictionary */

/* custom function */
function parseCookie() {
    let cookieObj = {};
    let cookieAry = document.cookie.split(';');
    let cookie;

    for (let i = 0, l = cookieAry.length; i < l; ++i) {
        cookie = cookieAry[i].trim();
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }
    return cookieObj;
}

function getCookieByName(name) {
    let value = parseCookie()[name];
    if (value) {
        value = decodeURIComponent(value);
    }
    return value;
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function delete_cookie(name) {
    document.cookie = name + '=;expires=' + new Date(0).toUTCString() + ';path=/;';
}

function ProccessFormData() {
    const code = document.getElementById("code").value;
    if (/^[0-9]{7,8}$/.test(code) === true) {
        const object = {
            code: `${code}`,
            gmail: `${getCookieByName('gmail')}`
        }
        fetch('/api/5MEjphyPh0SP', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((r) => {
            if (r.status === 404) {
                document.getElementById("code_error").innerText = "✖ 驗證碼錯誤";
                return false;
            }
            if (r.status === 429) {
                const object = {
                    gmail: `${getCookieByName('gmail')}`
                }
                fetch('/api/6dM4orwuTcax', {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(object),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).catch(err => {
                    console.log(err);
                });
                delete_cookie('gmail');
                window.location.replace('/404');
            }
            if (r.status === 200) {
                return r.json();
            }
        }).then(function (data) {
            if (data.status === 200) {
                setCookie("CTF", data.CTF);
                setCookie("uuid", data.uuid);
                window.location.replace('/');
            }
        });
        return false;
    } else {
        document.getElementById("code_error").innerText = "✖ 驗證碼為7位數的數字!";
        return false;
    }
}

/* Main */
fetch('/api/5mAcwwhmk4Ve', {
    method: 'POST',
    body: JSON.stringify({
        gmail: getCookieByName('gmail')
    }),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(r => {
    return r;
}).then(function (e) {
    if (e.status === 404) {
        location.href = "/";
    }
})







