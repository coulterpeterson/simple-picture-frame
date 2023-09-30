import $ from "jquery";
import Swiper from 'swiper';
import 'swiper/css/bundle';
import './styles.css';

var slideshowDelayInMinutes = 15; // * Change this one as you like *
var slideshowDelayInMilliseconds = slideshowDelayInMinutes * 60000;

// Load in images
var folder = "images/";

$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                $(".swiper-wrapper").append( "<div class='swiper-slide' data-bg-url='/"+ folder + val +"'></div>" ); // <img src='"+ folder + val +"'>
              } 
        });

        // Initialize Swiper
        const swiper = new Swiper('.swiper', {
          // Optional parameters
          loop: true,
          autoplay: {
            delay: slideshowDelayInMilliseconds,
          },
          on: {
            init: function () {
              // Swap the data-bg-url as background-image style attributes of each slide
              $('.swiper-slide').each(function(i, obj) {
                $(this).css('background-image','url('+ $(this).attr('data-bg-url') +')');
              });
            },
          },
        });
    }
});

// On window resize, show the resize text and update it
$( window ).on( "resize", function() {
  var width = $( window ).width();
  var height = $( window ).height();
  var r = gcd (width, height);

  $( '.window-resize-info' )
    .text(`Width: ${ width } Height: ${ height }, ${ width/r }:${ height/r }`)
    .addClass('visible');

  setTimeout(hideResizeInfo, 5000);
} );

// Aspect ratio calc function thanks to https://stackoverflow.com/a/1186465
function gcd (a, b) {
  return (b == 0) ? a : gcd (b, a%b);
}

function hideResizeInfo() {
  $( '.window-resize-info' ).removeClass('visible');
}