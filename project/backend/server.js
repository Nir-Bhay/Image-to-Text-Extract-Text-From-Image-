const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors()); // To allow cross-origin requests from the frontend

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Define the OCR upload route
app.post("/upload", upload.single("file"), (req, res) => {
    const filePath = req.file.path;

    // Run Tesseract OCR on the uploaded file with the specified language (English in this case)
    exec(`tesseract ${filePath} stdout -l eng`, (error, stdout) => {
        if (error) {
            return res.status(500).json({ error: "OCR processing failed" });
        }
        res.json({ text: stdout.trim() }); // Send the extracted text back to the frontend
    });
});

// Handle the root route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(5000, () => {
    console.log("Server started on port 5000");
});
