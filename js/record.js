
              navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {handlerFunction(stream)})


            function handlerFunction(stream) {
            rec = new MediaRecorder(stream);
            rec.ondataavailable = e => {
              audioChunks.push(e.data);
              if (rec.state == "inactive"){
                let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
                recordedAudio.src = URL.createObjectURL(blob);
                var x=recordedAudio.src;
                $("#audiofile").attr('href', x);
                var d = new Date();
                var n = d.getTime()+'.wav';
                $("#audiofile").attr('download', n);
                $("#audiofile")[0].click();
                console.log(x);
                // recordedAudio.controls=true;
                // recordedAudio.autoplay=true;
                sendData(blob)
              }
            }
          }
        function sendData(data) {
            console.log(data);
        }

        record.onclick = e => {
          console.log('I was clicked')
          record.disabled = true;
          record.innerHTML="Recording...";
          stopRecord.disabled=false;
          audioChunks = [];
          rec.start();
        }
        stopRecord.onclick = e => {
          console.log("I was clicked")
          record.disabled = false;
          stop.disabled=true;
          record.innerHTML="Start";
          rec.stop();
        }