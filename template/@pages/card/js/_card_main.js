/* custom variable */

/* custom dictionary */
let level = {
    "1": "小一", "2": "小二", "3": "小三", "4": "小四", "5": "小五", "6": "小六", "7": "國一",
    "8": "國二", "9": "國三", "10": "高一", "11": "高二", "12": "高三", "13": "大學", "14": "其他"
}
let subject = {
    "20": "國文", "21": "英文", "22": "數學", "23": "自然", "24": "自然", "25": "自然", "26": "社會",
    "27": "社會", "28": "社會", "19": "其他.."
}
let tag_subject = {
    "20": "國文", "21": "英文", "22": "數學", "23": "生物", "24": "理化", "25": "地科", "26": "地理",
    "27": "公民", "28": "歷史", "19": "其他.."
}
let answer = {
    "%yes": "附答",
    "%no": "無答"
}

/* custom function */

function disableScroll() {
    document.body.classList.add("stop-scrolling");
}

function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

function nFormatter(num, digits) {
    const si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

function form_submit() {
    let form = document.getElementById("checkbox-menu");
    form.submit();
}

function recover_search() {
    const checkbox_menu = document.getElementById("checkbox-menu");
    checkbox_menu.setAttribute("data-open", "true")
    checkbox_display()
}
function checkbox_display() {
    const target = document.getElementById("checkbox-menu");
    if (target.getAttribute("data-open") === "false") {
        disableScroll();
        target.setAttribute("data-open", "true");
        target.style.display = "flex";
        document.getElementById("DownArrow").style.transform = "rotate(180deg)";
        document.getElementById("open-checkbox-menu").style['border-radius'] = "30px 30px 0px 0px";
    } else {
        enableScroll();
        target.setAttribute("data-open", "false");
        target.style.display = "none";
        document.getElementById("DownArrow").style.transform = "rotate(0deg)";
        document.getElementById("open-checkbox-menu").style['border-radius'] = "60px";
    }
}

function change_search() {
    const target = document.getElementById("form-background");
    const target_2 = document.getElementById("search-box");
    if (target.getAttribute("data-search") === "keyword") {
        target.setAttribute("data-search", "checkbox")
        target.style.display = "none";
        target_2.style.display = "block"
    } else {
        target.setAttribute("data-search", "keyword")
        target.style.display = "block";
        target_2.style.display = "none"
    }
}

function popup_display() {
    const target = document.getElementById("tpc-dropdown");
    const profile = document.getElementById("profile-img")
    if (target.getAttribute("data-open") === "false") {
        disableScroll();
        target.setAttribute("data-open", "true");
        target.style = "display: block";
        profile.style.background = "0.7";
    } else {
        enableScroll();
        target.setAttribute("data-open", "false");
        target.style = "display: none;";
        profile.style.opacity = "none";
    }
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

function delete_cookie(name) {
    document.cookie = name + '=;expires=' + new Date(0).toUTCString() + ';path=/;';
}

function logout() {
    delete_cookie('gmail');
    delete_cookie('CTF');
    delete_cookie('uuid');
}

function topic_btn() {
    const topic = document.getElementById("topic");
    const answer = document.getElementById("answer");
    if (topic.getAttribute("data-focus") === "false") {
        topic.setAttribute("data-focus", "true");
        answer.setAttribute("data-focus", "false");
        topic.style = "background-color: #2d4263; color: white; outline: white dashed 2px; outline-offset: -4px;";
        answer.style = "";
        fetch(`/api/B4JL6MiP7dN2/${location.pathname.replace("/card/", "")}`, {
            method: 'POST'
        }).then(r => {
            if (r.status === 429) {
                location.href = "/404";
            }
            if (r.status === 200) {
                return r.json();
            }
        }).then(function (data) {
            if (data.where_answer === 0 || data.where_answer === 1) {
                let as_btn = document.getElementById("answer");
                as_btn.disabled = true;
                as_btn.style = "pointer-events: none; opacity: 0.4; user-select: none";
                document.getElementById("2").style =
                    "background: #5e5e5e;\n" +
                    "box-shadow: 0 4px 15px 0 rgb(68 76 73 / 75%);\n" +
                    "cursor: not-allowed";
                document.getElementById("2").disabled = true;
                if (data.where_answer === 0) {
                    as_btn.textContent = "此試卷無答案";
                } else {
                    as_btn.textContent = "答案在題目檔裡";
                }
                if (data.topic_type === "application/pdf") {
                    document.getElementById("main-file").innerHTML = `<object data="${data.topic_url}#toolbar=0" title="file">預覽檔案出現問題，請直接下載</object>`;
                } else {
                    try { // 行動裝置
                        document.createEvent("TouchEvent");
                        document.getElementById("main-file").innerHTML = `<object data="${data.topic_url}" title="file">預覽檔案出現問題，請直接下載</object>`;
                    } catch (e) { // 非行動裝置
                        document.getElementById("main-file").innerHTML = `<object data=https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(data.topic_url)} title="file">預覽檔案出現問題，請直接下載</object>`;
                    }
                }
            } else {
                if (data.topic_type === "application/pdf") {
                    document.getElementById("main-file").innerHTML = `<object data="${data.topic_url}#toolbar=0" title="file">預覽檔案出現問題，請直接下載</object>`;
                } else {
                    try { // 行動裝置
                        document.createEvent("TouchEvent");
                        document.getElementById("main-file").innerHTML = `<object data="${data.topic_url}" title="file">預覽檔案出現問題，請直接下載</object>`;
                    } catch (e) { // 非行動裝置
                        document.getElementById("main-file").innerHTML = `<object data=https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(data.topic_url)} title="file">預覽檔案出現問題，請直接下載</object>`;
                    }
                }
            }
        });
    }
}

function answer_btn() {
    const topic = document.getElementById("topic");
    const answer = document.getElementById("answer");
    if (answer.getAttribute("data-focus") === "false") {
        answer.setAttribute("data-focus", "true");
        topic.setAttribute("data-focus", "false");
        answer.style = "background-color: #2d4263; color: white; outline: white dashed 2px; outline-offset: -4px;";
        topic.style = "";
        fetch(`/api/B4JL6MiP7dN2/${location.pathname.replace("/card/", "")}`, {
            method: 'POST'
        }).then(r => {
            if (r.status === 429) {
                location.href = "/404";
            }
            if (r.status === 200) {
                return r.json();
            }
        }).then(function (data) {
            if (data.answer_file_type === "application/pdf") {
                document.getElementById("main-file").innerHTML = `<object data="${data.answer_url}#toolbar=0" title="file">預覽檔案出現問題，請直接下載</object>`;
            } else {
                if (data.answer_file_type === "image/jpeg" || data.answer_file_type === "image/png") {
                    document.getElementById("main-file").innerHTML = `<object data="${data.answer_url}" title="file">預覽檔案出現問題，請直接下載</object>`;
                } else {
                    try { // 行動裝置
                        document.createEvent("TouchEvent");
                        document.getElementById("main-file").innerHTML = `<object data="${data.answer_url}" title="file">預覽檔案出現問題，請直接下載</object>`;
                    } catch (e) { // 非行動裝置
                        document.getElementById("main-file").innerHTML = `<object data=https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(data.answer_url)} title="file">預覽檔案出現問題，請直接下載</object>`;
                    }
                }
            }
        });
    }
}

function download(url) {
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function download_topic() {
    const object = {
        which: "topic"
    }
    fetch(`/api/Bng7iGmgKUuy/BeqUeEKIg7Jb/${location.pathname.replace("/card/", "")}`, {
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
        download(data.url);
    });
}

function download_answer() {
    const object = {
        which: "answer"
    }
    fetch(`/api/Bng7iGmgKUuy/BeqUeEKIg7Jb/${location.pathname.replace("/card/", "")}`, {
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
        download(data.url);
    });
}

/* Main */
try { // 行動裝置
    window.addEventListener('touchstart', function (e) {
        const target = document.getElementById("checkbox-menu");
        const target2 = document.getElementById("tpc-dropdown");
        const profile = document.getElementById("profile-img");
        if (!document.querySelector("#center").contains(e.target)) {
            enableScroll();
            target.setAttribute("data-open", "false");
            target.style.display = "none";
            document.getElementById("DownArrow").style.transform = "rotate(0deg)";
            document.getElementById("open-checkbox-menu").style['border-radius'] = "60px";
        }
        if (!document.querySelector("tpc-dropdown").contains(e.target) && !document.querySelector("profile-button").contains(e.target)) {
            enableScroll();
            target2.setAttribute("data-open", "false");
            target2.style = "display: none;";
            profile.style.opacity = "none";
        }
    });
} catch (e) { // 非行動裝置
    window.addEventListener('click', function (e) {
        const target = document.getElementById("checkbox-menu");
        const target2 = document.getElementById("tpc-dropdown");
        const profile = document.getElementById("profile-img");
        if (!document.querySelector("#center").contains(e.target)) {
            enableScroll();
            target.setAttribute("data-open", "false");
            target.style.display = "none";
            document.getElementById("DownArrow").style.transform = "rotate(0deg)";
            document.getElementById("open-checkbox-menu").style['border-radius'] = "60px";
        }
        if (!document.querySelector("tpc-dropdown").contains(e.target) && !document.querySelector("profile-button").contains(e.target)) {
            enableScroll();
            target2.setAttribute("data-open", "false");
            target2.style = "display: none;";
            profile.style.opacity = "none";
        }
    });
}
if (getCookie('CTF') === "") {
    document.getElementById("end").innerHTML = `
                            <div class="un-logged-in">
                                <a href="/login" id="un-logged-in" class="cta">
                                    <span>登入</span>
                                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </a>
                            </div>`
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
        if (r.status === 429) {
            location.href = "/404";
        }
        if (r.status === 200) {
            return r.json();
        }
    }).then(function (data) {
        if (data.status === 200) {
            document.getElementById("end").innerHTML = `
                        <profile-button id="logged-in" class="tpc-profile-btn">
                            <button id="profile-btn" type="button" class="profile-button" title="點選個人資料相片，顯示您的帳戶" onclick="popup_display()">
                                <profile-img-show class="profile-img-show">
                                    <img id="profile-img" class="profile-img" alt="個人資料圖片"
                                         src="./imgs/${data.profile_img}.png">
                                </profile-img-show>
                            </button>
                        </profile-button>`
            document.getElementById("header").innerHTML = `
                        <tpc-account-header-renderer class="page-menu-renderer">
                            <account-img-shadow id="avatar" class="avatar-renderer">
                                <img id="avatar-img" class="avatar-img" src="./imgs/${data.profile_img}.png" alt="個人資料圖片">
                            </account-img-shadow>
                            <div id="profile-container" class="tpc-account-header-renderer">
                                <profile-name id="profile-name" class="tpc-account-header-renderer" title="${data.user}">${data.user}
                                </profile-name>
                            </div>
                        </tpc-account-header-renderer>`
            document.querySelector(".tpc-menu-link-renderer").href = `/profile/${data.uuid}`;
        } else {
            document.getElementById("end").innerHTML = `
                            <div class="un-logged-in">
                                <a href="/login" id="un-logged-in" class="cta">
                                    <span>登入</span>
                                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </a>
                            </div>`;
        }
    })
}
fetch(`/api/B4JL6MiP7dN2/${location.pathname.replace("/card/", "")}`, {
    method: 'POST'
}).then(r => {
    if (r.status === 404) {
        location.href = "/404";
    }
    if (r.status === 429) {
        location.href = "/404";
    }
    if (r.status === 200) {
        return r.json();
    }
}).then(function (data) {
    document.getElementById("topic").style = "background-color: #2d4263; color: white; outline: white dashed 2px; outline-offset: -4px;";
    let card_data_html = document.querySelector(".data-card");
    const file_subject_array = data.file_subject.split(",");
    if (data.file_subject.length > 2) {
        card_data_html.querySelector(".title").textContent = subject[String(file_subject_array[0])];
    } else {
        card_data_html.querySelector(".title").textContent = subject[data.file_subject];
    }
    card_data_html.querySelector(".name").textContent = data.file_name; // name
    card_data_html.querySelector(".tag-box").innerHTML = `<div class="tags before">
                        </div>`
    if (file_subject_array.length === 1 || file_subject_array.length === 2) {
        card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[data.file_level]}</tag>
            `);
        for (let i = 0; i < file_subject_array.length; i++) {
            card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${String(tag_subject[file_subject_array[i]])}</tag>
            `);
        }
        card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_answer">#${answer[data.is_there_answer]}</tag>
            `);
    } else {
        card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[data.file_level]}</tag>
            `);
        for (let i = 0; i < file_subject_array.length; i++) {
            card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${String(tag_subject[file_subject_array[i]])}</tag>
            `);
        }
        card_data_html.querySelector(".tag-box").insertAdjacentHTML("beforeend", `
                        <div class="tags after">
                            <tag class="tag_answer">#${answer[data.is_there_answer]}</tag>
                        </div>
            `);
    }
    if (data.profile_name !== 0) {
        card_data_html.querySelector(".profile-name").textContent = data.profile_name;
        card_data_html.querySelector(".profile-img").src = `./imgs/${data.profile_img}.png`;
    } else {
        card_data_html.querySelector(".profile-name").textContent = "匿名上傳";
    }
    card_data_html.querySelector(".profile-time").textContent = data.file_upload_time;
    card_data_html.querySelector(".views").textContent = nFormatter(data.seeders);
    if (data.where_answer === 0 || data.where_answer === 1) {
        let as_btn = document.getElementById("answer");
        as_btn.disabled = true;
        as_btn.style = "pointer-events: none; opacity: 0.4; user-select: none";
        document.getElementById("2").style =
            "background: #5e5e5e;\n" +
            "box-shadow: 0 4px 15px 0 rgb(68 76 73 / 75%);\n" +
            "cursor: not-allowed";
        document.getElementById("2").disabled = true;
        if (data.where_answer === 0) {
            as_btn.textContent = "此試卷無答案";
        } else {
            as_btn.textContent = "答案在題目檔裡";
        }
        if (data.topic_type === "application/pdf") {
            document.getElementById("main-file").innerHTML = `<object data="${data.topic_url}#toolbar=0" title="file">預覽檔案出現問題，請直接下載</object>`;
        } else {
            try {
                document.createEvent("TouchEvent");
                document.getElementById("main-file").innerHTML = `<object data="${data.topic_url}" title="file">預覽檔案出現問題，請直接下載</object>`;
            } catch (e) {
                document.getElementById("main-file").innerHTML = `<object data=https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(data.topic_url)} title="file">預覽檔案出現問題，請直接下載</object>`;
            }
        }
    } else {
        if (data.topic_type === "application/pdf") {
            document.getElementById("main-file").innerHTML = `<object data="${data.topic_url}#toolbar=0" title="file">預覽檔案出現問題，請直接下載</object>`;
        } else {
            try {
                document.createEvent("TouchEvent");
                document.getElementById("main-file").innerHTML = `<object data="${data.topic_url}" title="file">預覽檔案出現問題，請直接下載</object>`;
            } catch (e) {
                document.getElementById("main-file").innerHTML = `<object data=https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(data.topic_url)} title="file">預覽檔案出現問題，請直接下載</object>`;
            }
        }
    }
});
