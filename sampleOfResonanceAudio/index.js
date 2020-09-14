console.log("ok")
const audioContext = new AudioContext();
const resonanceAudioScene = new ResonanceAudio(audioContext);
resonanceAudioScene.output.connect(audioContext.destination)
console.log(resonanceAudioScene)

const roomDimensions = {
    width: 3.1,
    height: 2.5,
    depth: 3.4,
};

const roomMaterials = {
    left: 'brick-care',
    right: 'brick-care',
    front: 'brick-care',
    back: 'brick-care',
    down: 'brick-care',
    up: 'brick-care',
};

resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);

const audioElement = document.createElement('audio');
audioElement.src = '';

const audioElementSource = audioContext.creareMediaElementSource(audioElement);
const source = resonanceAudioScene.createSource();
audioElementSource.connect(source, input);

source.setPosition(-0.7, -0.7, 0);
audioElement.play()