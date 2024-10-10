/* custom variable */
const uploaded_files = document.getElementById("uploaded-files");
let user_name;
let user_profile;

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
let four_card_a_team = {
    0: "#first",
    1: "#first",
    2: "#first",
    3: "#first",
    4: "#second",
    5: "#second",
    6: "#second",
    7: "#second"
}
let three_card_a_team = {
    0: "#first",
    1: "#first",
    2: "#first",
    3: "#second",
    4: "#second",
    5: "#second",
    6: "#third",
    7: "#third"
}
let two_card_a_team = {
    0: "#first",
    1: "#first",
    2: "#second",
    3: "#second",
    4: "#third",
    5: "#third",
    6: "#fourth",
    7: "#fourth"
}
let one_card_a_team = {
    0: "#first",
    1: "#second",
    2: "#third",
    3: "#fourth",
    4: "#fifth",
    5: "#sixth",
    6: "#seventh",
    7: "#eighth"
}


/* custom function */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const addMeta = (name, content) => {
    const meta = document.createElement('meta');
    meta.content = content;
    meta.name = name;
    document.getElementsByTagName('head')[0].appendChild(meta);
};

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

function nFormatter(num, digits) {
    const si = [
        {value: 1, symbol: ""},
        {value: 1E3, symbol: "k"},
        {value: 1E6, symbol: "M"},
        {value: 1E9, symbol: "G"},
        {value: 1E12, symbol: "T"},
        {value: 1E15, symbol: "P"},
        {value: 1E18, symbol: "E"}
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

function logout() {
    delete_cookie('gmail');
    delete_cookie('CTF');
    delete_cookie('uuid');
}

function likes_detect(data) {
    if (getCookie('CTF') === "") {
        Swal.fire({
            title: '請先登入',
            confirmButtonText: '確認'
        });
        data.checked = false;
    } else {
        let likes_html = document.querySelector('[for="likes"]').querySelector("span");
        const object = {
            who: getCookie('CTF')
        }
        if (data.checked === true) {
            if (likes_html.textContent.split("個")[0].includes("K") === true || likes_html.textContent.split("個")[0].includes("M") === true) {
            } else {
                likes_html.textContent = `${Number(likes_html.textContent.split("個")[0]) + 1}個喜歡`;
            }
            fetch(`/api/likes/${location.pathname.replace("/profile/", "")}`, {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => {
            })
        } else {
            if (likes_html.textContent.split("個")[0].includes("K") === true || likes_html.textContent.split("個")[0].includes("M") === true) {
            } else {
                likes_html.textContent = `${Number(likes_html.textContent.split("個")[0]) - 1}個喜歡`;
            }
            fetch(`/api/un_likes/${location.pathname.replace("/profile/", "")}`, {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => {
            })
        }
    }
}

function reports_detect(data) {
    if (getCookie('CTF') === "") {
        Swal.fire({
            title: '請先登入',
            confirmButtonText: '確認'
        });
        data.checked = false;
    } else {
        let reports_html = document.querySelector('[for="warns"]').querySelector("span");
        const object = {
            who: getCookie('CTF')
        }
        if (data.checked === true) {
            if (reports_html.textContent.split("個")[0].includes("K") === true || reports_html.textContent.split("個")[0].includes("M") === true) {
            } else {
                reports_html.textContent = `${Number(reports_html.textContent.split("個")[0]) + 1}個舉報`;
            }
            fetch(`/api/reports/${location.pathname.replace("/profile/", "")}`, {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => {
            })
        } else {
            if (reports_html.textContent.split("個")[0].includes("K") === true || reports_html.textContent.split("個")[0].includes("M") === true) {
            } else {
                reports_html.textContent = `${Number(reports_html.textContent.split("個")[0]) - 1}個舉報`;
            }
            fetch(`/api/un_reports/${location.pathname.replace("/profile/", "")}`, {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => {
            })
        }
    }
}

function delete_acc_confirm() {
    Swal.fire({
        title: '刪除帳號?',
        text: "注意! 所有資料及上傳的東西將會被刪除。",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '刪除',
        cancelButtonText: '取消'
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector("tpc-app").insertAdjacentHTML(`afterbegin`, `  
            <div class="loading"></div>`);
            fetch(`/api/0AA0DrUYCKSE`, {
                method: 'POST',
                body: JSON.stringify({
                    CTF: getCookie("CTF")
                }),
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
                if (data.status === 200) {
                    fetch(`/api/95VDlX1Q4yP2`, {
                        method: 'POST',
                        body: JSON.stringify({
                            CTF: getCookie("CTF")
                        }),
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
                        if (data.status === 200) {
                            logout();
                            Swal.fire({
                                title: '帳號刪除成功!',
                                text: "確認後將回首頁",
                                showCancelButton: false,
                                confirmButtonText: '確認'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.replace('/');
                                }
                            });
                        }
                        if (data.status === 404) {
                            Swal.fire({
                                title: '發生不可育及的錯誤!',
                                text: "確認後將回首頁",
                                showCancelButton: false,
                                confirmButtonText: '確認'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.replace('/');
                                }
                            });
                        }
                    });
                }
            });
        }
    })
}

async function report_card(data) {
    Swal.fire({
        title: '檢舉檔案或標題',
        html:
            '<warning style="opacity: 0.7">※重複檢舉會被判定為無效</warning>' +
            '<div style="display: flex; flex-direction: column; margin-top: 20px;">' +
            '<label class="report_file_style" for="r0"><input id="r0" name="file_report" type="radio" value="0" required/><rbutton>&emsp;</rbutton>色情內容</label>' +
            '<label class="report_file_style" for="r1"><input id="r1" name="file_report" type="radio" value="1" required/><rbutton>&emsp;</rbutton>暴力或令人厭惡的內容</label>' +
            '<label class="report_file_style" for="r2"><input id="r2" name="file_report" type="radio" value="2" required/><rbutton>&emsp;</rbutton>仇恨或惡意內容</label>' +
            '<label class="report_file_style" for="r3"><input id="r3" name="file_report" type="radio" value="3" required/><rbutton>&emsp;</rbutton>垃圾內容或內容與標題不符</label>' +
            '</div>',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '舉報',
        preConfirm: () => {
            let checked = document.querySelector("[name='file_report']:checked");
            if (checked === null) {
                Swal.fire("請確實填寫舉報內容!");
            } else {
                const object = {
                    value: checked.value,
                    uploader: data.dataset.user,
                    file_id: data.dataset.id,
                    file_name: data.dataset.name,
                    file_upload_time: data.dataset.time,
                    file_seeder: data.dataset.seeders
                }
                fetch(`/api/31nuAzrxo8p7/3HE4HTffijJY`, {
                    method: 'POST',
                    body: JSON.stringify(object),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(r => {
                    if (r.status === 200) {
                        Swal.fire({
                            html:
                                "<div style='display: flex; flex-direction: column'>" +
                                "<success_report style='color: #c84b31; font-size: 35px'>舉報成功!</success_report>" +
                                "<thx style='color: #ecdbba'>若檢舉內容屬實，我們將以最快的速度對此文件進行處置，感謝您的檢舉!</thx>" +
                                "</div>"
                        });
                    }
                    if (r.status === 429) {
                        Swal.fire({
                            html:
                                "<div style='display: flex; flex-direction: column'>" +
                                "<success_report style='color: #c84b31; font-size: 35px'>請不要重複舉報!</success_report>" +
                                "<thx style='color: #ecdbba'>重複的檢舉會被判定為無效</thx>" +
                                "</div>"
                        });
                    }
                })
            }
        }
    })
}

/* main */
fetch(`/api/0AA0DrUYCKSE`, {
    method: 'POST',
    body: JSON.stringify({
        CTF: getCookie("CTF")
    }),
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
});
fetch(`/api/6uHRslSklpAa/${location.pathname.replace("/profile/", "")}`, {
    method: 'POST'
}).then(r => {
    return r.json();
}).then(function (data) {
    if (data.status === 200) {
        if (data.uuid === getCookie("uuid")) {
            document.querySelector(".outer_frame").querySelector(".card").insertAdjacentHTML('afterbegin', `
                <div class="delete_acc">
                    <i class="fa-solid fa-user-xmark delete_button" id="cd-popup-trigger" title="刪除我的帳號" onclick="delete_acc_confirm()">
                    </i>
                </div>`);
        }
        // document.title = `${data.user}的個人資料 - Topic題庫網`;
        // addMeta('description', `${data.user}的個人資料`);
        // addMeta('og:title', `${data.user}的個人資料 - Topic題庫網`);
        // addMeta('og:description', `${data.user}的個人資料`);
        // addMeta('twitter:title', `${data.user}的個人資料 - Topic題庫網`);
        // addMeta('twitter:description', `${data.user}的個人資料`);
        // addMeta('twitter:creator', `@${data.user}`);
        let card = document.querySelector(".card");
        card.querySelector(".profile-img").src = `./imgs/${data.profile_img}.png`;
        card.querySelector("h1").textContent = data.user;
        user_name = data.user;
        user_profile = data.profile_img;
    }
    return data;
}).then(function (e) {
    if (e.status === 404) {
        location.href = "/";
    }
})
fetch(`/api/7p7P1PBzKiLD/${location.pathname.replace("/profile/", "")}`, {
    method: 'POST'
}).then(r => {
    return r.json();
}).then(function (data) {
    if (data.status === 200) {
        if (getCookie('CTF') === "") {
        } else {
            document.getElementById("likes").checked = data.likes.includes(getCookie('CTF')) === true;
            document.getElementById("warns").checked = data.reports.includes(getCookie('CTF')) === true;
        }
        let likes = data.likes.length;
        let reports = data.reports.length;
        let uploads = data.uploads.length;
        if (likes > 999 && likes < 100000) {
            likes = `${String((likes + 1) * 0.001).slice(0, 3)}K`;
        }
        if (likes > 99999) {
            likes = `${String((likes + 1) * 0.000001).slice(0, 3)}M`;
        }
        if (reports > 999 && reports < 100000) {
            reports = `${String((reports + 1) * 0.001).slice(0, 3)}K`;
        }
        if (reports > 99999) {
            reports = `${String((reports + 1) * 0.000001).slice(0, 3)}M`;
        }
        document.getElementById("files-count").textContent = `總上傳數:${nFormatter(uploads)}`;
        document.querySelector('[for="likes"]').querySelector("span").innerHTML = `<span>${likes}<span>個喜歡</span></span>`;
        document.querySelector('[for="warns"]').querySelector("span").innerHTML = `<span>${reports}<span>個舉報</span></span>`;
    }
    if (data.status === 404) {
        location.href = "/"
    }
});
fetch(`/api/8PtQjQdSkXJa/${location.pathname.replace("/profile/", "")}`, {
    method: 'POST'
}).then(r => {
    return r.json();
}).then(async function (data) {
    await sleep(200);
    if (screen.width > 1700) {
        for (let i = 0; i < data.length; i++) {
            let card_title;
            let seeders = nFormatter(data[i].seeders);
            const file_subject_array = data[i].file_subject.split(",");
            if (data[i].file_subject.length > 2) { // title
                card_title = subject[String(file_subject_array[0])];
            } else {
                card_title = subject[data[i].file_subject];
            }
            await sleep(70);
            uploaded_files.querySelector(four_card_a_team[i]).insertAdjacentHTML('beforeend', `<div class="data-card a${i}">
                            <background onclick="location.href='/card/${data[i].file_id}'">
                            </background>
                            <div class="paper-content">
                                <div class="title" onclick="location.href='/card/${data[i].file_id}'">${card_title}</div>
                                <hr/>
                                <div class="name-box" onclick="location.href='/card/${data[i].file_id}'">
                                    <text class="name">${data[i].file_name}</text>
                                </div>
                                <div class="tag-box" onclick="location.href='/card/${data[i].file_id}'">
                                    <div class="tags">
                                        <tag></tag>
                                        <tag></tag>
                                        <tag></tag>
                                        <tag></tag>
                                    </div>
                                </div>
                                <div class="card-bottom">
                                    <div class="card-min-profile">
                                        <img class="profile-img" src="./imgs/${user_profile}.png">
                                        <div class="profile-name-time">
                                            <div class="profile-name">${user_name}</div>
                                            <div class="profile-time">${data[i].file_upload_time}</div>
                                        </div>
                                    </div>
                                    <div class="card-views" onclick="location.href='/card/${data[i].file_id}'">
                                        <div class="card-views-box">
                                            <i class="fa-solid fa-eye"></i>
                                            <div class="views">${seeders}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-box">
                                <div class="multi-button" data-id="${data[i].file_id}" data-name="${data[i].file_name}" data-user="${data[i].user}" data-time="${data[i].file_upload_time}" data-seeders="${seeders}">
                                    <button class="fa-solid fa-address-card" title="前往作者" onclick="location.href='/profile/${data[i].user}'">
                                    </button>
                                    <button class="fa-solid fa-eye" title="預覽" onclick="location.href='/card/${data[i].file_id}'">
                                    </button>
                                    <button class="fa-solid fa-triangle-exclamation" title="舉報" onclick="report_card(this.parentElement)">
                                    </button>
                                </div>
                            </div>
                        </div>
        `)
            if (data[i].user === 0) {
                document.querySelector('[title="前往作者"]').disabled = true;
            }
            let card_data_html = document.querySelector(`.a${i}`);
            card_data_html.querySelector(".tag-box").innerHTML = `<div class="tags before"></div>`;
            if (file_subject_array.length === 1 || file_subject_array.length === 2) {
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[data[i].file_level]}</tag>
            `); // level
                for (let i = 0; i < file_subject_array.length; i++) {
                    card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${String(tag_subject[file_subject_array[i]])}</tag>
            `);
                } //subject
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_answer">#${answer[data[i].is_there_answer]}</tag>
            `); //answer
            } else {
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[data[i].file_level]}</tag>
            `); // level
                for (let i = 0; i < file_subject_array.length; i++) {
                    card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${String(tag_subject[file_subject_array[i]])}</tag>
            `);
                } //subject
                card_data_html.querySelector(".tag-box").insertAdjacentHTML("beforeend", `
                        <div class="tags after">
                            <tag class="tag_answer">#${answer[data[i].is_there_answer]}</tag>
                        </div>
            `); //answer
            }
        }
    }
    if (screen.width < 1700 && screen.width > 1400) { /* 3 */
        for (let i = 0; i < data.length; i++) {
            let card_title;
            let seeders = nFormatter(data[i].seeders);
            const file_subject_array = data[i].file_subject.split(",");
            if (data[i].file_subject.length > 2) { // title
                card_title = subject[String(file_subject_array[0])];
            } else {
                card_title = subject[data[i].file_subject];
            }
            uploaded_files.querySelector(three_card_a_team[i]).insertAdjacentHTML('beforeend', `<div class="data-card a${i}">
                            <background onclick="location.href='/card/${data[i].file_id}'">
                            </background>
                            <div class="paper-content">
                                <div class="title" onclick="location.href='/card/${data[i].file_id}'">${card_title}</div>
                                <hr/>
                                <div class="name-box" onclick="location.href='/card/${data[i].file_id}'">
                                    <text class="name">${data[i].file_name}</text>
                                </div>
                                <div class="tag-box" onclick="location.href='/card/${data[i].file_id}'">
                                    <div class="tags">
                                        <tag></tag>
                                        <tag></tag>
                                        <tag></tag>
                                        <tag></tag>
                                    </div>
                                </div>
                                <div class="card-bottom">
                                    <div class="card-min-profile">
                                        <img class="profile-img" src="./imgs/${user_profile}.png">
                                        <div class="profile-name-time">
                                            <div class="profile-name">${user_name}</div>
                                            <div class="profile-time">${data[i].file_upload_time}</div>
                                        </div>
                                    </div>
                                    <div class="card-views" onclick="location.href='/card/${data[i].file_id}'">
                                        <div class="card-views-box">
                                            <i class="fa-solid fa-eye"></i>
                                            <div class="views">${seeders}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-box">
                                <div class="multi-button" data-id="${data[i].file_id}" data-name="${data[i].file_name}" data-user="${data[i].user}" data-time="${data[i].file_upload_time}" data-seeders="${seeders}">
                                    <button class="fa-solid fa-circle-down" title="下載">
                                    </button>
                                    <button class="fa-solid fa-eye" title="預覽" onclick="location.href='/card/${data[i].file_id}'">
                                    </button>
                                    <button class="fa-solid fa-triangle-exclamation" title="舉報" onclick="report_card(this.parentElement)">
                                    </button>
                                </div>
                            </div>
                        </div>
        `)
            let card_data_html = document.querySelector(`.a${i}`);
            card_data_html.querySelector(".tag-box").innerHTML = `<div class="tags before"></div>`;
            if (file_subject_array.length === 1 || file_subject_array.length === 2) {
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[data[i].file_level]}</tag>
            `); // level
                for (let i = 0; i < file_subject_array.length; i++) {
                    card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${String(tag_subject[file_subject_array[i]])}</tag>
            `);
                } //subject
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_answer">#${answer[data[i].is_there_answer]}</tag>
            `); //answer
            } else {
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[data[i].file_level]}</tag>
            `); // level
                for (let i = 0; i < file_subject_array.length; i++) {
                    card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${String(tag_subject[file_subject_array[i]])}</tag>
            `);
                } //subject
                card_data_html.querySelector(".tag-box").insertAdjacentHTML("beforeend", `
                        <div class="tags after">
                            <tag class="tag_answer">#${answer[data[i].is_there_answer]}</tag>
                        </div>
            `); //answer
            }
        }
    }
    if (screen.width < 1400 && screen.width > 1100) {  /* 2 */  /* font size 40px */
        for (let i = 0; i < data.length; i++) {
            let card_title;
            let seeders = nFormatter(data[i].seeders);
            const file_subject_array = data[i].file_subject.split(",");
            if (data[i].file_subject.length > 2) { // title
                card_title = subject[String(file_subject_array[0])];
            } else {
                card_title = subject[data[i].file_subject];
            }
            uploaded_files.querySelector(two_card_a_team[i]).insertAdjacentHTML('beforeend', `<div class="data-card a${i}">
                            <background onclick="location.href='/card/${data[i].file_id}'">
                            </background>
                            <div class="paper-content">
                                <div class="title" onclick="location.href='/card/${data[i].file_id}'">${card_title}</div>
                                <hr/>
                                <div class="name-box" onclick="location.href='/card/${data[i].file_id}'">
                                    <text class="name">${data[i].file_name}</text>
                                </div>
                                <div class="tag-box" onclick="location.href='/card/${data[i].file_id}'">
                                    <div class="tags">
                                        <tag></tag>
                                        <tag></tag>
                                        <tag></tag>
                                        <tag></tag>
                                    </div>
                                </div>
                                <div class="card-bottom">
                                    <div class="card-min-profile">
                                        <img class="profile-img" src="./imgs/${user_profile}.png">
                                        <div class="profile-name-time">
                                            <div class="profile-name">${user_name}</div>
                                            <div class="profile-time">${data[i].file_upload_time}</div>
                                        </div>
                                    </div>
                                    <div class="card-views" onclick="location.href='/card/${data[i].file_id}'">
                                        <div class="card-views-box">
                                            <i class="fa-solid fa-eye"></i>
                                            <div class="views">${seeders}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-box">
                                <div class="multi-button" data-id="${data[i].file_id}" data-name="${data[i].file_name}" data-user="${data[i].user}" data-time="${data[i].file_upload_time}" data-seeders="${seeders}">
                                    <button class="fa-solid fa-circle-down" title="下載">
                                    </button>
                                    <button class="fa-solid fa-eye" title="預覽" onclick="location.href='/card/${data[i].file_id}'">
                                    </button>
                                    <button class="fa-solid fa-triangle-exclamation" title="舉報" onclick="report_card(this.parentElement)">
                                    </button>
                                </div>
                            </div>
                        </div>
        `)
            let card_data_html = document.querySelector(`.a${i}`);
            card_data_html.querySelector(".tag-box").innerHTML = `<div class="tags before"></div>`;
            if (file_subject_array.length === 1 || file_subject_array.length === 2) {
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[data[i].file_level]}</tag>
            `); // level
                for (let i = 0; i < file_subject_array.length; i++) {
                    card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${String(tag_subject[file_subject_array[i]])}</tag>
            `);
                } //subject
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_answer">#${answer[data[i].is_there_answer]}</tag>
            `); //answer
            } else {
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[data[i].file_level]}</tag>
            `); // level
                for (let i = 0; i < file_subject_array.length; i++) {
                    card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${String(tag_subject[file_subject_array[i]])}</tag>
            `);
                } //subject
                card_data_html.querySelector(".tag-box").insertAdjacentHTML("beforeend", `
                        <div class="tags after">
                            <tag class="tag_answer">#${answer[data[i].is_there_answer]}</tag>
                        </div>
            `); //answer
            }
        }
    }
    if (screen.width < 1100) {  /* 1 */  /* font size 20px */
        for (let i = 0; i < data.length; i++) {
            let card_title;
            let seeders = nFormatter(data[i].seeders);
            const file_subject_array = data[i].file_subject.split(",");
            if (data[i].file_subject.length > 2) { // title
                card_title = subject[String(file_subject_array[0])];
            } else {
                card_title = subject[data[i].file_subject];
            }
            uploaded_files.querySelector(one_card_a_team[i]).insertAdjacentHTML('beforeend', `<div class="data-card a${i}">
                            <background onclick="location.href='/card/${data[i].file_id}'">
                            </background>
                            <div class="paper-content">
                                <div class="title" onclick="location.href='/card/${data[i].file_id}'">${card_title}</div>
                                <hr/>
                                <div class="name-box" onclick="location.href='/card/${data[i].file_id}'">
                                    <text class="name">${data[i].file_name}</text>
                                </div>
                                <div class="tag-box" onclick="location.href='/card/${data[i].file_id}'">
                                    <div class="tags">
                                        <tag></tag>
                                        <tag></tag>
                                        <tag></tag>
                                        <tag></tag>
                                    </div>
                                </div>
                                <div class="card-bottom">
                                    <div class="card-min-profile">
                                        <img class="profile-img" src="./imgs/${user_profile}.png">
                                        <div class="profile-name-time">
                                            <div class="profile-name">${user_name}</div>
                                            <div class="profile-time">${data[i].file_upload_time}</div>
                                        </div>
                                    </div>
                                    <div class="card-views" onclick="location.href='/card/${data[i].file_id}'">
                                        <div class="card-views-box">
                                            <i class="fa-solid fa-eye"></i>
                                            <div class="views">${seeders}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-box">
                                <div class="multi-button" data-id="${data[i].file_id}" data-name="${data[i].file_name}" data-user="${data[i].user}" data-time="${data[i].file_upload_time}" data-seeders="${seeders}">
                                    <button class="fa-solid fa-circle-down" title="下載">
                                    </button>
                                    <button class="fa-solid fa-eye" title="預覽" onclick="location.href='/card/${data[i].file_id}'">
                                    </button>
                                    <button class="fa-solid fa-triangle-exclamation" title="舉報" onclick="report_card(this.parentElement)">
                                    </button>
                                </div>
                            </div>
                        </div>
        `)
            let card_data_html = document.querySelector(`.a${i}`);
            card_data_html.querySelector(".tag-box").innerHTML = `<div class="tags before"></div>`;
            if (file_subject_array.length === 1 || file_subject_array.length === 2) {
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[data[i].file_level]}</tag>
            `); // level
                for (let i = 0; i < file_subject_array.length; i++) {
                    card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${String(tag_subject[file_subject_array[i]])}</tag>
            `);
                } //subject
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_answer">#${answer[data[i].is_there_answer]}</tag>
            `); //answer
            } else {
                card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[data[i].file_level]}</tag>
            `); // level
                for (let i = 0; i < file_subject_array.length; i++) {
                    card_data_html.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${String(tag_subject[file_subject_array[i]])}</tag>
            `);
                } //subject
                card_data_html.querySelector(".tag-box").insertAdjacentHTML("beforeend", `
                        <div class="tags after">
                            <tag class="tag_answer">#${answer[data[i].is_there_answer]}</tag>
                        </div>
            `); //answer
            }
        }
    }
});