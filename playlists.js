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

  let cards=document.getElementsByClassName('card')
  for(let card of cards){
      card.addEventListener('click',()=>{
        let url=card.classList[1]
        processSongs(url)
      })
  }