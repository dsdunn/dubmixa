const synth = new Tone.MembraneSynth().toMaster();
const playButton = document.querySelector('#play');

playButton.addEventListener('click', playSynth)

function playSynth () {
  synth.triggerAttackRelease('c2', '8n');
}