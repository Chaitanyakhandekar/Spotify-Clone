//! Adding EventListner to Slide the Left After Clicking On Hamburger 

document.querySelector('.hamburger').firstElementChild.addEventListener('click',()=>{
    document.querySelector('.left').style.left='0%'
    document.querySelector('.left').style.width='360px'
    let playButtons=document.getElementsByClassName('play-now')
    for(playButton of playButtons){
      playButton.style.fontSize='13px'
    }
    let songCards=document.querySelector('.songList');
    
    songCards.style.fontSize='13px'
})

document.querySelector(' .bi-x-lg').addEventListener('click',()=>{
  document.querySelector('.left').style.left='-100%';
})
document.querySelector('.playlists').addEventListener('click',()=>{
  document.querySelector('.left').style.left='-100%';
})


//! Playing Previous Song After Clicking on Previus Button

previous.addEventListener('click',()=>{
  let songs=document.getElementsByClassName('song-name-area')
  for(let i=0;i<songs.length;i++){
    let song=songs[i]
    if(song.classList[1]==currentSong.src){
      song.parentElement.parentElement.classList.remove('playing')
      song.parentElement.parentElement.lastElementChild.lastElementChild.classList.remove('bi-pause-circle')
      song.parentElement.parentElement.lastElementChild.lastElementChild.classList.add('bi-play-circle')

       i--;
       if(i<0){                             //! cheking if previous song is available or not if not then play current song
        i++
       }
       songs[i].parentElement.parentElement.classList.add('playing')
       songs[i].parentElement.parentElement.lastElementChild.lastElementChild.classList.remove('bi-play-circle')
       songs[i].parentElement.parentElement.lastElementChild.lastElementChild.classList.add('bi-pause-circle')
       playSong(songs[i].classList[1])
       break
    }
  }
})

//! Playing Next Song after clicking on Next Button

next.addEventListener('click',()=>{
    let songs=document.getElementsByClassName('song-name-area')
    for(let i=0;i<songs.length;i++){
      let song=songs[i]
      if(song.classList[1]==currentSong.src){
        song.parentElement.parentElement.classList.remove('playing')
        song.parentElement.parentElement.lastElementChild.lastElementChild.classList.remove('bi-pause-circle')
        song.parentElement.parentElement.lastElementChild.lastElementChild.classList.add('bi-play-circle')
        
        i++
        if(i == songs.length){
          i--
        }
        songs[i].parentElement.parentElement.classList.add('playing')
        songs[i].parentElement.parentElement.lastElementChild.lastElementChild.classList.remove('bi-play-circle')
        songs[i].parentElement.parentElement.lastElementChild.lastElementChild.classList.add('bi-pause-circle')

        playSong(songs[i].classList[1])
        break
      }
    }
})

//! Event for Volume Control

range.addEventListener('change',(e)=>{
  currentSong.volume=(e.target.value)/100;
})


//! adding eventListner for changing background color of current Folder
