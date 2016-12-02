# Poor Man's ScreenFlow

This project uses the [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) to record your screen, as well as your camera in a corner or in full page.

![Recording of me trying this out](demo.gif)

You can also see [the generated .webm video](demo-output.webm).

## How to make it work

As of December 2016 this demo **is only supported on Firefox**. Chrome is not supported out of the box, needing an extension and lots of custom code (see [this WebRTC experiment](https://www.webrtc-experiment.com/RecordRTC/) for more information. It will show your camera, but won't record anything.

These are **the steps to make the demo work**:

1.  Open Firefox's about:config and add `jmperezperez.com` to the `media.getusermedia.screensharing.allowed_domains` list
2.  Run this demo
3.  Accept to share your camera
4.  Finally, accept to share your screen. From this moment your screen is being recorded. Pressing **escape** finishes the recording and creates a .webm file.

## Using it

On your page, include this script https://jmperezperez.com/screenflow/lib/embed.js. It will be used to display an iframe with your camera and bind the keyboard events.

These are the keyboard bindings supported by this library. The focused element must be the hosting page for it to work, so if you click the camera image, press again on the host page.

*   Escape: finishes the recording and saves the file
*   s: Switches the camera between full page and picture-in-picture
*   a: Toggles the visibility of the camera

## References

This project is based on [Soledad Penadés](https://twitter.com/supersole)' [Real time front-end alchemy](https://soledadpenades.com/files/t/2016_rtalchemy/) talk.
