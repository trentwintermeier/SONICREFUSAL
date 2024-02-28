document.getElementById('convertButton').addEventListener('click', function() {
    var fileInput = document.getElementById('fileInput');
    var outputDiv = document.getElementById('output');
    
    if (fileInput.files.length === 0) {
        outputDiv.textContent = 'Please select an MP3 file.';
        return;
    }
    
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var arrayBuffer = event.target.result;

        // Decode the MP3 file using the Web Audio API
        decodeMP3(arrayBuffer)
            .then(binaryData => {
                // Display binary data
                outputDiv.textContent = binaryData;
            })
            .catch(error => {
                console.error('Error decoding MP3:', error);
                outputDiv.textContent = 'Error: Failed to decode MP3.';
            });
    };

    reader.readAsArrayBuffer(file);
});

async function decodeMP3(arrayBuffer) {
    // Create audio context
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // Decode audio data
    var audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Convert audio buffer to binary string
    var binaryString = '';
    for (var channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        var channelData = audioBuffer.getChannelData(channel);
        for (var i = 0; i < channelData.length; i++) {
            // Scale float value to integer range [-32768, 32767]
            var value = Math.round(channelData[i] * 32767);
            // Convert integer value to binary string
            binaryString += value.toString(2);
        }
    }

    return binaryString;
}
