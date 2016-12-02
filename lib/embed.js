class ScreenFlowEmbedder {

  constructor() {
    this.base = 'https://jmperezperez.com/screenflow/lib/';
    const iframe = document.createElement('iframe');
    iframe.src = this.base + 'embed.html';
    iframe.classList.add('screenflow', 'in-corner');
    this.iframe = iframe;
  }

  initialize() {
    document.addEventListener('keyup', e => {
      const iframe = this.iframe;
      switch (e.keyCode) {
        case 65 /* a */ : {
          iframe.classList.toggle('hidden');
          break;
        }
        case 83 /* s */ : {
          iframe.classList.toggle('in-corner');
          iframe.classList.toggle('in-fullscreen');
          break;
        }
        case 27 /* escape */ : {
          this.sendMessage('stop-recording');
          break;
        }
      }
    });

    document.body.prepend(this.iframe);

    // append css
		const ss = document.createElement('link');
    const ref = (document.body || document.getElementsByTagName('head')[0]);
		var sheets = document.styleSheets;
		ss.rel = 'stylesheet';
		ss.href = this.base + 'main.css';
    document.body.prepend(this.iframe);
    ref.parentNode.insertBefore(ss, ref);
  }

  sendMessage(messageName, messageData) {
    this.iframe.contentWindow.postMessage({
      name: messageName,
      data: messageData
    }, '*');
  }
}

{
  const embedder = new ScreenFlowEmbedder();
  embedder.initialize();
}
