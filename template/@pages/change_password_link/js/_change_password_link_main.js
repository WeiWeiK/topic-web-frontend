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

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function No_Special_str() {
    const password1 = document.getElementById("code1").value;
    let password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password_regex.test(password1) === true) {
        document.getElementById("code_error1").innerText = "";
    } else {
        document.getElementById("code_error1").innerText = "✖ 請包含一個數字+字母, 長度>7";
        return false;
    }
}

function password_repeat() {
    const password1 = document.getElementById("code1").value;
    const password2 = document.getElementById("code2").value;
    if (password1 === password2) {
        document.getElementById("code_error2").innerText = "";
    } else {
        document.getElementById("code_error2").innerText = "✖ 與新密碼不相符";
        return false;
    }
}

function ProccessFormData() {
    if (No_Special_str() === false || password_repeat() === false) {
        return false;
    }
    const object = {
        CTF: window.location.href.split("=")[1],
        password_new: document.getElementById("code2").value
    }
    fetch(`/api/FGvWAP43NVq8`, {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => {
        if (r.status === 429) {
            location.href = "/404";
        }
        if (r.status === 200) {
            return r.json();
        }
    }).then(function (data) {
        if (data.status === 404) {
        }
        if (data.status === 200) {
            Swal.fire({
                title: '更改成功',
                confirmButtonText: '確認'
            }).then((e) => {
                location.href = "/";
            });
        }
    });
    return false;
}