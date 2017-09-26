let keys = require('./keys.js');
let colors = require('colors');
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let request = require('request');

// ============= TWITTER =============== //
function getTweets(user='ucb_bootcamp_li') {
  let client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
  });

   let params = {screen_name: user};
   client.get('statuses/user_timeline', params, function(error, tweets, response) {
      for (var t in tweets) {
        console.log(colors.blue("[",tweets[t].created_at,"]: ") +
                    tweets[t].text);
      }
  });
}

// ============= SPOTIFY ============ //
function lookupSong(song='The Sign Ace of Base', count='1') {
  var spotify = new Spotify({
    id: keys.spotifyKeys.id,
    secret: keys.spotifyKeys.secret
  });

  spotify.search({ type: 'track', query: song, limit: count }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    //console.log(JSON.stringify(data, null, 2));
    for (let s in data.tracks.items) {
      console.log(colors.green.bold('[Track]:',
                  data.tracks.items[s].name+
                  "\n"+
                  "[Album] "+data.tracks.items[s].album.name,"\n"+
                  "[Artist] "+data.tracks.items[s].artists[0].name+"\n"+"[Play] ")+
                  colors.blue.underline(data.tracks.items[s].external_urls.spotify)+"\n");
    }
  });
}

// ============= OMDB ================//
function lookupMovie(title='Mr Nobody') {
  title = encodeURIComponent(title.trim());
  let url = 'http://www.omdbapi.com/?apikey='+keys.omdbKey+'&t=' + title;
  request(url, function (error, response, body) {
    let movieObj = JSON.parse(body);
    console.log(colors.yellow.bold("Title:"), colors.yellow(movieObj.Title));
    console.log(colors.yellow.bold("Year:"), colors.yellow(movieObj.Year));
    console.log(colors.yellow.bold("IMDB Rating:"), colors.yellow(movieObj.Ratings[0].Value));
    console.log(colors.yellow.bold("Rotton Tomatoes Rating:"), colors.yellow(movieObj.Ratings[1].Value));
    console.log(colors.yellow.bold("Country:"), colors.yellow(movieObj.Country));
    console.log(colors.yellow.bold("Language(s):"), colors.yellow(movieObj.Language));
    console.log(colors.yellow.bold("Plot:"), colors.yellow(movieObj.Plot));
    console.log(colors.yellow.bold("Cast:"), colors.yellow(movieObj.Actors));
  });
}


// =========== MODULE ============= //
module.exports = {
  getTweets: getTweets,
  lookupSong: lookupSong,
  lookupMovie: lookupMovie,
}
