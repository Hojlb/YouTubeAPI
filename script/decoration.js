'use strict';

// this cod determine action of the settings button
let posSettings = true;

function hideElement(elem, time, offset) {
  elem.animate({
    "right": `${offset}`
  }, time);
}

  $('.b-options-search').click(function () {

    if(posSettings){

      $('.b-options-search img').attr("style", "transform:rotate(-180deg)");
      hideElement( $('.search-settings'), 2000, "5px" );

      posSettings = false;

    } else {
      $('.b-options-search img').attr("style", "transform:rotate(180deg)");
      hideElement( $('.search-settings'), 2000, "-280px" );

      posSettings = true;
    };

  });

  $('#rangeResults').on('input', displayRangeData);

  const rangeDisplay = $('#rangeDisplay');

  function displayRangeData() {
    let value = $(this).val();
    rangeDisplay.prop('textContent', value);
  }
