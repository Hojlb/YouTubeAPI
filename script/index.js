$(document).ready(function(){
  //Code here
  let key = 'AIzaSyDESXpqfADkPJ0I851gH1BsjIGU57I7m58';
  let playlistId = 'PLWKjhJtqVAbkyK9woUZUtunToLtNGoQHB';
  let URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

  let options = {
    part: 'snippet',
    key: key,
    maxResults: 20,
    playlistId: playlistId
  };

loadVids();

  function loadVids() {
      $.getJSON(URL, options, function(data){

        let id = data.items[0].snippet.resourceId.videoId;

        mainVid(id);

        resultsLoop(data);
      })
  };

  function mainVid(id) {
    $('#video').html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen> </iframe>`);
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
