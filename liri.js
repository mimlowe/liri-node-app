let api_handler = require('./api-handler.js');
let fs = require('fs');
let colors = require('colors');
const commandFile = './random.txt';
let args = process.argv.slice(2);

if (args[0] == 'do-what-it-says') {
   let commands = fs.readFileSync(commandFile, 'utf8');
   commands = commands.split(',');
   args = commands;
}

switch (args[0]) {
  case 'my-tweets':
    if (args[1])
      api_handler.getTweets(undefined,args[1], args[2]);
    else
      api_handler.getTweets();
    break;
  case 'their-tweets':
    if (args[1])
      api_handler.getTweets(args[1], args[2]);
    else
      console.log("Get help: node liri.js help");
    break;
  case 'spotify-this-song':
    if (args[1])
      api_handler.lookupSong(args[1], args[2]);
    else
      api_handler.lookupSong(undefined, 1);
    break;
  case 'movie-this':
    if (args[1])
      api_handler.lookupMovie(args[1]);
    else
      api_handler.lookupMovie();
    break;
  case 'help':
    printUsage();
    break;
  default:
    console.log("Get help. node liri.js help");
    break;
}


function printUsage() {
  console.log('\n');
  console.log(colors.rainbow("~ Welcome To LiriBot ~"));
  console.log(colors.rainbow("-----------------------"));
  console.log(colors.blue.bold("my-tweets: ") + "prints out my recent tweets");
  console.log(colors.blue.bold("their-tweets [username]: ") + "prints out the recent tweets from the specified username");
  console.log(colors.green.bold("spotify-this-song [name] [count]: ") + "searches spotify by song name, optional result count");
  console.log(colors.yellow.bold("movie-this [name]: ") + "searches IMDB by movie name");
  console.log(colors.red.bold("do-what-it-says: ") + "runs a command from random.txt");
  console.log('\n');


}
