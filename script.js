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

    fetch('/convert', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        outputDiv.textContent = data;
    })
    .catch(error => {
        outputDiv.textContent = 'Error: ' + error.message;
    });
});
