const synth = new Tone.MembraneSynth().toMaster();
const playButton = document.querySelector('#play');

const drums = new Tone.Player('./assets/dub_drums.mp3').toMaster();
const bass = new Tone.Player('./assets/dub_bass.mp3').toMaster();
const rguit = new Tone.Player('./assets/dub_rguit.mp3').toMaster();
const lguit = new Tone.Player('./assets/dub_lguit.mp3').toMaster();

playButton.addEventListener('click', playSynth)


const loop = new Tone.Loop(function(time) {
  console.log(time);
  synth.triggerAttackRelease('c2');
}, '2n').start(0);

function playSynth () {
  if (Tone.Transport.state === 'stopped') {
    Tone.Transport.start(); 
  } else {
    Tone.Transport.stop();
  }
}