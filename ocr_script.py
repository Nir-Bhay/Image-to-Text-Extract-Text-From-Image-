from PIL import Image
import pytesseract

# Specify the path to Tesseract if needed
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Load the image from file
image_path = r'C:\Users\lenovo\markswise\ChatGPT.png'
image = Image.open(image_path)

# Optional: Show the image to confirm it's being loaded correctly
image.show()

# Optional: Convert to grayscale and resize for better OCR accuracy
image = image.convert('L')  # Convert image to grayscale
image = image.resize((image.width * 2, image.height * 2))  # Resize for better clarity

# Perform OCR on the image with config to improve accuracy
extracted_text = pytesseract.image_to_string(image, config='--psm 6')

# Print the extracted text
print("Extracted Text:")
print(extracted_text)
