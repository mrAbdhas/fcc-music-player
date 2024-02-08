//Accessing html elements with getElementBuId() and assigning them to variables
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

/* Array to store all the songs,
the array holds an object with properties and values */
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

/* a userData object that will contain the songs, 
the current song playing, and the time of the current song. */

/* users will be able to shuffle and delete 
songs from the playlist, you will need to 
create a copy of the allSongs array without
mutating the original. This is where the
spread operator comes in handy.
The spread operator [...] allows you to
copy all elements from one array into
another. It can also be used to
concatenate multiple arrays into one. */
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};
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
    audio.currentTime = userData?.songCurrentTime;
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
  /*highlight function call, that highlights currently playing song */
  highlightCurrentSong();
  //
  /*setPlayerDisplay() function call, the player's display updates 
  whenever a new song begins playing  */
  setPlayerDisplay();
  //
  /*setPlayButtonAccessibleText() function call*/
  setPlayButtonAccessibleText();
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
  /*last step, hook up pauseSong() function
  to an event listener  to pauseButton element*/

}
//

/*function playNextSong using const and arrow syntax*/
const playNextSong = () => {
  /*This will check if there's no current song 
   * playing in the userData object. */
  if(userData?.currentSong === null) {
    /*if the condition in the if statement
    is true, we call the playSong() function
    with the id of the first song in
    userData?.songs array as an argument */
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    /*next we retrieve the next song in the playlist
    by getting the index of the current song and
    then add 1 to it. */
    const nextSong = userData?.songs[currentSongIndex + 1];
    /*lastly we call the playSong() function and 
    pass nextSong.id as argument. */
    playSong(nextSong.id);
    /*last step, hook up playNextSong() function
    to an event listener  to nextButton element*/
  }
}
//

/* function playPreviousSong() using const and arrow syntax*/
const playPreviousSong = () => {
  /*if statement, will check if there is
  currently no song playing */
  /*if the is no song being play, meaning
  the condition of the if statement is true
  exit the using return */
  if(userData?.currentSong === null) return;
  else {
    const currentSongIndex = getCurrentSongIndex();
    /*next we retrieve the previous song in the
    playlist by substraction 1 from currentSongIndex
    and save it in a variable previousSong */
    const previousSong = userData?.songs[currentSongIndex -1];
    /*next we call playSong() function with the
    retrieved previous song that we saved in the 
    variable previousSong and pass it as
    an argument in the playSong() function call*/
    playSong(previousSong.id);
    /*last step, hook up playPreviousSong() to 
    an event listener to previousButton element*/
  }
}
//

/*function shuffle, created with const and arrow syntax
this function is responsible for shuffling the songs
in the playlist array and performing nesssary state management 
update after shuffling*/
const shuffle = () => {
  /*using sort() method with callback funtion
  to randomize playlist array userData.songs */
  userData?.songs.sort(() => Math.random() - 0.5) 
  /*One way to randomize an array of items would 
  be to subtract 0.5 from Math.random() which 
  produces random values that are either positive
  or negative. This makes the comparison result
  a mix of positive and negative values, leading
  to a random ordering of elements. */
  //

  /*when shuffle button is pressed/clicked
  currentSong have to be set to null and and
  songCurrentTime to 0 */
  /* Note: You should not use optional chaining (.?)
  for this step because you are explicitly setting 
  the currentSong and songCurrentTime properties to be
  null and 0 respectively. */
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  /*function calls */
  /*we re-render the songs, by calling 
  renderSongs() function, we pass it userData?.songs*/
  renderSongs(userData?.songs);
  /*we pause the currently playing song
  by calling pauseSong() function */
  pauseSong();
  /*we set the player display by calling
  setPlayerDisplay() function */
  setPlayerDisplay();
  /*and we set the play button accessible
  text again */
  setPlayButtonAccessibleText();
  //

  /*lastly hook shuffle() function to an 
  event listener to shuffleButton element */
}
//

/*function deleteSong() this function handles
removal of a song from playlist and creates 
a Reset Playlist button
function created with const and arrow
syntax, and passed id as a parameter*/
const deleteSong = (id) => {
  /*before we delete a song, we check if there
  is a song playing, if its then pause it, and
  play the next song in the playlist
  we use an if statement to check if the 
  userData?.currentSong?.id is strictly equal
  to the id of the song we want to delete ?*/
  if(userData?.currentSong?.id === id ) {
    /*if the condition in the if statement is
    met, and there is a match*/
    /*we update the current song being played, we  
    start by accessing the userData object and 
    its currentSong property, and set its value equal null.
    and we for songCurrentTime, we set its value to 0.*/
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    
    /*function calls, to stop and update player display*/
    /*we call puaseSong() function to stop the playback*/
    pauseSong();
    /*we call setPlayDisplay() function to update the
    player display*/
    setPlayerDisplay();
    //
    /*next we add onclick attribute within the button
    element in the renderSongs() function */
  
  }
  /* we use filter() metod to remove the
  song object that matches the id parameter from
  the userData?.songs array. 
  we do it by using the filter() method on 
  userData?.songs array, we pass song as an the
  parameter of the arrow function callback.
  and use implicit return to check
  if song.id is strictly not equal to id.
  and assign it to userData.songs.
  this will remove a song with an id, since
  all the songs object have an id.
  we will have to specify which song
  we want to remove from the playlist*/
  userData.songs = userData?.songs.filter((song) => song.id !== id);

  /*function calls */
  /*we re-render the songs by calling
  renderSongs() function, and pass it userData?.songs
  this display the modified playlist*/
  renderSongs(userData?.songs);
  /*we call highlightCurrentSong() function to highlight
  the current song, if there is any playing*/
  highlightCurrentSong();
  /*and we set the play button accessible
  text */
  setPlayButtonAccessibleText();

  /*next we check if the playlist is empty, if its
  we reset the userData object to its original state*/
  if(userData?.songs.length === 0) {
    /*if the condition is met, means userData object
    is empty, we create resetButton element and a text for it.
    button will only show if playlist is empty
    we call .createElement() DOM method, we use
    dynamically to create an element in JavaScript
    Syntax: document.createElement(tagName)
    pass tagName as a string*/
    const resetButton = document.createElement("button");
    /*we assign a text to the above created resetButton*/
    const resetText = document.createTextNode("Reset Playlist");
    /*we set the id and ariaLabel for resetButton
    with JavaScript, element.id and element.arialabel
    setting the id property for resetButton
    syntax: element.id = "id"; */
    resetButton.id = "reset";
    /*next we set aria-label with JavaScript element.ariaLabel
    syntax: element.ariaLabel = ""; */
    resetButton.ariaLabel = "Reset playlist";
    
    /*we add resetText to the resetButton as a child
    by using apendChild() method, we can add a node or and
    element as a child of another element.
    we start by adding the resetText to the resetButton
    syntax: element.appendChild(element or node);*/
    resetButton.appendChild(resetText);
    /*next we add the resetButton element to the playlistSongs element
    syntax: element.appendChild(element);*/
    playlistSongs.appendChild(resetButton);
    
    /*we add functionality to the resetButton when its clicked
    by adding a event listener, we pass it a callback
    function with arrow syntax*/
    resetButton.addEventListener("click", () => {
      /*reset playlist to its original state
      by spread allSongs array into an array
      and assign to userData.songs
      The spread operator [...] allows you to
      copy all elements from one array into
      another. It can also be used to
      concatenate multiple arrays into one.*/
      userData.songs = [...allSongs];

      /*functions call*/
      /*render the songs again*/
      renderSongs(userData?.songs);
      /*updating the play button's accessible text*/
      setPlayButtonAccessibleText();
      /*removing the reset button from the playlist
      by calling the remove() method on resetButton variable*/
      resetButton.remove();
    });
  
  }
  
};

/*function that displays the current song
title and artist in the player display.
Function is created with const and arrow syntax */
const setPlayerDisplay = () => {
  /*references to HTML elements responsible for
  displaying the song title and artist. we
  obtain reference by getElementById() method*/
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  /*we acces the current song's title being played */
  const currentTitle = userData?.currentSong?.title;
  /*we acces the current song's artist being played */
  const currentArtist = userData?.currentSong?.artist;
  /*we use textContent to set the text content
  of HTML element, player-song-title & player-song-artist
  we assigned to the variables PlayingSong & songArtist,
  to the current playing song title and artist name. 
  using ternary operator to check if currentTitle is truthy
  if so, implicitly  return currentTitle, otherwise implicitly
  return an empty string, Assign this result to playingSong.textContent.
  syntax: condition ? exprIfTrue : exprIfFalse */
  playingSong.textContent = currentTitle ? currentTitle : "";
  /* using ternary operator to check if currentArtist is truthy
  if so, implicitly  return currentTitle, otherwise implicitly
  return an empty string, Assign this result to songArtist.textContent.*/
  songArtist.textContent = currentArtist ? currentArtist : "";
   /*lastly call this function inside the playSong() function
   and the player's display updates whenever a new song begins playing */
}

/*function that highlights current song 
being played, using const and arrow syntax*/
const highlightCurrentSong = () => {
  /*using querySelectorAlll() method to 
  select list element with the class playlist-song, that
  contains the songs in the playlist and assigning them 
  to variable playlistSongElement */
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  /*getting the id of the currently playing song, and use
  template literals to prefix it with song- */
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);
  /*Loop/iterate throgh playListSongElements using forEach() method
  and pass songEl as the parameter we use arrow syntax to add
  a call back function*/
  playlistSongElements.forEach((songEl) => {
    /*use the removeAttribute() method to remove the
    "aria-current" attribute. This will remove the
    attribute for each of the songs. */
    songEl.removeAttribute("aria-current");
  })
  /*Now we need to add the attribute back to the currently
  playing song.*/
  if(songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true");
  }
  /*lastly call this function inside the playSong() function */

}
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
      <button class="playlist-song-delete" onclick="deleteSong(${song.id})" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
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

/*function setPlayButtonAccessibleText() will
set aria-label attribute to current song, or
the first song in playlist, if empty, it's
the aria-label to "Play" */
const setPlayButtonAccessibleText = () => {
  /*we access and get the current song or || the first song
  userData array */
  const song = userData?.currentSong || userData?.songs[0];
  /*we use setAttribute() method, the method takes 2 parameters,
  a setAttribute("name", "value"), name = a string specifying the 
  name of the attribute whose value is to be set.
  value = a string containing the value to be assign to the 
  attribute. on playButton, to set the aria-label attribute
  and assign it a value, we use ternary operator:
  syntax: condition ? exprIfTrue : exprIfFalse 
  condition, we check if there is song?.title,
  if its truthy, aria-label value is set to "play ${song.title}
  or "Play" if there is no song.title available.*/
  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play" 
  );
  /*lastly call this function inside the playSong() function */
}

/*function getCurrentSongIndex using the arrow syntax
Arrow function 
this function will be used in playNextSong and playPreviousSong
this function will get the index of each song in the songs property of userData. */
const getCurrentSongIndex = () => {
  /*use indexOf() array method, to get the index of
  current song, it returns first index of given element 
  can be found in the array or -1 if the element is not
  present */
  return userData?.songs.indexOf(userData?.currentSong);

}

/*Event listener for playButton element,
with event type "", and callback function */
/*` a `click` event for the first argument 
and an  callback function with arrow syntax for the second argument. */
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
//

/*Event listener for pauseButton element with
pauseSong function passed as the listener */
pauseButton.addEventListener("click", pauseSong);
//

/*Evemt listener for nextButton element, with
playNextSong() function passed as the second argument
with event type "", and and listener 
syntax: .addEventListener(type, listener)
listener must be either a null, an object with a
handleEvent() method or a JavaScript funtion
in this case, its a javaScript function  */
nextButton.addEventListener("click", playNextSong);
//

/*Evemt listener for nextButton element, with
 playPreviousSong()  function passed as the second argument
with event type "", and listener 
syntax: .addEventListener(type, listener)
listener must be either a null, an object with a
handleEvent() method or a JavaScript funtion
in this case, its a javaScript function */
previousButton.addEventListener("click", playPreviousSong);
//

/*Event listener for shuffleButton element with
shuffle() function passed as listener 
syntax: .addEventListener(type, listener)
listener must be either a null, an object with a
handleEvent() method or a JavaScript funtion
in this case, its a javaScript function */
shuffleButton.addEventListener("click", shuffle);
//

/*Event listener, automatically play next song
when current songs ends playing
we add this event listener to the audio element,
which listens for ended event*/
audio.addEventListener("ended", () => {
  /*next check if there is next song
  to be played*/
  /*first we call getCurrentSongIndex() function
  to retrive currently playing song, and the
  varlue returned is saved to the variable currentSongIndex*/
  const currentSongIndex = getCurrentSongIndex();
  /* we comparision, checks if the incremented index +1
  is less the totalt song in userData.songs
  if its, that means that there is a next song available to
  be played, the value to be stored in nextSongExists
  will be either true or false*/
  const nextSongExists = currentSongIndex + 1 < userData.songs.length;
  
  /*if statement to check nextSongExist
  if the condition is true, then the playNextSong()
  function will be called */
  if(nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime =  0;

    /*function calls to update the music player*/
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
  
})


/* when you call the renderSongs function,
you'll pass in the songs array inside the 
userData object. When you do, the function 
will loop through the array and build HTML for all the songs */
/*Now you need to call the renderSongs function
and pass in userData?.songs in order to finally
display the songs in the UI. */

/*To sort the songs in alphabetical order by title,
you will need to pass in a compare callback function into your sort() method. */

/*The reason why is returning numbers is because the sort() method
is expecting a number to be returned. If you return a negative number,
the first item is sorted before the second item. */
renderSongs(userData?.songs.sort((a, b) => {
  if(a.title < b.title) {
    return -1;
  }

  if(a.title > b.title) {
    return 1;
  }

  return 0;

}));
/* Optional chaining (?.) helps prevent errors
when accessing nested properties that might
be null or undefined. */
//