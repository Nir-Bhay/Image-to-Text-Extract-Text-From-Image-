let file;

function handleFiles(files) {
    file = files[0];
    document.querySelector("#drop-area p").textContent = file.name;
}

function uploadFile() {
    if (!file) {
        alert("Please select a file first.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    document.getElementById("loader").style.display = "block"; // Show loading spinner
    document.getElementById("output").style.display = "none"; // Hide output during processing

    fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("loader").style.display = "none"; // Hide loading spinner
            document.getElementById("output").style.display = "block"; // Show output
            document.getElementById("text-output").textContent = data.text;
        })
        .catch(error => {
            document.getElementById("loader").style.display = "none"; // Hide loading spinner
            alert("Error: " + error.message);
        });
}

function copyText() {
    const text = document.getElementById("text-output").textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Text copied to clipboard!");
    });
}
