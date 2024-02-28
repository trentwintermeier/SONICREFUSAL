document.getElementById('convertButton').addEventListener('click', function() {
    var fileInput = document.getElementById('fileInput');
    var outputDiv = document.getElementById('output');
    
    if (fileInput.files.length === 0) {
        outputDiv.textContent = 'Please select an MP3 file.';
        return;
    }
    
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/convert'); // Endpoint to handle file conversion
    xhr.onload = function() {
        if (xhr.status === 200) {
            outputDiv.textContent = xhr.responseText;
        } else {
            outputDiv.textContent = 'Error: ' + xhr.statusText;
        }
    };
    xhr.onerror = function() {
        outputDiv.textContent = 'Error: Failed to send request.';
    };
    xhr.send(formData);
});
