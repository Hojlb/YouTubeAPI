'use strict';
//
// $(document).ready(function(){

  // let playlistId = 'PLWKjhJtqVAbkyK9woUZUtunToLtNGoQHB';
  const key= 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';
  let playlistURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  let searchURL = 'https://www.googleapis.com/youtube/v3/search';
  //let videoId = 'nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg';

  let options = {
    key: key,
    part: 'snippet' // plus contentDetails, statistics
  //  id: videoId,
  };

// must be called, when the submit button is push
//$('.search-line form').on('click', ()=>console.log(hello));

function optionSearch() {
  options.type = $('.type-search input:checked').val();
  options.maxResults = $('#rangeResults').val();

  let textRequire = $('.search-line input[name="q"]').val();

  if ( !textRequire ) {
    options.q = 'javascript';
  } else if( textRequire.length > 20 ){
    options.q = textRequire.split(0, 20);
  } else {
       options.q = textRequire;
   }
};

loadVids();

function videoPicker(data) {
  let videoStream = [];
  console.log(data);
  data.items.forEach( (i) => {
    videoStream.push({
      id: `${i.id.videoId}`,
      videoTitle: `${i.snippet.title}`,
      videoDescription: `${i.snippet.description}`,
      publishedAt: `${i.snippet.publishedAt}`,
      channelId: `${i.snippet.channelId}`,
      channelTitle: `${i.snippet.channelTitle}`,
      clipPreview: `${i.snippet.thumbnails.medium.url}`
    });

  });
  return videoStream;
};

function loadVids() {

      optionSearch();
      console.log(`I search: ${options.q} - ${options.type}`);
      $('main *').remove();

      $.getJSON(searchURL, options, function(data){
        let videoStream = videoPicker(data);
        mainVid(videoStream[0].id);
        resultsLoop(videoStream);
      });
  };


  function mainVid(id) {
    $('main').append(`<section id="video"></section>`);
    $('main').append(`<div id="videoWrapper"></div>`);
    $('#video').html(`<iframe width="680" height="385" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen> </iframe>`);


    let videoData = 'https://www.googleapis.com/youtube/v3/videos';
    let videoOptions = {key: key,
      id: id,
                 'part': 'statistics'};

    $.getJSON(videoData, videoOptions, function (vidData) {
      console.log(vidData);
    });

  };

  function resultsLoop(data) {

    if( data.length > 5 ) {
      $('main').append(`<nav id="videoNav">
        <ul>
        </ul>
      </nav>`);
      for(let i = 1; i <= Math.ceil(data.length / 5); i++){
        $('#videoNav').append(`<li> <a href=''>${i}</a> </li>`);
      }
    }


    $.each(data, function (i, item) {
        let thumb = item.clipPreview;
        let desc = item.videoDescription.substring(0, 100);
        let publicationDate = new Date(Date.parse(item.publishedAt));

        $('#videoWrapper').append(`<article class="item" data-key="${item.id}">
          <img src="${thumb}" alt="playlists member" class="thumb">

          <div class="details">
          <h4>${item.videoTitle}</h4>
          <p>${desc}</p>
          <time> ${publicationDate}</time>
          <address>${item.channelTitle} </address>
          </div>
         </article>`);

    });

  };

  $('main').on('click', 'article', function () {
    let id = $(this).attr('data-key');
    mainVid(id);
  });

// });
