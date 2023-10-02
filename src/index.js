import $ from "jquery";
import Swiper from 'swiper/bundle'; // TODO: limit to only modules used, likely just autoplay
import 'swiper/css/bundle';
import './styles.css';

var slideshowDelayInMinutes = 15; // * Change this one as you like *
var slideshowDelayInMilliseconds = slideshowDelayInMinutes * 60000;
var resizeInfoTimeoutInSeconds = 10;
var resizeInfoTimeoutInMilliseconds = resizeInfoTimeoutInSeconds * 1000;

// Load in images
var folder = "images/";

$.ajax({
    url : folder,
    success: function (data) {
      var images = [];
      $(data).find("a").attr("href", function (i, val) {
          if( val.match(/\.(jpe?g|png|gif)$/) ) { 
              images.push( folder + val );
            } 
      });
      shuffleArray(images);
      images.forEach((image) => {
        $(".swiper-wrapper").append( "<div class='swiper-slide' data-bg-url='/"+ image +"'></div>" );
      });
    },
    complete: function (data) {
      initSwiper(); 
    }
});

function initSwiper() {
  // Initialize Swiper
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    autoplay: {
      delay: slideshowDelayInMilliseconds,
    },
    init: false,
  });
  swiper.on('init', function() {
    // Swap the data-bg-url as background-image style attributes of each slide
    $('.swiper-slide').each(function(i, obj) {
      $(this).css('background-image','url('+ $(this).attr('data-bg-url') +')');
    });
  });
  swiper.init();
}

// On window resize, show the resize text and update it
$( window ).on( "resize", function() {
  var width = $( window ).width();
  var height = $( window ).height();
  var r = gcd (width, height);

  var sixteenNineAspectWidth = Math.round(((16/9) * height));

  $( '.window-resize-info' )
    .text(`Width: ${ width } Height: ${ height }, ${ width/r }:${ height/r }, 16:9 Desired Width: ${ sixteenNineAspectWidth }`)
    .addClass('visible');

  setTimeout(hideResizeInfo, resizeInfoTimeoutInMilliseconds);
} );

function hideResizeInfo() {
  $( '.window-resize-info' ).removeClass('visible');
}

/** -----------------------
 * Utility Functions
 * ----------------------- */
// Thanks to https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Aspect ratio calc function thanks to https://stackoverflow.com/a/1186465
function gcd (a, b) {
  return (b == 0) ? a : gcd (b, a%b);
}