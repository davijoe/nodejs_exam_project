export function createStream(mainD){
    const h3 = document.createElement("h3");
    h3.setAttribute("id", "roomName");
    mainD.appendChild(h3);

    const toolbarDiv = document.createElement('div');
    mainD.appendChild(toolbarDiv);
    const audioBtn = document.createElement('button');
    audioBtn.setAttribute("id", "toggleAudioButton");
    audioBtn.className = "toggleButton";
    toolbarDiv.appendChild(audioBtn);

    const micD = document.createElement('div');
    micD.className = "microphone";
    audioBtn.appendChild(micD);

    const videoBtn = document.createElement('button');
    videoBtn.setAttribute("id", "toggleVideoButton");
    videoBtn.className = "toggleButton";
    toolbarDiv.appendChild(videoBtn);

    const videoD = document.createElement('div');
    videoD.className = "video";
    videoBtn.appendChild(videoD);

    //DEBUG buttons below

    const fisk = document.createElement('button');
    fisk.setAttribute("id", "fisk");
    fisk.innerText = "Start screenshare";
    toolbarDiv.appendChild(fisk);

    const unFisk = document.createElement('button');
    unFisk.setAttribute("id", "unFisk");
    unFisk.innerText = "Stop screenshare";
    toolbarDiv.appendChild(unFisk);

    const fetchBtn = document.createElement('button');
    fetchBtn.setAttribute("id", "fetchButton");
    fetchBtn.setAttribute("hidden", '')
    fetchBtn.innerText = "DEBUG: Fetch devices";
    toolbarDiv.appendChild(fetchBtn);

    const backEndBtn = document.createElement('button');
    backEndBtn.setAttribute("id", "backendRequest");
    backEndBtn.setAttribute("hidden", '')
    backEndBtn.innerText = "DEBUG: Request to backend";
    toolbarDiv.appendChild(backEndBtn);

    //DEBUG btn end

    const inOutSelectDiv = document.createElement('div');
    toolbarDiv.appendChild(inOutSelectDiv);

    const audioInSelect = document.createElement('select');
    audioInSelect.setAttribute("id", "audioInput");
    inOutSelectDiv.appendChild(audioInSelect);

    const audioOutSelect = document.createElement('select');
    audioOutSelect.setAttribute("id", "audioOutput");
    inOutSelectDiv.appendChild(audioOutSelect);

    const videoInSelect = document.createElement('select');
    videoInSelect.setAttribute("id", "videoInput");
    inOutSelectDiv.appendChild(videoInSelect);

    const videoDiv = document.createElement('div');
    videoDiv.setAttribute("id", "videoContainer");
    videoDiv.className = "wrapper";
    mainD.appendChild(videoDiv);

    const audioDiv = document.createElement('div');
    audioDiv.setAttribute("id", "audioContainer");
    mainD.appendChild(audioDiv);
}