/* custom variable */
const eyes = document.getElementById("eyes");
const password = document.getElementById("pass");

/* custom dictionary */

/* custom function */
function No_Special_str() {
    const gmail = document.getElementById("gmail").value;
    const password = document.getElementById("pass").value;
    let gmail_regex = /^[a-zA-z\d](\.?[a-zA-z\d]){3,}@g(oogle)?mail\.com$/;
    let password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (gmail_regex.test(gmail) === true) {
        document.getElementById("gmail_error").innerText = "";
    } else {
        document.getElementById("gmail_error").innerText = "✖ 請輸入正確gmail信箱";
        return false;
    }
    if (password_regex.test(password) === true) {
        document.getElementById("pass_error").innerText = "";
    } else {
        document.getElementById("pass_error").innerText = "✖ 密碼格式錯誤";
        return false;
    }
}

function ProcessFormData() {
    if (No_Special_str() === false) {
        return false;
    } else {
        const gmail = document.getElementById("gmail").value;
        const password = document.getElementById("pass").value;
        const object = {
            gmail: gmail,
            password: password,
            stay_logged: document.getElementById("check").checked
        }
        fetch('/api/4HK4xUedGz6Y', {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((r) => {
            if (r.status === 429) {
                location.href = "/404";
            }
            if (r.status === 200) {
                return r.json();
            }
        }).then(function (data) {
            if (data.status === 200) {
                window.location.replace('/');
            }
            if (data.status === 401) {
                document.getElementById("pass_error").innerText = "✖ 密碼錯誤";
                return false;
            }
            if (data.status === 404) {
                document.getElementById("gmail_error").innerText = "✖ 無此帳號";
                return false;
            }
        });
        return false;
    }
}

/* main */
eyes.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    if (type === "text") {
        eyes.className = "fa-solid fa-eye-slash";
    } else {
        eyes.className = "fa-solid fa-eye";
    }
    password.setAttribute("type", type);
})




