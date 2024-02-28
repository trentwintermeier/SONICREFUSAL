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

        console.log('ArrayBuffer:', arrayBuffer);

        // Decode the MP3 file using the Web Audio API
        decodeMP3(arrayBuffer)
            .then(binaryData => {
                console.log('Binary data:', binaryData);
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
    console.log('Decoding MP3...');
    // Create audio context
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Decode audio data
    var audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    console.log('Audio buffer:', audioBuffer);
    
    // Convert audio buffer to binary string
    var binaryString = '';
    var channelData = audioBuffer.getChannelData(0); // Get data from the first channel
    for (var i = 0; i < channelData.length; i++) {
        // Scale float value to integer range [-32768, 32767]
        var value = Math.round(channelData[i] * 32767);
        // Convert integer value to 16-bit binary string
        binaryString += String.fromCharCode(value & 0xFF, (value >> 8) & 0xFF);
    }

    return binaryString;
}
