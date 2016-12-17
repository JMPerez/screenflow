class ScreenFlow {

  constructor() {
    this.recorder = null;
  }

  initialize() {
    window.addEventListener(
      'message',
      event => {
        const data = event.data || {};
        switch (data.name) {
          case 'stop-recording':
            if (this.recorder) {
              this.recorder.stop();
              video.pause();
            }
            break;
        }
      },
     false);

    const getStreamForWindow = () => navigator.mediaDevices.getUserMedia({
      video: {
        mediaSource: 'window'
      }
    });

    const getStreamForCamera = () => navigator.mediaDevices.getUserMedia({
       audio: true,
       video: true
    });

    const video = document.createElement('video');

    const appendCamera = (stream) => {
      document.body.appendChild(video);
      video.src = URL.createObjectURL(stream);
      video.style.height = '100%';
      video.style.width = '100%';
      video.volume = 0;
      video.play();
    };

    getStreamForCamera().then(streamCamera => {
      appendCamera(streamCamera);
      getStreamForWindow().then(streamWindow => {

        const finalStream = new MediaStream();
        const videoTrack = streamWindow.getVideoTracks()[0];
        finalStream.addTrack(videoTrack);
        const audioTrack = streamCamera.getAudioTracks()[0];
        finalStream.addTrack(audioTrack);

        this.recorder = new MediaRecorder(finalStream);
        this.recorder.ondataavailable = function(e) {
          console.log('ondataavailable');
          const link = document.createElement('a');
          link.setAttribute('href', window.URL.createObjectURL(e.data));
          link.setAttribute('download', 'video_' + Math.floor((Math.random() * 999999)) + '.webm');
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        this.recorder.start();
      });
    });
  }
}

{
  const screenFlow = new ScreenFlow();
  screenFlow.initialize();
}
