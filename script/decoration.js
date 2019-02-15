'use strict';

// this cod determine action of the settings button
let posSettings = 0;

  $('.b-options-search').click(function () {

    if(posSettings == 0){

      $('.b-options-search img').attr("style", "transform:rotate(-180deg)");

      $('.search-settings').animate({
        "right": "5px"
      }, 2000);

      posSettings = 1;

    } else {
      $('.b-options-search img').attr("style", "transform:rotate(180deg)");

      $('.search-settings').animate({
        "right": "-280px"
      }, 2000);

      posSettings = 0;
    };

  });
