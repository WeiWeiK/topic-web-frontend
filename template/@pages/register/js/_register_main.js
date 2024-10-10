/* custom variable */
const eyes_0 = document.getElementById("eyes_0");
const eyes_1 = document.getElementById("eyes_1");
const password_0 = document.getElementById("pass_0");
const password_1 = document.getElementById("pass_1");

/* custom dictionary */

/* custom function */
function No_Special_str() {
    const gmail = document.getElementById("gmail").value;
    const user = document.getElementById("user").value;
    const password = document.getElementById("pass_0").value;
    let gmail_regex = /^[a-zA-z\d](\.?[a-zA-z\d]){3,}@g(oogle)?mail\.com$/;
    let name_regex = /^[\u4e00-\u9fa5a-zA-Z]{2,5}$/;
    let password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (gmail_regex.test(gmail) === true) {
        document.getElementById("acc_error").innerText = "";
    } else {
        document.getElementById("acc_error").innerText = "✖ 請輸入正確gmail信箱";
        return false;
    }
    if (name_regex.test(user) === true) {
        document.getElementById("user_error").innerText = "";
    } else {
        document.getElementById("user_error").innerText = "✖ 只接受中文或英文, 1<長度<6";
        return false;
    }
    if (password_regex.test(password) === true) {
        document.getElementById("pass_0_error").innerText = "";
    } else {
        document.getElementById("pass_0_error").innerText = "✖ 請包含一個數字+字母, 長度>7";
        return false;
    }
}

function password_repeat() {
    const password_1 = document.getElementById("pass_1").value;
    const password_0 = document.getElementById("pass_0").value;
    if (password_1 === password_0) {
        document.getElementById("pass_1_error").innerText = "";
    } else {
        document.getElementById("pass_1_error").innerText = "✖ 與原密碼不相符";
        return false;
    }
}

function ProcessFormData() {
    if (No_Special_str() === false || password_repeat() === false) {
        return false;
    } else {
        const gmail = document.getElementById("gmail").value;
        const user = document.getElementById("user").value;
        const password = document.getElementById("pass_0").value;
        const object = {
            user: user,
            gmail: gmail,
            password: password
        };
        fetch('/api/0fhFYe7Kitnb', {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((r) => {
            if (r.status === 200) {
                fetch('/api/4sgTtTxcYBTG', {
                    method: 'POST',
                    body: JSON.stringify(object),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((r) => {
                    location.href = '/confirm';
                });
                return false;
            }
            if (r.status === 429) {
                location.href = "/404";
            }
            if (r.status === 404) {
                document.getElementById("acc_error").innerText = "✖ 帳號已存在";
                return false;
            }
        });
        return false;
    }
}

/* Main */
eyes_0.addEventListener("click", function (e) {
    const type = password_0.getAttribute("type") === "password" ? "text" : "password";
    if (type === "text") {
        eyes_0.className = "fa-solid fa-eye-slash";
    } else {
        eyes_0.className = "fa-solid fa-eye";
    }
    password_0.setAttribute("type", type);
})
eyes_1.addEventListener("click", function (e) {
    const type = password_1.getAttribute("type") === "password" ? "text" : "password";
    if (type === "text") {
        eyes_1.className = "fa-solid fa-eye-slash";
    } else {
        eyes_1.className = "fa-solid fa-eye";
    }
    password_1.setAttribute("type", type);
})








