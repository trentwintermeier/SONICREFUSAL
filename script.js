async function decodeMP3(arrayBuffer) {
    // Create audio context
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // Decode audio data
    var audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Convert audio buffer to binary string
    var binaryString = '';
    var channelData = audioBuffer.getChannelData(0); // Get data from the first channel
    for (var i = 0; i < channelData.length; i++) {
        // Scale float value to integer range [-32768, 32767]
        var value = Math.round(channelData[i] * 32767);
        // Convert integer value to binary string
        var binaryValue = (value >>> 0).toString(2); // Convert to unsigned 32-bit integer and then to binary string
        // Pad binary string with leading zeros to ensure it has 16 bits
        binaryValue = '0'.repeat(16 - binaryValue.length) + binaryValue;
        // Append binary value to the result
        binaryString += binaryValue;
    }

    return binaryString;
}
