function No_Special_str() {
    const gmail = document.getElementById("gmail").value;
    let gmail_regex = /^[a-zA-z\d](\.?[a-z\d]){3,}@g(oogle)?mail\.com$/;
    if (gmail_regex.test(gmail) === true) {
        document.getElementById("acc_error").innerText = "";
    } else {
        document.getElementById("forgot-text").style.opacity = "0";
        document.getElementById("forgot-text").innerText = "><";
        document.getElementById("acc_error").innerText = "✖ 請輸入正確gmail信箱";
        return false;
    }
}

function ProcessFormData() {
    if (No_Special_str() === false) {
        return false;
    } else {
        const gmail = document.getElementById("gmail").value;
        const object = {
            gmail: gmail
        }
        fetch('/api/FV5QKKIK5SHG', {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((r) => {
            if (r.status === 200) {
                document.getElementById("forgot-text").style.opacity = "0.9";
                document.getElementById("forgot-text").innerText = "※已送出重置密碼的信件，請檢查郵箱";
            }
            if (r.status === 404) {
                document.getElementById("forgot-text").style.opacity = "0";
                document.getElementById("forgot-text").innerText = "><";
                document.getElementById("acc_error").innerText = "✖ 無此帳號";
            }
            if (r.status === 429) {
                location.href = "/404";
            }
        });
        return false;
    }
}