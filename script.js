//Accessing html elements with getElementBuId() and assigning them to variables
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

/* Array to store all the songs,
the array holds multiple object with properties and values */
const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
        
    },
    {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
      },
      {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
      },
      {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
      },
      {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
      },
      {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
      },
      {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
      },
      {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
      },


];
/* new Audio(). This will create a new HTML5 audio element. */
const audio = new Audio();
//

/*function playSong, takes id parameter,
id represent unique identifier of the 
song one wants played
function using the
arrow function syntax*/
const playSong = (id) => {

  /*Use const to create a variable named 
  song and assign it result of the find()
  method call on the userData?.songs array. 
  Use song as the parameter of the find() 
  callback and check if song.id is strictly equal to id.

  This will iterate through the userData?.songs array,
  searching for a song that corresponds to the id 
  passed into the playSong function. */
  const song = userData?.songs.find((song) => song.id === id);
  //

  /* This tells the audio element where to find the audio data for the selected song. */
  audio.src = song.src;
  //

  /* This tells the audio element what to display as the title of the song. */
  audio.title = song.title;
  //

  /*Before playing the song, you need to make sure it starts from the beginning.
  This can be achieved by the use of the currentTime property of the audio object.
  an if statement, to check wether the userData?.currentSong is null
  or userData?.currentSong.id is strictly not equal to song.id*/
  if(userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
    //
    /*else block to handle the current song's position in the playlist */
  } else {
    audio.currentTime = userData.songCurrentTime;
  }

  /*update the current song being played as well as the appearance of 
  the playButton element. Start by accessing the userData object and 
  its currentSong property. Set its value equal to the song variable.
  */
  userData.currentSong = song;
  /*Next use classList property and the add() method to add
  the playing class to the playButton element. This will look
  for the class playing in the CSS file and add it to the 
  playButton element. */
  playButton.classList.add("playing");
  //
  /*To play the song use the play() method on the audio variable.
  play() is a method from the web audio API for playing an mp3 file.*/
  audio.play();
  
}
//

/*function for pausing currently playing songs */
const pauseSong = () => {
  /*to store the current time of the song when it's paused */
  userData.songCurrentTime = audio.currentTime;
  //

  /*using classList and remove() method to remove
  .play class from the playButton, since the song will
  be pause */
  playButton.classList.remove("playing");
  //

  /* to pause the song, using the pause() method
  on the audio variable. pause() is of Web Audio API*/
  audio.pause();

}

/*function playNextSong */
const playNextSong = () => {
  if(userData?.currentSong === null) {
    /*This will check if there's no current song 
    playing in the userData object.
    and if the condition in the if statement is
    truee the playSong() function with the id
    of the first song is called */
    playSong(userData?.songs[0].id)
  } else {
    const currentSongIndex = getCurrentSongIndex();
  }

}
//


/* a userData object that will contain the songs, 
the current song playing, and the time of the current song. */

/* users will be able to shuffle and delete 
songs from the playlist, you will need to 
create a copy of the allSongs array without
mutating the original. This is where the
spread operator comes in handy.
The spread operator (...) allows you to
copy all elements from one array into
another. It can also be used to
concatenate multiple arrays into one. */
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};
//

/* to display the songs in the UI. To do this,
you'll create a renderSongs function using the
arrow function syntax */
// Arrow function
const renderSongs = (array) => {

  /* The map() method is used to iterate through
  an array and return a new array. It's helpful
  when you want to create a new array based on
  the values of an existing array. */
  const songsHTML = array.map((song) => {

 return `
      <li id="song-${song.id}" class="playlist-song">
        <button class="playlist-song-info" onclick="playSong(${song.id})">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button class="playlist-song-delete" aria-label="Delete ${song.title}">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/>
            </svg>
        </button>
      </li>
      `;
    /* the join() method to combine the songsHTML markup into a single string. */
    } ).join("");
  //
  //
  /*update the playlist in your HTML document
  to display the songs. Assign songsHTML to 
  the innerHTML property of the playlistSongs
  element. This will insert the li element 
  you just created into the ul element in 
  the already provided HTML file. */
    playlistSongs.innerHTML = songsHTML;
  //
};
//

/*function that will be used, when playing the next and previous song
arrow function called getCurrentSongIndex*/
const getCurrentSongIndex = () => {
  /*to get the index of current song, we are using
  indexOf() array method, indexOf() returns
  first index a given element can be found or
  -1 if no element is present */
  return userData?.songs.indexOf(userData.currentSong);
}
//

/*Event listener,
with event type "", and callback function */
/*` a `click` event for the first argument 
and an empty callback function with arrow syntax for the second argument. */
playButton.addEventListener("click", () => {
  /*if statement, check if userData?.currentSong is null */
  if(userData?.currentSong === null) {
    
    /*calling playSong() function with the id of the
    first song in the userData?.songs arrayy */
    playSong(userData?.songs[0].id);
    /* Optional chaining (?.) helps prevent errors
      when accessing nested properties that might
      be null or undefined. */
    //
  } else {
    /*calling the playSong function with the id of the currently
    playing song as an argument
    This ensures that the currently playing song will continue 
    to play when the play button is clicked. */
    playSong(userData?.currentSong.id);
  }
})

/*Event listener for pauseSong function */
pauseButton.addEventListener("click", pauseSong);
//

/* when you call the renderSongs function,
you'll pass in the songs array inside the 
userData object. When you do, the function 
will loop through the array and build HTML for all the songs */
/*Now you need to call the renderSongs function
and pass in userData?.songs in order to finally
display the songs in the UI. */

renderSongs(userData?.songs);
/* Optional chaining (?.) helps prevent errors
when accessing nested properties that might
be null or undefined. */
//