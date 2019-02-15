'use strict';

$(document).ready(function(){
  //Code here
  const key = 'AIzaSyDESXpqfADkPJ0I851gH1BsjIGU57I7m58';
  let playlistId = 'PLWKjhJtqVAbkyK9woUZUtunToLtNGoQHB';
  let URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  let searchURL = 'https://www.googleapis.com/youtube/v3/search';
  let channelURL = 'https://www.googleapis.com/youtube/v3/playlists';
  //https://www.googleapis.com/youtube/v3/channelSections

  let rangeDisplay = $('#rangeDisplay');

  // buildApiRequest('GET',
  //               '/youtube/v3/search',
  //               {'maxResults': '25',
  //                'part': 'snippet',
  //                'q': 'surfing',
  //                'type': ''});

$('#rangeResults').on("input", displayRangeData);

function displayRangeData() {
  let value = $(this).val();
  rangeDisplay.prop('textContent', value);
}

  let options = {
    part: 'snippet',
    key: key,
    maxResults: 5,
    playlistId: playlistId,
    q: 'how its made',
    type: ''
  };

  let optionsChannel={
    part: 'snippet',
    channelId: ''
  };

loadVids();

  function loadVids() {
      $.getJSON(searchURL, options, function(data){
        console.log(data);
        // let id = data.items[0].snippet.resourceId.videoId;
        let id = data.items[0].snippet.channelId;
        console.log(id);

        optionsChannel.channelId = `${id}`;
        console.log(optionsChannel);

        representChannelPlaylists();

        //mainVid(id);

        //resultsLoop(data);
      })
  };

  function representChannelPlaylists() {
    $.getJSON(channelURL, optionsChannel, function(channelPlaylists){
      console.log(channelPlaylists);
    });
  };

  function mainVid(id) {
    $('#video').html(`<iframe width="680" height="385" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen> </iframe>`);
  };

  function resultsLoop(data) {
    $.each(data.items, function (i, item) {
        let thumb = item.snippet.thumbnails.medium.url;
        let title = item.snippet.title;
        let desc = item.snippet.description.substring(0, 100);
        let vid = item.snippet.resourceId.videoId;

        $('main').append(`<article class="item" data-key="${vid}">
          <img src="${thumb}" alt="playlists member" class="thumb">        </img>
          <div class="details">
          <h4>${title}</h4>
          <p>${desc}</p>
          </div>
         </article>`);

    });

  };

  $('main').on('click', 'article', function () {
    let id = $(this).attr('data-key');
    mainVid(id);
  });

});
