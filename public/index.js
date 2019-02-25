
const synth = new Tone.MembraneSynth().toMaster();
const playButton = document.querySelector('#play');
const mastVol = document.querySelector('#mast-vol');
const drumVol = document.querySelector('#drum-vol');

const drums = new Tone.Player('./assets/dub_drums.mp3');
const bass = new Tone.Player('./assets/dub_bass.mp3');
const rguit = new Tone.Player('./assets/dub_rguit.mp3');
const lguit = new Tone.Player('./assets/dub_lguit.mp3');

playButton.addEventListener('click', play)

mastVol.addEventListener('input', (event) => {
  let vol = Tone.gainToDb(event.target.value / 100);

  Tone.Master.volume.value = vol;
})

// const loop = new Tone.Loop(function(time) {
//   console.log(time);
//   synth.triggerAttackRelease('c2');
// }, '2n').start(0);

function play () {
  if (Tone.Transport.state === 'stopped') {
    Tone.Transport.start(); 
  } else {
    Tone.Transport.stop();
  }
}

function makeChannel(name){
  var channel = new Tone.Channel().toMaster();
  var player = new Tone.Player({
    url : `./assets/${name}.mp3`,
    loop : true
  }).sync().start(0);
  player.chain(channel);

}

makeChannel("dub_bass");
makeChannel("dub_drums");
makeChannel("dub_rguit");
makeChannel("dub_lguit");

