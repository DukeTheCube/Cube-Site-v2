$(document).ready(function() {

    triggerAnimation();
    localStorage.removeItem("first_time");
    var firstTime = localStorage.getItem("first_time");
    if (!firstTime) {
        // first time loaded!
        localStorage.setItem("first_time", "1");

        render(0.001);

        setTimeout(function() {

            $("#mycube").fadeOut(1000, function() {
                cancelAnimationFrame(cubeAnimationID);
                initialContent();
            });

        }, 1000);
    } else {
        $("#mycube").remove();
        initialContent();

    }

});

function makeContentVisible() {

}

function rubiksCubeFunctionality() {
    var scene = document.getElementById("scene");
    document.ondragstart = function() {
        return false;
    }
    window.addEventListener('load', assembleCube);
    scene.addEventListener('mousedown', mousedown);
}

function initialContent() {
    $("#scene").css("display", "block");
    rubiksCubeFunctionality();
    titleIn();
    //$("#cubeRow").remove();
    appendParticles();
    addContent();
}

function triggerAnimation() {
    $(document).delegate('.open', 'click', function(event) {
        $(this).addClass('oppenned');
        event.stopPropagation();
    })
    $(document).delegate('body', 'click', function(event) {
        $('.open').removeClass('oppenned');
    })
    $(document).delegate('.cls', 'click', function(event) {
        $('.open').removeClass('oppenned');
        event.stopPropagation();
    });
}

/*------nav bar---------*/
$('.open-overlay').click(function() {
    console.log("OPen overlay clicked");
    $('.open-overlay').css('pointer-events', 'none');
    var overlay_navigation = $('.overlay-navigation'),
        top_bar = $('.bar-top'),
        middle_bar = $('.bar-middle'),
        bottom_bar = $('.bar-bottom');

    overlay_navigation.toggleClass('overlay-active');
    if (overlay_navigation.hasClass('overlay-active')) {

        top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar');
        middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar');
        bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar');
        overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down')
        overlay_navigation.velocity('transition.slideLeftIn', {
            duration: 300,
            delay: 0,
            begin: function() {
                $('nav ul li').velocity('transition.perspectiveLeftIn', {
                    stagger: 150,
                    delay: 0,
                    complete: function() {
                        $('nav ul li a').velocity({
                            opacity: [1, 0],
                        }, {
                            delay: 10,
                            duration: 140
                        });
                        $('.open-overlay').css('pointer-events', 'auto');
                    }
                })
            }
        })

    } else {
        $('.open-overlay').css('pointer-events', 'none');
        top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
        middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
        bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
        overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
        $('nav ul li').velocity('transition.perspectiveRightOut', {
            stagger: 150,
            delay: 0,
            complete: function() {
                overlay_navigation.velocity('transition.fadeOut', {
                    delay: 0,
                    duration: 300,
                    complete: function() {
                        $('nav ul li a').velocity({
                            opacity: [0, 1],
                        }, {
                            delay: 0,
                            duration: 50
                        });
                        $('.open-overlay').css('pointer-events', 'auto');
                    }
                });
            }
        })
    }
})
