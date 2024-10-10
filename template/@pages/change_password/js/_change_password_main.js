/* function */
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
    const password = document.getElementById("code").value;
    const password1 = document.getElementById("code1").value;
    let password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password_regex.test(password) === true) {
        document.getElementById("code_error").innerText = "";
    } else {
        document.getElementById("code_error").innerText = "✖ 格式錯誤";
        return false;
    }
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
        user_id: getCookie('uuid'),
        password_old: document.getElementById("code").value,
        password_new: document.getElementById("code2").value
    }
    fetch(`/api/EOrmM43T6XcP`, {
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
        if (data.status === 99) {
            document.getElementById("code_error").textContent = "✖ 原密碼錯誤";
        }
    })
    return false;
}

if (getCookie('CTF') === "") {
    location.href = "/404";
} else {
    CTF = getCookie('CTF');
    object = {
        CTF: CTF
    }
    fetch('/api/0AA0DrUYCKSE', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((r) => {
        if (r.status === 200) {
            return r.json();
        } else {
            location.href = "/404";
        }
    }).then(function (data) {
        if (data.status === 200) {
        } else {
            location.href = "/404";
        }
    })
}