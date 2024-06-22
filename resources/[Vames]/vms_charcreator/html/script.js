let translation = {};

let currentValue = {
    clotheset: {min: 0, value: -1, max: 0}
}
let items = {}
let clotheSets = {}
let skinManager = null
let handsUpKey = null
let disabledValues = {}
let direction = "left"
let gender = null
let peds = {}

window.addEventListener("load", function() {
    $.post(`https://${GetParentResourceName()}/loaded`)
})

window.addEventListener('message', function(event){
    var item = event.data;
    if (item.action == "loaded") {
        let lang = item.lang;
        $.ajax({
            url: '../config/translation.json',
            type: 'GET',
            dataType: 'json',
            success: function (code, statut) {
                if (!code[lang]) {
                    translation = code["EN"];
                    console.warning(`^7Selected language ^1"${lang}"^7 not found, changed to ^2"EN"^7, configure your language in translation.json.`);
                } else {
                    translation = code[lang];
                }

                $('#headerName').text(translation.description_create_character);
                $('#height-text').text(translation.height);
                $('#rotate-text').text(translation.rotate);
                $('#distance-text').text(translation.distance);
                $('#save').text(translation.save_btn);
                $('#cancel').text(translation.cancel_btn);
            }
        });
    }
    
    if (item.action == "openCharacter") {
        $('.categories').empty()
        $("body").fadeIn(100)
        $('.panel').empty()

        $('#headerCategory').text(translation.title_select_category);

        if (item.clotheSets) {
            clotheSets = item.clotheSets
        }
        
        if (item.peds) {
            peds = item.peds
        }

        if (item.items) {
            items = item.items
        }

        skinManager = item.skinmanager
        disabledValues = item.disabledValues
        gender = item.gender

        handsUpKey = item.handsUpKey
        $('.hands-up').hide()
        if (item.enableHandsUpButton) {
            $('.hands-up').show()
        }

        $('.cancel-skin').hide()
        if (item.enableCancelButtonUI && item.playerHasAlreadySkin) {
            $('.cancel-skin').show()
        }

        if (item.categories) {
            if (item.categories['parents']) {
                $('.categories').append(`
                    <div class="parents categoryBtn" data-type="parents">
                        <img class="itemIcon" width="55" height="55" src="icons/parents.svg">
                    </div>
                `)
            }
            if (item.categories['face']) {
                $('.categories').append(`
                    <div class="face categoryBtn" data-type="face">
                        <img class="itemIcon" width="55" height="55" src="icons/face.svg">
                    </div>
                `)
            }
            if (item.categories['clothes']) {
                $('.categories').append(`
                    <div class="clothes categoryBtn" data-type="clothes">
                        <img class="itemIcon" width="55" height="55" src="icons/clothes.svg">
                    </div>
                `)
            }
            if (item.categories['clothesets']) {
                $('.categories').append(`
                    <div class="clothesets categoryBtn" data-type="clothesets">
                        <img class="itemIcon" width="55" height="55" src="icons/clothesets.svg">
                    </div>
                `)
            }
            if (item.categories['hairs']) {
                $('.categories').append(`
                    <div class="hairs categoryBtn" data-type="hairs">
                        <img class="itemIcon" width="55" height="55" src="icons/hairs.svg">
                    </div>
                `)
            }
            if (item.categories['makeup']) {
                $('.categories').append(`
                    <div class="makeup categoryBtn" data-type="makeup">
                        <img class="itemIcon" width="55" height="55" src="icons/makeup.svg">
                    </div>
                `)
            }
        }
        for (const [key, value] of Object.entries(item.data)) {
            currentValue[key] = {
                value: value.value,
                min: value.min,
                max: value.max,
                excluded: []
            }
        }
        for (const [k, v] of Object.entries(currentValue)) {
            if (disabledValues[gender][k]) {
                for (const [_k, _v] of Object.entries(disabledValues[gender][k])) {
                    v.excluded.push(_v)
                }
            }
        }
    }
    if (item.action == 'updateSecondValue') {
        document.getElementById(`${item.secondItem}-range`).max = item.secondValue
        document.getElementById(`${item.secondItem}-range`).value = 0
        $(`#${item.secondItem}-value`).html(0)
        $(`#${item.secondItem}-max`).html(item.secondValue)
    }
});

$(document).on('click', '.accept-skin', function(e){
    $.post(`https://${GetParentResourceName()}/closeCharacter`);
    $("body").css("display", "none")
})

$(document).on('click', '.cancel-skin', function(e) {
    $.post(`https://${GetParentResourceName()}/cancel`);
    $("body").css("display", "none")
})

$(document).on('click', '.hands-up', function(e) {
    $.post(`https://${GetParentResourceName()}/hands_up`);
})

$(document).on('click', '.categoryBtn', function(e){
    $('.panel').empty()
    $('#headerCategory').html(translation.categories[$(this).data("type")])
    changeCamera($(this).data("type"))
    var values = ``
    switch ($(this).data("type")) {
        case "parents":
            if (items['parents'].sex) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.sex.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <p class="item-subname">${translation.sex.sub_sex}</p>
                                    <div class="item-suboptions">
                                        <div class="item-suboptions">
                                            ${config.useArrows && `<button onclick="changeArrow('sex', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                            <input type="range" min="${currentValue['sex'].min}" max="${currentValue['sex'].max}" value="${currentValue['sex'].value}" class="input-value-radius" id="sex-range" oninput="changeRange('sex')">
                                            ${config.useArrows && `<button onclick="changeArrow('sex', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['parents'].peds && skinManager != 'esx_skin') {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.peds.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <p class="item-subname">${translation.peds.sub_peds}</p>
                                    <div class="item-suboptions">
                                        <div class="item-suboptions">
                                            ${config.useArrows && `<button onclick="changeArrow('ped', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                            <input type="range" min="0" max="${Object.keys(peds).length}" value="0" class="input-value-radius" id="ped-range" oninput="changeRange('ped')">
                                            ${config.useArrows && `<button onclick="changeArrow('ped', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['parents'].parents) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.parents.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div style="background-image: url('./parents/mom-${currentValue['mom'].value}.png')" id="mom-photo"></div>
                                    <p class="item-subname">${translation.parents.sub_mom}</p>
                                    <div class="item-suboptions">
                                        <div class="item-suboptions-values left-arrow" onclick="previous('mom')">
                                            <i class="fa-solid fa-caret-left"></i>
                                        </div>
                                        <div class="item-suboptions-values">
                                            <p class="item-label" id="mom-label">${translation.parents_names.mom[currentValue['mom'].value]}</p>
                                        </div>
                                        <div class="item-suboptions-values right-arrow" onclick="next('mom')">
                                            <i class="fa-solid fa-caret-right"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div style="background-image: url('./parents/dad-${currentValue['dad'].value}.png')" id="dad-photo"></div>
                                    <p class="item-subname">${translation.parents.sub_dad}</p>
                                    <div class="item-suboptions">
                                        <div class="item-suboptions-values left-arrow" onclick="previous('dad')">
                                            <i class="fa-solid fa-caret-left"></i>
                                        </div>
                                        <div class="item-suboptions-values">
                                            <p class="item-label" id="dad-label">${translation.parents_names.dad[currentValue['dad'].value]}</p>
                                        </div>
                                        <div class="item-suboptions-values right-arrow" onclick="next('dad')">
                                            <i class="fa-solid fa-caret-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `  
            }
            if (items['parents'].face_md_weight) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.face_md_weight.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <p class="item-subname">${translation.face_md_weight.sub_face_md_weight}</p>
                                    <div class="item-suboptions">
                                        <div class="item-suboptions">
                                            ${config.useArrows && `<button onclick="changeArrow('face_md_weight', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                            <input type="range" min="${currentValue['face_md_weight'].min}" max="${currentValue['face_md_weight'].max}" value="${currentValue['face_md_weight'].value}" class="input-value-radius" id="face_md_weight-range" oninput="changeRange('face_md_weight')">
                                            ${config.useArrows && `<button onclick="changeArrow('face_md_weight', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `  
            }
            if (items['parents'].skin_md_weight) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.skin_md_weight.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <p class="item-subname">${translation.skin_md_weight.sub_skin_md_weight}</p>
                                    <div class="item-suboptions">
                                        <div class="item-suboptions">
                                            ${config.useArrows && `<button onclick="changeArrow('skin_md_weight', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                            <input type="range" min="${currentValue['skin_md_weight'].min}" max="${currentValue['skin_md_weight'].max}" value="${currentValue['skin_md_weight'].value}" class="input-value-radius" id="skin_md_weight-range" oninput="changeRange('skin_md_weight')">
                                            ${config.useArrows && `<button onclick="changeArrow('skin_md_weight', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `  
            }
            $('.panel').html(values)
            break;
        case "face":
            if (items['face'].neck_thickness) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.neck_thickness.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.neck_thickness.sub_neck_thickness}</p>
                                        <input type="number" class="item-value" id="neck_thickness-value" value="${currentValue['neck_thickness'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('neck_thickness', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['neck_thickness'].min}" max="${currentValue['neck_thickness'].max}" value="${currentValue['neck_thickness'].value}" class="input-value-radius" id="neck_thickness-range" oninput="changeRange('neck_thickness')">
                                        ${config.useArrows && `<button onclick="changeArrow('neck_thickness', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['face'].age) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.ageing.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.ageing.sub_age_1}</p>
                                        <input type="number" class="item-value" id="age_1-value" value="${currentValue['age_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('age_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['age_1'].min}" max="${currentValue['age_1'].max}" value="${currentValue['age_1'].value}" class="input-value-radius" id="age_1-range" oninput="changeRange('age_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('age_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option" ${skinManager == 'qb-clothing' && `style="display:none"`}>
                                    <div class="item-values">
                                        <p class="item-subname">${translation.ageing.sub_age_2}</p>
                                        <input type="number" class="item-value" id="age_2-value" value="${currentValue['age_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('age_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['age_2'].min}" max="${currentValue['age_2'].max}" value="${currentValue['age_2'].value}" class="input-value-radius" id="age_2-range" oninput="changeRange('age_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('age_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `  
            }
            if (items['face'].eyebrows) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.eyebrow.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.eyebrow.sub_eyebrows_5}</p>
                                        <input type="number" class="item-value" id="eyebrows_5-value" value="${currentValue['eyebrows_5'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('eyebrows_5', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['eyebrows_5'].min}" max="${currentValue['eyebrows_5'].max}" value="${currentValue['eyebrows_5'].value}" class="input-value-radius" id="eyebrows_5-range" oninput="changeRange('eyebrows_5')">
                                        ${config.useArrows && `<button onclick="changeArrow('eyebrows_5', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.eyebrow.sub_eyebrows_6}</p>
                                        <input type="number" class="item-value" id="eyebrows_6-value" value="${currentValue['eyebrows_6'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('eyebrows_6', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['eyebrows_6'].min}" max="${currentValue['eyebrows_6'].max}" value="${currentValue['eyebrows_6'].value}" class="input-value-radius" id="eyebrows_6-range" oninput="changeRange('eyebrows_6')">
                                        ${config.useArrows && `<button onclick="changeArrow('eyebrows_6', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `  
            }
            if (items['face'].nose) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.nose.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.nose.sub_nose_1}</p>
                                        <input type="number" class="item-value" id="nose_1-value" value="${currentValue['nose_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['nose_1'].min}" max="${currentValue['nose_1'].max}" value="${currentValue['nose_1'].value}" class="input-value-radius" id="nose_1-range" oninput="changeRange('nose_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.nose.sub_nose_2}</p>
                                        <input type="number" class="item-value" id="nose_2-value" value="${currentValue['nose_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['nose_2'].min}" max="${currentValue['nose_2'].max}" value="${currentValue['nose_2'].value}" class="input-value-radius" id="nose_2-range" oninput="changeRange('nose_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.nose.sub_nose_3}</p>
                                        <input type="number" class="item-value" id="nose_3-value" value="${currentValue['nose_3'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_3', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['nose_3'].min}" max="${currentValue['nose_3'].max}" value="${currentValue['nose_3'].value}" class="input-value-radius" id="nose_3-range" oninput="changeRange('nose_3')">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_3', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.nose.sub_nose_4}</p>
                                        <input type="number" class="item-value" id="nose_4-value" value="${currentValue['nose_4'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_4', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['nose_4'].min}" max="${currentValue['nose_4'].max}" value="${currentValue['nose_4'].value}" class="input-value-radius" id="nose_4-range" oninput="changeRange('nose_4')">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_4', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.nose.sub_nose_5}</p>
                                        <input type="number" class="item-value" id="nose_5-value" value="${currentValue['nose_5'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_5', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['nose_5'].min}" max="${currentValue['nose_5'].max}" value="${currentValue['nose_5'].value}" class="input-value-radius" id="nose_5-range" oninput="changeRange('nose_5')">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_5', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.nose.sub_nose_6}</p>
                                        <input type="number" class="item-value" id="nose_6-value" value="${currentValue['nose_6'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_6', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['nose_6'].min}" max="${currentValue['nose_6'].max}" value="${currentValue['nose_6'].value}" class="input-value-radius" id="nose_6-range" oninput="changeRange('nose_6')">
                                        ${config.useArrows && `<button onclick="changeArrow('nose_6', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `  
            }
            if (items['face'].cheeks) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.cheekbones.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.cheekbones.sub_cheeks_1}</p>
                                        <input type="number" class="item-value" id="cheeks_1-value" value="${currentValue['cheeks_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('cheeks_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['cheeks_1'].min}" max="${currentValue['cheeks_1'].max}" value="${currentValue['cheeks_1'].value}" class="input-value-radius" id="cheeks_1-range" oninput="changeRange('cheeks_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('cheeks_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.cheekbones.sub_cheeks_2}</p>
                                        <input type="number" class="item-value" id="cheeks_2-value" value="${currentValue['cheeks_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('cheeks_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['cheeks_2'].min}" max="${currentValue['cheeks_2'].max}" value="${currentValue['cheeks_2'].value}" class="input-value-radius" id="cheeks_2-range" oninput="changeRange('cheeks_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('cheeks_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.cheekbones.sub_cheeks_3}</p>
                                        <input type="number" class="item-value" id="cheeks_3-value" value="${currentValue['cheeks_3'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('cheeks_3', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['cheeks_3'].min}" max="${currentValue['cheeks_3'].max}" value="${currentValue['cheeks_3'].value}" class="input-value-radius" id="cheeks_3-range" oninput="changeRange('cheeks_3')">
                                        ${config.useArrows && `<button onclick="changeArrow('cheeks_3', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `  
            }
            if (items['face'].lip_thickness) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.lips.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.lips.sub_lip_thickness}</p>
                                        <input type="number" class="item-value" id="lip_thickness-value" value="${currentValue['lip_thickness'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('lip_thickness', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['lip_thickness'].min}" max="${currentValue['lip_thickness'].max}" value="${currentValue['lip_thickness'].value}" class="input-value-radius" id="lip_thickness-range" oninput="changeRange('lip_thickness')">
                                        ${config.useArrows && `<button onclick="changeArrow('lip_thickness', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `  
            }
            if (items['face'].jaw) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.jaw.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.jaw.sub_jaw_1}</p>
                                        <input type="number" class="item-value" id="jaw_1-value" value="${currentValue['jaw_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('jaw_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['jaw_1'].min}" max="${currentValue['jaw_1'].max}" value="${currentValue['jaw_1'].value}" class="input-value-radius" id="jaw_1-range" oninput="changeRange('jaw_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('jaw_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.jaw.sub_jaw_2}</p>
                                        <input type="number" class="item-value" id="jaw_2-value" value="${currentValue['jaw_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('jaw_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['jaw_2'].min}" max="${currentValue['jaw_2'].max}" value="${currentValue['jaw_2'].value}" class="input-value-radius" id="jaw_2-range" oninput="changeRange('jaw_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('jaw_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `  
            }
            if (items['face'].chin) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.chin.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.chin.sub_chin_1}</p>
                                        <input type="number" class="item-value" id="chin_1-value" value="${currentValue['chin_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('chin_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['chin_1'].min}" max="${currentValue['chin_1'].max}" value="${currentValue['chin_1'].value}" class="input-value-radius" id="chin_1-range" oninput="changeRange('chin_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('chin_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.chin.sub_chin_2}</p>
                                        <input type="number" class="item-value" id="chin_2-value" value="${currentValue['chin_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('chin_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['chin_2'].min}" max="${currentValue['chin_2'].max}" value="${currentValue['chin_2'].value}" class="input-value-radius" id="chin_2-range" oninput="changeRange('chin_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('chin_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.chin.sub_chin_3}</p>
                                        <input type="number" class="item-value" id="chin_3-value" value="${currentValue['chin_3'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('chin_3', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['chin_3'].min}" max="${currentValue['chin_3'].max}" value="${currentValue['chin_3'].value}" class="input-value-radius" id="chin_3-range" oninput="changeRange('chin_3')">
                                        ${config.useArrows && `<button onclick="changeArrow('chin_3', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.chin.sub_chin_4}</p>
                                        <input type="number" class="item-value" id="chin_4-value" value="${currentValue['chin_4'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('chin_4', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['chin_4'].min}" max="${currentValue['chin_4'].max}" value="${currentValue['chin_4'].value}" class="input-value-radius" id="chin_4-range" oninput="changeRange('chin_4')">
                                        ${config.useArrows && `<button onclick="changeArrow('chin_4', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `  
            }
            if (items['face'].eye_squint) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.eye_squint.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.eye_squint.sub_eye_squint}</p>
                                        <input type="number" class="item-value" id="eye_squint-value" value="${currentValue['eye_squint'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('eye_squint', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['eye_squint'].min}" max="${currentValue['eye_squint'].max}" value="${currentValue['eye_squint'].value}" class="input-value-radius" id="eye_squint-range" oninput="changeRange('eye_squint')">
                                        ${config.useArrows && `<button onclick="changeArrow('eye_squint', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['face'].eye_color) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.eye_color.title}</p>
                        <div class="item-bar">
                            <p class="item-subname">${translation.eye_color.sub_eye_color}</p>
                            <div class="color-selector-bar">
                                <div class="item-sub-color-selector" style="background: #675A2D;" onclick="changeColor('eye_color', 0)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #1d2e19;" onclick="changeColor('eye_color', 1)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #3e545f;" onclick="changeColor('eye_color', 2)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #1b222e;" onclick="changeColor('eye_color', 3)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #4b3730;" onclick="changeColor('eye_color', 4)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #271e1a;" onclick="changeColor('eye_color', 5)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                
                                <div class="item-sub-color-selector" style="background: #6C2F00;" onclick="changeColor('eye_color', 6)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #5f5f5f;" onclick="changeColor('eye_color', 7)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #9b9b9b;" onclick="changeColor('eye_color', 8)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #ca2498;" onclick="changeColor('eye_color', 9)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #dbce12;" onclick="changeColor('eye_color', 10)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #0e0e0e;" onclick="changeColor('eye_color', 12)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['face'].blemishes && skinManager != 'qb-clothing') {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.blemishes.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.blemishes.sub_blemishes_1}</p>
                                        <input type="number" class="item-value" id="blemishes_1-value" value="${currentValue['blemishes_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('blemishes_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['blemishes_1'].min}" max="${currentValue['blemishes_1'].max}" value="${currentValue['blemishes_1'].value}" class="input-value-radius" id="blemishes_1-range" oninput="changeRange('blemishes_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('blemishes_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option" ${skinManager == 'qb-clothing' && `style="display:none"`}>
                                    <div class="item-values">
                                        <p class="item-subname">${translation.blemishes.sub_blemishes_2}</p>
                                        <input type="number" class="item-value" id="blemishes_2-value" value="${currentValue['blemishes_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('blemishes_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['blemishes_2'].min}" max="${currentValue['blemishes_2'].max}" value="${currentValue['blemishes_2'].value}" class="input-value-radius" id="blemishes_2-range" oninput="changeRange('blemishes_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('blemishes_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['face'].complexion && skinManager != 'qb-clothing') {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.complexion.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.complexion.sub_complexion_1}</p>
                                        <input type="number" class="item-value" id="complexion_1-value" value="${currentValue['complexion_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('complexion_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['complexion_1'].min}" max="${currentValue['complexion_1'].max}" value="${currentValue['complexion_1'].value}" class="input-value-radius" id="complexion_1-range" oninput="changeRange('complexion_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('complexion_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option" ${skinManager == 'qb-clothing' && `style="display:none"`}>
                                    <div class="item-values">
                                        <p class="item-subname">${translation.complexion.sub_complexion_2}</p>
                                        <input type="number" class="item-value" id="complexion_2-value" value="${currentValue['complexion_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('complexion_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['complexion_2'].min}" max="${currentValue['complexion_2'].max}" value="${currentValue['complexion_2'].value}" class="input-value-radius" id="complexion_2-range" oninput="changeRange('complexion_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('complexion_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['face'].sun && skinManager != 'qb-clothing') {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.sun.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.sun.sub_sun_1}</p>
                                        <input type="number" class="item-value" id="sun_1-value" value="${currentValue['sun_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('sun_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['sun_1'].min}" max="${currentValue['sun_1'].max}" value="${currentValue['sun_1'].value}" class="input-value-radius" id="sun_1-range" oninput="changeRange('sun_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('sun_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option" ${skinManager == 'qb-clothing' && `style="display:none"`}>
                                    <div class="item-values">
                                        <p class="item-subname">${translation.sun.sub_sun_2}</p>
                                        <input type="number" class="item-value" id="sun_2-value" value="${currentValue['sun_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('sun_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['sun_2'].min}" max="${currentValue['sun_2'].max}" value="${currentValue['sun_2'].value}" class="input-value-radius" id="sun_2-range" oninput="changeRange('sun_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('sun_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['face'].moles) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.moles.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.moles.sub_moles_1}</p>
                                        <input type="number" class="item-value" id="moles_1-value" value="${currentValue['moles_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('moles_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['moles_1'].min}" max="${currentValue['moles_1'].max}" value="${currentValue['moles_1'].value}" class="input-value-radius" id="moles_1-range" oninput="changeRange('moles_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('moles_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.moles.sub_moles_2}</p>
                                        <input type="number" class="item-value" id="moles_2-value" value="${currentValue['moles_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('moles_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['moles_2'].min}" max="${currentValue['moles_2'].max}" value="${currentValue['moles_2'].value}" class="input-value-radius" id="moles_2-range" oninput="changeRange('moles_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('moles_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            $('.panel').html(values)
            break;
        case "clothes":
            if (items['clothes'].tshirt) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.tshirt.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.tshirt.sub_tshirt_1}</p>
                                        <input type="number" class="item-value" id="tshirt_1-value" value="${currentValue['tshirt_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('tshirt_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['tshirt_1'].min}" max="${currentValue['tshirt_1'].max}" value="${currentValue['tshirt_1'].value}" data-excluded="${currentValue['tshirt_1'].excluded}" class="input-value-radius" id="tshirt_1-range" oninput="changeRange('tshirt_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('tshirt_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.tshirt.sub_tshirt_2}</p>
                                        <input type="number" class="item-value" id="tshirt_2-value" value="${currentValue['tshirt_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('tshirt_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['tshirt_2'].min}" max="${currentValue['tshirt_2'].max}" value="${currentValue['tshirt_2'].value}" class="input-value-radius" id="tshirt_2-range" oninput="changeRange('tshirt_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('tshirt_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].torso) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.torso.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.torso.sub_torso_1}</p>
                                        <input type="number" class="item-value" id="torso_1-value" value="${currentValue['torso_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('torso_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['torso_1'].min}" max="${currentValue['torso_1'].max}" value="${currentValue['torso_1'].value}" data-excluded="${currentValue['torso_1'].excluded}" class="input-value-radius" id="torso_1-range" oninput="changeRange('torso_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('torso_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.torso.sub_torso_2}</p>
                                        <input type="number" class="item-value" id="torso_2-value" value="${currentValue['torso_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('torso_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['torso_2'].min}" max="${currentValue['torso_2'].max}" value="${currentValue['torso_2'].value}" class="input-value-radius" id="torso_2-range" oninput="changeRange('torso_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('torso_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].arms) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.arms.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.arms.sub_arms}</p>
                                        <input type="number" class="item-value" id="arms-value" value="${currentValue['arms'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('arms', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['arms'].min}" max="${currentValue['arms'].max}" value="${currentValue['arms'].value}" data-excluded="${currentValue['arms'].excluded}" class="input-value-radius" id="arms-range" oninput="changeRange('arms')">
                                        ${config.useArrows && `<button onclick="changeArrow('arms', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.arms.sub_arms_2}</p>
                                        <input type="number" class="item-value" id="arms_2-value" value="${currentValue['arms_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('arms_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['arms_2'].min}" max="${currentValue['arms_2'].max}" value="${currentValue['arms_2'].value}" class="input-value-radius" id="arms_2-range" oninput="changeRange('arms_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('arms_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].pants) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.pants.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.pants.sub_pants_1}</p>
                                        <input type="number" class="item-value" id="pants_1-value" value="${currentValue['pants_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('pants_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['pants_1'].min}" max="${currentValue['pants_1'].max}" value="${currentValue['pants_1'].value}" data-excluded="${currentValue['pants_1'].excluded}" class="input-value-radius" id="pants_1-range" oninput="changeRange('pants_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('pants_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.pants.sub_pants_2}</p>
                                        <input type="number" class="item-value" id="pants_2-value" value="${currentValue['pants_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('pants_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['pants_2'].min}" max="${currentValue['pants_2'].max}" value="${currentValue['pants_2'].value}" class="input-value-radius" id="pants_2-range" oninput="changeRange('pants_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('pants_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].shoes) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.shoes.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.shoes.sub_shoes_1}</p>
                                        <input type="number" class="item-value" id="shoes_1-value" value="${currentValue['shoes_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('shoes_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['shoes_1'].min}" max="${currentValue['shoes_1'].max}" value="${currentValue['shoes_1'].value}" data-excluded="${currentValue['shoes_1'].excluded}" class="input-value-radius" id="shoes_1-range" oninput="changeRange('shoes_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('shoes_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.shoes.sub_shoes_2}</p>
                                        <input type="number" class="item-value" id="shoes_2-value" value="${currentValue['shoes_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('shoes_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['shoes_2'].min}" max="${currentValue['shoes_2'].max}" value="${currentValue['shoes_2'].value}" class="input-value-radius" id="shoes_2-range" oninput="changeRange('shoes_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('shoes_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].decals) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.decals.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.decals.sub_decals_1}</p>
                                        <input type="number" class="item-value" id="decals_1-value" value="${currentValue['decals_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('decals_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['decals_1'].min}" max="${currentValue['decals_1'].max}" value="${currentValue['decals_1'].value}" data-excluded="${currentValue['decals_1'].excluded}" class="input-value-radius" id="decals_1-range" oninput="changeRange('decals_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('decals_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.decals.sub_decals_2}</p>
                                        <input type="number" class="item-value" id="decals_2-value" value="${currentValue['decals_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('decals_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['decals_2'].min}" max="${currentValue['decals_2'].max}" value="${currentValue['decals_2'].value}" class="input-value-radius" id="decals_2-range" oninput="changeRange('decals_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('decals_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].mask) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.mask.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.mask.sub_mask_1}</p>
                                        <input type="number" class="item-value" id="mask_1-value" value="${currentValue['mask_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('mask_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['mask_1'].min}" max="${currentValue['mask_1'].max}" value="${currentValue['mask_1'].value}" data-excluded="${currentValue['mask_1'].excluded}" class="input-value-radius" id="mask_1-range" oninput="changeRange('mask_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('mask_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.mask.sub_mask_2}</p>
                                        <input type="number" class="item-value" id="mask_2-value" value="${currentValue['mask_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('mask_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['mask_2'].min}" max="${currentValue['mask_2'].max}" value="${currentValue['mask_2'].value}" class="input-value-radius" id="mask_2-range" oninput="changeRange('mask_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('mask_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].bproof) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.bproof.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.bproof.sub_bproof_1}</p>
                                        <input type="number" class="item-value" id="bproof_1-value" value="${currentValue['bproof_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('bproof_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['bproof_1'].min}" max="${currentValue['bproof_1'].max}" value="${currentValue['bproof_1'].value}" data-excluded="${currentValue['bproof_1'].excluded}" class="input-value-radius" id="bproof_1-range" oninput="changeRange('bproof_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('bproof_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.bproof.sub_bproof_2}</p>
                                        <input type="number" class="item-value" id="bproof_2-value" value="${currentValue['bproof_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('bproof_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['bproof_2'].min}" max="${currentValue['bproof_2'].max}" value="${currentValue['bproof_2'].value}" class="input-value-radius" id="bproof_2-range" oninput="changeRange('bproof_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('bproof_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].chain) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.chain.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.chain.sub_chain_1}</p>
                                        <input type="number" class="item-value" id="chain_1-value" value="${currentValue['chain_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('chain_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['chain_1'].min}" max="${currentValue['chain_1'].max}" value="${currentValue['chain_1'].value}" data-excluded="${currentValue['chain_1'].excluded}" class="input-value-radius" id="chain_1-range" oninput="changeRange('chain_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('chain_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.chain.sub_chain_2}</p>
                                        <input type="number" class="item-value" id="chain_2-value" value="${currentValue['chain_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('chain_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['chain_2'].min}" max="${currentValue['chain_2'].max}" value="${currentValue['chain_2'].value}" class="input-value-radius" id="chain_2-range" oninput="changeRange('chain_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('chain_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].helmet) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.helmet.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.helmet.sub_helmet_1}</p>
                                        <input type="number" class="item-value" id="helmet_1-value" value="${currentValue['helmet_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('helmet_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['helmet_1'].min}" max="${currentValue['helmet_1'].max}" value="${currentValue['helmet_1'].value}" data-excluded="${currentValue['helmet_1'].excluded}" class="input-value-radius" id="helmet_1-range" oninput="changeRange('helmet_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('helmet_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.helmet.sub_helmet_2}</p>
                                        <input type="number" class="item-value" id="helmet_2-value" value="${currentValue['helmet_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('helmet_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['helmet_2'].min}" max="${currentValue['helmet_2'].max}" value="${currentValue['helmet_2'].value}" class="input-value-radius" id="helmet_2-range" oninput="changeRange('helmet_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('helmet_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].glasses) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.glasses.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.glasses.sub_glasses_1}</p>
                                        <input type="number" class="item-value" id="glasses_1-value" value="${currentValue['glasses_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('glasses_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['glasses_1'].min}" max="${currentValue['glasses_1'].max}" value="${currentValue['glasses_1'].value}" data-excluded="${currentValue['glasses_1'].excluded}" class="input-value-radius" id="glasses_1-range" oninput="changeRange('glasses_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('glasses_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.glasses.sub_glasses_2}</p>
                                        <input type="number" class="item-value" id="glasses_2-value" value="${currentValue['glasses_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('glasses_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['glasses_2'].min}" max="${currentValue['glasses_2'].max}" value="${currentValue['glasses_2'].value}" class="input-value-radius" id="glasses_2-range" oninput="changeRange('glasses_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('glasses_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].watches) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.watches.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.watches.sub_watches_1}</p>
                                        <input type="number" class="item-value" id="watches_1-value" value="${currentValue['watches_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('watches_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['watches_1'].min}" max="${currentValue['watches_1'].max}" value="${currentValue['watches_1'].value}" data-excluded="${currentValue['watches_1'].excluded}" class="input-value-radius" id="watches_1-range" oninput="changeRange('watches_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('watches_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.watches.sub_watches_2}</p>
                                        <input type="number" class="item-value" id="watches_2-value" value="${currentValue['watches_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('watches_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['watches_2'].min}" max="${currentValue['watches_2'].max}" value="${currentValue['watches_2'].value}" class="input-value-radius" id="watches_2-range" oninput="changeRange('watches_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('watches_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].bracelets) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.bracelets.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.bracelets.sub_bracelets_1}</p>
                                        <input type="number" class="item-value" id="bracelets_1-value" value="${currentValue['bracelets_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('bracelets_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['bracelets_1'].min}" max="${currentValue['bracelets_1'].max}" value="${currentValue['bracelets_1'].value}" data-excluded="${currentValue['bracelets_1'].excluded}" class="input-value-radius" id="bracelets_1-range" oninput="changeRange('bracelets_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('bracelets_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.bracelets.sub_bracelets_2}</p>
                                        <input type="number" class="item-value" id="bracelets_2-value" value="${currentValue['bracelets_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('bracelets_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['bracelets_2'].min}" max="${currentValue['bracelets_2'].max}" value="${currentValue['bracelets_2'].value}" class="input-value-radius" id="bracelets_2-range" oninput="changeRange('bracelets_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('bracelets_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].bags) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.bags.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.bags.sub_bags_1}</p>
                                        <input type="number" class="item-value" id="bags_1-value" value="${currentValue['bags_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('bags_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['bags_1'].min}" max="${currentValue['bags_1'].max}" value="${currentValue['bags_1'].value}" data-excluded="${currentValue['bags_1'].excluded}" class="input-value-radius" id="bags_1-range" oninput="changeRange('bags_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('bags_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.bags.sub_bags_2}</p>
                                        <input type="number" class="item-value" id="bags_2-value" value="${currentValue['bags_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('bags_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['bags_2'].min}" max="${currentValue['bags_2'].max}" value="${currentValue['bags_2'].value}" class="input-value-radius" id="bags_2-range" oninput="changeRange('bags_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('bags_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['clothes'].ears) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.ears.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.ears.sub_ears_1}</p>
                                        <input type="number" class="item-value" id="ears_1-value" value="${currentValue['ears_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('ears_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['ears_1'].min}" max="${currentValue['ears_1'].max}" value="${currentValue['ears_1'].value}" data-excluded="${currentValue['ears_1'].excluded}" class="input-value-radius" id="ears_1-range" oninput="changeRange('ears_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('ears_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.ears.sub_ears_2}</p>
                                        <input type="number" class="item-value" id="ears_2-value" value="${currentValue['ears_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('ears_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['ears_2'].min}" max="${currentValue['ears_2'].max}" value="${currentValue['ears_2'].value}" class="input-value-radius" id="ears_2-range" oninput="changeRange('ears_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('ears_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            $('.panel').html(values)
            break;
        case "clothesets":
            values = values + `
                <div class="item-block">
                    <p class="item-title">${translation.clothesets.title}</p>
                    <div class="item-bar">
                        <div class="second-item-bar">
                            <div class="item-option">
                                <p class="item-subname">${translation.clothesets.sub_clothesets}</p>
                                <div class="item-suboptions">
                                    <div class="item-suboptions-values left-arrow" onclick="previousClotheSets()">
                                        <i class="fa-solid fa-caret-left"></i>
                                    </div>
                                    <div class="item-suboptions-values">
                                        <p class="item-label" id="clotheset-label">${clotheSets[currentValue['clotheset'].value] && clotheSets[currentValue['clotheset'].value].name || translation.clothesets.none}</p>
                                    </div>
                                    <div class="item-suboptions-values right-arrow" onclick="nextClotheSets()">
                                        <i class="fa-solid fa-caret-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            $('.panel').html(values)
            break;
        case "hairs":
            if (items['hairs'].hair) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.hair.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.hair.sub_hair_1}</p>
                                        <input type="number" class="item-value" id="hair_1-value" value="${currentValue['hair_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('hair_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['hair_1'].min}" max="${currentValue['hair_1'].max}" value="${currentValue['hair_1'].value}" data-excluded="${currentValue['hair_1'].excluded}" class="input-value-radius" id="hair_1-range" oninput="changeRange('hair_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('hair_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option" ${skinManager == 'qb-clothing' && `style="display:none"`}>
                                    <div class="item-values">
                                        <p class="item-subname">${translation.hair.sub_hair_2}</p>
                                        <input type="number" class="item-value" id="hair_2-value" value="${currentValue['hair_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('hair_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['hair_2'].min}" max="${currentValue['hair_2'].max}" value="${currentValue['hair_2'].value}" class="input-value-radius" id="hair_2-range" oninput="changeRange('hair_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('hair_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                            <p class="item-subname">${translation.hair.sub_hair_color_1}</p>
                            <div class="color-selector-bar">
                                <div class="item-sub-color-selector" style="background: #060606;" onclick="changeColor('hair_color_1', 0)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #303230;" onclick="changeColor('hair_color_1', 2)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #1e0f0a;" onclick="changeColor('hair_color_1', 3)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #4e2a1d;" onclick="changeColor('hair_color_1', 4)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #42332d;" onclick="changeColor('hair_color_1', 58)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #EA3C11;" onclick="changeColor('hair_color_1', 18)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>

                                <div class="item-sub-color-selector" style="background: #8b6444;" onclick="changeColor('hair_color_1', 8)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #c4ab75;" onclick="changeColor('hair_color_1', 10)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #c21111;" onclick="changeColor('hair_color_1', 21)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #696969;" onclick="changeColor('hair_color_1', 27)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #a8a8a8;" onclick="changeColor('hair_color_1', 28)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #ff0178;" onclick="changeColor('hair_color_1', 34)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                
                                <div class="item-sub-color-selector" style="background: #fc9aff;" onclick="changeColor('hair_color_1', 35)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #185579;" onclick="changeColor('hair_color_1', 37)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #11288f;" onclick="changeColor('hair_color_1', 38)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #269b60;" onclick="changeColor('hair_color_1', 39)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #32ad13;" onclick="changeColor('hair_color_1', 43)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #eec614;" onclick="changeColor('hair_color_1', 46)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                            </div>
                            <p class="item-subname" ${(skinManager == 'fivem-appearance' || skinManager == 'qb-clothing') && `style="display:none"`}>${translation.hair.sub_hair_color_2}</p>
                            <div class="color-selector-bar" ${(skinManager == 'fivem-appearance' || skinManager == 'qb-clothing') && `style="display:none"`}>
                                <div class="item-sub-color-selector" style="background: #060606;" onclick="changeColor('hair_color_2', 0)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #303230;" onclick="changeColor('hair_color_2', 2)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #1e0f0a;" onclick="changeColor('hair_color_2', 3)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #4e2a1d;" onclick="changeColor('hair_color_2', 4)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #42332d;" onclick="changeColor('hair_color_2', 58)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #EA3C11;" onclick="changeColor('hair_color_2', 18)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>

                                <div class="item-sub-color-selector" style="background: #8b6444;" onclick="changeColor('hair_color_2', 8)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #c4ab75;" onclick="changeColor('hair_color_2', 10)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #c21111;" onclick="changeColor('hair_color_2', 21)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #696969;" onclick="changeColor('hair_color_2', 27)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #a8a8a8;" onclick="changeColor('hair_color_2', 28)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #ff0178;" onclick="changeColor('hair_color_2', 34)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                
                                <div class="item-sub-color-selector" style="background: #fc9aff;" onclick="changeColor('hair_color_2', 35)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #185579;" onclick="changeColor('hair_color_2', 37)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #11288f;" onclick="changeColor('hair_color_2', 38)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #269b60;" onclick="changeColor('hair_color_2', 39)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #32ad13;" onclick="changeColor('hair_color_2', 43)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #eec614;" onclick="changeColor('hair_color_2', 46)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['hairs'].beard) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.beard.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.beard.sub_beard_1}</p>
                                        <input type="number" class="item-value" id="beard_1-value" value="${currentValue['beard_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('beard_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['beard_1'].min}" max="${currentValue['beard_1'].max}" value="${currentValue['beard_1'].value}" data-excluded="${currentValue['beard_1'].excluded}" class="input-value-radius" id="beard_1-range" oninput="changeRange('beard_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('beard_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option" ${skinManager == 'qb-clothing' && `style="display:none"`}>
                                    <div class="item-values">
                                        <p class="item-subname">${translation.beard.sub_beard_2}</p>
                                        <input type="number" class="item-value" id="beard_2-value" value="${currentValue['beard_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('beard_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['beard_2'].min}" max="${currentValue['beard_2'].max}" value="${currentValue['beard_2'].value}" class="input-value-radius" id="beard_2-range" oninput="changeRange('beard_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('beard_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                            <p class="item-subname">${translation.beard.sub_beard_3}</p>
                            <div class="color-selector-bar">
                                <div class="item-sub-color-selector" style="background: #060606;" onclick="changeColor('beard_3', 0)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #303230;" onclick="changeColor('beard_3', 2)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #1e0f0a;" onclick="changeColor('beard_3', 3)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #4e2a1d;" onclick="changeColor('beard_3', 4)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #42332d;" onclick="changeColor('beard_3', 58)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #EA3C11;" onclick="changeColor('beard_3', 18)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>

                                <div class="item-sub-color-selector" style="background: #8b6444;" onclick="changeColor('beard_3', 8)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #c4ab75;" onclick="changeColor('beard_3', 10)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #c21111;" onclick="changeColor('beard_3', 21)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #696969;" onclick="changeColor('beard_3', 27)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #a8a8a8;" onclick="changeColor('beard_3', 28)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #ff0178;" onclick="changeColor('beard_3', 34)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                
                                <div class="item-sub-color-selector" style="background: #fc9aff;" onclick="changeColor('beard_3', 35)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #185579;" onclick="changeColor('beard_3', 37)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #11288f;" onclick="changeColor('beard_3', 38)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #269b60;" onclick="changeColor('beard_3', 39)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #32ad13;" onclick="changeColor('beard_3', 43)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #eec614;" onclick="changeColor('beard_3', 46)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['hairs'].eyebrow) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.eyebrow.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.eyebrow.sub_eyebrows_1}</p>
                                        <input type="number" class="item-value" id="eyebrows_1-value" value="${currentValue['eyebrows_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('eyebrows_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['eyebrows_1'].min}" max="${currentValue['eyebrows_1'].max}" value="${currentValue['eyebrows_1'].value}" data-excluded="${currentValue['eyebrows_1'].excluded}" class="input-value-radius" id="eyebrows_1-range" oninput="changeRange('eyebrows_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('eyebrows_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option" ${skinManager == 'qb-clothing' && `style="display:none"`}>
                                    <div class="item-values">
                                        <p class="item-subname">${translation.eyebrow.sub_eyebrows_2}</p>
                                        <input type="number" class="item-value" id="eyebrows_2-value" value="${currentValue['eyebrows_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('eyebrows_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['eyebrows_2'].min}" max="${currentValue['eyebrows_2'].max}" value="${currentValue['eyebrows_2'].value}" class="input-value-radius" id="eyebrows_2-range" oninput="changeRange('eyebrows_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('eyebrows_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                            <p class="item-subname">${translation.eyebrow.sub_eyebrows_3}</p>
                            <div class="color-selector-bar">
                                <div class="item-sub-color-selector" style="background: #060606;" onclick="changeColor('eyebrows_3', 0)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #303230;" onclick="changeColor('eyebrows_3', 2)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #1e0f0a;" onclick="changeColor('eyebrows_3', 3)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #4e2a1d;" onclick="changeColor('eyebrows_3', 4)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #42332d;" onclick="changeColor('eyebrows_3', 58)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #EA3C11;" onclick="changeColor('eyebrows_3', 18)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>

                                <div class="item-sub-color-selector" style="background: #8b6444;" onclick="changeColor('eyebrows_3', 8)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #c4ab75;" onclick="changeColor('eyebrows_3', 10)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #c21111;" onclick="changeColor('eyebrows_3', 21)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #696969;" onclick="changeColor('eyebrows_3', 27)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #a8a8a8;" onclick="changeColor('eyebrows_3', 28)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #ff0178;" onclick="changeColor('eyebrows_3', 34)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                
                                <div class="item-sub-color-selector" style="background: #fc9aff;" onclick="changeColor('eyebrows_3', 35)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #185579;" onclick="changeColor('eyebrows_3', 37)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #11288f;" onclick="changeColor('eyebrows_3', 38)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #269b60;" onclick="changeColor('eyebrows_3', 39)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #32ad13;" onclick="changeColor('eyebrows_3', 43)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #eec614;" onclick="changeColor('eyebrows_3', 46)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['hairs'].chesthair && skinManager != 'qb-clothing') {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.chesthair.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.chesthair.sub_chest_1}</p>
                                        <input type="number" class="item-value" id="chest_1-value" value="${currentValue['chest_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('chest_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['chest_1'].min}" max="${currentValue['chest_1'].max}" value="${currentValue['chest_1'].value}" data-excluded="${currentValue['chest_1'].excluded}" class="input-value-radius" id="chest_1-range" oninput="changeRange('chest_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('chest_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option" ${skinManager == 'qb-clothing' && `style="display:none"`}>
                                    <div class="item-values">
                                        <p class="item-subname">${translation.chesthair.sub_chest_2}</p>
                                        <input type="number" class="item-value" id="chest_2-value" value="${currentValue['chest_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('chest_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['chest_2'].min}" max="${currentValue['chest_2'].max}" value="${currentValue['chest_2'].value}" class="input-value-radius" id="chest_2-range" oninput="changeRange('chest_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('chest_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                            <p class="item-subname">${translation.chesthair.sub_chest_3}</p>
                            <div class="color-selector-bar">
                                <div class="item-sub-color-selector" style="background: #060606;" onclick="changeColor('chest_3', 0)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #303230;" onclick="changeColor('chest_3', 2)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #1e0f0a;" onclick="changeColor('chest_3', 3)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #4e2a1d;" onclick="changeColor('chest_3', 4)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #42332d;" onclick="changeColor('chest_3', 58)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #EA3C11;" onclick="changeColor('chest_3', 18)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>

                                <div class="item-sub-color-selector" style="background: #8b6444;" onclick="changeColor('chest_3', 8)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #c4ab75;" onclick="changeColor('chest_3', 10)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #c21111;" onclick="changeColor('chest_3', 21)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #696969;" onclick="changeColor('chest_3', 27)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #a8a8a8;" onclick="changeColor('chest_3', 28)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #ff0178;" onclick="changeColor('chest_3', 34)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                
                                <div class="item-sub-color-selector" style="background: #fc9aff;" onclick="changeColor('chest_3', 35)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #185579;" onclick="changeColor('chest_3', 37)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #11288f;" onclick="changeColor('chest_3', 38)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #269b60;" onclick="changeColor('chest_3', 39)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #32ad13;" onclick="changeColor('chest_3', 43)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #eec614;" onclick="changeColor('chest_3', 46)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                            </div>
                        </div>
                    </div>
                `
            }
            $('.panel').html(values)
            break;
        case "makeup":
            if (items['makeup'].makeup) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.makeup.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.makeup.sub_makeup_1}</p>
                                        <input type="number" class="item-value" id="makeup_1-value" value="${currentValue['makeup_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('makeup_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['makeup_1'].min}" max="${currentValue['makeup_1'].max}" value="${currentValue['makeup_1'].value}" data-excluded="${currentValue['makeup_1'].excluded}" class="input-value-radius" id="makeup_1-range" oninput="changeRange('makeup_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('makeup_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option" ${skinManager == 'qb-clothing' && `style="display:none"`}>
                                    <div class="item-values">
                                        <p class="item-subname">${translation.makeup.sub_makeup_2}</p>
                                        <input type="number" class="item-value" id="makeup_2-value" value="${currentValue['makeup_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('makeup_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['makeup_2'].min}" max="${currentValue['makeup_2'].max}" value="${currentValue['makeup_2'].value}" class="input-value-radius" id="makeup_2-range" oninput="changeRange('makeup_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('makeup_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                            <p class="item-subname">${translation.makeup.sub_makeup_3}</p>
                            <div class="color-selector-bar">
                                <div class="item-sub-color-selector" style="background: #341019;" onclick="changeColor('makeup_3', 0)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #6b1529;" onclick="changeColor('makeup_3', 1)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #6a1515;" onclick="changeColor('makeup_3', 23)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #68124b;" onclick="changeColor('makeup_3', 26)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #145190;" onclick="changeColor('makeup_3', 36)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #0d0b10;" onclick="changeColor('makeup_3', 56)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                            </div>
                            <p class="item-subname" ${(skinManager == 'fivem-appearance' || skinManager == 'qb-clothing') && `style="display:none"`}>${translation.makeup.sub_makeup_4}</p>
                            <div class="color-selector-bar" ${(skinManager == 'fivem-appearance' || skinManager == 'qb-clothing') && `style="display:none"`}>
                                <div class="item-sub-color-selector" style="background: #341019;" onclick="changeColor('makeup_4', 0)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #6b1529;" onclick="changeColor('makeup_4', 1)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #6a1515;" onclick="changeColor('makeup_4', 23)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #68124b;" onclick="changeColor('makeup_4', 26)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #145190;" onclick="changeColor('makeup_4', 36)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #0d0b10;" onclick="changeColor('makeup_4', 56)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['makeup'].blush) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.blush.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.blush.sub_blush_1}</p>
                                        <input type="number" class="item-value" id="blush_1-value" value="${currentValue['blush_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('blush_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['blush_1'].min}" max="${currentValue['blush_1'].max}" value="${currentValue['blush_1'].value}" data-excluded="${currentValue['blush_1'].excluded}" class="input-value-radius" id="blush_1-range" oninput="changeRange('blush_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('blush_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option" ${skinManager == 'qb-clothing' && `style="display:none"`}>
                                    <div class="item-values">
                                        <p class="item-subname">${translation.blush.sub_blush_2}</p>
                                        <input type="number" class="item-value" id="blush_2-value" value="${currentValue['blush_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('blush_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['blush_2'].min}" max="${currentValue['blush_2'].max}" value="${currentValue['blush_2'].value}" class="input-value-radius" id="blush_2-range" oninput="changeRange('blush_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('blush_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                            <p class="item-subname">${translation.blush.sub_blush_3}</p>
                            <div class="color-selector-bar">
                                <div class="item-sub-color-selector" style="background: #931533" onclick="changeColor('blush_3', 0)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #d5225a" onclick="changeColor('blush_3', 1)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #be1d39" onclick="changeColor('blush_3', 23)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #f124df" onclick="changeColor('blush_3', 26)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #01a2ed" onclick="changeColor('blush_3', 36)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #140a0c" onclick="changeColor('blush_3', 56)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                            </div>
                        </div>
                    </div>
                `
            }
            if (items['makeup'].lipstick) {
                values = values + `
                    <div class="item-block">
                        <p class="item-title">${translation.lipstick.title}</p>
                        <div class="item-bar">
                            <div class="second-item-bar">
                                <div class="item-option">
                                    <div class="item-values">
                                        <p class="item-subname">${translation.lipstick.sub_lipstick_1}</p>
                                        <input type="number" class="item-value" id="lipstick_1-value" value="${currentValue['lipstick_1'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('lipstick_1', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['lipstick_1'].min}" max="${currentValue['lipstick_1'].max}" value="${currentValue['lipstick_1'].value}" data-excluded="${currentValue['lipstick_1'].excluded}" class="input-value-radius" id="lipstick_1-range" oninput="changeRange('lipstick_1')">
                                        ${config.useArrows && `<button onclick="changeArrow('lipstick_1', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                                <div class="item-option" ${skinManager == 'qb-clothing' && `style="display:none"`}>
                                    <div class="item-values">
                                        <p class="item-subname">${translation.lipstick.sub_lipstick_2}</p>
                                        <input type="number" class="item-value" id="lipstick_2-value" value="${currentValue['lipstick_2'].value}">
                                    </div>
                                    <div class="item-suboptions">
                                        ${config.useArrows && `<button onclick="changeArrow('lipstick_2', 'left')" class="item-arrow-left"><i class="fa-solid fa-caret-left"></i></button>` || ''}
                                        <input type="range" min="${currentValue['lipstick_2'].min}" max="${currentValue['lipstick_2'].max}" value="${currentValue['lipstick_2'].value}" class="input-value-radius" id="lipstick_2-range" oninput="changeRange('lipstick_2')">
                                        ${config.useArrows && `<button onclick="changeArrow('lipstick_2', 'right')" class="item-arrow-right"><i class="fa-solid fa-caret-right"></i></button>` || ''}
                                    </div>
                                </div>
                            </div>
                            <p class="item-subname">${translation.lipstick.sub_lipstick_3}</p>
                            <div class="color-selector-bar">
                                <div class="item-sub-color-selector" style="background: #620000" onclick="changeColor('lipstick_3', 19)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #ff0505" onclick="changeColor('lipstick_3', 21)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #82619f" onclick="changeColor('lipstick_3', 31)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #ff0ae7" onclick="changeColor('lipstick_3', 33)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #2231ff" onclick="changeColor('lipstick_3', 38)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                                <div class="item-sub-color-selector" style="background: #1def55" onclick="changeColor('lipstick_3', 39)"><i class="fa-solid fa-check" style="opacity:0.0"></i></div>
                            </div>
                        </div>
                    </div>
                `
            }
            $('.panel').html(values)
            break;
    }
});

function previousClotheSets() {
    if (clotheSets[currentValue['clotheset'].value-1]) {
        currentValue['clotheset'].value -= 1
        $(`.item-label`).html(clotheSets[currentValue['clotheset'].value].name)
    }
    $.post(`https://${GetParentResourceName()}/change`, JSON.stringify({
        type: 'clotheset', 
        new: currentValue['clotheset'].value
    }));
}

function nextClotheSets() {
    if (clotheSets[currentValue['clotheset'].value+1]) {
        currentValue['clotheset'].value += 1
        $(`.item-label`).html(clotheSets[currentValue['clotheset'].value].name)
    }
    $.post(`https://${GetParentResourceName()}/change`, JSON.stringify({
        type: 'clotheset', 
        new: currentValue['clotheset'].value
    }));
}

function previous(item) {
    if (currentValue[item].value > currentValue[item].min) {
        if (item == 'mom') {
            if (currentValue[item].value === 45) {
                currentValue[item].value = 41
            } else {
                currentValue[item].value -= 1
            }
            $(`#${item}-label`).text(translation.parents_names[item][currentValue[item].value])
            $(`#${item}-photo`).css(`background-image`, `url(./parents/${item}-${currentValue[item].value}.png)`)
        } else if (item == 'dad') {
            if (currentValue[item].value === 42) {
                currentValue[item].value = 20
            } else {
                currentValue[item].value -= 1
            }
            $(`#${item}-label`).text(translation.parents_names[item][currentValue[item].value])
            $(`#${item}-photo`).css(`background-image`, `url(./parents/${item}-${currentValue[item].value}.png)`)
        } else {
            currentValue[item].value -= 1
            $(`#${item}-label`).html(currentValue[item].value)
        }
    }
    $.post(`https://${GetParentResourceName()}/change`, JSON.stringify({
        type: item, 
        new: currentValue[item].value
    }));
}

function next(item) {
    if (currentValue[item].value < currentValue[item].max) {
        if (item == 'mom') {
            if (currentValue[item].value === 41) {
                currentValue[item].value = 45
            } else {
                currentValue[item].value += 1
            }
            $(`#${item}-label`).text(translation.parents_names[item][currentValue[item].value])
            $(`#${item}-photo`).css(`background-image`, `url(./parents/${item}-${currentValue[item].value}.png)`)
        } else if (item == 'dad') {
            if (currentValue[item].value === 20) {
                currentValue[item].value = 42
            } else {
                currentValue[item].value += 1
            }
            $(`#${item}-label`).text(translation.parents_names[item][currentValue[item].value])
            $(`#${item}-photo`).css(`background-image`, `url(./parents/${item}-${currentValue[item].value}.png)`)
        } else {
            currentValue[item].value = currentValue[item].value + 1
            $(`#${item}-value`).val(currentValue[item].value)
        }
    }
    $.post(`https://${GetParentResourceName()}/change`, JSON.stringify({
        type: item, 
        new: currentValue[item].value
    }));
}

function changeColor(item, dataId) {
    $.post(`https://${GetParentResourceName()}/change`, JSON.stringify({
        type: item,
        new: dataId
    }));
    currentValue[item].value = dataId
}

function changeCamera(type) {
    $.post(`https://${GetParentResourceName()}/change_camera`, JSON.stringify({type: type}));
}

function changeRange(item) {
    let inputValue = parseInt($(`#${item}-range`).val())
    let result = inputValue
    if ($(`#${item}-range`).data('excluded')) {
        var excludedValues = $(`#${item}-range`).data('excluded').split(',').map(Number)
        if (excludedValues.includes(inputValue)) {
            result = findClosestValue(inputValue, excludedValues);
            $(`#${item}-range`).val(result);
        }
    }
    if (item != 'ped' && result != currentValue[item].value) {
        currentValue[item].value = result
        $.post(`https://${GetParentResourceName()}/change`, JSON.stringify({
            type: item,
            new: Number(result)
        }));
        $(`#${item}-value`).val(currentValue[item].value);
    }
    if (item == 'ped') {
        $.post(`https://${GetParentResourceName()}/change`, JSON.stringify({
            type: item,
            new: Number(result)
        }));
    }
    if (item == 'sex') {
        gender = result == 0 && 'male' || 'female'
        for (const [k, v] of Object.entries(currentValue)) {
            v.excluded = []
            if (disabledValues[gender][k]) {
                for (const [_k, _v] of Object.entries(disabledValues[gender][k])) {
                    v.excluded.push(_v)
                }
            }
        }
    }
}

function changeArrow(item, curDirection) {
    direction = curDirection;
    let inputValue = 0
    if (curDirection == 'left') {
        inputValue = Number(($(`#${item}-range`).val())) - 1
    } else {
        inputValue = Number($(`#${item}-range`).val()) + 1
    }
    
    let result = inputValue
    
    let min = $(`#${item}-range`).attr('min');
    let max = $(`#${item}-range`).attr('max');
    
    if (result < min) return;
    if (result > max) return;
    
    $(`#${item}-range`).val(result);
    if ($(`#${item}-range`).data('excluded')) {
        var excludedValues = $(`#${item}-range`).data('excluded').split(',').map(Number)
        if (excludedValues.includes(inputValue)) {
            result = findClosestValue(inputValue, excludedValues);
            $(`#${item}-range`).val(result);
        }
    }
    if (item != 'ped' && result != currentValue[item].value) {
        currentValue[item].value = result
        $.post(`https://${GetParentResourceName()}/change`, JSON.stringify({
            type: item,
            new: Number(result)
        }));
        $(`#${item}-value`).val(currentValue[item].value);
    }
    if (item == 'ped') {
        $.post(`https://${GetParentResourceName()}/change`, JSON.stringify({
            type: item,
            new: Number(result)
        }));
    }
    if (item == 'sex') {
        gender = result == 0 && 'male' || 'female'
        for (const [k, v] of Object.entries(currentValue)) {
            v.excluded = []
            if (disabledValues[gender][k]) {
                for (const [_k, _v] of Object.entries(disabledValues[gender][k])) {
                    v.excluded.push(_v)
                }
            }
        }
    }
}

function findClosestValue(value, excludedValues) {
    var closestValue = value;
    while (excludedValues.includes(closestValue)) {
        if (direction == "left") {
            closestValue--;
        } else {
            closestValue++;
        }
    }
    return closestValue;
}

$(document).on("keydown", function (event) {
    if (event.keyCode == 37) {
        direction = "left"
    } else if (event.keyCode == 39) {
        direction = "right"
    } else if (event.key == handsUpKey) {
        $.post(`https://${GetParentResourceName()}/hands_up`)
    }
});

$(document).on('keydown', '.item-value', function(e) {
    if (event.keyCode === 13) {
        let inputValue = $(this).val();
        let elementId = $(this).attr('id');
        let regexResult = elementId.match(/^(.*?)-/);
        let item = regexResult[1];
        if (item) {
            let result = Number(inputValue);
            if ($(`#${item}-range`).data('excluded')) {
                var excludedValues = $(`#${item}-range`).data('excluded').split(',').map(Number)
                if (excludedValues.includes(inputValue)) {
                    console.log('returns')
                    $(this).val($(`#${item}-range`).val(result));
                    return;
                }
            }
            
            let min = $(`#${item}-range`).attr('min');
            if (result < min) {
                $(this).val($(`#${item}-range`).val());
                return
            };

            let max = $(`#${item}-range`).attr('max');
            if (result > max) {
                $(this).val($(`#${item}-range`).val());
                return
            };
            
            $(`#${item}-range`).val(result);
            $.post(`https://${GetParentResourceName()}/change`, JSON.stringify({
                type: item,
                new: Number(result)
            }));
        }
    }
});

var holdingRightButton = false

var oldx = 0;
var oldy = 0;

document.addEventListener('mousedown', function(event) {
    if (event.button == 2) {
        holdingRightButton = true;
    }
});

document.addEventListener('mouseup', function(event) {
    if (holdingRightButton && event.button == 2) {
        holdingRightButton = false;
    }
});

document.addEventListener('mousemove', function (e) {
    if (holdingRightButton) {
    	if (e.pageX > oldx && e.pageY == oldy) {
            $.post(`https://${GetParentResourceName()}/update_camera`, JSON.stringify({direction: "right", value: e.pageX - oldx}));
        } 
        if (e.pageX == oldx && e.pageY > oldy) {
            $.post(`https://${GetParentResourceName()}/update_camera`, JSON.stringify({direction: "bottom", value: e.pageY - oldy}));
        } 
        if (e.pageX == oldx && e.pageY < oldy) {
            $.post(`https://${GetParentResourceName()}/update_camera`, JSON.stringify({direction: "top", value: oldy - e.pageY}));
        } 
        if (e.pageX < oldx && e.pageY == oldy) {
            $.post(`https://${GetParentResourceName()}/update_camera`, JSON.stringify({direction: "left", value: oldx - e.pageX}));
        }
        oldx = e.pageX;
        oldy = e.pageY;
    }
});

document.addEventListener("wheel", (e) => {
    if ($('.panel').is(':hover')) return
    if ($('.settings').is(':hover')) return
    if ($('.categories').is(':hover')) return
    var zoom = e.deltaY > 1 && 'minus' || 'plus'
    $.post(`https://${GetParentResourceName()}/update_camera_zoom`, JSON.stringify({type: zoom}));
})