
let channels = [];


const playButton = document.querySelector('#play');

const mastVol = document.querySelector('#mast-vol');
const drumsVol = document.querySelector('#drums-vol');
const bassVol = document.querySelector('#bass-vol');
const guit1Vol = document.querySelector('#guit1-vol');
const guit2Vol = document.querySelector('#guit2-vol');

const drumsMute = document.querySelector('#drums-mute');
const bassMute = document.querySelector('#bass-mute');
const guit1Mute = document.querySelector('#guit1-mute');
const guit2Mute = document.querySelector('#guit2-mute');

const drumsSolo = document.querySelector('#drums-solo');
const bassSolo = document.querySelector('#bass-solo');
const guit1Solo = document.querySelector('#guit1-solo');
const guit2Solo = document.querySelector('#guit2-solo');

const drumsCapture = document.querySelector('#drums-capture');
const bassCapture = document.querySelector('#bass-capture');
const guit1Capture = document.querySelector('#guit1-capture');
const guit2Capture = document.querySelector('#guit2-capture');

const masterFilterControl = document.querySelector('#master-filter');
const captureFilterControl = document.querySelector('#capture-filter');

const masterDelay = new Tone.FeedbackDelay(.21, .17);
const masterFilter = new Tone.Filter(6000);
const synth = new Tone.MembraneSynth().toMaster();

makeChannel("dub_drums");
makeChannel("dub_bass");
makeChannel("dub_rguit");
makeChannel("dub_lguit");


window.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    play();
  }
})

playButton.addEventListener('click', play)

mastVol.addEventListener('input', (event) => {
  let vol = Tone.gainToDb(event.target.value);

  Tone.Master.volume.value = vol;
})

let volControls = [drumsVol, bassVol, guit1Vol, guit2Vol]

volControls.forEach((control, i) => {
  control.addEventListener('input', () => {
    let vol = Tone.gainToDb(event.target.value);

    channels[i].volume.value = vol;
  })
})

let channelMutes = [drumsMute, bassMute, guit1Mute, guit2Mute];

channelMutes.forEach((mute, i) => {
  mute.addEventListener('click', () => {
    channels[i].mute = !channels[i].mute;
    mute.classList.toggle('muted', channels[i].mute);
  })
})

let channelSolos = [drumsSolo, bassSolo, guit1Solo, guit2Solo];

channelSolos.forEach((solo, i) => {
  solo.addEventListener('click', () => {
    channels[i].solo = !channels[i].solo;
    solo.classList.toggle('solod', channels[i].solo);
  })
})

let channelCaptures = [drumsCapture, bassCapture, guit1Capture, guit2Capture];

channelCaptures.forEach((capture, i) => {
  let captureDelay;
  let captureFilter;
  
  capture.addEventListener('mousedown', () => {
    captureFilter = new Tone.Filter();
    captureDelay = new Tone.FeedbackDelay(.21, 1).chain(captureFilter, Tone.Master);
    channels[i].connect(captureDelay)
    channels[i].mute = true;
    capture.classList.add('captured');
  })
  capture.addEventListener('mouseup', () => {
    channels[i].disconnect(captureDelay);
    captureFilter.dispose();
    captureDelay.dispose();
    channels[i].mute = false;
    capture.classList.remove('captured');
  })
})

masterFilterControl.addEventListener('input', (event) => {
  let freq = event.target.value;
  masterFilter.frequency.value = freq;
})


function play () {
  if (Tone.Transport.state === 'stopped') {
    Tone.Transport.start(); 
    playButton.innerHTML = 'stop';
  } else {
    Tone.Transport.stop();
    playButton.innerHTML = 'play';
  }
}



function makeChannel(name){
  var channel = new Tone.Channel().chain(masterDelay, masterFilter, Tone.Master);
  var player = new Tone.Player({
    url : `./assets/${name}.mp3`,
    loop : true
  }).sync().start(0);
  player.chain(channel);
  channels.push(channel);
}
