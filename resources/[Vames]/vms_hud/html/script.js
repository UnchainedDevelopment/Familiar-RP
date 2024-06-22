var money = Intl.NumberFormat('en-US', {minimumFractionDigits: 0});

var defaultColors = {
    health: "#ce1212",
    armor: "#c2c2c2",
    stamina: "#c2c2c2",
    hunger: "#d58113",
    thirst: "#0f94e0",
    stress: "#ed3248",
    drunk: "#8932ed",
    voice: "#0fe05f",
    speedometer_linear: "#ffffff",
    speedometer_circle: "#ffffff"
}

var disableCenterIcon = false;
var isArmorShowed = true;
var isStressShowed = false;
var isDrunkShowed = false;
var isStaminaShowed = true;
var isAmmoShowed = false;

// var minimapDefaultDisplayType = null;
// var minimapOnlyInVeh = false;
var pulseHealth = false;
var pulseHunger = false;
var pulseThirst = false;
var pulseTalking = false;

var enableStress = false;
var enableDrunk = false;
var enableFuel = false;
var enableGear = false;
var enableAmmo = false;
var divingIcon = false;
var isInVehicle = false;

let hasSeatbelt = false;

let seatbeltStatus = false;
let useSeatbeltAlarm = false;
let seatbeltAlarmMinimumSpeed = 0;

let disableSpeedometer = false

let cinematicMode = 0

window.onload = function(e) {
    if (Config) {
        if (Config.InfoItemsAlign === "right") {
            $('.info-hud').empty()
            $('.info-hud').html(`
                <div class="server">
                    <img src="images/server_logo.png" class="server-logo">
                    <div class="server-name"></div>
                </div>
                <div class="player">
                    <div class="id">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="id-label"></span>` || ''}
                        <span class="id-number">0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="id-label"></span>` || ''}
                    </div>
                    <div class="cash">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="cash-label">CASH</span>` || ''}
                        <span class="cash-value">$0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="cash-label">CASH</span>` || ''}
                    </div>
                    <div class="bank">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="bank-label">BANK</span>` || ''}
                        <span class="bank-value">$0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="bank-label">BANK</span>` || ''}
                    </div>
                    <div class="black_money">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="black_money-label">BLACK MONEY</span>` || ''}
                        <span class="black_money-value">$0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="black_money-label">BLACK MONEY</span>` || ''}
                    </div>
                    <div class="company">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="company_money-label">COMPANY</span>` || ''}
                        <span class="company_money-value">$0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="company_money-label">COMPANY</span>` || ''}
                    </div>
                    <div class="job">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="job-label">JOB</span>` || ''}
                        <span class="job-value">
                            <span id="job">-</span>
                            <span id="job_grade"></span>
                        </span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="job-label">JOB</span>` || ''}
                    </div>
                    <div class="gang">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="gang-label">GANG</span>` || ''}
                        <span class="gang-value">
                            <span id="gang">-</span>
                            <span id="gang_grade"></span>
                        </span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="gang-label">GANG</span>` || ''}
                    </div>
                    <div class="ammo">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="ammo-label"></span>` || ''}
                        <span class="ammo-value">0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="ammo-label"></span>` || ''}
                    </div>
                </div>
            `);
        } else if (Config.InfoItemsAlign === "left") {
            $('.info-hud').empty()
            $('.info-hud').html(`
                <div class="player">
                    <div class="id">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="id-label"></span>` || ''}
                        <span class="id-number">0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="id-label"></span>` || ''}
                    </div>
                    <div class="cash">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="cash-label">CASH</span>` || ''}
                        <span class="cash-value">$0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="cash-label">CASH</span>` || ''}
                    </div>
                    <div class="bank">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="bank-label">BANK</span>` || ''}
                        <span class="bank-value">$0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="bank-label">BANK</span>` || ''}
                    </div>
                    <div class="black_money">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="black_money-label">BLACK MONEY</span>` || ''}
                        <span class="black_money-value">$0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="black_money-label">BLACK MONEY</span>` || ''}
                    </div>
                    <div class="company">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="company_money-label">COMPANY</span>` || ''}
                        <span class="company_money-value">$0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="company_money-label">COMPANY</span>` || ''}
                    </div>
                    <div class="job">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="job-label">JOB</span>` || ''}
                        <span class="job-value">
                            <span id="job">-</span>
                            <span id="job_grade"></span>
                        </span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="job-label">JOB</span>` || ''}
                    </div>
                    <div class="gang">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="gang-label">GANG</span>` || ''}
                        <span class="gang-value">
                            <span id="gang">-</span>
                            <span id="gang_grade"></span>
                        </span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="gang-label">GANG</span>` || ''}
                    </div>
                    <div class="ammo">
                        ${Config.InfoItemsIconAlign == 'left' && `<span class="ammo-label"></span>` || ''}
                        <span class="ammo-value">0</span>
                        ${Config.InfoItemsIconAlign == 'right' && `<span class="ammo-label"></span>` || ''}
                    </div>
                </div>
                <div class="server">
                    <img src="images/server_logo.png" class="server-logo">
                    <div class="server-name"></div>
                </div>
            `);
        }
        if (Config.InfoItemsTextAlign) {
            $('.player').css({"text-align": Config.InfoItemsTextAlign});
        }
        if (Config.LogoOpacity) {
            $('.server').css({"opacity": Config.LogoOpacity});
        }
    }
    
    $.post('https://vms_hud/loaded');

    $('.id-label').html(translate.player_id_label);
    $('.server-name').html(translate.server_name);

    $('.cash-label').html(translate.cash_label);
    $('.bank-label').html(translate.bank_label);
    $('.black_money-label').html(translate.black_money_label);
    $('.company_money-label').html(translate.company_money_label);
    $('.job-label').html(translate.job_label);
    $('.gang-label').html(translate.gang_label);
    $('.ammo-label').html(translate.ammo_label);
    
    $('.customize-title').html(translate.customization_hud_title);
    $('.draggable_help > span').html(translate.help_draggable);
    $('#vertial-hud > .option-label > span').html(translate.customization_vertial_name);
    $('#horizontal-hud > .option-label > span').html(translate.customization_horizontal_name);
    $('#no-stack-hud > .option-label > span').html(translate.customization_no_stack_name);
    $('#health-hud > .option-label > span').html(translate.customization_health_name);
    $('#armor-hud > .option-label > span').html(translate.customization_armor_name);
    $('#stamina-hud > .option-label > span').html(translate.customization_stamina_name);
    $('#hunger-hud > .option-label > span').html(translate.customization_hunger_name);
    $('#thirst-hud > .option-label > span').html(translate.customization_thirst_name);
    $('#stress-hud > .option-label > span').html(translate.customization_stress_name);
    $('#drunk-hud > .option-label > span').html(translate.customization_drunk_name);
    $('#voice-hud > .option-label > span').html(translate.customization_voice_name);
    $('#streetlabel-hud > .option-label').html(translate.customization_streetlabel_name);
    $('#icons-scale-hud > .option-label').html(translate.customization_icons_scale_name);
    $('#icons-range-direction > .option-label').html(translate.customization_icons_range_direction_name);
    $('input[type="button"][data-option="icons-range-direction"][data-direction="left"]').attr('value', translate.range_direction_name_left);
    $('input[type="button"][data-option="icons-range-direction"][data-direction="right"]').attr('value', translate.range_direction_name_right);

    $('#speedometer-scale-hud > .option-label').html(translate.customization_speedometer_scale_name);
    $('#speedometer-linear-hud > .option-label').html(translate.customization_speedometer_linear_name);
    $('#speedometer-circle-hud > .option-label').html(translate.customization_speedometer_circle_name);
    
    $('input[type="button"][data-option="minimap-display"][data-type="1"]').attr('value', translate.minimap_display_1);
    $('input[type="button"][data-option="minimap-display"][data-type="2"]').attr('value', translate.minimap_display_2);
    $('input[type="button"][data-option="minimap-display"][data-type="3"]').attr('value', translate.minimap_display_3);
    $('#minimap-display > .option-label').html(translate.customization_minimap_display_name);

    $('#minimap-circle > .option-label').html(translate.customization_minimap_circle_name);
    $('#minimap-square > .option-label').html(translate.customization_minimap_square_name);
    $('#hide-info-hud > .option-label').html(translate.customization_info_hud_name);
    $('#cinematic-hud > .option-label').html(translate.customization_cinematic_name);
    $('.reset-settings > div').html(translate.customization_reset_name);

    if (localStorage.getItem("speedometer-scale") != null) {
        $(`input[type="button"][data-option="speedometer-scale"][value='${localStorage.getItem("speedometer-scale")}']`).addClass('selected-button');
    } else {
        localStorage.setItem(`speedometer-scale`, '1.0');
        $(`input[type="button"][data-option="speedometer-scale"][value='1.0']`).addClass('selected-button');
    }

    if (localStorage.getItem("hide-info-hud") != null) {
        if (localStorage.getItem("hide-info-hud") == 'true') {
            $('.player').css('display', 'none')
            $("[data-option='hide-info-hud'][type='checkbox']").prop("checked", localStorage.getItem("hide-info-hud"));
        }
    } else {
        localStorage.setItem(`hide-info-hud`, false);
        $("[data-option='hide-info-hud'][type='checkbox']").prop("checked", false);
    }

    if (localStorage.getItem("status-direction") == 'horizontal') {
        $('.status-hud').attr('style', 'display: flex')
        $("[data-option='status-direction'][data-name='horizontal'][type='checkbox']").prop("checked", true);
        $("[data-option='status-direction'][data-name='vertical'][type='checkbox']").prop("checked", false);
    } else if (localStorage.getItem("status-direction") == 'no-stack') {
        $('.health-status, .armor-status, .stamina-status, .hunger-status, .thirst-status, .stress-status, .drunk-status, .voice-status').css('position', 'relative');
        $('.status-hud').attr('style', '')
        localStorage.setItem(`status-direction`, 'no-stack');
        $("[data-option='status-direction'][data-name='vertical'][type='checkbox']").prop("checked", false);
        $("[data-option='status-direction'][data-name='horizontal'][type='checkbox']").prop("checked", false);
        $("[data-option='status-direction'][data-name='no-stack'][type='checkbox']").prop("checked", true);
    } else {
        $('.status-hud').attr('style', '')
        localStorage.setItem(`status-direction`, 'vertical');
        $("[data-option='status-direction'][data-name='vertical'][type='checkbox']").prop("checked", true);
        $("[data-option='status-direction'][data-name='horizontal'][type='checkbox']").prop("checked", false);
    }

    if (localStorage.getItem("icons-range-direction") != null) {
        if (localStorage.getItem("icons-range-direction") == "right") {
            $('.status-hud').css('direction', 'rtl');
        }
        $(`input[type="button"][data-option="icons-range-direction"][data-direction='${localStorage.getItem("icons-range-direction")}']`).addClass('selected-button')
    } else {
        localStorage.setItem("icons-range-direction", 'left');
        $(`input[type="button"][data-option="icons-range-direction"][data-direction='left']`).addClass('selected-button')
    }

    if (localStorage.getItem("minimap-display") != null) {
        $(`[data-option='minimap-display'][data-type='${localStorage.getItem("minimap-display")}']`).addClass('selected-button')
        if (localStorage.getItem("minimap-display") == "1") {
            $('.status-hud').addClass('status-hud-invehicle')
        }
    }

    if (localStorage.getItem("minimap") == 'circle') {
        $("[data-option='minimap'][data-name='circle'][type='checkbox']").prop("checked", true);
        $("[data-option='minimap'][data-name='square'][type='checkbox']").prop("checked", false);
    } else {
        $("[data-option='minimap'][data-name='square'][type='checkbox']").prop("checked", true);
        $("[data-option='minimap'][data-name='circle'][type='checkbox']").prop("checked", false);
    }
    
    if (localStorage.getItem("speedometer-type") != null) {
        if (localStorage.getItem("speedometer-type") == 'linear') {
            const circleSpeedometer = document.querySelector('input[data-type="circle"]');
            $(circleSpeedometer).prop("checked", false);
            const linearSpeedometer = document.querySelector('input[data-type="linear"]');
            $(linearSpeedometer).prop("checked", true);
        } else {
            const circleSpeedometer = document.querySelector('input[data-type="circle"]');
            $(circleSpeedometer).prop("checked", true);
            const linearSpeedometer = document.querySelector('input[data-type="linear"]');
            $(linearSpeedometer).prop("checked", false);
        }
    }
    
    if (localStorage.getItem("speedometer-scale") != null) {
        $('.vehicle-hud > .speedometer-linear, .vehicle-hud > .speedometer-circle').css('transform', `scale(${localStorage.getItem("speedometer-scale")})`);
    }

    if (localStorage.getItem("speedometer-linear-position") != '') {
        $('.speedometer-linear').attr('style', localStorage.getItem("speedometer-linear-position"))
    }

    if (localStorage.getItem("speedometer-circle-position") != '') {
        $('.speedometer-circle').attr('style', localStorage.getItem("speedometer-circle-position"))
    }

    if (localStorage.getItem("streetlabel-position") != '') {
        $('.streetlabel').attr('style', localStorage.getItem("streetlabel-position"))
    }

    if (localStorage.getItem("streetlabel-position") != '') {
        $('.streetlabel').attr('style', localStorage.getItem("streetlabel-position"))
    }
    if (localStorage.getItem("health-position") != '') {
        $('.health-status').attr('style', localStorage.getItem("health-position"))
    }
    if (localStorage.getItem("armor-position") != '') {
        $('.armor-status').attr('style', localStorage.getItem("armor-position"))
    }
    if (localStorage.getItem("stamina-position") != '') {
        $('.stamina-status').attr('style', localStorage.getItem("stamina-position"))
    }
    if (localStorage.getItem("hunger-position") != '') {
        $('.hunger-status').attr('style', localStorage.getItem("hunger-position"))
    }
    if (localStorage.getItem("thirst-position") != '') {
        $('.thirst-status').attr('style', localStorage.getItem("thirst-position"))
    }
    if (localStorage.getItem("stress-position") != '') {
        $('.stress-status').attr('style', localStorage.getItem("stress-position"))
    }
    if (localStorage.getItem("drunk-position") != '') {
        $('.drunk-status').attr('style', localStorage.getItem("drunk-position"))
    }
    if (localStorage.getItem("voice-position") != '') {
        $('.voice-status').attr('style', localStorage.getItem("voice-position"))
    }
    
    if (localStorage.getItem("health-color") == null) {
        localStorage.setItem(`health-color`, defaultColors.health);
    }
    if (localStorage.getItem("armor-color") == null) {
        localStorage.setItem(`armor-color`, defaultColors.armor);
    }
    if (localStorage.getItem("stamina-color") == null) {
        localStorage.setItem(`stamina-color`, defaultColors.stamina);
    }
    if (localStorage.getItem("hunger-color") == null) {
        localStorage.setItem(`hunger-color`, defaultColors.hunger);
    }
    if (localStorage.getItem("thirst-color") == null) {
        localStorage.setItem(`thirst-color`, defaultColors.thirst);
    }
    if (localStorage.getItem("stress-color") == null) {
        localStorage.setItem(`stress-color`, defaultColors.stress);
    }
    if (localStorage.getItem("drunk-color") == null) {
        localStorage.setItem(`drunk-color`, defaultColors.drunk);
    }
    if (localStorage.getItem("voice-color") == null) {
        localStorage.setItem(`voice-color`, defaultColors.voice);
    }
    if (localStorage.getItem("speedometer-linear-color") == null) {
        localStorage.setItem(`speedometer-linear-color`, defaultColors.speedometer_linear);
    }
    if (localStorage.getItem("speedometer-circle-color") == null) {
        localStorage.setItem(`speedometer-circle-color`, defaultColors.speedometer_circle);
    }
    
    $(".speedometer-linear > .fuel > .fuel-status > .fuel-range > div").css('background', localStorage.getItem("speedometer-linear-color"))    
    $("[data-option='speedometer-linear'][type='color']").prop("value", localStorage.getItem("speedometer-linear-color"));

    $(".speedometer-circle > .speedometer-part > .rpm-value").css('stroke', localStorage.getItem("speedometer-circle-color"))    
    $(".speedometer-circle > .speedometer-fuel > .fuel-value").css('stroke', localStorage.getItem("speedometer-circle-color"))    
    $("[data-option='speedometer-circle'][type='color']").prop("value", localStorage.getItem("speedometer-circle-color"));

    $(".health-range > div").css('background', localStorage.getItem("health-color"))    
    $("[data-option='health'][type='color']").prop("value", localStorage.getItem("health-color"));
    
    $(".armor-range > div").css('background', localStorage.getItem("armor-color"))    
    $("[data-option='armor'][type='color']").prop("value", localStorage.getItem("armor-color"));

    $(".stamina-range > div").css('background', localStorage.getItem("stamina-color"))    
    $("[data-option='stamina'][type='color']").prop("value", localStorage.getItem("stamina-color"));

    $(".hunger-range > div").css('background', localStorage.getItem("hunger-color"))    
    $("[data-option='hunger'][type='color']").prop("value", localStorage.getItem("hunger-color"));

    $(".thirst-range > div").css('background', localStorage.getItem("thirst-color"))    
    $("[data-option='thirst'][type='color']").prop("value", localStorage.getItem("thirst-color"));

    $(".stress-range > div").css('background', localStorage.getItem("stress-color"))    
    $("[data-option='stress'][type='color']").prop("value", localStorage.getItem("stress-color"));

    $(".drunk-range > div").css('background', localStorage.getItem("drunk-color"))    
    $("[data-option='drunk'][type='color']").prop("value", localStorage.getItem("drunk-color"));
    
    $(".voice-range > div").css('background', localStorage.getItem("voice-color"))    
    $("[data-option='voice'][type='color']").prop("value", localStorage.getItem("voice-color"));
    
    if (localStorage.getItem("health-visible") == null) {
        localStorage.setItem(`health-visible`, '1');
        $("[data-option='health'][type='checkbox']").prop("checked", true);
        $(`.health-status`).removeClass('non-visible')
    } else if (localStorage.getItem("health-visible") == '1') {
        $("[data-option='health'][type='checkbox']").prop("checked", true);
        $(`.health-status`).removeClass('non-visible')
    }

    if (localStorage.getItem("armor-visible") == null) {
        localStorage.setItem(`armor-visible`, '1');
        $("[data-option='armor'][type='checkbox']").prop("checked", true);
        $(`.armor-status`).removeClass('non-visible')
    } else if (localStorage.getItem("armor-visible") == '1') {
        $("[data-option='armor'][type='checkbox']").prop("checked", true);
        $(`.armor-status`).removeClass('non-visible')
    }

    if (localStorage.getItem("stamina-visible") == null) {
        localStorage.setItem(`stamina-visible`, '1');
        $("[data-option='stamina'][type='checkbox']").prop("checked", true);
        $(`.stamina-status`).removeClass('non-visible')
    } else if (localStorage.getItem("stamina-visible") == '1') {
        $("[data-option='stamina'][type='checkbox']").prop("checked", true);
        $(`.stamina-status`).removeClass('non-visible')
    }

    if (localStorage.getItem("hunger-visible") == null) {
        localStorage.setItem(`hunger-visible`, '1');
        $("[data-option='hunger'][type='checkbox']").prop("checked", true);
        $(`.hunger-status`).removeClass('non-visible')
    } else if (localStorage.getItem("hunger-visible") == '1') {
        $("[data-option='hunger'][type='checkbox']").prop("checked", true);
        $(`.hunger-status`).removeClass('non-visible')
    }

    if (localStorage.getItem("thirst-visible") == null) {
        localStorage.setItem(`thirst-visible`, '1');
        $("[data-option='thirst'][type='checkbox']").prop("checked", true);
        $(`.thirst-status`).removeClass('non-visible')
    } else if (localStorage.getItem("thirst-visible") == '1') {
        $("[data-option='thirst'][type='checkbox']").prop("checked", true);
        $(`.thirst-status`).removeClass('non-visible')
    }

    if (localStorage.getItem("stress-visible") == null) {
        localStorage.setItem(`stress-visible`, '1');
        $("[data-option='stress'][type='checkbox']").prop("checked", true);
        $(`.stress-status`).removeClass('non-visible')
    } else if (localStorage.getItem("stress-visible") == '1') {
        $("[data-option='stress'][type='checkbox']").prop("checked", true);
        $(`.stress-status`).removeClass('non-visible')
    }

    if (localStorage.getItem("drunk-visible") == null) {
        localStorage.setItem(`drunk-visible`, '1');
        $("[data-option='drunk'][type='checkbox']").prop("checked", true);
        $(`.drunk-status`).removeClass('non-visible')
    } else if (localStorage.getItem("drunk-visible") == '1') {
        $("[data-option='drunk'][type='checkbox']").prop("checked", true);
        $(`.drunk-status`).removeClass('non-visible')
    }

    if (localStorage.getItem("voice-visible") == null) {
        localStorage.setItem(`voice-visible`, '1');
        $("[data-option='voice'][type='checkbox']").prop("checked", true);
        $(`.voice-status`).removeClass('non-visible')
    } else if (localStorage.getItem("voice-visible") == '1') {
        $("[data-option='voice'][type='checkbox']").prop("checked", true);
        $(`.voice-status`).removeClass('non-visible')
    }

    if (localStorage.getItem("icons-scale") != null) {
        $('.status-hud > div').css('transform', `scale(${localStorage.getItem("icons-scale")})`);
        if (localStorage.getItem("icons-scale") == '1.5') {
            $('.status-hud > div').css('margin-block', '2.0vh');
        } else if (localStorage.getItem("icons-scale") == '1.25') {
            $('.status-hud > div').css('margin-block', '1.5vh');
        } else if (localStorage.getItem("icons-scale") == '1.0') {
            $('.status-hud > div').css('margin-block', '1.2vh');
        } else if (localStorage.getItem("icons-scale") == '0.75') {
            $('.status-hud > div').css('margin-block', '0.4vh');
        }
        $(`input[type="button"][data-option="icons-scale"][value='${localStorage.getItem("icons-scale")}']`).addClass('selected-button')
    } else {
        localStorage.setItem(`icons-scale`, '1.0');
        $(`input[type="button"][data-option="icons-scale"][value='1.0']`).addClass('selected-button')
    }
}

let healthColor = document.querySelector("[data-option='health'][type='color']");
let armorColor = document.querySelector("[data-option='armor'][type='color']");
let staminaColor = document.querySelector("[data-option='stamina'][type='color']");
let hungerColor = document.querySelector("[data-option='hunger'][type='color']");
let thirstColor = document.querySelector("[data-option='thirst'][type='color']");
let stressColor = document.querySelector("[data-option='stress'][type='color']");
let drunkColor = document.querySelector("[data-option='drunk'][type='color']");
let voiceColor = document.querySelector("[data-option='voice'][type='color']");

let speedoLinearColor = document.querySelector("[data-option='speedometer-linear'][type='color']");
let speedoCircleColor = document.querySelector("[data-option='speedometer-circle'][type='color']");

healthColor.addEventListener('input', function(e) {
    localStorage.setItem(`health-color`, this.value);
    $(".health-range > div").css('background', localStorage.getItem("health-color"))
});

armorColor.addEventListener('input', function(e) {
    localStorage.setItem(`armor-color`, this.value);
    $(".armor-range > div").css('background', localStorage.getItem("armor-color"))   
});

staminaColor.addEventListener('input', function(e) {
    localStorage.setItem(`stamina-color`, this.value);
    $(".stamina-range > div").css('background', localStorage.getItem("stamina-color"))   
});

hungerColor.addEventListener('input', function(e) {
    localStorage.setItem(`hunger-color`, this.value);
    $(".hunger-range > div").css('background', localStorage.getItem("hunger-color"))   
});

thirstColor.addEventListener('input', function(e) {
    localStorage.setItem(`thirst-color`, this.value);
    $(".thirst-range > div").css('background', localStorage.getItem("thirst-color"))    
});

stressColor.addEventListener('input', function(e) {
    localStorage.setItem(`stress-color`, this.value);
    $(".stress-range > div").css('background', localStorage.getItem("stress-color"))    
});

drunkColor.addEventListener('input', function(e) {
    localStorage.setItem(`drunk-color`, this.value);
    $(".drunk-range > div").css('background', localStorage.getItem("drunk-color"))    
});

voiceColor.addEventListener('input', function(e) {
    localStorage.setItem(`voice-color`, this.value);
    $(".voice-range > div").css('background', localStorage.getItem("voice-color"))    
});

speedoLinearColor.addEventListener('input', function(e) {
    localStorage.setItem(`speedometer-linear-color`, this.value);
    $(".speedometer-linear > .fuel > .fuel-status > .fuel-range > div").css('background', localStorage.getItem("speedometer-linear-color"))    
});

speedoCircleColor.addEventListener('input', function(e) {
    localStorage.setItem(`speedometer-circle-color`, this.value);
    $(".speedometer-circle > .speedometer-part > .rpm-value").css('stroke', localStorage.getItem("speedometer-circle-color"))    
    $(".speedometer-circle > .speedometer-fuel > .fuel-value").css('stroke', localStorage.getItem("speedometer-circle-color"))    
});

window.addEventListener('message', function(event) {
    var item = event.data;
    if (item.action == "load") {
        if (item.disableSpeedometer) {
            disableSpeedometer = item.disableSpeedometer;
            $("#speedometer-br").hide();
            $("#speedometer-scale-hud").hide();
            $("#speedometer-linear-hud").hide();
            $("#speedometer-circle-hud").hide();
        }
        if (item.seatbeltAlarm) {
            useSeatbeltAlarm = true
            seatbeltAlarmMinimumSpeed = item.seatbeltAlarmMinimumSpeed;
        }
        if (item.useCustomMinimap) {
            $('#minimap-circle').show()
            $('#minimap-square').show()
        }
        if (item.unitofspeed) {
            $('.speedometer-linear > .speed > .unit').html(`${item.unitofspeed == 'kmh' && translate.kmh || translate.mph}`)
            $('.speedometer-circle > .speed > .unit').html(`${item.unitofspeed == 'kmh' && translate.kmh || translate.mph}`)
            $('.armor-status').addClass('non-visible')
            $('.stamina-status').addClass('non-visible')
            $('.stress-status').addClass('non-visible')
            $('.drunk-status').addClass('non-visible')
        }
        if (item.id) {
            $('.id-number').html(item.id);
        }
        if (item.minimapDisplayType) {
            minimapDisplayType = item.minimapDisplayType;
            if (!item.minimapDisplayManage) {
                localStorage.setItem(`minimap-display`, minimapDisplayType);
                $('div#minimap-display').empty();
            }
            if (localStorage.getItem("minimap-display") == null) {
                localStorage.setItem(`minimap-display`, minimapDisplayType);
                $(`[data-option='minimap-display'][data-type='${localStorage.getItem("minimap-display")}']`).addClass('selected-button')
            }
        }
        if (item.disableCenterIcon) {
            disableCenterIcon = item.disableCenterIcon
        }
        if (item.enableStress) {
            enableStress = true
        }
        if (item.enableDrunk) {
            enableDrunk = true
        }
        if (item.cruiseControl) {
            $('.speedometer-linear > .icons > #cruise-control').show();
            $('.speedometer-circle > .icons > #cruise-control').show();
            $('.speedometer-circle > .icons > div img').css({'width': '2.5vh'});
        }
        if (!enableStress) {
            $('#stress-hud').hide();
            $('.stress-status').fadeOut(200);
            isStressShowed = false;
        }
        if (!enableDrunk) {
            $('#drunk-hud').hide();
            $('.drunk-status').fadeOut(200);
            isDrunkShowed = false;
        }
        if (item.enableFuel) {
            enableFuel = true
            $('.speedometer-linear > .fuel').show()
            $('.speedometer-circle > .speedometer-fuel').show()
            $('.speedometer-circle > .fuel-icon').show()
        }
        if (item.enableGear) {
            enableGear = true
            $('.speedometer-linear .gear').show()
            $('.speedometer-circle .speedometer-gear').show()
        }
        if (item.enableAmmoCounter) {
            enableAmmo = true
        }
        if (item.enablePlayerId) {
            $('.info-hud > .player > .id').show()
        }
        if (item.enableCash) {
            $('.info-hud > .player > .cash').show()
        }
        if (item.enableBank) {
            $('.info-hud > .player > .bank').show()
        }
        if (item.enableBlackMoney) {
            $('.info-hud > .player > .black_money').show()
        }
        if (item.enableJob) {
            $('.info-hud > .player > .job').show()
        }
        if (item.enableGang) {
            $('.info-hud > .player > .gang').show()
        }
        if (item.infoHudIcons) {
            $('.id-label').html(translate.player_id_icon)
            $('.cash-label').html(translate.cash_icon)
            $('.bank-label').html(translate.bank_icon)
            $('.black_money-label').html(translate.black_money_icon)
            $('.company_money-label').html(translate.company_money_icon)
            $('.job-label').html(translate.job_icon)
            $('.gang-label').html(translate.gang_icon)
            $('.ammo-label').html(translate.ammo_icon)
        }
        if (item.disableLogo) {
            $('.info-hud > .server').hide()
        }
        if (item.minimap) {
            const minimapCheck = document.querySelector(`input[data-option="minimap"][data-name="${item.minimap}"]`);
            $(minimapCheck).prop("checked", true);
        } else {
            registerDraggableItems()
        }
    }
    if (item.action == "playSound") {
        if (item.type == "seatbelt") {
            var sound = new Audio(item.status && './sounds/fastening.mp3' || './sounds/unfastening.mp3');
            sound.volume = 0.2;
            sound.play();
        }
    }
    if (item.action == "displayHud") {
        if (item.display) {
            $("body").fadeIn(100);
        } else {
            $("body").fadeOut(100);
        }
    }
    if (item.action == 'updateHud') {
        if (item.bigminimap && localStorage.getItem("minimap-display") != '2') {
            $('.status-hud').toggleClass('bigminimap')
            $('.vehicle-hud').toggleClass('bigminimap')
        }
        if (item.removedHealth) {
            $('.damage-effect').fadeIn(200)
            setTimeout(() => {
                $('.damage-effect').fadeOut(200)
            }, 200);
        }
        if (enableAmmo) {
            if (item.ammunation) {
                if (item.display) {
                    if (!isAmmoShowed) {
                        $('.info-hud > .player > .ammo').fadeIn(250)
                        isAmmoShowed = true
                    }
                    $('.info-hud > .player > .ammo > .ammo-value').html(`${item.ammunation}`)
                } else {
                    if (isAmmoShowed) {
                        isAmmoShowed = false
                        $('.info-hud > .player > .ammo').fadeOut(250)
                    }
                }
            }
        }
        if (item.cash) {
            $('.info-hud > .player > .cash > .cash-value').html(`$${item.cash}`)
        }
        if (item.bank) {
            $('.info-hud > .player > .bank > .bank-value').html(`$${item.bank}`)
        }
        if (item.black_money) {
            $('.info-hud > .player > .black_money > .black_money-value').html(`$${item.black_money}`)
        }
        if (item.company_money) {
            $('.info-hud > .player > .company > .company_money-value').html(`$${item.company_money}`)
        }
        if (item.type == 'company') {
            if (item.display) {
                $('.info-hud > .player > .company').show()
            } else {
                $('.info-hud > .player > .company').hide()
            }
        }
        if (item.job) {
            $('.info-hud > .player > .job > .job-value > #job').html(`${item.job}`)
        }
        if (item.job_grade) {
            $('.info-hud > .player > .job > .job-value > #job_grade').html(`${item.job_grade}`)
        }
        if (item.gang) {
            $('.info-hud > .player > .gang > .gang-value > #gang').html(`${item.gang}`)
        }
        if (item.gang_grade) {
            $('.info-hud > .player > .gang > .gang-value > #gang_grade').html(`${item.gang_grade}`)
        }
        if (item.voicerange) {
            $('.voice-range > div').css('height', `${item.voicerange}%`)
        }
        if (item.talking && !pulseTalking) {
            $('.voice-status > .voice-icon > i').addClass('voice-pulse')
            pulseTalking = true
        } else if (!item.talking && pulseTalking) {
            $('.voice-status > .voice-icon > i').removeClass('voice-pulse')
            pulseTalking = false
        }
        if (item.underwater && !divingIcon) {
            $('.stamina-status > .stamina-icon').empty()
            $('.stamina-status > .stamina-icon').html(`
                <i class="fa-solid fa-person-swimming"></i>
            `)
            divingIcon = true
        } else if (!item.underwater && divingIcon) {
            $('.stamina-status > .stamina-icon').empty()
            $('.stamina-status > .stamina-icon').html(`
                <i class="fa-solid fa-person-running"></i>
            `)
            divingIcon = false
        }
        if (item.health) {
            $('.health-range > div').css('height', `${item.health}%`)
            if (item.health < 20.0 && !pulseHealth) {
                $('.health-status > .health-icon > i').addClass('warning-pulse')
                pulseHealth = true
            } else if (item.health > 20.0 && pulseHealth) {
                $('.health-status > .health-icon > i').removeClass('warning-pulse')
                pulseHealth = false
            }
        }
        if (item.armor > 0) {
            if (!isArmorShowed) {
                if (localStorage.getItem("armor-visible") == '1') {
                    isArmorShowed = true
                    $('.armor-status').removeClass('non-visible')
                }
            }
            $('.armor-range > div').css('height', `${item.armor}%`)
        } else if (isArmorShowed && item.armor <= 0) {
            $('.armor-status').addClass('non-visible')
            isArmorShowed = false
        }
        if (item.stamina < 100) {
            if (!isStaminaShowed) {
                isStaminaShowed = true
                if (localStorage.getItem("stamina-visible") == '1') {
                    $('.stamina-status').removeClass('non-visible')
                }
            }
            $('.stamina-range > div').css('height', `${item.stamina}%`)
        } else if (isStaminaShowed && item.stamina >= 100) {
            $('.stamina-status').addClass('non-visible')
            isStaminaShowed = false
        }
        if (item.hunger) {
            $('.hunger-range > div').css('height', `${item.hunger}%`)
            if (item.hunger < 20.0 && !pulseHunger) {
                $('.hunger-status > .hunger-icon > i').addClass('warning-pulse')
                pulseHunger = true
            } else if (item.hunger > 20.0 && pulseHunger) {
                $('.hunger-status > .hunger-icon > i').removeClass('warning-pulse')
                pulseHunger = false
            }
        }
        if (item.thirst) {
            $('.thirst-range > div').css('height', `${item.thirst}%`)
            if (item.thirst < 20.0 && !pulseThirst) {
                $('.thirst-status > .thirst-icon > i').addClass('warning-pulse')
                pulseThirst = true
            } else if (item.thirst > 20.0 && pulseThirst) {
                $('.thirst-status > .thirst-icon > i').removeClass('warning-pulse')
                pulseThirst = false
            }
        }
        if (enableStress) {
            if (item.stress > 1.0) {
                if (!isStressShowed) {
                    if (localStorage.getItem("stress-visible") == '1') {
                        isStressShowed = true
                        $('.stress-status').removeClass('non-visible')
                    }
                }
                $('.stress-range > div').css('height', `${item.stress}%`)
            } else if (item.stress <= 1.0 && isStressShowed) {
                $('.stress-status').addClass('non-visible')
                isStressShowed = false
            }
        }
        if (enableDrunk) {
            if (item.drunk > 1.0) {
                if (!isDrunkShowed) {
                    if (localStorage.getItem("drunk-visible") == '1') {
                        isDrunkShowed = true
                        $('.drunk-status').removeClass('non-visible')
                    }
                }
                $('.drunk-range > div').css('height', `${item.drunk}%`)
            } else if (item.drunk <= 1.0 && isDrunkShowed) {
                $('.drunk-status').addClass('non-visible')
                isDrunkShowed = false
            }
        }
    }
    if (item.action == 'showCarHud') {
        isInVehicle = true
        if (!disableSpeedometer && cinematicMode == 0) {
            $(".vehicle-hud").fadeIn(100)
            if (localStorage.getItem("speedometer-type") == 'linear') {
                $(`.speedometer-linear`).show()
                $(`.speedometer-circle`).hide()
            } else {
                $(`.speedometer-circle`).show()
                $(`.speedometer-linear`).hide()
            }
        }
        if (localStorage.getItem("minimap-display") == "1" || localStorage.getItem("minimap-display") == "3") {
            if (
                (!localStorage.getItem('health-position') || localStorage.getItem('health-position') == '') &&
                (!localStorage.getItem('armor-position') || localStorage.getItem('armor-position') == '') &&
                (!localStorage.getItem('stamina-position') || localStorage.getItem('stamina-position') == '') &&
                (!localStorage.getItem('hunger-position') || localStorage.getItem('hunger-position') == '') &&
                (!localStorage.getItem('thirst-position') || localStorage.getItem('thirst-position') == '') &&
                (!localStorage.getItem('stress-position') || localStorage.getItem('stress-position') == '') &&
                (!localStorage.getItem('drunk-position') || localStorage.getItem('drunk-position') == '') &&
                (!localStorage.getItem('voice-position') || localStorage.getItem('voice-position') == '')
            ) {
                $('.status-hud').addClass('status-hud-invehicle')
            }
        }
    }
    if (item.action == 'hideCarHud') {
        isInVehicle = false
        if (!disableSpeedometer) {
            $(".vehicle-hud").fadeOut(100)
        }
        if (localStorage.getItem("minimap-display") == "3") {
            if (
                (!localStorage.getItem('health-position') || localStorage.getItem('health-position') == '') &&
                (!localStorage.getItem('armor-position') || localStorage.getItem('armor-position') == '') &&
                (!localStorage.getItem('stamina-position') || localStorage.getItem('stamina-position') == '') &&
                (!localStorage.getItem('hunger-position') || localStorage.getItem('hunger-position') == '') &&
                (!localStorage.getItem('thirst-position') || localStorage.getItem('thirst-position') == '') &&
                (!localStorage.getItem('stress-position') || localStorage.getItem('stress-position') == '') &&
                (!localStorage.getItem('drunk-position') || localStorage.getItem('drunk-position') == '') &&
                (!localStorage.getItem('voice-position') || localStorage.getItem('voice-position') == '')
            ) {
                $('.status-hud').removeClass('status-hud-invehicle')
            }
        }
        if (seatbeltAlarmPlaying) {
            seatbeltAlarmAudio.pause();
            seatbeltAlarmPlaying = false;
        }
    }
    if (item.action == 'updateCarHud') {
        hasSeatbelt = item.hasSeatbelt
        if (item.direction) {
            $('.vehicle-hud > .streetlabel > .direction').html(item.direction)
        }
        if (item.street) {
            $('.vehicle-hud > .streetlabel .street').html(item.street)
        }
        if (item.zone) {
            $('.vehicle-hud > .streetlabel .zone').html(item.zone)
        }
        if (localStorage.getItem("speedometer-type") == 'linear') {
            if (enableFuel) {
                $(`.speedometer-linear > .fuel > .fuel-status > .fuel-range > div`).css('width', `${item.fuel}%`)
            }
            if (enableGear) {
                $(`.speedometer-linear .gear`).text(`${item.gear}`)
            }
            var formatSpeed = (item.speed).toString() + ''
            if (item.speed >= 100) {
                $(`.speedometer-linear > .speed > .value`).html(`
                    <span>${formatSpeed.substring(0, 1)}</span>
                    <span>${formatSpeed.substring(1, 2)}</span>
                    <span>${formatSpeed.substring(2, 3)}</span>
                `)
            } else if (item.speed < 100 && item.speed >= 10) {
                $(`.speedometer-linear > .speed > .value`).html(`
                    <span class="zero">0</span>
                    <span>${formatSpeed.substring(0, 1)}</span>
                    <span>${formatSpeed.substring(1, 2)}</span>
                `)
            } else if (item.speed < 10) {
                $(`.speedometer-linear > .speed > .value`).html(`
                    <span class="zero">0</span>
                    <span class="zero">0</span>
                    <span>${item.speed}</span>
                `)
            }
            $(`.speedometer-linear > .icons > #doors`).css(`opacity`, item.door ? 1.0 : 0.2)
            $(`.speedometer-linear > .icons > #lights`).css(`opacity`, item.lights.lightsOn ? 1.0 : 0.2)
            $(`.speedometer-linear > .icons > #lights > img`).attr(`src`, item.lights.highbeams ? 'images/high-beam.png' : 'images/low-beam.png ')
            $(`.speedometer-linear > .icons > #seatbelt`).css(`opacity`, item.seatbelt ? 1.0 : 0.2)
            $(`.speedometer-linear > .icons > #cruise-control`).css(`opacity`, item.cruise_control ? 1.0 : 0.2)

            $(`.speedometer-linear > .icons > #engine-status > #engine-3`).css(`opacity`, item.engineDamageLevel == 3 ? 0.75 : 0.0)
            $(`.speedometer-linear > .icons > #engine-status > #engine-2`).css(`opacity`, item.engineDamageLevel == 2 ? 0.75 : 0.0)
            $(`.speedometer-linear > .icons > #engine-status > #engine-1`).css(`opacity`, item.engineDamageLevel == 1 ? 0.75 : 0.0)
            $(`.speedometer-linear > .icons > #engine-status > #engine-0`).css(`opacity`, item.engineDamageLevel == 0 ? 0.2 : 0.0)
            if (useSeatbeltAlarm) {
                seatbeltStatus = item.seatbelt
                if (seatbeltStatus) {
                    if (seatbeltAlarmPlaying) {
                        seatbeltAlarmAudio.pause();
                        seatbeltAlarmPlaying = false;
                    }
                } else {
                    if (item.speed >= seatbeltAlarmMinimumSpeed) {
                        seatbeltAlarm()
                    } else {
                        if (seatbeltAlarmPlaying) {
                            seatbeltAlarmAudio.pause();
                            seatbeltAlarmPlaying = false;
                        }
                    }
                }
            }
        } else {
            var formatSpeed = (item.speed).toString() + ''
            if (item.speed >= 100) {
                $(`.speedometer-circle > .speed > .value`).html(`
                    <span>${formatSpeed.substring(0, 1)}</span>
                    <span>${formatSpeed.substring(1, 2)}</span>
                    <span>${formatSpeed.substring(2, 3)}</span>
                `)
            } else if (item.speed < 100 && item.speed >= 10) {
                $(`.speedometer-circle > .speed > .value`).html(`
                    <span class="zero">0</span>
                    <span>${formatSpeed.substring(0, 1)}</span>
                    <span>${formatSpeed.substring(1, 2)}</span>
                `)
            } else if (item.speed < 10) {
                $(`.speedometer-circle > .speed > .value`).html(`
                    <span class="zero">0</span>
                    <span class="zero">0</span>
                    <span>${item.speed}</span>
                `)
            }
            $('.rpm-value').attr('stroke-dasharray', `${(parseFloat(item.rpm) * 100.0).toFixed(2) * 0.8}` + ' 100')
            if (enableFuel) {
                $('.fuel-value').attr('stroke-dasharray', `${(item.fuel)*0.29}` + ' 100')
            }
            if (enableGear) {
                $(`.speedometer-circle .gear`).text(`${item.gear}`)
            }
            $(`.speedometer-circle > .icons > #doors`).css(`opacity`, item.door ? 1.0 : 0.2)
            $(`.speedometer-circle > .icons > #lights`).css(`opacity`, item.lights.lightsOn ? 1.0 : 0.2)
            $(`.speedometer-circle > .icons > #lights > img`).attr(`src`, item.lights.highbeams ? 'images/high-beam.png' : 'images/low-beam.png ')
            $(`.speedometer-circle > .icons > #seatbelt`).css(`opacity`, item.seatbelt ? 1.0 : 0.2)
            $(`.speedometer-circle > .icons > #cruise-control`).css(`opacity`, item.cruise_control ? 1.0 : 0.2)

            $(`.speedometer-circle > .icons > #engine-status > #engine-3`).css(`opacity`, item.engineDamageLevel == 3 ? 0.75 : 0.0)
            $(`.speedometer-circle > .icons > #engine-status > #engine-2`).css(`opacity`, item.engineDamageLevel == 2 ? 0.75 : 0.0)
            $(`.speedometer-circle > .icons > #engine-status > #engine-1`).css(`opacity`, item.engineDamageLevel == 1 ? 0.75 : 0.0)
            $(`.speedometer-circle > .icons > #engine-status > #engine-0`).css(`opacity`, item.engineDamageLevel == 0 ? 0.2 : 0.0)
            
            if (useSeatbeltAlarm) {
                seatbeltStatus = item.seatbelt
                if (seatbeltStatus) {
                    if (seatbeltAlarmPlaying) {
                        seatbeltAlarmAudio.pause();
                        seatbeltAlarmPlaying = false;
                    }
                } else {
                    if (item.speed >= seatbeltAlarmMinimumSpeed) {
                        seatbeltAlarm()
                    } else {
                        if (seatbeltAlarmPlaying) {
                            seatbeltAlarmAudio.pause();
                            seatbeltAlarmPlaying = false;
                        }
                    }
                }
            }
        }
    }
    if (item.action == 'openCustomizationMenu') {
        $('.customize-hud-menu').fadeIn(100);
        if (!isArmorShowed) {
            $('.armor-status').removeClass('non-visible')
        }
        if (!isStaminaShowed) {
            $('.stamina-status').removeClass('non-visible')
        }
        if (enableStress && !isStressShowed) {
            $('.stress-status').removeClass('non-visible')
        }
        if (enableDrunk && !isDrunkShowed) {
            $('.drunk-status').removeClass('non-visible')
        }
    }
    if (item.action == 'closeCustomizationMenu') {
        $('.customize-hud-menu').fadeOut(100);
        if (!isArmorShowed) {
            $('.armor-status').addClass('non-visible')
        }
        if (!isStaminaShowed) {
            $('.stamina-status').addClass('non-visible')
        }
        if (enableStress && !isStressShowed) {
            $('.stress-status').addClass('non-visible')
        }
        if (enableDrunk && !isDrunkShowed) {
            $('.drunk-status').addClass('non-visible')
        }
    }
    if (item.action == 'getMinimap') {
        $.post('https://vms_hud/changeMinimap', JSON.stringify({minimap: localStorage.getItem("minimap"), display: localStorage.getItem("minimap-display")}));
    }
    if (item.action == 'loadDefaultSpeedometer') {
        if (localStorage.getItem("speedometer-type") != 'linear' && localStorage.getItem("speedometer-type") != 'circle') {
            localStorage.setItem(`speedometer-type`, item.default);
            const circleSpeedometer = document.querySelector('input[data-type="circle"]');
            $(circleSpeedometer).prop("checked", item.default == 'circle');
            const linearSpeedometer = document.querySelector('input[data-type="linear"]');
            $(linearSpeedometer).prop("checked", item.default == 'linear');
        }
    }
});

let seatbeltAlarmPlaying = false;
let seatbeltAlarmAudio;
seatbeltAlarm = () => {
    if (hasSeatbelt && isInVehicle && !seatbeltStatus) {
        if (!seatbeltAlarmPlaying || seatbeltAlarmAudio.ended) {
            seatbeltAlarmPlaying = true
            seatbeltAlarmAudio = new Audio("./sounds/seatbelt-alarm.mp3");
            seatbeltAlarmAudio.volume = 0.05
            seatbeltAlarmAudio.play();
            seatbeltAlarmAudio.onended = function() {
                seatbeltAlarmPlaying = null;
                seatbeltAlarm()
            };
        }
    }
}

document.addEventListener("keyup", (event) => {
    if (event.keyCode == 27) {
        $.post('https://vms_hud/closeCustomizationMenu');
    }
});

$('.reset-settings').click(function() {
    localStorage.setItem(`status-direction`, 'vertical');
    $("[data-option='status-direction'][data-name='vertical'][type='checkbox']").prop("checked", true);
    $("[data-option='status-direction'][data-name='horizontal'][type='checkbox']").prop("checked", false);
    $("[data-option='status-direction'][data-name='no-stack'][type='checkbox']").prop("checked", false);
    $('.status-hud').attr('style', '');

    localStorage.setItem(`health-color`, defaultColors.health);
    localStorage.setItem(`armor-color`, defaultColors.armor);
    localStorage.setItem(`stamina-color`, defaultColors.stamina);
    localStorage.setItem(`hunger-color`, defaultColors.hunger);
    localStorage.setItem(`thirst-color`, defaultColors.thirst);
    localStorage.setItem(`stress-color`, defaultColors.stress);
    localStorage.setItem(`drunk-color`, defaultColors.drunk);
    localStorage.setItem(`voice-color`, defaultColors.voice);
    
    localStorage.setItem(`speedometer-linear-color`, defaultColors.speedometer_linear);
    localStorage.setItem(`speedometer-circle-color`, defaultColors.speedometer_circle);

    localStorage.setItem("speedometer-linear-position", '')
    $('.speedometer-linear').prop('style', 'top: auto; left: auto;')
    
    localStorage.setItem("speedometer-circle-position", '')
    $('.speedometer-circle').prop('style', 'top: auto; left: auto;')

    $('.streetlabel').prop('style', '')
    localStorage.setItem(`streetlabel-position`, '');
    
    $(`input[type="button"][data-option="icons-scale"][value='${localStorage.getItem("icons-scale")}']`).removeClass('selected-button')
    localStorage.setItem(`icons-scale`, '1.0');
    $(`input[type="button"][data-option="icons-scale"][value='1.0']`).addClass('selected-button')
    $('.vehicle-hud > .speedometer-linear, .vehicle-hud > .speedometer-circle').css('transform', ``);
    
    $(`input[type="button"][data-option="icons-range-direction"][data-direction='${localStorage.getItem("icons-range-direction")}']`).removeClass('selected-button')
    localStorage.setItem(`icons-range-direction`, 'left');
    $(`input[type="button"][data-option="icons-range-direction"][data-direction='left']`).addClass('selected-button')
    $('.status-hud').css('direction', null);

    $(`input[type="button"][data-option="speedometer-scale"][value='${localStorage.getItem("speedometer-scale")}']`).removeClass('selected-button')
    localStorage.setItem(`speedometer-scale`, '1.0');
    $(`input[type="button"][data-option="speedometer-scale"][value='1.0']`).addClass('selected-button')
    $('.vehicle-hud > .speedometer-linear, .vehicle-hud > .speedometer-circle').css('transform', ``);

    $(".health-range > div").css('background', localStorage.getItem("health-color"));
    $("[data-option='health'][type='color']").prop("value", localStorage.getItem("health-color"));
    
    $(".armor-range > div").css('background', localStorage.getItem("armor-color"));
    $("[data-option='armor'][type='color']").prop("value", localStorage.getItem("armor-color"));

    $(".stamina-range > div").css('background', localStorage.getItem("stamina-color"));
    $("[data-option='stamina'][type='color']").prop("value", localStorage.getItem("stamina-color"));
    
    $(".hunger-range > div").css('background', localStorage.getItem("hunger-color"));
    $("[data-option='hunger'][type='color']").prop("value", localStorage.getItem("hunger-color"));
    
    $(".thirst-range > div").css('background', localStorage.getItem("thirst-color"));
    $("[data-option='thirst'][type='color']").prop("value", localStorage.getItem("thirst-color"));

    $(".stress-range > div").css('background', localStorage.getItem("stress-color"));
    $("[data-option='stress'][type='color']").prop("value", localStorage.getItem("stress-color"));

    $(".drunk-range > div").css('background', localStorage.getItem("drunk-color"));
    $("[data-option='drunk'][type='color']").prop("value", localStorage.getItem("drunk-color"));

    $(".voice-range > div").css('background', localStorage.getItem("voice-color"));
    $("[data-option='voice'][type='color']").prop("value", localStorage.getItem("voice-color"));

    $(".speedometer-linear > .fuel > .fuel-status > .fuel-range > div").css('background', localStorage.getItem("speedometer-linear-color"));
    $("[data-option='speedometer-linear'][type='color']").prop("value", localStorage.getItem("speedometer-linear-color"));
    
    $(".speedometer-circle > .speedometer-part > .rpm-value").css('stroke', localStorage.getItem("speedometer-circle-color"));
    $(".speedometer-circle > .speedometer-fuel > .fuel-value").css('stroke', localStorage.getItem("speedometer-circle-color"));
    $("[data-option='speedometer-circle'][type='color']").prop("value", localStorage.getItem("speedometer-circle-color"));

    if (isInVehicle) {
        if (localStorage.getItem("speedometer-type") == 'linear') {
            $(`.speedometer-linear`).show()
            $(`.speedometer-circle`).hide()
        } else {
            $(`.speedometer-circle`).show()
            $(`.speedometer-linear`).hide()
        }
    }

    $("[data-option='hide-info-hud'][type='checkbox']").prop("checked", false);
    localStorage.setItem(`hide-info-hud`, false);
    $('.player').css('display', 'block')

    localStorage.setItem(`health-visible`, '1');
    $("[data-option='health'][type='checkbox']").prop("checked", true);
    $(`.health-status`).removeClass('non-visible')
    $('.health-status').attr('style', '')
    localStorage.setItem('health-position', '')

    localStorage.setItem(`armor-visible`, '1');
    $("[data-option='armor'][type='checkbox']").prop("checked", true);
    $(`.armor-status`).removeClass('non-visible')
    $('.armor-status').attr('style', '')
    localStorage.setItem('armor-position', '')

    localStorage.setItem(`stamina-visible`, '1');
    $("[data-option='stamina'][type='checkbox']").prop("checked", true);
    $(`.stamina-status`).removeClass('non-visible')
    $('.stamina-status').attr('style', '')
    localStorage.setItem('stamina-position', '')

    localStorage.setItem(`hunger-visible`, '1');
    $("[data-option='hunger'][type='checkbox']").prop("checked", true);
    $(`.hunger-status`).removeClass('non-visible')
    $('.hunger-status').attr('style', '')
    localStorage.setItem('hunger-position', '')

    localStorage.setItem(`thirst-visible`, '1');
    $("[data-option='thirst'][type='checkbox']").prop("checked", true);
    $(`.thirst-status`).removeClass('non-visible')
    $('.thirst-status').attr('style', '')
    localStorage.setItem('thirst-position', '')

    localStorage.setItem(`stress-visible`, '1');
    $("[data-option='stress'][type='checkbox']").prop("checked", true);
    $(`.stress-status`).removeClass('non-visible')
    $('.stress-status').attr('style', '')
    localStorage.setItem('stress-position', '')

    localStorage.setItem(`drunk-visible`, '1');
    $("[data-option='drunk'][type='checkbox']").prop("checked", true);
    $(`.drunk-status`).removeClass('non-visible')
    $('.drunk-status').attr('style', '')
    localStorage.setItem('drunk-position', '')

    localStorage.setItem(`voice-visible`, '1');
    $("[data-option='voice'][type='checkbox']").prop("checked", true);
    $(`.voice-status`).removeClass('non-visible')
    $('.voice-status').attr('style', '')
    localStorage.setItem('voice-position', '')

})

let minimapTimeout = false
$('input[type="button"]').click(function() {
    if ($(this).data('option') == 'speedometer-scale') {
        if (localStorage.getItem("speedometer-scale") != null) {
            $(`input[type="button"][data-option="speedometer-scale"][value='${localStorage.getItem("speedometer-scale")}']`).removeClass('selected-button')
        }
        $(this).addClass('selected-button')
        localStorage.setItem(`speedometer-scale`, $(this).data('scale'));
        $('.vehicle-hud > .speedometer-linear, .vehicle-hud > .speedometer-circle').css('transform', `scale(${$(this).data('scale')})`);
    }
    if ($(this).data('option') == 'icons-scale') {
        if (localStorage.getItem("icons-scale") != null) {
            $(`input[type="button"][data-option="icons-scale"][value='${localStorage.getItem("icons-scale")}']`).removeClass('selected-button')
        }
        $(this).addClass('selected-button')
        localStorage.setItem(`icons-scale`, $(this).data('scale'));
        if (localStorage.getItem("icons-scale") == '1.5') {
            $('.status-hud > div').css({'transform': `scale(${$(this).data('scale')})`, 'margin-block': `2.0vh`})
        } else if (localStorage.getItem("icons-scale") == '1.25') {
            $('.status-hud > div').css({'transform': `scale(${$(this).data('scale')})`, 'margin-block': `1.5vh`})
        } else if (localStorage.getItem("icons-scale") == '1.0') {
            $('.status-hud > div').css({'transform': `scale(${$(this).data('scale')})`, 'margin-block': `1.2vh`})
        } else if (localStorage.getItem("icons-scale") == '0.75') {
            $('.status-hud > div').css({'transform': `scale(${$(this).data('scale')})`, 'margin-block': `0.4vh`})
        }
    }
    if ($(this).data('option') == 'icons-range-direction') {
        if (localStorage.getItem("icons-range-direction") != null) {
            $(`input[type="button"][data-option="icons-range-direction"][data-direction='${localStorage.getItem("icons-range-direction")}']`).removeClass('selected-button')
        }
        $(this).addClass('selected-button')
        localStorage.setItem(`icons-range-direction`, $(this).data('direction'));
        if (localStorage.getItem("icons-range-direction") == 'right') {
            $('.status-hud').css('direction', 'rtl');
        } else {
            $('.status-hud').css('direction', 'ltr');
        }
    }
    if ($(this).data('option') == 'minimap-display') {
        if (minimapTimeout) return;
        if (localStorage.getItem("minimap-display") == $(this).data('type')) return;
        if (localStorage.getItem("minimap-display") != null) {
            $(`input[type="button"][data-option="minimap-display"][data-type='${localStorage.getItem("minimap-display")}']`).removeClass('selected-button')
        }
        minimapTimeout = true;
        $(this).addClass('selected-button')
        localStorage.setItem(`minimap-display`, $(this).data('type'));
        if (localStorage.getItem("minimap-display") == "1" || localStorage.getItem("minimap-display") == "3" && isInVehicle) {
            $('.status-hud').addClass('status-hud-invehicle')
        } else if (localStorage.getItem("minimap-display") == "2" || localStorage.getItem("minimap-display") == "3" && !isInVehicle) {
            $('.status-hud').removeClass('status-hud-invehicle')
            $('.status-hud').removeClass('bigminimap')
            $('.vehicle-hud').removeClass('bigminimap')
        }
        $.post('https://vms_hud/changeMinimap', JSON.stringify({minimap: localStorage.getItem("minimap"), display: localStorage.getItem("minimap-display")}));
        setTimeout(() => {
            minimapTimeout = false;
        }, 850);
    }
})

$('input[type="checkbox"]').click(function() {
    if ($(this).is(':checked')) {
        if ($(this).data('option')) {
            if ($(this).data('option') == 'health' || $(this).data('option') == 'armor' || $(this).data('option') == 'stamina' || $(this).data('option') == 'hunger' || $(this).data('option') == 'thirst' || $(this).data('option') == 'stress' || $(this).data('option') == 'drunk' || $(this).data('option') == 'voice') {
                $(`.${$(this).data('option')}-status`).removeClass('non-visible')
                localStorage.setItem(`${$(this).data('option')}-visible`, '1');
            }
            if ($(this).data('option') == 'status-direction') {
                if ($(this).data('name') == 'vertical') {
                    const horizontalCheck = document.querySelector('input[data-option="status-direction"][data-name="horizontal"]');
                    $(horizontalCheck).prop("checked", false);
                    const noStackCheck = document.querySelector('input[data-option="status-direction"][data-name="no-stack"]');
                    $(noStackCheck).prop("checked", false);
                    localStorage.setItem(`status-direction`, 'vertical');
                    $('.status-hud').attr('style', '');
                    localStorage.setItem('health-position', '')
                    localStorage.setItem('armor-position', '')
                    localStorage.setItem('stamina-position', '')
                    localStorage.setItem('hunger-position', '')
                    localStorage.setItem('thirst-position', '')
                    localStorage.setItem('stress-position', '')
                    localStorage.setItem('drunk-position', '')
                    localStorage.setItem('voice-position', '')
                    $('.health-status, .armor-status, .stamina-status, .hunger-status, .thirst-status, .stress-status, .drunk-status, .voice-status').attr('style', null);
                } else if ($(this).data('name') == 'horizontal') {
                    const verticalCheck = document.querySelector('input[data-option="status-direction"][data-name="vertical"]');
                    $(verticalCheck).prop("checked", false);
                    const noStackCheck = document.querySelector('input[data-option="status-direction"][data-name="no-stack"]');
                    $(noStackCheck).prop("checked", false);
                    localStorage.setItem(`status-direction`, 'horizontal');
                    $('.status-hud').attr('style', 'display: flex');
                    localStorage.setItem('health-position', '')
                    localStorage.setItem('armor-position', '')
                    localStorage.setItem('stamina-position', '')
                    localStorage.setItem('hunger-position', '')
                    localStorage.setItem('thirst-position', '')
                    localStorage.setItem('stress-position', '')
                    localStorage.setItem('drunk-position', '')
                    localStorage.setItem('voice-position', '')
                    $('.health-status, .armor-status, .stamina-status, .hunger-status, .thirst-status, .stress-status, .drunk-status, .voice-status').attr('style', null);
                } else {
                    const horizontalCheck = document.querySelector('input[data-option="status-direction"][data-name="horizontal"]');
                    $(horizontalCheck).prop("checked", false);
                    const verticalCheck = document.querySelector('input[data-option="status-direction"][data-name="vertical"]');
                    $(verticalCheck).prop("checked", false);
                    localStorage.setItem(`status-direction`, 'no-stack');
                    $('.health-status').attr('style', 'position: fixed; bottom: 295px; left: 11px');
                    localStorage.setItem('health-position', $('.health-status').attr('style'))
                    $('.armor-status').attr('style', 'position: fixed; bottom: 250px; left: 11px');
                    localStorage.setItem('armor-position', $('.armor-status').attr('style'))
                    $('.stamina-status').attr('style', 'position: fixed; bottom: 205px; left: 11px');
                    localStorage.setItem('stamina-position', $('.stamina-status').attr('style'))
                    $('.hunger-status').attr('style', 'position: fixed; bottom: 160px; left: 11px');
                    localStorage.setItem('hunger-position', $('.hunger-status').attr('style'))
                    $('.thirst-status').attr('style', 'position: fixed; bottom: 115px; left: 11px');
                    localStorage.setItem('thirst-position', $('.thirst-status').attr('style'))
                    $('.stress-status').attr('style', 'position: fixed; bottom: 70px; left: 11px');
                    localStorage.setItem('stress-position', $('.stress-status').attr('style'))
                    $('.drunk-status').attr('style', 'position: fixed; bottom: 70px; left: 11px');
                    localStorage.setItem('drunk-position', $('.drunk-status').attr('style'))
                    $('.voice-status').attr('style', 'position: fixed; bottom: 25px; left: 11px');
                    localStorage.setItem('voice-position', $('.voice-status').attr('style'))
                }
            }
            if ($(this).data('option') == 'minimap') {
                minimapTimeout = true;
                if ($(this).data('name') == 'circle') {
                    const squareCheck = document.querySelector('input[data-option="minimap"][data-name="square"]');
                    $(squareCheck).prop("checked", false);
                    localStorage.setItem(`minimap`, 'circle');
                    $.post('https://vms_hud/changeMinimap', JSON.stringify({minimap: 'circle', display: localStorage.getItem("minimap-display")}));
                } else {
                    const circleCheck = document.querySelector('input[data-option="minimap"][data-name="circle"]');
                    $(circleCheck).prop("checked", false);
                    localStorage.setItem(`minimap`, 'square');
                    $.post('https://vms_hud/changeMinimap', JSON.stringify({minimap: 'square', display: localStorage.getItem("minimap-display")}));
                }
                setTimeout(() => {
                    minimapTimeout = false;
                }, 850);
            }
            if ($(this).data('option') == 'hide-info-hud') {
                localStorage.setItem(`hide-info-hud`, true);
                $('.player').css('display', 'none')
            }
        }
        if ($(this).data('name') == 'speedometer') {
            if ($(this).data('type') == 'linear') {
                const circleSpeedometer = document.querySelector('input[data-type="circle"]');
                $('.speedometer-linear').fadeIn(100)
                $('.speedometer-circle').fadeOut(100)
                $(circleSpeedometer).prop("checked", false);
                localStorage.setItem("speedometer-type", 'linear')
            } else {
                const linearSpeedometer = document.querySelector('input[data-type="linear"]');
                $(linearSpeedometer).prop("checked", false);
                $('.speedometer-circle').fadeIn(100)
                $('.speedometer-linear').fadeOut(100)
                localStorage.setItem("speedometer-type", 'circle')
            }
        }
        if ($(this).data('name') == 'cinematic-mode') {
            cinematicMode = 1
            $('.info-hud').fadeOut(100);
            $('.status-hud').fadeOut(100);
            $('.vehicle-hud').fadeOut(100);
            $('.cinematic-hud').fadeIn(100);
            $.post('https://vms_hud/cinematicMode', JSON.stringify({show: true}));
        }
    } else if (!$(this).is(':checked')) {
        if ($(this).data('option')) {
            if ($(this).data('option') == 'health' || $(this).data('option') == 'armor' || $(this).data('option') == 'stamina' || $(this).data('option') == 'hunger' || $(this).data('option') == 'thirst' || $(this).data('option') == 'stress' || $(this).data('option') == 'drunk' || $(this).data('option') == 'voice') {
                localStorage.setItem(`${$(this).data('option')}-visible`, '0');
                $(`.${$(this).data('option')}-status`).addClass('non-visible')
            }
            if ($(this).data('option') == 'status-direction') {
                if ($(this).data('name') == 'vertical') {
                    const horizontalCheck = document.querySelector('input[data-option="status-direction"][data-name="horizontal"]');
                    $(horizontalCheck).prop("checked", true);
                    localStorage.setItem(`status-direction`, 'horizontal');
                    localStorage.setItem('health-position', '')
                    localStorage.setItem('armor-position', '')
                    localStorage.setItem('stamina-position', '')
                    localStorage.setItem('hunger-position', '')
                    localStorage.setItem('thirst-position', '')
                    localStorage.setItem('stress-position', '')
                    localStorage.setItem('drunk-position', '')
                    localStorage.setItem('voice-position', '')
                    $('.status-hud').attr('style', 'display: flex');
                } else if ($(this).data('name') == 'horizontal') {
                    const verticalCheck = document.querySelector('input[data-option="status-direction"][data-name="vertical"]');
                    $(verticalCheck).prop("checked", true);
                    $('.status-hud').attr('style', '')
                    localStorage.setItem('health-position', '')
                    localStorage.setItem('armor-position', '')
                    localStorage.setItem('stamina-position', '')
                    localStorage.setItem('hunger-position', '')
                    localStorage.setItem('thirst-position', '')
                    localStorage.setItem('stress-position', '')
                    localStorage.setItem('drunk-position', '')
                    localStorage.setItem('voice-position', '')
                    localStorage.setItem(`status-direction`, 'vertical');
                } else if ($(this).data('name') == 'no-stack') {
                    const verticalCheck = document.querySelector('input[data-option="status-direction"][data-name="vertical"]');
                    $(verticalCheck).prop("checked", true);
                    $('.status-hud').attr('style', '')
                    localStorage.setItem(`status-direction`, 'vertical');
                    localStorage.setItem('health-position', '')
                    localStorage.setItem('armor-position', '')
                    localStorage.setItem('stamina-position', '')
                    localStorage.setItem('hunger-position', '')
                    localStorage.setItem('thirst-position', '')
                    localStorage.setItem('stress-position', '')
                    localStorage.setItem('drunk-position', '')
                    localStorage.setItem('voice-position', '')
                    $('.health-status, .armor-status, .stamina-status, .hunger-status, .thirst-status, .stress-status, .drunk-status, .voice-status').attr('style', null);
                }
            }
            if ($(this).data('option') == 'minimap') {
                minimapTimeout = true;
                if ($(this).data('name') == 'circle') {
                    const squareCheck = document.querySelector('input[data-option="minimap"][data-name="square"]');
                    $(squareCheck).prop("checked", true);
                    localStorage.setItem(`minimap`, 'square');
                    $.post('https://vms_hud/changeMinimap', JSON.stringify({minimap: 'square', display: localStorage.getItem("minimap-display")}));
                } else {
                    const circleCheck = document.querySelector('input[data-option="minimap"][data-name="circle"]');
                    $(circleCheck).prop("checked", true);
                    $.post('https://vms_hud/changeMinimap', JSON.stringify({minimap: 'circle', display: localStorage.getItem("minimap-display")}));
                }
                setTimeout(() => {
                    minimapTimeout = false;
                }, 850);
            }
            if ($(this).data('option') == 'hide-info-hud') {
                localStorage.setItem(`hide-info-hud`, false);
                $('.player').css('display', 'block')
            }
        }
        if ($(this).data('name') == 'speedometer') {
            if ($(this).data('type') == 'linear') {
                const circleSpeedometer = document.querySelector('input[data-type="circle"]');
                $('.speedometer-circle').fadeIn(100)
                $('.speedometer-linear').fadeOut(100)
                $(circleSpeedometer).prop("checked", true);
                localStorage.setItem("speedometer-type", 'circle')
            } else {
                const linearSpeedometer = document.querySelector('input[data-type="linear"]');
                $(linearSpeedometer).prop("checked", true);
                $('.speedometer-linear').fadeIn(100)
                $('.speedometer-circle').fadeOut(100)
                localStorage.setItem("speedometer-type", 'linear')
            }
        }
        if ($(this).data('name') == 'cinematic-mode') {
            cinematicMode = 0
            $('.info-hud').fadeIn(100)
            $('.status-hud').fadeIn(100)
            $('.cinematic-hud').fadeOut(100)
            $.post('https://vms_hud/cinematicMode', JSON.stringify({show: false}));
            if (isInVehicle) {
                $('.vehicle-hud').fadeIn(100)
            }
        }
    }
});

var isOver = true
var iconCurrentPosition = null
registerDraggableItems = function() {
    if (disableCenterIcon) {
        $(".customize-options").mouseenter(function(){
            isOver = true
        }).mouseleave(function(){
            isOver = false
        });
        
        $('.health-status').draggable({
            start: function() {
                iconCurrentPosition = $(this).attr('style')
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
                $(".customize-hud-menu").css({'z-index': '50000'})
            },
            stop: function(event, ui) {
                $(".customize-hud-menu").css({'z-index': ''})
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                if (isOver) {
                    localStorage.setItem('health-position', iconCurrentPosition)
                    $(this).attr('style', iconCurrentPosition)
                    iconCurrentPosition = null
                } else {
                    localStorage.setItem('health-position', $(this).attr('style'))
                }
            }
        })

        $('.armor-status').draggable({
            start: function() {
                iconCurrentPosition = $(this).attr('style')
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
                $(".customize-hud-menu").css({'z-index': '50000'})
            },
            stop: function(event, ui) {
                $(".customize-hud-menu").css({'z-index': ''})
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                if (isOver) {
                    localStorage.setItem('armor-position', iconCurrentPosition)
                    $(this).attr('style', iconCurrentPosition)
                    iconCurrentPosition = null
                } else {
                    localStorage.setItem('armor-position', $(this).attr('style'))
                }
            }
        })
        
        $('.stamina-status').draggable({
            start: function() {
                iconCurrentPosition = $(this).attr('style')
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
                $(".customize-hud-menu").css({'z-index': '50000'})
            },
            stop: function(event, ui) {
                $(".customize-hud-menu").css({'z-index': ''})
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                if (isOver) {
                    localStorage.setItem('stamina-position', iconCurrentPosition)
                    $(this).attr('style', iconCurrentPosition)
                    iconCurrentPosition = null
                } else {
                    localStorage.setItem('stamina-position', $(this).attr('style'))
                }
            }
        })
        
        $('.hunger-status').draggable({
            start: function() {
                iconCurrentPosition = $(this).attr('style')
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
                $(".customize-hud-menu").css({'z-index': '50000'})
            },
            stop: function(event, ui) {
                $(".customize-hud-menu").css({'z-index': ''})
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                if (isOver) {
                    localStorage.setItem('hunger-position', iconCurrentPosition)
                    $(this).attr('style', iconCurrentPosition)
                    iconCurrentPosition = null
                } else {
                    localStorage.setItem('hunger-position', $(this).attr('style'))
                }
            }
        })
        
        $('.thirst-status').draggable({
            start: function() {
                iconCurrentPosition = $(this).attr('style')
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
                $(".customize-hud-menu").css({'z-index': '50000'})
            },
            stop: function(event, ui) {
                $(".customize-hud-menu").css({'z-index': ''})
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                if (isOver) {
                    localStorage.setItem('thirst-position', iconCurrentPosition)
                    $(this).attr('style', iconCurrentPosition)
                    iconCurrentPosition = null
                } else {
                    localStorage.setItem('thirst-position', $(this).attr('style'))
                }
            }
        })

        $('.stress-status').draggable({
            start: function() {
                iconCurrentPosition = $(this).attr('style')
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
                $(".customize-hud-menu").css({'z-index': '50000'})
            },
            stop: function(event, ui) {
                $(".customize-hud-menu").css({'z-index': ''})
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                if (isOver) {
                    localStorage.setItem('stress-position', iconCurrentPosition)
                    $(this).attr('style', iconCurrentPosition)
                    iconCurrentPosition = null
                } else {
                    localStorage.setItem('stress-position', $(this).attr('style'))
                }
            }
        })

        $('.drunk-status').draggable({
            start: function() {
                iconCurrentPosition = $(this).attr('style')
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
                $(".customize-hud-menu").css({'z-index': '50000'})
            },
            stop: function(event, ui) {
                $(".customize-hud-menu").css({'z-index': ''})
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                if (isOver) {
                    localStorage.setItem('drunk-position', iconCurrentPosition)
                    $(this).attr('style', iconCurrentPosition)
                    iconCurrentPosition = null
                } else {
                    localStorage.setItem('drunk-position', $(this).attr('style'))
                }
            }
        })

        $('.voice-status').draggable({
            start: function() {
                iconCurrentPosition = $(this).attr('style')
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
                $(".customize-hud-menu").css({'z-index': '50000'})
            },
            stop: function(event, ui) {
                $(".customize-hud-menu").css({'z-index': ''})
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                if (isOver) {
                    localStorage.setItem('voice-position', iconCurrentPosition)
                    $(this).attr('style', iconCurrentPosition)
                    iconCurrentPosition = null
                } else {
                    localStorage.setItem('voice-position', $(this).attr('style'))
                }
            }
        })

    } else {
        $('.health-status').draggable({
            start: function() {
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
            },
            stop: function(event, ui) {
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                localStorage.setItem('health-position', $(this).attr('style'))
            }
        })

        $('.armor-status').draggable({
            start: function() {
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
            },
            stop: function(event, ui) {
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                localStorage.setItem('armor-position', $(this).attr('style'))
            }
        })
        
        $('.stamina-status').draggable({
            start: function() {
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
            },
            stop: function(event, ui) {
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                localStorage.setItem('stamina-position', $(this).attr('style'))
            }
        })
        
        $('.hunger-status').draggable({
            start: function() {
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
            },
            stop: function(event, ui) {
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                localStorage.setItem('hunger-position', $(this).attr('style'))
            }
        })
        
        $('.thirst-status').draggable({
            start: function() {
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
            },
            stop: function(event, ui) {
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                localStorage.setItem('thirst-position', $(this).attr('style'))
            }
        })

        $('.stress-status').draggable({
            start: function() {
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
            },
            stop: function(event, ui) {
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                localStorage.setItem('stress-position', $(this).attr('style'))
            }
        })

        $('.drunk-status').draggable({
            start: function() {
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
            },
            stop: function(event, ui) {
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                localStorage.setItem('drunk-position', $(this).attr('style'))
            }
        })

        $('.voice-status').draggable({
            start: function() {
                $('.hud-grid-template').fadeIn(50);
                $('.customize-hud-menu').css('opacity', '0.2');
            },
            stop: function(event, ui) {
                $('.hud-grid-template').fadeOut(50);
                $('.customize-hud-menu').css('opacity', '1.0');
                localStorage.setItem('voice-position', $(this).attr('style'))
            }
        })
    }
    $('.streetlabel').draggable({
        start: function() {
            $('.hud-grid-template').fadeIn(50);
            $('.customize-hud-menu').css('opacity', '0.2');
        },
        stop: function(event, ui) {
            $('.hud-grid-template').fadeOut(50);
            $('.customize-hud-menu').css('opacity', '1.0');
            localStorage.setItem('streetlabel-position', $(this).attr('style'))
        }
    })
    $('.speedometer-linear').draggable({
        start: function() {
            $('.hud-grid-template').fadeIn(50);
            $('.customize-hud-menu').css('opacity', '0.2');
        },
        stop: function(event, ui) {
            $('.hud-grid-template').fadeOut(50);
            $('.customize-hud-menu').css('opacity', '1.0');
            localStorage.setItem('speedometer-linear-position', $(this).attr('style'))
        }
    })
    $('.speedometer-circle').draggable({
        start: function() {
            $('.hud-grid-template').fadeIn(50);
            $('.customize-hud-menu').css('opacity', '0.2');
        },
        stop: function(event, ui) {
            $('.hud-grid-template').fadeOut(50);
            $('.customize-hud-menu').css('opacity', '1.0');
            localStorage.setItem('speedometer-circle-position', $(this).attr('style'))
        }
    })
}