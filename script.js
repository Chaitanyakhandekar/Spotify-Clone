//! ------------------------------working on 174 line no-------------------------------

let currentSong=new Audio() 
let currentSongs=[]
let currentFolder;
let playPause='#play-pause'            //! Global Initialization of Current Song so Only one Song can Play At One time

function create(name){                    //! Function For Creating Html Element
  return document.createElement(name)
}

function timeConvert(duration){           //! Function for Converting Time into Minutes/Second Format
  if(!isNaN){
    console.log('Given input is not a number!')
    return false
  }
   let minute=0;
   let second=0;
  for(let time=0;time<=duration;time++){
      if(second<60){
        second++
      }
      else{
         second=0
         minute++
      }
  }
  let minute1;
  let second1;
  if(minute<10){
     minute1='0'+minute
    
  }
  else{
    minute1=minute
  }
  if(second<10){
    second1='0'+second
  }
  else{
    second1=second
  }
  return [minute1,second1]
  
}

function styleCard(card,songName){            //! Function For Styling The Song Cards
  let songCard1=document.querySelector('.songList')
  let songCard=songCard1.lastElementChild

  if(!songCard){
    console.log('No song card found!')
    return;
  }
  songCard.style.border='1px solid rgb(88, 86, 86)';
  songCard.style.display= 'flex';
  songCard.style.justifyContent='space-between';
  songCard.style.height='70px';
  songCard.style. padding='10px';
  songCard.style. boxSizing='border-box'
  songCard.style.marginBottom='8px';
  songCard.style.borderRadius='4px';

  let songCardRight=card.querySelector('.song-card-right')
  songCardRight.style.display= 'flex';
  songCardRight.style. alignItems='center';
  songCardRight.style.gap='30px';
  songCardRight.style.fontSize='16px'

  let songNameArea=card.querySelector('.song-name-area')
  songNameArea.style. maxWidth='160px';

  let songCardLeft=card.querySelector('.song-card-left')
  songCardLeft.style.display= 'flex';
  songCardLeft.style.alignItems='center';
  songCardLeft.style.gap='30px';

  card.querySelector('.song-name-area').innerHTML=songName
  let playNow=card.querySelector('.play-now')
  playNow.innerHTML='Play Now'
  playNow.style.color='rgb(158, 211, 166)'
  playNow.style.display='block'

}

function decodeURL(name){           //! Removing extra and useless text from song name
    let songName=name
    songName=songName.slice(51,songName.length)
    songName=songName.split('%').join()
    songName=songName.split('20').join()
    songName=songName.replaceAll(',',' ')
    songName=songName.replace('.mp3','')
    // console.log(songName)
    return songName
}

function createSongCard(name){             //! Creating card for putting song info in it
  
  let songCard=create('div')
  songCard.classList.add('song-card')
  let songCardLeft=create('div')
  songCardLeft.classList.add('song-card-left')
  let musicLogo=create('i')
  musicLogo.classList.add('bi-music-note-beamed')
  let songNameArea=create('div')
  songNameArea.classList.add('song-name-area')
  songNameArea.classList.add(name)
  let songCardRight=create('div')
  songCardRight.classList.add('song-card-right')
  let playNow=create('p')
  playNow.classList.add('play-now')
  let playButton=create('i')
  playButton.classList.add('bi-play-circle')

  songCard.appendChild(songCardLeft)
  songCardLeft.appendChild(musicLogo)
  songCardLeft.appendChild(songNameArea)

  songCard.appendChild(songCardRight)
  songCardRight.appendChild(playNow)
  songCardRight.appendChild(playButton)

  return songCard

}

async function getSongs(url) {                         //! Getting songs from our folder songs
  let rawData = await fetch(url)
  let response = await rawData.text()
  let div = document.createElement('div')
  div.innerHTML = response
  let as = div.getElementsByTagName('a')
  let songs = []
  for (const a of as) {
    if (a.href.endsWith('mp3')) {
      songs.push(a)
    }
  }
  return songs
}

async function processSongs(url) {       //! Processing on songs
  let songs = await getSongs(url);
  return new Promise(resolve=>{
    var songList=document.querySelector('.songList')
      for (let name of songs){
        let songCard=createSongCard(name.href)
        songList.appendChild(songCard);
        let songName=decodeURL(name.href)
        styleCard(songCard,songName)
      }
      resolve()
    })

}

let cards=document.getElementsByClassName('card')   //! Changing Playlists after clicking on that
for(let card of cards){
    card.addEventListener('click',()=>{
      document.querySelector('.songList').innerHTML=""
      let url=card.classList[1]
      currentFolder=card.classList[1]
      main(url)
     
    })
}

const playSong=(url)=>{               //! Playing Specific Song
  currentSong.src=url;
  currentSong.play();
  play.src="pause.svg"
  document.querySelector('#current-song-name').innerHTML=decodeURL(url)  //! updating Song Name PlayBar
  document.querySelector('#current-song-timming').innerHTML='00:00'     //! Updating Song Timming on PlayBar
  volume.style.opacity='1'
 
}

function playSongs(){                 //! Sending Src of Songs After Clicked on Song Card
  let songList=document.querySelector('.songList')
  console.log(songList)
  let song=songList.getElementsByClassName('song-card')
  console.log(song)
  for(const name of song){
     name.addEventListener('click',()=>{                        //! Adding EventListener for Playing Song After Click on Song Card
        let url=name.querySelector('.song-name-area').classList[1]
        console.log(decodeURL(url))     //! Prints the song name on console that you clicked

        let cards=document.getElementsByClassName('song-card')    //! only changing color of clicked card and other cards will be same
        for(let i=0;i<cards.length;i++){
          let name1=cards[i];
          if(name1.querySelector('.song-name-area').classList[1]==url){
            name.classList.add('playing')
            let playButtons=name1.querySelector('.song-card-right').getElementsByTagName('i')
            for(let i=0;i<playButtons.length;i++){
                let playButton=playButtons[i]
                console.log(playButton.classList[0])
                if(playButton.classList[0]=='bi-play-circle'){
                  playButton.classList.add('bi-pause-circle')
                  playButton.classList.remove('bi-play-circle')
                }
            }
          }
          else{
            name1.classList.remove('playing')
            let playButtons=name1.querySelector('.song-card-right').getElementsByTagName('i')
            for(let i=0;i<playButtons.length;i++){
                let playButton=playButtons[i]
                console.log(playButton.classList[0])
                if(playButton.classList[0]=='bi-pause-circle'){
                  playButton.classList.add('bi-play-circle')
                  playButton.classList.remove('bi-pause-circle')
                }
            }
          }
        }
        playSong(url)
     })
  }

  currentSong.addEventListener('timeupdate',()=>{     //! Updating Current Time Continuosly
    let currentTime=timeConvert(currentSong.currentTime)
    let duration=timeConvert(currentSong.duration)
    currentTime=`${currentTime[0]}:${currentTime[1]}`
    duration=`${duration[0]}:${duration[1]}`
    document.querySelector('#current-song-timming').innerHTML=`${currentTime}/${duration}`
    document.querySelector('.bi-dot').style.left=(currentSong.currentTime/currentSong.duration*100-2+"%")

    //! controlling song with respect to seekbar
    document.querySelector('.seeckbar').addEventListener('click',e=>{
      let percent=e.offsetX/ e.target.getBoundingClientRect().width*100
      document.querySelector('.bi-dot').style.left=percent-2+"%"
      currentSong.currentTime=(currentSong.duration*percent/100);
    })
  })
}

play.addEventListener('click',()=>{       //! Adding EventListner for on/off the music after clicking on play button
  if(currentSong.paused){
    currentSong.play()
    play.src="pause.svg"
  }
  else{
    currentSong.pause()
    play.src="play.svg"
  }
})


async function main(url){                //! Main Function
  if(!url){
    url="http://127.0.0.1:5501/songs/"
  }
  await processSongs(url)
  playSongs()
}

main()

//! working on styleCard function (problem in card names, and only one card is created )
