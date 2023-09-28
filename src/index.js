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
                console.log(folder + val);
                $(".swiper-wrapper").append( "<div class='swiper-slide'><img src='"+ folder + val +"'></div>" );
              } 
        });

        // Initialize Swiper
        const swiper = new Swiper('.swiper', {
          // Optional parameters
          loop: true,
          autoplay: {
            delay: slideshowDelayInMilliseconds,
          },
        });
    }
});