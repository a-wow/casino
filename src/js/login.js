/**
 * A-WoW.
 */

/*
 Execute these functions through a function when HTML.document is fully loaded
 */
$(document).ready(function () {
    fadeOutCreateAccount();
    fadeOutLogin();
    fadeOutBack();
});

var $emitter = $('#emitter'),
    spawnEvery = 10, //spawn a new particle every X ms
    removeEvery = 1000; //remove a particles after X ms

function create() {

    //create div through JS == particle and set random values + controlling the size/speed through CSS .particle
    var $particle = $('<div class="particle" />'),
        x = randomMinMax(-75, 75),
        y = randomMinMax(-75, 75),
        z = randomMinMax(-75, 75),
        tilt = randomMinMax(0, 360); //Sets how the particle shall tilt

        //Set the color of each particle
        r = Math.round(randomMinMax(0, 50));
        g = Math.round(randomMinMax(0, 255));;
        b = Math.round(randomMinMax(0, 50));;
        particleColor = (r + ',' + g +',' + b);
    $particle.css('background-color', 'rgb('+particleColor+')');
    console.log('rgb('+particleColor+')');
    $emitter.append( $particle ); //Adds the particle DIV to the emitter DIV

    //after a short timeout, set css to be transitioned to. Without the timeout, we would not see the transition
    window.setTimeout(function() {
        $particle.css({
            webkitTransform: 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(' + z + 'px) rotateX(' + tilt + 'deg)', //x,y,z sets the size of particle AND tilt sets how fast the particle shall tilt
            opacity: 0 //Makes the opacity 0 of each particle when fading out
        });
        console.log("new particle");
    }, 0); //Sets the x,y,z and tilt 0.01s after page is loaded and it SETS the length of each particle casted on the website, 0 = particle reach 100% width and 100% height.

    //remove current particle after time = removeEvery sets the time in ms
    window.setTimeout(function() {
        $particle.remove();
    }, removeEvery);

    //create next particle = spawnEvery sets the time in ms | create = makes the function run in a loop.
    window.setTimeout(create, spawnEvery);

}

function randomMinMax(min, max) {
    return Math.random() * (max - min);
}

//execute first particle creation afterwards it runs in a loop
create();

//Make background Divs follow mousecursor
var box=$("#scene");
//Set the center of the box in a list
var boxCenter=[box.offset().left+box.width()/2, box.offset().top+box.height()/2];
/*
$(document).mousemove(function(e){
    //Math.atan2 makes a coordinate: x,y(Mouse Cursor) and the Emitter inside Scene goes to that Coordinate
    var coordination = Math.atan2(e.pageX-boxCenter[0],- (e.pageY- boxCenter[1]) )*(180/Math.PI);

    box.css({ "-webkit-transform": 'rotate(' + coordination + 'deg)'});
    box.css({ '-moz-transform': 'rotate(' + coordination + 'deg)'});
    box.css({ 'transform': 'rotate(' + coordination + 'deg)'});

});
*/



function fadeOutCreateAccount() {
    $('#frontCreateAccountButton').click(function () {
        $('#createAccountContainer').fadeIn('slow');
    });
}

function fadeOutLogin() {
    $('#frontLoginButton').click(function () {
        $('#loginContainer').fadeIn('slow');
    });
}

function fadeOutBack() {
    $('.frontBackButton').click(function () {
        $('#frontContainer').fadeIn('slow');
    });
}

function showFrontCreateAccount() {
    document.getElementById('container').style.display = "block";
    document.getElementById('loginContainer').style.display = "none";
    document.getElementById('frontContainer').style.display = "none";
}

function showFrontLogin() {
    document.getElementById('container').style.display = "block";
    document.getElementById('createAccountContainer').style.display = "none";
    document.getElementById('frontContainer').style.display = "none";
}

function showFrontpage() {
    document.getElementById('frontParent').style.display = "block";
    document.getElementById('createAccountContainer').style.display = "none";
    document.getElementById('loginContainer').style.display = "none";
    document.getElementById('container').style.display = "none";
}
