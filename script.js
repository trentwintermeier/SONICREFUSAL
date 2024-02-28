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
        var base64Data = btoa(event.target.result); // Encode binary data as base64
        var requestData = {
            data: base64Data,
            filename: file.name
        };

        fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
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
            console.error('Error fetching data:', error);
            outputDiv.textContent = 'Error: Failed to fetch data. Please try again later.';
        });
    };

    reader.readAsBinaryString(file); // Read file as binary string
});
