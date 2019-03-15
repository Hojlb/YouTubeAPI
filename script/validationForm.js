'use strict';

function validationForm(form){

  let search = form.elements.search.value;

}

/*
for video
buildApiRequest('GET',
                '/youtube/v3/videos',
                {'id': 'Ks-_Mh1QhMc',
                 'part': 'snippet,contentDetails,statistics'});

for search
buildApiRequest('GET',
                '/youtube/v3/search',
                {'maxResults': '25',
                 'part': 'snippet',
                 'q': 'surfing',
                 'type': ''});

for playlist
buildApiRequest('GET',
                '/youtube/v3/playlists',
                {'channelId': 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
                 'maxResults': '25',
                 'part': 'snippet,contentDetails'});

for channelSections
buildApiRequest('GET',
                '/youtube/v3/channelSections',
                {'channelId': 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
                 'part': 'snippet,contentDetails'});

 - https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=js

 - https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg&part=snippet,statistics

 - How to get API key - https://www.youtube.com/watch?v=JbWnRhHfTDA
 - More detailed manual is here - https://developers.google.com/youtube/v3/
 */
