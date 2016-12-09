class ScreenFlowEmbedder {

  constructor() {
    this.base = 'https://jmperezperez.com/screenflow/lib/';
    const iframe = document.createElement('iframe');
    iframe.src = this.base + 'embed.html';
    iframe.classList.add('screenflow', 'in-corner');
    iframe.style.display = 'none';
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
          if (iframe.classList.contains('in-corner')) {
            this.adjustAspectRatio();
          }
          break;
        }
        case 27 /* escape */ : {
          this.sendMessage('stop-recording');
          break;
        }
      }
    });

    window.addEventListener('resize', e => {
      this.adjustAspectRatio();
    });

    document.body.appendChild(this.iframe);

    // append css
		const ss = document.createElement('link');
    const ref = (document.body || document.getElementsByTagName('head')[0]);
		var sheets = document.styleSheets;
		ss.rel = 'stylesheet';
		ss.href = this.base + 'main.css';

    const onloadcssdefined = cb => {
			const resolvedHref = ss.href;
			let i = sheets.length;
			while(i--) {
				if( sheets[i].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(() => {
				onloadcssdefined(cb);
			}, 10);
		};

    const loadCB = () => {
      this.iframe.style.display = '';
    }

    this.adjustAspectRatio();
    ref.parentNode.insertBefore(ss, ref);
    onloadcssdefined(loadCB);
  }

  adjustAspectRatio() {
    const iframe = this.iframe;
    if (!iframe.classList.contains('in-corner')) {
      return;
    }
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;
    const iW = Math.round(w / 4);
    const iH = Math.round(iW / 1.6);
    const percentageH = iH * 100 / h;
    iframe.style.top = 100 - percentageH + '%';
    iframe.style.height = percentageH + '%';
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
