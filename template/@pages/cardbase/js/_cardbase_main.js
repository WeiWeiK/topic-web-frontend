/* custom variable */
let team;
let no_bubble = 0;
let sort = "time_new";
let query = {
    type: "cardbase",
    type2: "",
    data: {
        level_array: [],
        subject_array: [],
        answer_array: [],
        search_query: "",
        uuid: ""
    }
}
let href_data = location.href.split("?")[1];
let debug_search_none = 0;


/* custom dictionary */
const sort_json = {
    "none": "無",
    "seeders": "觀看次數",
    "time_new": "上傳時間(最新)",
    "time_old": "上傳時間(最舊)"
}
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

async function clear_box() {
    await start_page_card();
    await sleep(500);
    document.querySelector("top").insertAdjacentHTML('afterbegin', `<div id="sort-menu-container">
                <div class="sort-menu-frame">
                    <div class="trigger">
                        <button id="trigger-button" data-open="false" onclick="sub_menu_display(this)" style="border-radius: 15px 15px 0 0;">
                            <i class="fa-solid fa-arrow-down-wide-short">
                        </i>
                            <text>排序依據:</text>
                        </button>
                        <ul>${sort_json[sort]}</ul>
                    </div>
                    <ul class="options" style="display: none;">
                        <li onclick="sort = 'seeders';clear_box()">觀看次數</li>
                        <li onclick="sort = 'time_new';clear_box()">上傳時間(最新)</li>
                        <li onclick="sort = 'time_old';clear_box()">上傳時間(最舊)</li>
                    </ul>
                </div>
            </div>`);
    let section_array = document.querySelector("box").querySelector("top").querySelectorAll("section");
    if (section_array[section_array.length - 1].id === "bottom") {
        try {
            document.querySelector("top").querySelector(".lds-ring").remove();
        } catch (e) {
        }
        document.querySelector("bottom").innerHTML = `<detectorOFF>--沒有更多了--</detectorOFF>`;
    } else {
        try {
            document.createEvent("TouchEvent");
            document.querySelector("bottom").innerHTML = `<detector>--往下滑加載更多--</detector>`;
            document.querySelector("bottom").insertAdjacentHTML('beforeend', `
                <div class="load-more-button">
                    <i class="fa-solid fa-caret-down"></i>
                    <text>或點擊載入</text>
                    <i class="fa-solid fa-caret-down" style="opacity: 0"></i>
                </div>`);
        } catch (e) {
            document.querySelector("bottom").innerHTML = `<detector>--往下滑加載更多--</detector>`;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function form_submit() {
    let form = document.getElementById("checkbox-menu");
    form.submit();
}

function start_page_card() {
    document.querySelector("top").innerHTML = "";
    fetch(`/api/front_page/v1/card/${sort}`, {
        method: 'POST',
        body: JSON.stringify({
            how_many: team,
            search_query: query
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
    }).then(async function (data) {
        if (data[0] === undefined) {
            debug_search_none = 1;
            document.querySelector("top").innerHTML = "";
            document.querySelector("bottom").innerHTML = `<search-none style='font-family: "Noto Sans TC", sans-serif; color: #c84b31'>很抱歉，找不到任何結果!</search-none>`;
        } else {
            if (Object.keys(data).length < team) {
                for (let i = 0; i < 2; i++) {
                    let a = i * (Math.ceil(data.length / 2));
                    let last_id;
                    try {
                        last_id = data[a + (Math.ceil(data.length / 2) - 1)].file_id;
                    } catch (e) {
                        last_id = "bottom";
                    }
                    document.querySelector("box").querySelector("top").insertAdjacentHTML(`beforeend`, `<section class="page-contain" id="${last_id}">
                </section>`);
                    for (let i = a; i < a + (Math.ceil(data.length / 2)); i++) {
                        let card_title;
                        try {
                            let seeders = nFormatter(data[i].seeders);
                            const file_subject_array = data[i].file_subject.split(",");
                            if (data[i].file_subject.length > 2) { // title
                                card_title = subject[String(file_subject_array[0])];
                            } else {
                                card_title = subject[data[i].file_subject];
                            }
                            fetch(`/api/1q3nlSeeHyTF/${data[i].user}`, {
                                method: 'POST'
                            }).then(r => {
                                if (r.status === 429) {
                                    location.href = "/404";
                                }
                                if (r.status === 200) {
                                    return r.json();
                                }
                            }).then(async function (user) {
                                let unknown;
                                if (user.uuid !== 0) {
                                    unknown = 1
                                } else {
                                    unknown = 0;
                                }
                                document.getElementById(`${last_id}`).insertAdjacentHTML('beforeend', `<div class="data-card a${i}">
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
                                <div class="card-bottom" onclick="location.href='/card/${data[i].file_id}'">
                                    <div class="card-min-profile">
                                        <img class="profile-img" src="./imgs/${user.profile_img}.png">
                                        <div class="profile-name-time">
                                            <div class="profile-name">${user.user}</div>
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
                                <div class="multi-button">
                                    <button id="tpc_${unknown}" class="fa-solid fa-address-card" title="前往作者" onclick="location.href='/profile/${data[i].user}'">
                                    </button>
                                    <button class="fa-solid fa-eye" title="預覽" onclick="location.href='/card/${data[i].file_id}'">
                                    </button>
                                    <button class="fa-solid fa-circle-minus" title="刪除" onclick="delete_card(this)" value="${data[i].file_id}">
                                    </button>
                                </div>
                            </div>
                        </div>
                        `)
                                let card_data_html = document.getElementById(`${last_id}`).querySelector(`.a${i}`);
                                card_data_html.querySelector(".tag-box").innerHTML = `<div class="tags before"></div>`;
                                if (user.uuid === 0) {
                                    card_data_html.querySelector("#tpc_0").disabled = true;
                                    card_data_html.querySelector("#tpc_0").style = "opacity: 0.5; pointer-events: none;"
                                }
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
                            })
                        } catch (e) {
                        }
                        await sleep(100);
                    }
                }
                no_bubble = 0;
                return false;
            } else {
                for (let i = 0; i < 2; i++) {
                    let a = i * (Math.ceil(data.length / 2));
                    let last_id;
                    try {
                        last_id = data[a + (Math.ceil(data.length / 2) - 1)].file_id;
                    } catch (e) {
                        last_id = "bottom";
                    }
                    document.querySelector("box").querySelector("top").insertAdjacentHTML(`beforeend`, `<section class="page-contain" id="${last_id}">
                </section>`);
                    for (let i = a; i < a + (Math.ceil(data.length / 2)); i++) {
                        let card_title;
                        try {
                            let seeders = nFormatter(data[i].seeders);
                            const file_subject_array = data[i].file_subject.split(",");
                            if (data[i].file_subject.length > 2) { // title
                                card_title = subject[String(file_subject_array[0])];
                            } else {
                                card_title = subject[data[i].file_subject];
                            }
                            fetch(`/api/1q3nlSeeHyTF/${data[i].user}`, {
                                method: 'POST'
                            }).then(r => {
                                return r.json();
                            }).then(async function (user) {
                                let unknown;
                                if (user.uuid !== 0) {
                                    unknown = 1
                                } else {
                                    unknown = 0;
                                }
                                document.getElementById(`${last_id}`).insertAdjacentHTML('beforeend', `<div class="data-card a${i}">
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
                                <div class="card-bottom" onclick="location.href='/card/${data[i].file_id}'">
                                    <div class="card-min-profile">
                                        <img class="profile-img" src="./imgs/${user.profile_img}.png">
                                        <div class="profile-name-time">
                                            <div class="profile-name">${user.user}</div>
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
                                <div class="multi-button">
                                    <button id="tpc_${unknown}" class="fa-solid fa-address-card" title="前往作者" onclick="location.href='/profile/${data[i].user}'">
                                    </button>
                                    <button class="fa-solid fa-eye" title="預覽" onclick="location.href='/card/${data[i].file_id}'">
                                    </button>
                                    <button class="fa-solid fa-circle-minus" title="刪除" onclick="delete_card(this)" value="${data[i].file_id}">
                                    </button>
                                </div>
                            </div>
                        </div>
                        `)
                                let card_data_html = document.getElementById(`${last_id}`).querySelector(`.a${i}`);
                                card_data_html.querySelector(".tag-box").innerHTML = `<div class="tags before"></div>`;
                                if (user.uuid === 0) {
                                    card_data_html.querySelector("#tpc_0").disabled = true;
                                    card_data_html.querySelector("#tpc_0").style = "opacity: 0.5; pointer-events: none;"
                                }
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
                            })
                        } catch (e) {
                        }
                        await sleep(100);
                    }
                }
                no_bubble = 0;
                document.querySelector("bottom").querySelector("detector").textContent = "--往下滑加載更多--";
                return true;
            }
        }
    }).then(async function (more) {
        if (more === false) {
            document.querySelector("bottom").innerHTML = `<detectorOFF>--沒有更多了--</detectorOFF>`;
        }
    })
}

function isInViewPort(element) {
    try {
        const viewWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewHeight =
            window.innerHeight || document.documentElement.clientHeight;
        const {top, right, bottom, left} = element.getBoundingClientRect();
        return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
    } catch (e) {
    }
}

async function scroll_load() {
    const section_array = document.querySelector("box").querySelector("top").querySelectorAll("section");
    try {
        fetch(`/api/front_page_scroll/v1/card/${sort}`, {
            method: 'POST',
            body: JSON.stringify({
                how_many: team,
                last_id: section_array[section_array.length - 1].id,
                search_query: query
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
        }).then(async function (data) {
            if (Object.keys(data).length < team) {
                for (let i = 0; i < 2; i++) {
                    let a = i * (Math.ceil(data.length / 2));
                    let last_id;
                    try {
                        last_id = data[a + (Math.ceil(data.length / 2) - 1)].file_id;
                    } catch (e) {
                        last_id = "bottom";
                    }
                    document.querySelector("box").querySelector("top").insertAdjacentHTML(`beforeend`, `<section class="page-contain" id="${last_id}">
                </section>`);
                    for (let i = a; i < a + (Math.ceil(data.length / 2)); i++) {
                        let card_title;
                        try {
                            let seeders = nFormatter(data[i].seeders);
                            const file_subject_array = data[i].file_subject.split(",");
                            if (data[i].file_subject.length > 2) { // title
                                card_title = subject[String(file_subject_array[0])];
                            } else {
                                card_title = subject[data[i].file_subject];
                            }
                            fetch(`/api/1q3nlSeeHyTF/${data[i].user}`, {
                                method: 'POST'
                            }).then(r => {
                                if (r.status === 429) {
                                    location.href = "/404";
                                }
                                if (r.status === 200) {
                                    return r.json();
                                }
                            }).then(async function (user) {
                                let unknown;
                                if (user.uuid !== 0) {
                                    unknown = 1
                                } else {
                                    unknown = 0;
                                }
                                document.getElementById(`${last_id}`).insertAdjacentHTML('beforeend', `<div class="data-card a${i}">
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
                                <div class="card-bottom" onclick="location.href='/card/${data[i].file_id}'">
                                    <div class="card-min-profile">
                                        <img class="profile-img" src="./imgs/${user.profile_img}.png">
                                        <div class="profile-name-time">
                                            <div class="profile-name">${user.user}</div>
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
                                <div class="multi-button">
                                    <button id="tpc_${unknown}" class="fa-solid fa-address-card" title="前往作者" onclick="location.href='/profile/${data[i].user}'">
                                    </button>
                                    <button class="fa-solid fa-eye" title="預覽" onclick="location.href='/card/${data[i].file_id}'">
                                    </button>
                                    <button class="fa-solid fa-circle-minus" title="刪除" onclick="delete_card(this)" value="${data[i].file_id}">
                                    </button>
                                </div>
                            </div>
                        </div>
                        `)
                                let card_data_html = document.getElementById(`${last_id}`).querySelector(`.a${i}`);
                                card_data_html.querySelector(".tag-box").innerHTML = `<div class="tags before"></div>`;
                                if (user.uuid === 0) {
                                    card_data_html.querySelector("#tpc_0").disabled = true;
                                    card_data_html.querySelector("#tpc_0").style = "opacity: 0.5; pointer-events: none;"
                                }
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
                            })
                        } catch (e) {
                        }
                        await sleep(100);
                    }
                }
                no_bubble = 0;
                return false;
            } else {
                document.querySelector("top").insertAdjacentHTML('beforeend', `
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>`);
                for (let i = 0; i < 2; i++) {
                    let a = i * (Math.ceil(data.length / 2));
                    let last_id;
                    try {
                        last_id = data[a + (Math.ceil(data.length / 2) - 1)].file_id;
                    } catch (e) {
                        last_id = "bottom";
                    }
                    document.querySelector("box").querySelector("top").insertAdjacentHTML(`beforeend`, `<section class="page-contain" id="${last_id}">
                </section>`);
                    for (let i = a; i < a + (Math.ceil(data.length / 2)); i++) {
                        let card_title;
                        try {
                            let seeders = nFormatter(data[i].seeders);
                            const file_subject_array = data[i].file_subject.split(",");
                            if (data[i].file_subject.length > 2) { // title
                                card_title = subject[String(file_subject_array[0])];
                            } else {
                                card_title = subject[data[i].file_subject];
                            }
                            fetch(`/api/1q3nlSeeHyTF/${data[i].user}`, {
                                method: 'POST'
                            }).then(r => {
                                if (r.status === 429) {
                                    location.href = "/404";
                                }
                                if (r.status === 200) {
                                    return r.json();
                                }
                            }).then(async function (user) {
                                let unknown;
                                if (user.uuid !== 0) {
                                    unknown = 1
                                } else {
                                    unknown = 0;
                                }
                                document.getElementById(`${last_id}`).insertAdjacentHTML('beforeend', `<div class="data-card a${i}">
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
                                <div class="card-bottom" onclick="location.href='/card/${data[i].file_id}'">
                                    <div class="card-min-profile">
                                        <img class="profile-img" src="./imgs/${user.profile_img}.png">
                                        <div class="profile-name-time">
                                            <div class="profile-name">${user.user}</div>
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
                                <div class="multi-button">
                                    <button id="tpc_${unknown}" class="fa-solid fa-address-card" title="前往作者" onclick="location.href='/profile/${data[i].user}'">
                                    </button>
                                    <button class="fa-solid fa-eye" title="預覽" onclick="location.href='/card/${data[i].file_id}'">
                                    </button>
                                    <button class="fa-solid fa-circle-minus" title="刪除" onclick="delete_card(this)" value="${data[i].file_id}">
                                    </button>
                                </div>
                            </div>
                        </div>
                        `)
                                let card_data_html = document.getElementById(`${last_id}`).querySelector(`.a${i}`);
                                card_data_html.querySelector(".tag-box").innerHTML = `<div class="tags before"></div>`;
                                if (user.uuid === 0) {
                                    card_data_html.querySelector("#tpc_0").disabled = true;
                                    card_data_html.querySelector("#tpc_0").style = "opacity: 0.5; pointer-events: none;"
                                }
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
                            })
                        } catch (e) {
                        }
                        await sleep(100);
                    }
                }
                no_bubble = 0;
                return true;
            }
        }).then(async function (more) {
            if (more === true) {
                document.querySelector("top").querySelector(".lds-ring").remove();
            } else {
                try {
                    document.querySelector("top").querySelector(".lds-ring").remove();
                } catch (e) {
                }
                document.querySelector("bottom").innerHTML = `<detectorOFF>--沒有更多了--</detectorOFF>`;
            }
        })
    } catch (e) {
    }
}

async function delete_card(data) {
    document.title = "刪除中..";
    document.querySelector(".cardbase-info-1").innerHTML = `
                <span style="color: #c84b31">刪除檔案中..</span>
                <div class="lds-ripple"><div></div><div></div></div>`;
    fetch(`/api/CmNKbILQrRGJ/DMOYJiedLM9t/`, {
        method: 'POST',
        body: JSON.stringify({
            uuid: getCookie('uuid'),
            CTF: getCookie('CTF'),
            file_id: data.value
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
    }).then(async function (e) {
        if (e.status === 404) {
            location.href = "/404";
        }
        if (e.status === 200) {
            document.title = "Topic題庫網(檔案庫)";
            document.querySelector(".cardbase-info-1").innerHTML = `
                <i class="fa-solid fa-circle-check" style="color: #4E9F3D; opacity: 0.9">
                </i>
                <span style="color: #4E9F3D">刪除成功</span>
                <i class="fa-solid fa-circle-check" style="color: #4E9F3D; opacity: 0.9">
                </i>`;
            await window.location.reload();
        }
    })
}

function sub_menu_display(data) {
    if (data.dataset.open === "false") {
        data.dataset.open = "true";
        data.style.borderRadius = "15px 15px 0 0";
        document.querySelector(".options").style.display = "block";
    } else {
        data.dataset.open = "false";
        data.style.borderRadius = "15px";
        document.querySelector(".options").style.display = "none";
    }
}

function recover_search() {
    const checkbox_menu = document.getElementById("checkbox-menu");
    checkbox_menu.setAttribute("data-open", "true")
    checkbox_display()
}

function checkbox_display() {
    const target = document.getElementById("checkbox-menu");
    if (target.getAttribute("data-open") === "false") {
        target.setAttribute("data-open", "true")
        target.style.display = "flex"
        document.getElementById("DownArrow").style.transform = "rotate(180deg)"
        document.getElementById("open-checkbox-menu").style['border-radius'] = "30px 30px 0px 0px"
    } else {
        target.setAttribute("data-open", "false")
        target.style.display = "none"
        document.getElementById("DownArrow").style.transform = "rotate(0deg)"
        document.getElementById("open-checkbox-menu").style['border-radius'] = "60px"
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

/* Main */
if (getCookie('CTF') === "") {
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
            query.data.uuid = data.uuid;
            start_page_card();
        } else {
            location.href = "/404";
        }
    })
}
setTimeout(() => {
    if (debug_search_none === 0) {
        document.querySelector("box").querySelector("top").insertAdjacentHTML(`afterbegin`, `
            <div id="sort-menu-container">
                <div class="sort-menu-frame">
                    <div class="trigger">
                        <button id="trigger-button" data-open="false" onclick="sub_menu_display(this)">
                            <i class="fa-solid fa-arrow-down-wide-short">
                        </i>
                            <text>排序依據:</text>
                        </button>
                        <ul>${sort_json[sort]}</ul>
                    </div>
                    <ul class="options">
                        <li onclick="sort = 'seeders';clear_box()">觀看次數</li>
                        <li onclick="sort = 'time_new';clear_box()">上傳時間(最新)</li>
                        <li onclick="sort = 'time_old';clear_box()">上傳時間(最舊)</li>
                    </ul>
                </div>
            </div>`)
    }
}, 800);
if (window.screen.availWidth > 1400) {
    team = 8;
}
if (window.screen.availWidth > 1050 && window.screen.availWidth < 1400) {
    team = 6;
}
if (window.screen.availWidth > 720 && window.screen.availWidth < 1050) {
    team = 4;
}
if (window.screen.availWidth < 720) {
    team = 2;
}
if (href_data === undefined || href_data === "") {
    query.type2 = "default";
} else {
    if (href_data.includes("search_query")) {
        query.type2 = "text_search";
        query.data.search_query = href_data.split("=")[1];
    } else {
        query.type2 = "tag_search";
        for (let i = 0; i < href_data.split("&").length; i++) {
            let value = href_data.split("&")[i].split("=")[1].replace("%25", "");
            if (value === "yes" || value === "no") {
                query.data.answer_array.push("%" + value)
            } else {
                if (Number(value) < 15) {
                    query.data.level_array.push(value)
                } else {
                    query.data.subject_array.push(value)
                }
            }
        }
    }
}
if (debug_search_none === 0) {
    try { // 行動裝置
        document.createEvent("TouchEvent");
        document.querySelector("bottom").insertAdjacentHTML('beforeend', `
                <div class="load-more-button">
                    <i class="fa-solid fa-caret-down"></i>
                    <text>或點擊載入</text>
                    <i class="fa-solid fa-caret-down" style="opacity: 0"></i>
                </div>`);
        document.addEventListener('touchend', async function (e) {
            e.stopPropagation();
            if (isInViewPort(document.querySelector("detector")) === true && no_bubble === 0) {
                no_bubble = 1;
                await scroll_load();
            }
        })
    } catch (e) { // 非行動裝置
        document.addEventListener('scroll', async function (e) {
            e.stopPropagation();
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            if (scrolled === 100 && isInViewPort(document.querySelector("detector")) === true && no_bubble === 0) {
                no_bubble = 1;
                await scroll_load();
            }
        })
    }
}
