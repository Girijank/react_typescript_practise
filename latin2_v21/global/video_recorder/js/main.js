(function () {
	/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

// This code is adapted from
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html

	'use strict';

	/* globals MediaRecorder */

	const mediaSource = new MediaSource();
	mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
	let mediaRecorder;
	let recordedBlobs;
	let sourceBuffer;

	let isVideoActive = false

	const gum = document.querySelector('video#gum');
	const recordedVideo = document.querySelector('video#recorded');
	const recordButton = document.querySelector('button#record');
	const downloadButton = document.querySelector('button#download');
	const videosDiv = document.querySelector('div#supportedBrowser');
	const errorMsgElement = document.querySelector('span#errorMsg');

	activate()

	function activate () {
		// console.log('recorder has been activated')
		recordButton.addEventListener('click', toggleRecord)

		downloadButton.addEventListener('click', downloadVideo);
		document.querySelector('button#start').addEventListener('click', activateVideo)

		$(document).keydown(handleKey)
	}

	async function activateVideo () {
		if (isVideoActive) return console.log('video is already active')
		isVideoActive = true

		const constraints = {
			video: {
				width: 400, height: 300
			}
		};

		// console.log('Using media constraints:', constraints);

		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			handleSuccess(stream);
		} catch (e) {
			isVideoActive = false
			console.error('navigator.getUserMedia error:', e);
			errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
		}
	}

	function downloadVideo () {
		const blob = new Blob(recordedBlobs, {type: 'video/webm'});
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');

		a.style.display = 'none';
		a.href = url;
		a.download = 'my-asl-video_' + new Date().getTime() + '.webm';
		document.body.appendChild(a);
		a.click();

		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 100);
	}

	function handleDataAvailable(event) {
		if (event.data && event.data.size > 0) {
			recordedBlobs.push(event.data);
		}
	}

	function handleKey (e) {
		if (e.key === 'a' && !isVideoActive) activateVideo()
		else if (e.key === 'r') toggleRecord()
		else if (e.key === 's' && !downloadButton.disabled) downloadVideo()
	}
	function handleSourceOpen(event) {
		console.log('MediaSource opened');
		sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
		console.log('Source buffer: ', sourceBuffer);
	}

	function handleSuccess(stream) {
		recordButton.disabled = false;
		// console.log('getUserMedia() got stream:', stream);
		window.stream = stream;
		gum.srcObject = stream;

		videosDiv.classList.add('no-data')
		videosDiv.classList.remove('inactive')
		downloadButton.disabled = true
	}

	async function startRecording() {
		if (!isVideoActive) await activateVideo()

		recordedBlobs = [];
		let options = {mimeType: 'video/webm;codecs=vp9'};

		if (!MediaRecorder.isTypeSupported(options.mimeType)) {
			console.error(`${options.mimeType} is not Supported`);
			// errorMsgElement.innerHTML = `There was an error. Please try a different browser`;
			options = {mimeType: 'video/webm;codecs=vp8'};

			if (!MediaRecorder.isTypeSupported(options.mimeType)) {
				console.error(`${options.mimeType} is not Supported`);
				// errorMsgElement.innerHTML = `There was an error. Please try a different browser`;
				options = {mimeType: 'video/webm'};

				if (!MediaRecorder.isTypeSupported(options.mimeType)) {
					console.error(`${options.mimeType} is not Supported`);
					errorMsgElement.innerHTML = `There was an error. Please try a different browser`;
					options = {mimeType: ''};
				}
			}
		}

		try {
			mediaRecorder = new MediaRecorder(window.stream, options);
		} catch (e) {
			console.error('Exception while creating MediaRecorder:', e);
			errorMsgElement.innerHTML = `There was an error. Please try a different browser`;
			// errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
			// TODO: Add analytics
			return;
		}

		// console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
		recordButton.textContent = 'Stop Recording';
		downloadButton.disabled = true
		videosDiv.classList.add('recording')

		mediaRecorder.onstop = (event) => {
			// console.log('Recorder stopped: ', event);
			isVideoActive = false

			const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
			recordedVideo.src = null;
			recordedVideo.srcObject = null;
			recordedVideo.src = window.URL.createObjectURL(superBuffer);
			recordedVideo.controls = true;

			videosDiv.classList.remove('no-data')
			videosDiv.classList.remove('recording')

			setTimeout(function () {
				if (!isVideoActive) gum.srcObject.getTracks().forEach(t => t.stop())
			}, 30000)
		};

		mediaRecorder.ondataavailable = handleDataAvailable;
		mediaRecorder.start(10); // collect 10ms of data
		// console.log('MediaRecorder started', mediaRecorder);
	}

	function stopRecording() {
		mediaRecorder.stop();
		// console.log('Recorded Blobs: ', recordedBlobs);
	}

	function toggleRecord () {
		if (recordButton.textContent === 'Start Recording') startRecording()
		else {
			stopRecording();
			recordButton.textContent = 'Start Recording';
			downloadButton.disabled = false;
		}
	}
})()
