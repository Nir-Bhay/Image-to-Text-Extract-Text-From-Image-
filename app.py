from flask import Flask, request, render_template
from PIL import Image
import pytesseract
import os

app = Flask(__name__)

# Specify the path to Tesseract if needed
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part"

    file = request.files['file']
    if file.filename == '':
        return "No selected file"

    # Save the uploaded file
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    # Load the image and perform OCR
    image = Image.open(file_path)
    image = image.convert('L')  # Convert to grayscale
    image = image.resize((image.width * 2, image.height * 2))  # Resize for clarity
    extracted_text = pytesseract.image_to_string(image, config='--psm 6')

    return render_template('index.html', extracted_text=extracted_text)

if __name__ == '__main__':
    app.run(debug=True)
