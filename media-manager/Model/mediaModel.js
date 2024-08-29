/**
 * Object that keeps "track" of media tracks, i.e. Audio and Video.
 * @param {string} audioContainerId Id <div> that audio tracks should be appended to.
 * @param {string} videoContainerId Id of <div> that video tracks hould be appended to.
 * @param {boolean} audioOnly True if video should not be handled by this mediamanager, defaults to false.
 *
 * @returns {Object} instance of MediaManager class.
 */


export class MediaModel {
    constructor(audioContainerId, videoContainerId, audioOnly) {
      
      this.roomName = "nyhu8ftjdzi6lob2c2m31odqty3ncgnm";
      this.roomOptions = {
        p2p: { enabled: false },
        rttMonitor: {enabled: true},
        };
        
      this.mediaTracks = {
        local: [],
        remote: {},
      };
  
      this.videoIds = [];
      this.audioIds = [];
  
      this.audioOnly = audioOnly ? audioOnly : false;
      if (audioOnly) {
        this.log("Running in audio-only mode!", "INFO");
      }
  
      const audioContainer = document.getElementById(audioContainerId);
      if (!audioContainer) {
        this.log("Could not find audio container in HMTL.", "ERROR");
      } else {
        this.log("Found audio container in HTML.", "INFO");
      }
  
      if (!audioOnly) {
        const videoContainer = document.getElementById(videoContainerId);
        if (!videoContainer) {
          this.log("Could not find video container in HTML.", "ERROR");
        } else {
          this.log("Found video container in HTML.", "INFO");
        }
      }
    }

    /*
    roomName = "test";
    roomOptions = {
      p2p: { enabled: false },
      rttMonitor: {enabled: true},
      };
      */


        /**
     * Getter for local tracks
     * @returns {list[tracks]}
     */
    get localTracks() {
        return this.mediaTracks["local"];
    }

    /**
     * Getter for remote tracks
     * @returns {list[tracks]}
     */
    get remoteTracks() {
        return this.mediaTracks["remote"];
    }

    initConnection() {
        JitsiMeetJS.init()
        //const roomName = makeRandomString(32, true);
        let connection = new JitsiMeetJS.JitsiConnection(null, null, {
        serviceUrl: "wss://snak.semaphor.dk/xmpp-websocket",
        hosts: {
        domain: "jitsi-mm2.semaphor.dk",
        muc: "conference.snak.jitsi-mm2.semaphor.dk",
        },
        });
        return connection
    }

    initConference(connection) {
        let conference = connection.initJitsiConference(this.roomName, this.roomOptions);
        return conference;
    }

    createLocalTracks(connection) {
        if (!JitsiMeetJS) {
        this.log("Please initialize the JitsiMeetJS object first", "ERROR");
        } else {
        var get_devices = this.audioOnly ? ["audio"] : ["audio", "video"];

        JitsiMeetJS.createLocalTracks({
            devices: get_devices,
            facingMode: "user",
            resolution: "720",
        })
            .then((tracks) => {
            tracks.forEach((track) => {
                this.addLocalTrack(track);
            });
            connection.connect();
            })
            .catch((error) => {
            throw error;
            });
        }
    }


      /**
   * Create a <video> element and attaches a Jitsi videotrack to it.
   * @param {*} track(
   */
  attachVideoElement(track) {
    console.log(track)
    if(track.isLocal() == true){
      if (!this.videoIds.includes(track.getParticipantId()) && !this.audioOnly) {
        this.log(`Updating HTML with local videotrack.`, "INFO");
        var videoElement = document.createElement("video");
        videoElement.id = "videoElement";
        videoElement.className = "localVideo";
        videoElement.autoplay = true;
        videoElement.addEventListener('click', () =>{
          if(fullScreen == false){
            videoElement.requestFullscreen();
          } else if (fullScreen == true){
            document.exitFullscreen();
          }
        })
        videoElement.id = `${track.getParticipantId()}-video`;
        
        localVideoContainer.appendChild(videoElement);
        this.videoIds.push(track.getParticipantId());
        track.attach(videoElement);
      }
    } else if(track.isLocal() == false){
      if (!this.videoIds.includes(track.getParticipantId()) && !this.audioOnly) {
        this.log(`Updating HTML with local videotrack.`, "INFO");
        var videoElement = document.createElement("video");
        videoElement.id = "videoElement";
        videoElement.className = "remoteVideo";
        videoElement.autoplay = true;
        videoElement.addEventListener('click', () =>{
          if(fullScreen == false){
            videoElement.requestFullscreen();
          } else if (fullScreen == true){
            document.exitFullscreen();
          }
        })
        videoElement.id = `${track.getParticipantId()}-video`;
        
        remoteVideoContainer.appendChild(videoElement);
        this.videoIds.push(track.getParticipantId());
        track.attach(videoElement);
      }
    }
  }
  
  
  /**
   * Create a <audio> element and attaches an Jitsi audiotrack to it.
   * @param {*} track
   */
  attachAudioElement(track) {
    if (!this.audioIds.includes(track.getParticipantId())) {
      var audioElement = document.createElement("audio");
      audioElement.autoplay = true;
      audioElement.audioLevel = 0.5;
      audioElement.id = `${track.getParticipantId()}-audio`;
      audioContainer.appendChild(audioElement);
      this.audioIds.push(track.getParticipantId());
      track.attach(audioElement);
    }
  }

  /**
   * Detach JitsiTrack from video element and remove the element.
   * @param {*} track
   */
  detachVideoElement(track) {
    if (this.videoIds.includes(track.getParticipantId()) && !this.audioOnly) {
      var videoElement = document.getElementById(
        `${track.getParticipantId()}-video`
      );
      track.detach(videoElement);
      videoElement.remove();
    }
  }

  /**
  * Detach JitsiTrack from video element.
  * @param {*} track
  */
  detachVideo(track) {
    if (this.videoIds.includes(track.getParticipantId()) && !this.audioOnly) {
      var videoElement = document.getElementById(
        `${track.getParticipantId()}-video`
      );
      track.detach(videoElement);
    }
  }


  /**
  * Attach JitsiTrack to video element.
  * @param {*} track
  */
  attachVideo(track) {
      if (this.videoIds.includes(track.getParticipantId()) && !this.audioOnly) {
        var videoElement = document.getElementById(
        `${track.getParticipantId()}-video`
      );
      track.attach(videoElement);
    }
  }
    

  /**
   * Detach JitsiTrack from audio element and remove the element.
   * @param {*} track
   */
  detachAudioElement(track) {
    if (this.audioIds.includes(track.getParticipantId())) {
      var audioElement = document.getElementById(
        `${track.getParticipantId()}-audio`
      );
      track.detach(audioElement);
      audioElement.remove();
    }
  }

  /**
   * Add local track to mediaTracks.
   * @param {*} track media track.
   */
  addLocalTrack(track) {
    this.localTracks.push(track);
  }

  /**
   * Add remote track to mediaTracks.
   * @param {*} track media track.
   * @param {string} pid participant ID.
   */
  addRemoteTrack(track, pid) {
    console.log("adding remote track")
    if (!this.remoteTracks[pid]) {
      this.remoteTracks[pid] = [];
    }
    if (track.getType() == "video") {
        console.log("adding remote video")
        this.remoteTracks[pid].forEach(existingTrack => {
            console.log(existingTrack)
            console.log(track)
          if(existingTrack.getType() == track.getType()) {
            this.replaceTrack(existingTrack, track)
          }
        });
      } 
    this.remoteTracks[pid].push(track);
    this.log(`Added ${track.type}-track for ${pid}.`, "INFO");
    console.log(track.getType())

  }

  /**
   * Remove remote track from mediaTracks.
   * @param {string} pid participant ID.
   */
  deleteRemoteTracks(pid) {
    if (this.remoteTracks[pid]) {
      delete this.remoteTracks[pid];
      this.log(`Track(s) for ${pid} removed.`, "INFO");
    }
  }

  /**
   * Attaches a JitsiTrack to appropriate element.
   * Ignores local audiotracks, as the user would hear
   * themselves. Distinguishes between local and remote trakcs.
   * @param {*} track
   */
  attachTrack(track) {
    console.log(track.isLocal())
    if (track.isLocal()) {
      if (track.type == "video") {
        if(document.getElementById(`${track.getParticipantId()}-video`) == null) {
            this.attachVideoElement(track);
        }
        if(document.getElementById(`${track.getParticipantId()}-video`)!= null) {
           let videoElement = document.getElementById(`${track.getParticipantId()}-video`)
           track.attach(videoElement)
        }
        console.log(track)
      } else if (track.type == "audio") {
        this.log("Skipping attachment of local audiotrack.", "INFO");
      } else {
        this.log(`Unknown track type ${track.type}.`, "ERROR");
      }
    } else {
      if (track.type == "video") {
        this.log(`Attaching video track from user ${track.getParticipantId()}`);
        this.attachVideoElement(track);
      } else if (track.type == "audio") {
        this.log(`Attaching audio track from user ${track.getParticipantId()}`);
        this.attachAudioElement(track);
      } else {
        this.log(`Unknown track type ${track.type}.`, "ERROR");
      }
    }
  }

    /**
   * Detach Old JitsiTrack from video element and replace it with a new JitsiTrack.
   * @param {*} track
   */
    replaceTrack(oldTrack, newTrack) {
      if (this.videoIds.includes(oldTrack.getParticipantId()) && !this.audioOnly) {
        var videoElement = document.getElementById(
          `${oldTrack.getParticipantId()}-video`
        );
        oldTrack.detach(videoElement);
        newTrack.attach(videoElement);
      }
    }
  

   replaceVideoWithDesktop(oldTrack, newTrack) {
      if (this.videoIds.includes(oldTrack.getParticipantId()) && !this.audioOnly) {
        console.log("here2")
        var videoElement = document.getElementById(
          `${oldTrack.getParticipantId()}-video`
        );
        console.log(oldTrack)
        console.log(newTrack)
        oldTrack.detach(videoElement)
        newTrack.attach(videoElement)
        console.log("here3")
      }
    }

  attachDesktopVideo(track) {
    let videoElement = document.getElementById(`${track.getParticipantId()}-video`)
    console.log(videoElement)
    console.log(track)
    track.attach(videoElement);
  }

    log(msg, level) {
        var timestamp = new Date().toLocaleString("default", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        if (level == "LOG" || level == "log") {
          console.log(`${timestamp} [MediaManager] ${msg}`);
        } else if (level == "INFO" || level == "info") {
          console.info(`${timestamp} [MediaManager] ${msg}`);
        } else if (level == "ERROR" || level == "error") {
          console.error(`${timestamp} [MediaManager] ${msg}`);
        }
    }
}