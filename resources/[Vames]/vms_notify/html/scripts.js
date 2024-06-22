window.onload = function(e) {
    $.post('https://vms_notify/loaded');
}
var positionsSettings = {
    'right': {
        animeIn: -165,
        animeOut: 500,
        startMargin: '0px 0px 0px -25px',
        float: 'right',
        skew: '2deg',
    },
    'left': {
        animeIn: 60,
        animeOut: -500,
        startMargin: '0px 0px 0px -55px',
        float: 'left',
        skew: '-2deg',
    },
}

var currentQuestion = null

var defaultPos = null
var useSkew = false

var sound = new Audio('sound.mp3');
sound.volume = 0.2;

window.addEventListener('message', function (event) {
    if (event.data.action == 'load') {
        if (event.data.defaultPos) {
            defaultPos = event.data.defaultPos
        }
        if (event.data.useSkew) {
            useSkew = event.data.useSkew
        }
    } else if (event.data.action == 'openNotification') {
        $('.notify').css('float', positionsSettings[defaultPos].float)
        $('.wrapper').css('float', positionsSettings[defaultPos].float)
        var number = Math.floor((Math.random() * 1000) + 1);
        $('.notify').append(`
            <div class="notification wrapper-${number}">
                <div class="main notification_main-${number}">
                    <div class="title title-${number}"><i class="${event.data.icon} icon" style="color: ${event.data.color}"></i>${event.data.title}</div>
                    <div class="description text-${number}">
                        ${event.data.description}
                    </div>
                </div>
            </div>
        `)
        $(`.wrapper-${number}`).css({
            "margin": `${positionsSettings[defaultPos].startMargin}`,
        })
        sound.play();
        if (useSkew) {
            anime({
                targets: `.wrapper-${number}`,
                translateX: positionsSettings[defaultPos].animeIn,
                skewY: positionsSettings[defaultPos].skew,
                duration: 750,
                "margin-bottom": "10px",
                easing: 'spring(1, 70, 100, 10)',
            })
            setTimeout(function () {
                anime({
                    targets: `.wrapper-${number}`,
                    translateX: positionsSettings[defaultPos].animeOut,
                    skewY: positionsSettings[defaultPos].skew,
                    duration: 750,
                    "margin-bottom": "10px",
                    easing: 'spring(1, 80, 100, 0)'
                })
                setTimeout(function () {
                    $(`.wrapper-${number}`).remove()
                }, 750)
            }, event.data.time)
        } else {
            anime({
                targets: `.wrapper-${number}`,
                translateX: positionsSettings[defaultPos].animeIn,
                duration: 750,
                "margin-bottom": "10px",
                easing: 'spring(1, 70, 100, 10)',
            })
            setTimeout(function () {
                anime({
                    targets: `.wrapper-${number}`,
                    translateX: positionsSettings[defaultPos].animeOut,
                    duration: 750,
                    "margin-bottom": "10px",
                    easing: 'spring(1, 80, 100, 0)'
                })
                setTimeout(function () {
                    $(`.wrapper-${number}`).remove()
                }, 750)
            }, event.data.time)
        }
    } else if (event.data.action == 'openQuestion') {
        $('.notify').css('float', positionsSettings[defaultPos].float)
        $('.wrapper').css('float', positionsSettings[defaultPos].float)
        currentQuestion = Math.floor((Math.random() * 1000) + 1);
        $('.notify').append(`
            <div class="notification wrapper-${currentQuestion}">
                <div class="main notification_main-${currentQuestion}">
                    <div class="title title-${currentQuestion}"><i class="${event.data.icon} icon" style="color: ${event.data.color}"></i>${event.data.title}</div>
                    <div class="description text-${currentQuestion}">
                        ${event.data.description}
                    </div>
                    <div class="question-buttons">
                        <div class="question-accept-button">
                            <div>Y</div>
                        </div>
                        <div class="question-reject-button">
                            <div>N</div>
                        </div>
                    </div>
                </div>
            </div>
        `)
        $(`.wrapper-${currentQuestion}`).css({
            "margin": `${positionsSettings[defaultPos].startMargin}`,
        })
        sound.play();
        if (useSkew) {
            anime({
                targets: `.wrapper-${currentQuestion}`,
                translateX: positionsSettings[defaultPos].animeIn,
                skewY: positionsSettings[defaultPos].skew,
                duration: 750,
                "margin-bottom": "10px",
                easing: 'spring(1, 70, 100, 10)',
            })
        } else {
            anime({
                targets: `.wrapper-${currentQuestion}`,
                translateX: positionsSettings[defaultPos].animeIn,
                duration: 750,
                "margin-bottom": "10px",
                easing: 'spring(1, 70, 100, 10)',
            })
        }
    } else if (event.data.action == 'closeQuestion') {
        if (useSkew) {
            if (event.data.button == 'y') {
                $('.question-accept-button').addClass('pressed')
            } else {
                $('.question-reject-button').addClass('pressed')
            }
            setTimeout(function () {
                anime({
                    targets: `.wrapper-${currentQuestion}`,
                    translateX: positionsSettings[defaultPos].animeOut,
                    skewY: positionsSettings[defaultPos].skew,
                    duration: 750,
                    "margin-bottom": "10px",
                    easing: 'spring(1, 80, 100, 0)'
                })
                setTimeout(function () {
                    $(`.wrapper-${currentQuestion}`).remove()
                    $('.question-accept-button').removeClass('pressed')
                    $('.question-reject-button').removeClass('pressed')
                }, 750)
            }, 200)
        } else {
            if (event.data.button == 'y') {
                $('.question-accept-button').addClass('pressed')
            } else {
                $('.question-reject-button').addClass('pressed')
            }
            setTimeout(function () {
                anime({
                    targets: `.wrapper-${currentQuestion}`,
                    translateX: positionsSettings[defaultPos].animeOut,
                    duration: 750,
                    "margin-bottom": "10px",
                    easing: 'spring(1, 80, 100, 0)'
                })
                setTimeout(function () {
                    $(`.wrapper-${currentQuestion}`).remove()
                    $('.question-accept-button').removeClass('pressed')
                    $('.question-reject-button').removeClass('pressed')
                }, 750)
            }, 200)
        }
    }
})