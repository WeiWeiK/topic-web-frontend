/* custom variable */
const dragarea = document.querySelector(".drag-area"),
    dragarea_icon = dragarea.querySelector("#icon"),
    dragarea_hearder = dragarea.querySelector("header"),
    dragarea_text = dragarea.querySelector("text"),
    dragarea_button = dragarea.querySelector("button"),
    dragarea_input = dragarea.querySelector("input");
const word_file = "fa-solid fa-file-word icon",
    pdf_file = "fa-solid fa-file-pdf icon",
    cloud_icon = "fa-solid fa-cloud-arrow-up icon";
let file,
    answer_file;

/* custom dictionary */


/* custom function */
function animate(element, className) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
        setTimeout(() => {
            animate(element, className);
        }, 500);
    }, 2500);
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function screen_width() {
    const s_width = screen.width;
    let y;
    let benchmark;
    if (document.querySelector(".file-data") === null) {
    } else {
        if (s_width > 700 && s_width < 1000) {
            benchmark = Math.floor(s_width / 100 % 10) * 100;
            y = (benchmark * 60) / 100 - 420;
            document.querySelector(".file-data").style = `width: calc(100% - ${y}px);`
        }
        if (s_width > 1000) {
            benchmark = Math.floor(s_width / 1000 % 10) * 1000;
            y = (benchmark * 60) / 100 - 420;
            document.querySelector(".file-data").style = `width: calc(100% - ${y}px);`
        }
    }
}

function _answer_ID() {
    let d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'ASxyxyxyxyxyxyxy'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
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

function delete_file() {
    file = undefined;
    dragarea_input.value = "";
    dragarea.className = "drag-area";
    dragarea_icon.className = cloud_icon;
    dragarea_hearder.textContent = "將你要上傳的檔案拖曳到這裡";
    dragarea_text.innerHTML = `<text>只支持<span>.pdf.doc.docx</span></text>`;
    if (!!document.querySelector(".drag-area-down") === true) {
        document.querySelector(".drag-area-down").remove();
    }
}

function next_step() {
    if (file === undefined) {
        return false;
    } else {
        let data_file_name = [];
        if (file.name.length > 13) {
            data_file_name.push(file.name.substring(0, 11) + "..");
        } else {
            data_file_name.push(file.name);
        }
        document.getElementById("file-upload").style.height = "1185px";
        document.getElementById("file-upload").innerHTML =
            `
                <form class="file-data" onsubmit="return ProcessFileData()">
                <div class="file-name">
                    <label class="warns">⚠️ 請確實完成步驟1-4 ⚠️</label>
                    <label class="data_file_name">${data_file_name[0]}</label>
                    <label class="file-name-title">1.檔案名稱: <span>ex:111年國中教育會考試題-自然科</span></label>
                    <input id="file-name" type="text" placeholder="請給你的檔案一個名字" autocomplete="nope"
                           maxlength="24"
                           onkeyup="value=value.replace(/[^\u4e00-\u9fa5\u02c9\u02D9\u02CB\u02C7\u02CA\u3105-\u3129a-zA-Z0-9-]/g,'')"
                           onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4e00-\u9fa5\u02c9\u02D9\u02CB\u02C7\u02CA\u3105-\u3129a-zA-Z0-9-]/g,''))"
                           oninput="file_name(this); display_upload_button()" required/>
                </div>
                <div class="check-box-level_subject">
                    <text>2.階級: <span>最多選擇一項</span></text>
                    <div class="label-sort">
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="1">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>小一</b>
                                            </span>
                        </label>
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="2">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>小二</b>
                                            </span>
                        </label>
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="3">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>小三</b>
                                            </span>
                        </label>
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="4">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>小四</b>
                                            </span>
                        </label>
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="5">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>小五</b>
                                            </span>
                        </label>
                    </div>
                    <div class="label-sort">
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="6">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>小六</b>
                                            </span>
                        </label>
                    </div>
                    <div class="label-sort">
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="7">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>國一</b>
                                            </span>
                        </label>
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="8">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>國二</b>
                                            </span>
                        </label>
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="9">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>國三</b>
                                            </span>
                        </label>
                    </div>
                    <div class="label-sort">
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="10">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>高一</b>
                                            </span>
                        </label>
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="11">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>高二</b>
                                            </span>
                        </label>
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="12">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>高三</b>
                                            </span>
                        </label>
                    </div>
                    <div class="label-sort">
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="13">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>大學</b>
                                            </span>
                        </label>
                        <label class="label level_normal">
                            <input class="labelCheckbox" type="checkbox" name="level" onclick="level_detect(this)"
                                   onchange="detect_all_level_checkbox(); display_upload_button()" value="14">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon"></i>
                                                </span>
                                                <b>其他..</b>
                                            </span>
                        </label>
                    </div>
                </div>
                <div class="check-box-level_subject">
                    <text>3.科目: <span>特定項目可選擇二至三項</span></text>
                    <div class="label-sort">
                        <label class="label normal">
                            <input class="labelCheckbox" type="checkbox" name="subject" onclick="subject_detect(this)"
                                   onchange="detect_all_subject_checkbox(); display_upload_button()" value="20">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon" aria-hidden="true"></i>
                                                </span>
                                                <b>國文</b>
                                            </span>
                        </label>
                        <label class="label normal">
                            <input class="labelCheckbox" type="checkbox" name="subject" onclick="subject_detect(this)"
                                   onchange="detect_all_subject_checkbox(); display_upload_button()" value="21">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon" aria-hidden="true"></i>
                                                </span>
                                                <b>英文</b>
                                            </span>
                        </label>
                        <label class="label normal">
                            <input class="labelCheckbox" type="checkbox" name="subject" onclick="subject_detect(this)"
                                   onchange="detect_all_subject_checkbox(); display_upload_button()" value="22">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon" aria-hidden="true"></i>
                                                </span>
                                                <b>數學</b>
                                            </span>
                        </label>
                        <label class="label science">
                            <input class="labelCheckbox" type="checkbox" name="subject-science"
                                   onclick="subject_detect(this)" onchange="detect_all_subject_checkbox(); display_upload_button()" value="23">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon" aria-hidden="true"></i>
                                                </span>
                                                <b>生物</b>
                                            </span>
                        </label>
                        <label class="label science">
                            <input class="labelCheckbox" type="checkbox" name="subject-science"
                                   onclick="subject_detect(this)" onchange="detect_all_subject_checkbox(); display_upload_button()" value="24">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon" aria-hidden="true"></i>
                                                </span>
                                                <b>理化</b>
                                            </span>
                        </label>
                    </div>
                    <div class="label-sort">
                        <label class="label science">
                            <input class="labelCheckbox" type="checkbox" name="subject-science"
                                   onclick="subject_detect(this)" onchange="detect_all_subject_checkbox(); display_upload_button()" value="25">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon" aria-hidden="true"></i>
                                                </span>
                                                <b>地科</b>
                                            </span>
                        </label>
                        <label class="label society">
                            <input class="labelCheckbox" type="checkbox" name="subject-society"
                                   onclick="subject_detect(this)" onchange="detect_all_subject_checkbox(); display_upload_button()" value="26">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon" aria-hidden="true"></i>
                                                </span>
                                                <b>地理</b>
                                            </span>
                        </label>
                        <label class="label society">
                            <input class="labelCheckbox" type="checkbox" name="subject-society"
                                   onclick="subject_detect(this)" onchange="detect_all_subject_checkbox(); display_upload_button()" value="27">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon" aria-hidden="true"></i>
                                                </span>
                                                <b>公民</b>
                                            </span>
                        </label>
                        <label class="label society">
                            <input class="labelCheckbox" type="checkbox" name="subject-society"
                                   onclick="subject_detect(this)" onchange="detect_all_subject_checkbox(); display_upload_button()" value="28">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon" aria-hidden="true"></i>
                                                </span>
                                                <b>歷史</b>
                                            </span>
                        </label>
                        <label class="label normal">
                            <input class="labelCheckbox" type="checkbox" name="subject" onclick="subject_detect(this)"
                                   onchange="detect_all_subject_checkbox(); display_upload_button()" value="19">
                            <span class="labelText">
                                                <span class="labelCheck">
                                                    <i class="fa fa-check icon" aria-hidden="true"></i>
                                                </span>
                                                <b>其他..</b>
                                            </span>
                        </label>
                    </div>
                </div>
                <div class="answer">
                    <text>4.有無答案 ?</text>
                    <label>
                        <input id="have_answer" name="have_answer_detect" onchange="have_answers(this); display_upload_button()" type="radio" value="%yes"/>
                        <span>有答案</span>
                    </label>
                    <label>
                        <input id="dont_have_answer" name="have_answer_detect" onchange="dont_have_answers(this); display_upload_button()" type="radio" value="%no"/>
                        <span>無答案</span>
                    </label>
                </div>
                <div class="bottom">
                    <answer>
                        <label>
                            <input id="in-topic" name="in_topic_detect" onchange="display_upload_button()" onclick="in_topic()" type="radio" hidden/>
                            <span>附在題目檔裡</span>
                        </label>
                        <label>
                            <input id="not-in-topic" name="in_topic_detect" onchange="display_upload_button()" onclick="not_in_topic()" type="radio" hidden/>
                            <span>額外上傳一份答案檔</span>
                        </label>
                    </answer>
                    <upload_answer>
                        <input id="answer_input" type="file" onchange="display_upload_button(); get_answer_file(this)"
                               accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/jpeg, image/png"
                               hidden/>
                        <div id="answer_upload_btn" class="" onclick="click_answer_upload()">
                            <text>選擇檔案</text>
                            <i class="fa-solid fa-hand-pointer"></i>
                        </div>
                        <answer_name class="none">支援圖片及文檔</answer_name>
                    </upload_answer>
                    <div class="upload_button">
                        <button class="bn632-hover bn22" type="submit">上傳</button>
                    </div>
                </div>
            </form>
                <div class="preview-card">
                <div class="data-card">
                    <background>
                    </background>
                    <div class="paper-content">
                        <div class="title">&emsp;</div>
                        <hr/>
                        <div class="name-box">
                            <text class="name">&emsp;</text>
                        </div>
                        <div class="tag-box">
                        </div>
                        <div class="card-bottom">
                            <div class="card-min-profile">
                                <img class="profile-img" src="./imgs/a-unknown.png">
                                <div class="profile-name-time">
                                    <div class="profile-name">x預覽圖x</div>
                                    <div class="profile-time">2006-12-18</div>
                                </div>
                            </div>
                            <div class="card-views">
                                <div class="card-views-box">
                                    <i class="fa-solid fa-eye"></i>
                                    <div class="views">999</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        screen_width();
    }
}

function file_name(data) {
    const input_regex = /[^\u4e00-\u9fa5\u02c9\u02D9\u02CB\u02C7\u02CA\u3105-\u3129a-zA-Z0-9-]/;
    const span = document.querySelector(".file-name-title").querySelector("span");
    if (input_regex.test(data.value) === true) { /* 不符合規則 */
        span.textContent = "檔案名稱不可以包含特殊字元!";
        span.style.color = "#c84b31";
        return false;
    } else { /* 符合規則 */
        span.textContent = "ex:111年國中教育會考試題-自然科";
        span.style.color = "#ecdbba";
        if (data.value.length > 24) { /* 超過字元上限 */
            span.textContent = "超過字元上限!";
            span.style.color = "#c84b31";
            return false;
        } else { /* 沒超過 */
            preview_card(data.value);
        }
    }
}

function level_detect(data) {
    const obj = document.getElementsByName("level");
    const style_all_level = document.querySelectorAll(".level_normal");
    let num = 0;
    for (let i = 0; i < obj.length; i++)
        if (obj[i].checked) num++;
    if (num === 1) {
        for (let a = 0; a < style_all_level.length; a++) {
            style_all_level[a].style.opacity = "0.35";
            data.parentNode.style.opacity = "1";
        }
    }
    if (num === 0) {
        for (let a = 0; a < style_all_level.length; a++) {
            style_all_level[a].style.opacity = "1";
        }
    }
    if (num > 1) { /* 上限 */
        data.checked = false;
    }
}

function subject_detect(data) {
    const obj = document.getElementsByName("subject");
    const obj_science = document.getElementsByName("subject-science");
    const obj_society = document.getElementsByName("subject-society");
    const style_normal = document.querySelectorAll(".normal");
    const style_science = document.querySelectorAll(".science");
    const style_society = document.querySelectorAll(".society");
    let num = 0;
    let science = 0;
    let society = 0;
    if (data.value > 22 && data.value < 26) {
        for (let i = 0; i < obj.length; i++)
            if (obj[i].checked) num++;
        for (let i = 0; i < obj_science.length; i++)
            if (obj_science[i].checked) science++;
        for (let i = 0; i < obj_society.length; i++)
            if (obj_society[i].checked) society++;
        if (num > 0 || science > 3 || society > 0) { /* 上限 */
            data.checked = false;
        }
        if (num === 0 && science > 0 && society === 0) {
            for (let a = 0; a < style_normal.length; a++) {
                style_normal[a].style.opacity = "0.35";
            }
            for (let a = 0; a < style_science.length; a++) {
                style_science[a].style.opacity = "1";
            }
            for (let a = 0; a < style_society.length; a++) {
                style_society[a].style.opacity = "0.35";
            }
        }
        if (num === 0 && science === 0 && society === 0) {
            for (let a = 0; a < style_normal.length; a++) {
                style_normal[a].style.opacity = "1";
            }
            for (let a = 0; a < style_science.length; a++) {
                style_science[a].style.opacity = "1";
            }
            for (let a = 0; a < style_society.length; a++) {
                style_society[a].style.opacity = "1";
            }
        }
    }
    if (data.value > 25 && data.value < 29) {
        for (let i = 0; i < obj.length; i++)
            if (obj[i].checked) num++;
        for (let i = 0; i < obj_science.length; i++)
            if (obj_science[i].checked) science++;
        for (let i = 0; i < obj_society.length; i++)
            if (obj_society[i].checked) society++;
        if (num > 0 || science > 0 || society > 3) { /* 上限 */
            data.checked = false;
        }
        if (num === 0 && science === 0 && society > 0) {
            for (let a = 0; a < style_normal.length; a++) {
                style_normal[a].style.opacity = "0.35";
            }
            for (let a = 0; a < style_science.length; a++) {
                style_science[a].style.opacity = "0.35";
            }
            for (let a = 0; a < style_society.length; a++) {
                style_society[a].style.opacity = "1";
            }
        }
        if (num === 0 && science === 0 && society === 0) {
            for (let a = 0; a < style_normal.length; a++) {
                style_normal[a].style.opacity = "1";
            }
            for (let a = 0; a < style_science.length; a++) {
                style_science[a].style.opacity = "1";
            }
            for (let a = 0; a < style_society.length; a++) {
                style_society[a].style.opacity = "1";
            }
        }
    }
    if (data.value > 18 && data.value < 23) {
        for (let i = 0; i < obj.length; i++)
            if (obj[i].checked) num++;
        for (let i = 0; i < obj_science.length; i++)
            if (obj_science[i].checked) science++;
        for (let i = 0; i < obj_society.length; i++)
            if (obj_society[i].checked) society++;
        if (num > 1 || science > 0 || society > 0) { /* 上限 */
            data.checked = false;
        }
        if (num === 1 && science === 0 && society === 0) {
            for (let a = 0; a < style_normal.length; a++) {
                style_normal[a].style.opacity = "0.35";
                data.parentNode.style.opacity = "1";
            }
            for (let a = 0; a < style_science.length; a++) {
                style_science[a].style.opacity = "0.35";
            }
            for (let a = 0; a < style_society.length; a++) {
                style_society[a].style.opacity = "0.35";
            }
        }
        if (num === 0 && science === 0 && society === 0) {
            for (let a = 0; a < style_normal.length; a++) {
                style_normal[a].style.opacity = "1";
            }
            for (let a = 0; a < style_science.length; a++) {
                style_science[a].style.opacity = "1";
            }
            for (let a = 0; a < style_society.length; a++) {
                style_society[a].style.opacity = "1";
            }
        }
    }
}

function have_answers(data) {
    const frame = document.querySelector(".answer");
    const background = frame.querySelector("label:nth-child(2)");
    const text = background.querySelector("span");
    if (document.getElementById("have_answer").checked) { /* checked */
        background.style = "background: #30dd8a; transition: all 0.1s ease-in;";
        text.style.color = "#191919";
        frame.querySelector("label:nth-child(3)").style = "";
        frame.querySelector("label:nth-child(3)").querySelector("span").style = "";
        /* bottom */
        const answer = document.querySelector("answer");
        answer.style.display = "flex";
        preview_card(data.value);
    }
}

function dont_have_answers(data) {
    const frame = document.querySelector(".answer");
    const background = frame.querySelector("label:nth-child(3)");
    const text = background.querySelector("span");
    if (document.getElementById("dont_have_answer").checked) { /* checked */
        background.style = "background: #c84b31; transition: all 0.1s ease-in;";
        text.style.color = "#191919";
        frame.querySelector("label:nth-child(2)").style = "";
        frame.querySelector("label:nth-child(2)").querySelector("span").style = "";
        /* bottom */
        const answer = document.querySelector("answer");
        answer.style.display = "none";
        document.querySelector("upload_answer").style.display = "none";
        preview_card(data.value);
    }
}

function in_topic() {
    const frame = document.querySelector("answer");
    if (document.getElementById("in-topic").checked) { /* checked */
        frame.querySelector("label:nth-child(1)").style = "background: #c84b31; transition: all 0.1s ease-in;";
        frame.querySelector("label:nth-child(2)").style = "";
        /* bottom */
        const bottom = document.querySelector(".bottom");
        bottom.querySelector("upload_answer").style.display = "none";
    }
}

function not_in_topic() {
    const frame = document.querySelector("answer");
    if (document.getElementById("not-in-topic").checked) { /* checked */
        frame.querySelector("label:nth-child(2)").style = "background: #c84b31; transition: all 0.1s ease-in;";
        frame.querySelector("label:nth-child(1)").style = "";
        /* bottom */
        const bottom = document.querySelector(".bottom");
        bottom.querySelector("upload_answer").style.display = "flex";
    }
}

function get_answer_file(data) {
    if (data.files[0].type === "image/jpeg" || data.files[0].type === "image/png") {
        if (((data.files[0].size / 1024) / 1024) > 9) {
            alert("太大了 圖片不能超過9MB");
        } else {
            answer_file = data.files[0];
            document.getElementById("answer_upload_btn").className = "got_file";
            document.querySelector("answer_name").className = "got_file";
            if (answer_file.name.length > 15) {
                document.querySelector("answer_name").textContent = answer_file.name.substring(0, 13) + "..";
            } else {
                document.querySelector("answer_name").textContent = answer_file.name;
            }
            display_upload_button();
        }
    } else {
        if (((data.files[0].size / 1024) / 1024) > 6) {
            alert("太大了 不能超過6MB");
        } else {
            answer_file = data.files[0];
            document.getElementById("answer_upload_btn").className = "got_file";
            document.querySelector("answer_name").className = "got_file";
            if (answer_file.name.length > 15) {
                document.querySelector("answer_name").textContent = answer_file.name.substring(0, 13) + "..";
            } else {
                document.querySelector("answer_name").textContent = answer_file.name;
            }
            display_upload_button();
        }
    }
}

function click_answer_upload() {
    document.getElementById("answer_input").click();
}

function detect_all_level_checkbox() {
    let level_array = [];
    const level = document.querySelectorAll('[name="level"]:checked');
    for (let i = 0; i < level.length; i++) {
        level_array.push(level[i].value);
    }
    preview_card(level_array);
}

function detect_all_subject_checkbox() {
    let subject_array = [];
    const subject = document.querySelectorAll('[name="subject"]:checked');
    const subject_science = document.querySelectorAll('[name="subject-science"]:checked');
    const subject_society = document.querySelectorAll('[name="subject-society"]:checked');
    for (let i = 0; i < subject.length; i++) {
        subject_array.push(subject[i].value);
    }
    for (let i = 0; i < subject_science.length; i++) {
        subject_array.push(subject_science[i].value);
    }
    for (let i = 0; i < subject_society.length; i++) {
        subject_array.push(subject_society[i].value);
    }
    preview_card(subject_array);
}

function preview_card(data) {
    const card = document.querySelector(".paper-content");
    const title = card.querySelector(".title");
    const name = card.querySelector(".name");
    const tag_box = card.querySelector(".tag-box");
    let level = {
        "1": "小一", "2": "小二", "3": "小三", "4": "小四", "5": "小五", "6": "小六", "7": "國一",
        "8": "國二", "9": "國三", "10": "高一", "11": "高二", "12": "高三", "13": "大學", "14": "其他"
    }
    let subject = {
        "20": "國文", "21": "英文", "22": "數學", "23": "自然", "24": "自然", "25": "自然", "26": "社會",
        "27": "社會", "28": "社會", "19": "其他.."
    }
    if (typeof data === "object") {
        if (data[0] === undefined) {
            if (document.querySelectorAll('[name="subject"]:checked').length === 0 &&
                document.querySelectorAll('[name="subject-science"]:checked').length === 0 &&
                document.querySelectorAll('[name="subject-society"]:checked').length === 0) {
                title.innerHTML = "&nbsp";
            }
        }
        if (data[0] < 15) { /* 階級 */
        }
        if (data[0] > 15) {
            title.textContent = subject[data[0]];
        }
        preview_card_tag();
    }
    if (typeof data === "string") {
        if (data.includes("%") === true) {
            preview_card_tag();
        } else {
            const span = document.querySelector(".file-name-title").querySelector("span");
            if (/[^\u4e00-\u9fa5\u02c9\u02D9\u02CB\u02C7\u02CA\u3105-\u3129a-zA-Z0-9-]/.test(data) === true) { /* 不符合規則 */
                span.textContent = "檔案名稱不可以包含特殊字元!";
                span.style.color = "#c84b31";
            } else { /* 符合規則 */
                span.textContent = "ex:111年國中教育會考試題-自然科";
                span.style.color = "#ecdbba";
                if (data.length > 24) { /* 超過字元上限 */
                    span.textContent = "超過字元上限!";
                    span.style.color = "#c84b31";
                } else { /* 沒超過 */
                    name.textContent = data;
                }
            }
        }
    }
}

function preview_card_tag() {
    const level_checking = document.querySelectorAll('[name="level"]:checked');
    const subject_checking = document.querySelectorAll('[name="subject"]:checked');
    const subject_science_checking = document.querySelectorAll('[name="subject-science"]:checked');
    const subject_society_checking = document.querySelectorAll('[name="subject-society"]:checked');
    const answer_checking = document.querySelectorAll('[name="have_answer_detect"]:checked');
    const tag_box = document.querySelector(".paper-content").querySelector(".tag-box");
    let level_array = [];
    let subject_array = [];
    let answer_array = [];
    let level = {
        "1": "小一", "2": "小二", "3": "小三", "4": "小四", "5": "小五", "6": "小六", "7": "國一",
        "8": "國二", "9": "國三", "10": "高一", "11": "高二", "12": "高三", "13": "大學", "14": "其他"
    }
    let subject = {
        "20": "國文", "21": "英文", "22": "數學", "23": "生物", "24": "理化", "25": "地科", "26": "地理",
        "27": "公民", "28": "歷史", "19": "其他.."
    }
    let answer = {
        "%yes": "附答",
        "%no": "無答"
    }
    for (let i = 0; i < level_checking.length; i++) {
        level_array.push(level_checking[i].value);
    }
    for (let i = 0; i < subject_checking.length; i++) {
        subject_array.push(subject_checking[i].value);
    }
    for (let i = 0; i < subject_science_checking.length; i++) {
        subject_array.push(subject_science_checking[i].value);
    }
    for (let i = 0; i < subject_society_checking.length; i++) {
        subject_array.push(subject_society_checking[i].value);
    }
    for (let i = 0; i < answer_checking.length; i++) {
        answer_array.push(answer_checking[i].value);
    }
    tag_box.innerHTML = `<div class="tags before">
                        </div>`
    if (subject_array.length === 0) {
        if (typeof level_array[0] !== "undefined") { /* level */
            tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[level_array[0]]}</tag>
            `);
        } else {
            for (let i = 0; i < document.getElementsByClassName("tag_level").length; i++) {
                tag_box.removeChild(document.getElementsByClassName("tag_level")[i]);
            }
        }
        if (typeof subject_array[0] !== "undefined") { /* subject */
            for (let i = 0; i < subject_array.length; i++) {
                tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${subject[subject_array[i]]}</tag>
            `);
            }
        } else {
            for (let i = 0; i < document.getElementsByClassName("tag_subject").length; i++) {
                tag_box.removeChild(document.getElementsByClassName("tag_subject")[i]);
            }
        }
        if (typeof answer_array[0] !== "undefined") { /* answer */
            tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_answer">#${answer[answer_array[0]]}</tag>
            `);
        } else {
            for (let i = 0; i < document.getElementsByClassName("tag_answer").length; i++) {
                tag_box.removeChild(document.getElementsByClassName("tag_answer")[i]);
            }
        }
    }
    if (subject_array.length === 1) {
        if (typeof level_array[0] !== "undefined") { /* level */
            tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[level_array[0]]}</tag>
            `);
        } else {
            for (let i = 0; i < document.getElementsByClassName("tag_level").length; i++) {
                tag_box.removeChild(document.getElementsByClassName("tag_level")[i]);
            }
        }
        if (typeof subject_array[0] !== "undefined") { /* subject */
            for (let i = 0; i < subject_array.length; i++) {
                tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${subject[subject_array[i]]}</tag>
            `);
            }
        } else {
            for (let i = 0; i < document.getElementsByClassName("tag_subject").length; i++) {
                tag_box.removeChild(document.getElementsByClassName("tag_subject")[i]);
            }
        }
        if (typeof answer_array[0] !== "undefined") { /* answer */
            tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_answer">#${answer[answer_array[0]]}</tag>
            `);
        } else {
            for (let i = 0; i < document.getElementsByClassName("tag_answer").length; i++) {
                tag_box.removeChild(document.getElementsByClassName("tag_answer")[i]);
            }
        }
    }
    if (subject_array.length === 2) {
        if (typeof level_array[0] !== "undefined") { /* level */
            tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[level_array[0]]}</tag>
            `);
        } else {
            for (let i = 0; i < document.getElementsByClassName("tag_level").length; i++) {
                tag_box.removeChild(document.getElementsByClassName("tag_level")[i]);
            }
        }
        if (typeof subject_array[0] !== "undefined") { /* subject */
            for (let i = 0; i < subject_array.length; i++) {
                tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${subject[subject_array[i]]}</tag>
            `);
            }
        } else {
            for (let i = 0; i < document.getElementsByClassName("tag_subject").length; i++) {
                tag_box.removeChild(document.getElementsByClassName("tag_subject")[i]);
            }
        }
        if (typeof answer_array[0] !== "undefined") { /* answer */
            tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_answer">#${answer[answer_array[0]]}</tag>
            `);
        } else {
            for (let i = 0; i < document.getElementsByClassName("tag_answer").length; i++) {
                tag_box.removeChild(document.getElementsByClassName("tag_answer")[i]);
            }
        }
    }
    if (subject_array.length === 3) {
        if (typeof level_array[0] !== "undefined") { /* level */
            tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_level">#${level[level_array[0]]}</tag>
            `);
        } else {
            for (let i = 0; i < document.getElementsByClassName("tag_level").length; i++) {
                tag_box.removeChild(document.getElementsByClassName("tag_level")[i]);
            }
        }
        if (typeof subject_array[0] !== "undefined") { /* subject */
            for (let i = 0; i < subject_array.length; i++) {
                tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_subject">#${subject[subject_array[i]]}</tag>
            `);
            }
        } else {
            for (let i = 0; i < document.getElementsByClassName("tag_subject").length; i++) {
                tag_box.removeChild(document.getElementsByClassName("tag_subject")[i]);
            }
        }
        if (level_array.length === 0) {
            if (typeof answer_array[0] !== "undefined") { /* answer */
                tag_box.querySelector(".tags").insertAdjacentHTML("beforeend", `
                            <tag class="tag_answer">#${answer[answer_array[0]]}</tag>
            `);
            } else {
                for (let i = 0; i < document.getElementsByClassName("tag_answer").length; i++) {
                    tag_box.removeChild(document.getElementsByClassName("tag_answer")[i]);
                }
            }
        } else {
            if (typeof answer_array[0] !== "undefined") { /* answer */
                tag_box.insertAdjacentHTML("beforeend", `
                        <div class="tags after">
                            <tag class="tag_answer">#${answer[answer_array[0]]}</tag>
                        </div>
            `);
            } else {
                for (let i = 0; i < document.getElementsByClassName("tag_answer").length; i++) {
                    tag_box.removeChild(document.getElementsByClassName("after"));
                }
            }
        }
    }
}

function display_upload_button() {
    const file_name = document.getElementById("file-name").value;
    const level = document.querySelectorAll('[name="level"]:checked');
    let subject = [];
    const subject_normal = document.querySelectorAll('[name="subject"]:checked');
    const subject_science = document.querySelectorAll('[name="subject-science"]:checked');
    const subject_society = document.querySelectorAll('[name="subject-society"]:checked');
    const have_answer_detect_list = document.querySelectorAll('[name="have_answer_detect"]:checked');
    const in_topic_detect = document.querySelectorAll('[name="in_topic_detect"]:checked');
    const upload_button = document.querySelector(".upload_button");
    if (subject_normal.length === 0 && subject_science.length === 0 && subject_society.length === 0) {
        subject.push(false);
    } else {
        subject.push(true);
    }
    if (file_name !== "" && level.length !== 0 && subject[0] !== false && have_answer_detect_list.length !== 0) {
        if (have_answer_detect_list[0].value === "%yes") {
            if (in_topic_detect.length !== 1) {
                upload_button.style.display = "none";
                upload_button.style.disabled = true;
                return false;
            } else {
                if (in_topic_detect[0].id === "in-topic") {
                    upload_button.style.display = "flex";
                    upload_button.style.disabled = false;
                    return true;
                } else {
                    if (answer_file === undefined) {
                        upload_button.style.display = "none";
                        upload_button.style.disabled = true;
                        return false;
                    } else {
                        upload_button.style.display = "flex";
                        upload_button.style.disabled = false;
                        return true;
                    }
                }
            }
        } else {
            upload_button.style.display = "flex";
            upload_button.style.disabled = false;
            return true;
        }
    } else {
        upload_button.style.display = "none";
        upload_button.style.disabled = true;
        return false;
    }
}

function ProcessFileData() {
    const data_file_name = document.getElementById("file-name").value;
    const level = document.querySelectorAll('[name="level"]:checked')[0].value;
    let subject = [];
    const subject_normal = document.querySelectorAll('[name="subject"]:checked');
    const subject_science = document.querySelectorAll('[name="subject-science"]:checked');
    const subject_society = document.querySelectorAll('[name="subject-society"]:checked');
    const answer_or_not = document.querySelectorAll('[name="have_answer_detect"]:checked')[0].value;
    const in_topic_detect = document.querySelectorAll('[name="in_topic_detect"]:checked');
    if (display_upload_button() === false) {
        alert("請確實填完資料!")
        return false;
    }
    if (file_name(document.getElementById("file-name")) === false) {
        alert("檔案名稱不可有特殊字元!")
        return false;
    }
    if (subject_normal.length !== 0) {
        for (let i = 0; i < subject_normal.length; i++) {
            subject.push(subject_normal[i].value);
        }
    } else {
        if (subject_science.length > 0) {
            for (let i = 0; i < subject_science.length; i++) {
                subject.push(subject_science[i].value);
            }
        }
        if (subject_society.length > 0) {
            for (let i = 0; i < subject_society.length; i++) {
                subject.push(subject_society[i].value);
            }
        }
    }
    if (answer_or_not === "%yes") {
        if (in_topic_detect[0].id === "in-topic") {
            post_file_api(file, data_file_name, level, subject, answer_or_not, "in_topic", 0);
            return false;
        } else {
            post_file_api(file, data_file_name, level, subject, answer_or_not, "not_in_topic", answer_file);
            return false;
        }
    } else {
        post_file_api(file, data_file_name, level, subject, answer_or_not, 0, 0);
        return false;
    }
}

function post_file_api(file, data_file_name, level, subject, answer_or_not, where, answer_file) {
    if (display_upload_button() === false) {
        alert("請確實填完資料!")
        return false;
    }
    if (file_name(document.getElementById("file-name")) === false) {
        alert("檔案名稱不可有特殊字元!")
        return false;
    }
    let formData = new FormData();
    formData.append("data_file", file, encodeURIComponent(data_file_name));
    formData.append("level", level);
    formData.append("subject", subject);
    formData.append("is_there_answer", answer_or_not);
    formData.append("where_answer", where);
    if (getCookie("uuid") === "") {
        formData.append("user", 0);
    } else {
        formData.append("user", getCookie("uuid"));
    }
    if (where === "not_in_topic") {
        formData.append("answer_file", answer_file, _answer_ID());
    }
    const display_file_name = [];
    if (data_file_name.length > 16) {
        display_file_name.push(data_file_name.substring(0, 14) + "..");
    } else {
        display_file_name.push(data_file_name);
    }
    const display_file_type = [];
    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        display_file_type.push("application/docx");
    }
    if (file.type === "application/msword") {
        display_file_type.push("application/doc");
    }
    if (file.type === "application/pdf") {
        display_file_type.push("application/pdf");
    }
    document.querySelector("tpc-app").innerHTML = `
        <div id="head" class="tpc-app">
        <div id="masthead-container" class="tpc-app">
            <tpc-masthead-container id="masthead" class="masthead-end" role="banner">
                <div id="ticker" class="tpc-masthead"></div>
                <div id="interstitial" class="tpc-masthead"></div>
                <div id="container" class="tpc-masthead">
                    <div id="start" class="tpc-masthead">
                        <tpc-logo id="main-logo" class="tpc-masthead">
                            <a id="logo" class="tpc-simple-endpoint tpc-logo" href="/" title="Topic首頁">
                                <div class="tpc-logo">
                                    <logo class="tpc-logo">
                                        <tpc-icon id="logo-icon" class="logo">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"
                                                 viewBox="200 300 500 500"
                                                 style="pointer-events: none; display: block;">
                                                <defs>
                                                    <style bx:fonts="Hammersmith One">@import url(https://fonts.googleapis.com/css2?family=Hammersmith+One%3Aital%2Cwght%400%2C400&amp;display=swap);</style>
                                                </defs>
                                                <path d="M 367.115 503.402 H 517.641 L 517.641 503.402 L 540.641 527.717 L 517.641 552.031 L 517.641 552.031 H 367.115 V 503.402 Z"
                                                      style="paint-order: stroke; stroke: rgb(40, 57, 86); fill: rgb(45, 66, 99);"
                                                      transform="matrix(0.999988, -0.004975, 0.004975, 0.999988, -6.614995, -93.706261)"
                                                      bx:shape="arrow 367.115 503.402 173.526 48.629 48.629 23 0 1@a26b9fd0"/>
                                                <path d="M 232.719 503.403 H 320.719 L 320.719 503.217 L 342.719 527.717 L 320.719 552.217 L 320.719 552.032 H 232.719 V 503.403 Z"
                                                      style="fill: rgb(236, 219, 186); stroke: rgb(236, 219, 186);"
                                                      transform="matrix(0.999988, -0.004975, 0.004975, 0.999988, 127.780304, -31.606264)"
                                                      bx:shape="arrow 232.719 503.217 110 49 48.629 22 0 1@b6a82ded"/>
                                                <path d="M 367.115 503.402 H 517.641 L 517.641 503.402 L 540.641 527.717 L 517.641 552.031 L 517.641 552.031 H 367.115 V 503.402 Z"
                                                      style="fill: rgb(200, 75, 49); stroke: rgb(200, 75, 49);"
                                                      transform="matrix(0.999988, -0.004975, 0.004975, 0.999988, -6.614995, 32.293743)"
                                                      bx:shape="arrow 367.115 503.402 173.526 48.629 48.629 23 0 1@a26b9fd0"/>
                                                <text style="fill: rgb(236, 219, 186); font-family: Hammersmith One,serif; font-size: 30px; line-height: 47px; stroke-width: 1px; white-space: pre;"
                                                      transform="matrix(2.716212, 0, 0, 2.802222, -635.460999, -1091.445435)"
                                                      x="360.209" y="629.185">TOPIC
                                                </text>
                                            </svg>
                                        </tpc-icon>
                                    </logo>
                                </div>
                            </a>
                        </tpc-logo>
                    </div>
                </div>
            </tpc-masthead-container>
        </div>
    </div>
    <loading>
        <h1>上傳中
            <div class="dots"><span class="dot z"></span><span class="dot f"></span><span class="dot s"></span><span
                    class="dot t"><span class="dot l"></span></span></div>
        </h1>
        <p>---檔案資訊---</p>
        <text>名稱:<span>${display_file_name[0]}</span></text>
        <text>大小:<span>${roundToTwo((file.size / 1024) / 1024)}</span>MB</text>
        <text>類型:<span>${display_file_type[0]}</span></text>
    </loading>
    `
    animate(document.querySelector(".dots"), "dots--animate");
    fetch("/api/2TgqMmIX3d0q", {
        method: "POST",
        body: formData,
    })
        .then((res) => {
            if (res.status === 200) {
                document.querySelector("tpc-app").innerHTML = `
        <div id="head" class="tpc-app">
        <div id="masthead-container" class="tpc-app">
            <tpc-masthead-container id="masthead" class="masthead-end" role="banner">
                <div id="ticker" class="tpc-masthead"></div>
                <div id="interstitial" class="tpc-masthead"></div>
                <div id="container" class="tpc-masthead">
                    <div id="start" class="tpc-masthead">
                        <tpc-logo id="main-logo" class="tpc-masthead">
                            <a id="logo" class="tpc-simple-endpoint tpc-logo" href="/" title="Topic首頁">
                                <div class="tpc-logo">
                                    <logo class="tpc-logo">
                                        <tpc-icon id="logo-icon" class="logo">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"
                                                 viewBox="200 300 500 500"
                                                 style="pointer-events: none; display: block;">
                                                <defs>
                                                    <style bx:fonts="Hammersmith One">@import url(https://fonts.googleapis.com/css2?family=Hammersmith+One%3Aital%2Cwght%400%2C400&amp;display=swap);</style>
                                                </defs>
                                                <path d="M 367.115 503.402 H 517.641 L 517.641 503.402 L 540.641 527.717 L 517.641 552.031 L 517.641 552.031 H 367.115 V 503.402 Z"
                                                      style="paint-order: stroke; stroke: rgb(40, 57, 86); fill: rgb(45, 66, 99);"
                                                      transform="matrix(0.999988, -0.004975, 0.004975, 0.999988, -6.614995, -93.706261)"
                                                      bx:shape="arrow 367.115 503.402 173.526 48.629 48.629 23 0 1@a26b9fd0"/>
                                                <path d="M 232.719 503.403 H 320.719 L 320.719 503.217 L 342.719 527.717 L 320.719 552.217 L 320.719 552.032 H 232.719 V 503.403 Z"
                                                      style="fill: rgb(236, 219, 186); stroke: rgb(236, 219, 186);"
                                                      transform="matrix(0.999988, -0.004975, 0.004975, 0.999988, 127.780304, -31.606264)"
                                                      bx:shape="arrow 232.719 503.217 110 49 48.629 22 0 1@b6a82ded"/>
                                                <path d="M 367.115 503.402 H 517.641 L 517.641 503.402 L 540.641 527.717 L 517.641 552.031 L 517.641 552.031 H 367.115 V 503.402 Z"
                                                      style="fill: rgb(200, 75, 49); stroke: rgb(200, 75, 49);"
                                                      transform="matrix(0.999988, -0.004975, 0.004975, 0.999988, -6.614995, 32.293743)"
                                                      bx:shape="arrow 367.115 503.402 173.526 48.629 48.629 23 0 1@a26b9fd0"/>
                                                <text style="fill: rgb(236, 219, 186); font-family: Hammersmith One,serif; font-size: 30px; line-height: 47px; stroke-width: 1px; white-space: pre;"
                                                      transform="matrix(2.716212, 0, 0, 2.802222, -635.460999, -1091.445435)"
                                                      x="360.209" y="629.185">TOPIC
                                                </text>
                                            </svg>
                                        </tpc-icon>
                                    </logo>
                                </div>
                            </a>
                        </tpc-logo>
                    </div>
                </div>
            </tpc-masthead-container>
        </div>
    </div>
    <div class="success-checkmark">
        <div class="check-icon">
            <span class="icon-line line-tip"></span>
            <span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
        </div>
    </div>
    <success_upload>上傳成功!</success_upload>
    <back_home>5秒後將自動回首頁</back_home>
    `;
                for (let i = 0; i < 5; i++) {
                    setTimeout(function () {
                        document.querySelector("back_home").textContent = `${4 - i}秒後將自動回首頁`;
                    }, (i * 1000) + 1000);
                }
                setTimeout(function () {
                    window.location.replace('/');
                }, 5000);
            }
            if (res.status === 429) {
                location.href = "/404";
            }
        })
}

/* Main */
screen_width();
dragarea_button.onclick = () => {
    dragarea_input.click();
};
dragarea_input.addEventListener("change", function () {
    if ((this.files[0].size / 1024) / 1024 > 6) {
        alert("太大了 不能超過6MB");
        delete_file();
    } else {
        file = this.files[0];
        dragarea.classList.remove("active");
        dragarea.classList.add("uploaded");
        if (file.type === "application/pdf") {
            dragarea_icon.className = pdf_file;
        }
        if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "application/msword") {
            dragarea_icon.className = word_file;
        }
        if (file.name.length > 14) {
            dragarea_hearder.textContent = file.name.substring(0, 12) + "..";
        } else {
            dragarea_hearder.textContent = file.name;
        }
        dragarea_text.textContent = "點擊下一步以繼續上傳";
        if (!!document.querySelector(".drag-area-down") === false) {
            dragarea.insertAdjacentHTML("afterend", `<div class="drag-area-down">
            <i class="fa-solid fa-x got delete" title="移除當前檔案" onclick="delete_file()">移除檔案</i>
            <i class="fa-solid fa-angles-right got next" title="下一步" onclick="next_step()">下一步</i>
        </div>`);
        }
    }
});
dragarea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragarea.classList.add("active");
    dragarea_hearder.textContent = "放開滑鼠以上傳";
});
dragarea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dragarea.classList.remove("active");
    dragarea_hearder.textContent = "將你要上傳的檔案拖曳到這裡";
});
dragarea.addEventListener("drop", (e) => {
    e.preventDefault();
    if ((e.dataTransfer.files[0].size / 1024) / 1024 > 6) {
        alert("太大了 不能超過6MB");
        delete_file();
    } else {
        file = e.dataTransfer.files[0];
        dragarea.classList.remove("active");
        if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "application/msword") {
            dragarea.classList.add("uploaded");
            if (file.type === "application/pdf") {
                dragarea_icon.className = pdf_file;
            }
            if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "application/msword") {
                dragarea_icon.className = word_file;
            }
            if (file.name.length > 14) {
                dragarea_hearder.textContent = file.name.substring(0, 12) + "..";
            } else {
                dragarea_hearder.textContent = file.name;
            }
            dragarea_text.textContent = "點擊下一步以繼續上傳";
            if (!!document.querySelector(".drag-area-down") === false) {
                dragarea.insertAdjacentHTML("afterend", `<div class="drag-area-down">
            <i class="fa-solid fa-x got delete" title="移除當前檔案" onclick="delete_file()">移除檔案</i>
            <i class="fa-solid fa-angles-right got next" title="下一步" onclick="next_step()">下一步</i>
        </div>`);
            }
        } else {
            delete_file();
        }
    }
});

