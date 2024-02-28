document.getElementById('convertButton').addEventListener('click', async function() {
    var fileInput = document.getElementById('fileInput');
    var outputDiv = document.getElementById('output');
    
    if (fileInput.files.length === 0) {
        outputDiv.textContent = 'Please select an MP3 file.';
        return;
    }
    
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = async function(event) {
        var arrayBuffer = event.target.result;

        try {
            // Convert MP3 to binary data
            var binaryData = await audioworklet.decode(arrayBuffer, { type: 'mp3' });

            // Display binary data
            outputDiv.textContent = binaryData;
        } catch (error) {
            console.error('Error converting MP3 to binary:', error);
            outputDiv.textContent = 'Error: Failed to convert MP3 to binary.';
        }
    };

    reader.readAsArrayBuffer(file);
});
