'use strict';

  const key = 'AIzaSyDESXpqfADkPJ0I851gH1BsjIGU57I7m58';
  //const key= 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';
  // let playlistId = 'PLWKjhJtqVAbkyK9woUZUtunToLtNGoQHB';
  const playlistURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  const searchURL = 'https://www.googleapis.com/youtube/v3/search';
  const videosURL = 'https://www.googleapis.com/youtube/v3/videos';
  //let videoId = 'nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg';

  let options = {
    key: key,
    part: 'snippet'

  };

loadVids();

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

  function mainVid(id) {
    $('main').append(`<section id="video"></section>`);
    $('main').append(`<div id="videoWrapper"></div>`);
    $('#video').html(`<iframe width="680" height="385" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen> </iframe>`);

    let videoOptions = {
      key: key,
      id: id,
      part: 'statistics' };

    $.getJSON(videosURL, videoOptions, function (vidData) {
      console.log(vidData);
    });

  };

  class VideoItem {
    constructor(item) {
      this.item = item;
    }

    createElement(){
      let thumb = this.item.clipPreview;
      let desc = this.item.videoDescription.substring(0, 100);
      let publicationDate = this.dateParse(this.item.publishedAt);

      $('#videoWrapper').append(`<article class="item" data-key="${this.item.id}">
        <img src="${thumb}" alt="playlists member" class="thumb">

        <div class="details">
        <h4>${this.item.videoTitle}</h4>
        <p>${desc}</p>
        <time> ${publicationDate}</time>
        <address>${this.item.channelTitle} </address>
        </div>
       </article>`);
    }

    dateParse(date) {

      let publicationDate = new Date(Date.parse(date));

      let dd = publicationDate.getDate();
      if (dd < 10) dd = '0' + dd;

      let mm = publicationDate.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;

      let yy = publicationDate.getFullYear();
      if (yy < 10) yy = '0' + yy;

      return dd + '.' + mm + '.' + yy;
    };

    deleteElement() {

    }

  };

  function resultsLoop(data) {

    if( data.length > 6 ) {
      $('main').append(`<nav id="videoNav">
        <ul>
        </ul>
      </nav>`);
      for(let i = 1; i <= Math.ceil(data.length / 6); i++){
        $('#videoNav').append(`<li> <a href=''>${i}</a> </li>`);
      }
    }

    $.each(data, function (i, item) {
      let vItem = new VideoItem(item);
      vItem.createElement();

    });

  };

  $('main').on('click', 'article', function () {
    let id = $(this).attr('data-key');
    mainVid(id);
  });
