import { MediaModel } from "../Model/mediaModel.js";
import {createStream, 

} from "../View/mediaView.js"

const mediaModel = new MediaModel(
    "audioContainer",
    "videoContainer",
    false
  );  

  window.MediaModel = mediaModel;
  
const connection = mediaModel.initConnection();
/*
document.getElementById(
  "roomName"
).innerHTML = `<b>${mediaModel.roomName}@${connection.options.hosts.muc}</b><br><p>audioOnly: ${mediaModel.audioOnly}</p>`;

*/

  mediaModel.createLocalTracks(connection)

const conference = mediaModel.initConference(connection);
conference.setDisplayName(`Talk-${makeRandomString(8, false)}`);
receiverConstraints(conference, 1080, 30)

connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
    () => {
      console.log(`Connected to "${connection.options.hosts.domain}"`);
      conference.join();
    }
  );

conference.addEventListener(
JitsiMeetJS.events.conference.CONFERENCE_JOINED,
() => {
    console.log(`Connected to "${conference.options.name}"`);
    populateDevices();
    testConnectionChecker();
    mediaModel.localTracks.forEach((track) => {
    conference.addTrack(track);
    });
}
);

conference.addEventListener(JitsiMeetJS.events.conference.USER_JOINED, (id) => {
console.log(`User ${id} joined.`);
});

conference.addEventListener(JitsiMeetJS.events.conference.USER_LEFT, (id) => {
    console.log(`User ${id} left.`);
    mediaModel.remoteTracks[id].forEach((track) => {
        if (track.type == "video") {
        mediaModel.detachVideoElement(track);
        } else if (track.type == "audio") {
        mediaModel.detachAudioElement(track);
        }
    });
    mediaModel.deleteRemoteTracks(id);
    }
);

conference.addEventListener(
JitsiMeetJS.events.conference.TRACK_ADDED,
(track) => {
        if (!track.isLocal()) {
            mediaModel.addRemoteTrack(track, track.getParticipantId());
        }
        console.log(track.getVideoType())
        if(track.getVideoType()!="desktop") {
            console.log("attaching track")
            mediaModel.attachTrack(track);
        }
        else if (track.getVideoType()=="desktop") {
            mediaModel.attachDesktopVideo(track)
        }
    }
);

conference.on(JitsiMeetJS.events.conference.TRACK_ADDED, track => {
if (track.getType() === 'audio') {
    track.addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
        audioLevel => {
            //console.log('Remote Audio level:', audioLevel);
            if (audioLevel > 0.05) {
              changeVideoWrapperColour(track, "green")
            } else if (audioLevel < 0.05){
              changeVideoWrapperColour(track, "whitesmoke")
            }
        }
    );
}
});

navigator.mediaDevices.ondevicechange = (events) =>{
  populateDevices();
}

conference.addEventListener(
JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, (track) => {
    console.log("TRACK MUTE CHANGED")
    if(track.isLocal() == true && track.getType() == "video"){
    conference.getLocalTracks().forEach((track) =>{
        if(track.isMuted() == false){
        console.log("local track mute false")
        let videoElement = document.getElementById(`${track.getParticipantId()}-video`)
        setTimeout(() => track.attach(videoElement), 10)
        //track.attach(videoElement)
        } else if (track.isMuted() == true)
        console.log("local track mute is true")
        let videoElement = document.getElementById(`${track.getParticipantId()}-video`)
        track.detach(videoElement)
    })
    } else if (track.isLocal() == false && track.getType() == "video"){
    mediaModel.remoteTracks[track.getParticipantId()].forEach((track) =>{
        if(track.isMuted() == false){
        console.log("remote track mute is false")
        let videoElement = document.getElementById(`${track.getParticipantId()}-video`)
        track.attach(videoElement)
        } else if(track.isMuted() == true){
        console.log("remote track mute is true")
        let videoElement = document.getElementById(`${track.getParticipantId()}-video`)
        track.detach(videoElement)
        }
    }
    )
    } else if (track.getType() == "audio"){
      if(track.isMuted() == true){
        setTimeout(() => changeVideoWrapperColour(track, "red"), 500)
      } else if (track.isMuted() == false){
        changeVideoWrapperColour(track, "whitesmoke")
      }

    }
})

document.getElementById('audioInput').addEventListener('change', function() {
  changeDevice('audio', this.value);
  console.log(this.value)
});
  
document.getElementById('videoInput').addEventListener('change', function() {
  changeDevice('video', this.value);
  console.log(this.value)
});

/*
document.getElementById("fisk").addEventListener("click", () => screenShare())
document.getElementById("unFisk").addEventListener("click", () => stopScreenShare())
*/
document.getElementById('fetchButton').addEventListener('click', () => {
  populateDevices();
})

let screenShareBtn = document.querySelector("#toggleScreenshareButton div")

screenShareBtn.addEventListener('click', () => {
  screenShareBtn.classList.toggle('screenshare')
  screenShareBtn.classList.toggle('screenshare-off')
});

document.getElementById('toggleScreenshareButton').addEventListener('click', () => {
  conference.getLocalTracks().forEach((track) => {
    if(track.getVideoType() === 'camera'){
      screenShare();
    } else if (track.getVideoType() === 'desktop'){
      stopScreenShare();
    }
  })
})

let video = document.querySelector("#toggleVideoButton div")

video.addEventListener('click', () => {
  video.classList.toggle('video')
  video.classList.toggle('video-slash')
});

document.getElementById('toggleVideoButton').addEventListener('click', () => {
  conference.getLocalTracks().forEach((track) => {
    if(track.type == 'video' && track.isMuted() == true){
      console.log('Video track unmuted')
      track.unmute();
    } else if (track.type == 'video' && track.isMuted() == false) {
      console.log('Video track muted')
      track.mute();
    }
  });
});

let microphone = document.querySelector("#toggleAudioButton div")

microphone.addEventListener('click', () => {
  microphone.classList.toggle('microphone')
  microphone.classList.toggle('microphone-slash')
});

document.getElementById('toggleAudioButton').addEventListener('click', () => {
  conference.getLocalTracks().forEach((track) => {
    if(track.type == 'audio' && track.isMuted() == true){
      console.log('Audio track unmuted')
      track.unmute();
    } else if (track.type == 'audio' && track.isMuted() == false) {
      console.log('Audio track muted')
      track.mute();
    }
  });
});

function makeRandomString(n, lowerCase) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < n; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowerCase ? str.toLowerCase() : str;
}

function receiverConstraints(conference, maxHeight, maxFrameRate){
  conference.setReceiverConstraints({
    "defaultConstraints": { "maxHeight":  maxHeight, "maxFrameRate": maxFrameRate},
  })
}



function changeVideoWrapperColour(track, color){
  document.getElementById(`${track.getParticipantId()}-video`).style.backgroundColor = color
}


function testConnectionChecker(){
    setInterval(function(){
      localConnectionQuality()
  }, 5000)
  }
  
function localConnectionQuality(){
    let connectionQuality = conference.statistics.conference.connectionQuality._localStats;
    //console.log(connectionQuality)
    return connectionQuality;
  }

document.getElementById("backendRequest").addEventListener("click", fetchBackend)

async function fetchBackend() {
  const res = await fetch("https://localhost:3333/hello")
  if(!res.ok) {
    throw new Error(`Response status: ${res.status}`)
  } else if(res.ok) {
    console.log("Could send request to backend")
  }
}

function populateDevices(){
  const audioIn = document.getElementById('audioInput')
  const audioOut = document.getElementById('audioOutput')
  const videoIn = document.getElementById('videoInput')

  removeOptions(audioIn);
  removeOptions(audioOut);
  removeOptions(videoIn);

  audioIn.appendChild(dummyOption("--Audio Input--"))
  audioOut.appendChild(dummyOption("--Audio Output--"))
  videoIn.appendChild(dummyOption("--Video Input--"))
  
JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
  devices.forEach(device => {
    let option = document.createElement('option');
    option.value = device.deviceId;
    option.text = device.label;
    console.log("option value: " + option.value + " option text: " + option.text)
    if(device.kind === 'audioinput') {
      audioIn.appendChild(option);
    } else if(device.kind === 'audiooutput') {
      audioOut.appendChild(option);
    } else if(device.kind === 'videoinput') {
      videoIn.appendChild(option);
    }
  });
});
}

function dummyOption(text){
  let option = document.createElement('option');
  option.selected;
  option.disabled;
  option.text = text;
  return option
}

function removeOptions(selectElement) {
  var i, L = selectElement.options.length - 1;
  for(i = L; i >= 0; i--) {
     selectElement.remove(i);
  }
}

function changeDevice(kind, deviceId) {
  let track = conference.getLocalTracks().find(t => t.getType() === kind);
  console.log("change Device track: " + track)
  if (track) {
    if(kind == "video"){
    
    JitsiMeetJS.createLocalTracks({
      devices: [kind],
      facingMode: "user",
      resolution: "1080",
      cameraDeviceId: [deviceId],
    }).then(newTracks => {
      let newTrack = newTracks[0];
      console.log("change device new track: " + newTrack)
      conference.replaceTrack(track, newTrack);
      mediaModel.replaceTrack(track, newTrack);
      if(track.isMuted() == true){
        newTrack.mute()
      }
    }).catch(error => {
      console.error(`Failed to switch ${kind} input:`, error);
    });
  } else if (kind == "audio"){
    JitsiMeetJS.createLocalTracks({
      devices: [kind],
      micDeviceId: [deviceId],
    }).then(newTracks => {
      let newTrack = newTracks[0];
      conference.replaceTrack(track, newTrack);
      if(track.isMuted() == true){
        newTrack.mute()
      }
    }).catch(error => {
      console.error(`Failed to switch ${kind} input:`, error);
    });
  }}
}

function screenShare() {
  let track = conference.getLocalTracks().find(t => t.getType() === "video");
  console.log("screenshare")
    JitsiMeetJS.createLocalTracks({
      devices: ["desktop"]
    }).then(newTracks => {
      let newTrack = newTracks[0];
      conference.addTrack(newTrack);
      conference.removeTrack(track) 
    })
    conference.removeTrack(track)   
}

function stopScreenShare() {
  let oldtrack = conference.getLocalTracks().find(t => t.getVideoType() === "desktop");
  let videoElement = document.getElementById(`${oldtrack.getParticipantId()}-video`)
  JitsiMeetJS.createLocalTracks({
    devices: ["video"]
  }).then(tracks => {
    tracks.forEach((track) => {
      conference.addTrack(track)
      oldtrack.detach(videoElement)
      track.attach(videoElement)
    })
  }
  )
  conference.removeTrack(oldtrack) 
}
