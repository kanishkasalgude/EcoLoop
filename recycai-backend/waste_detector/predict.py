import sys
import os
import json
import numpy as np
import random
import time
from PIL import Image

HAS_TF = False
try:
    import tensorflow as tf
    HAS_TF = True
    # Suppress TF logging
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
    tf.get_logger().setLevel('ERROR')
except ImportError:
    pass

def preprocess_image(image_path, target_size=(224, 224)):
    try:
        image = Image.open(image_path)
        image = image.convert('RGB')
        image = image.resize(target_size)
        img_array = np.array(image)
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    except Exception as e:
        print(json.dumps({"error": f"Error preprocessing image: {str(e)}"}))
        sys.exit(1)

CLASSES = [
    'brick', 'carpet', 'ceramic', 'fabric', 'foliage', 'food', 'glass', 
    'hair', 'leather', 'metal', 'mirror', 'other', 'painted', 'paper', 
    'plastic', 'polishedstone', 'skin', 'sky', 'stone', 'tile', 
    'wallpaper', 'water', 'wood'
]

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided."}))
        sys.exit(1)
        
    image_path = sys.argv[1]
    
    if not HAS_TF:
        # Mock mode
        time.sleep(1) # simulate delay
        predicted_idx = random.randint(0, len(CLASSES) - 1)
        confidence = random.uniform(85.0, 99.9)
        predicted_class = CLASSES[predicted_idx]
        print(json.dumps({
            "predicted_class": predicted_class,
            "confidence": confidence,
            "mock_mode": True
        }))
        sys.exit(0)

    # Path to MINC_best.keras
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    model_path = os.path.join(base_dir, "MINC_best.keras")
    
    if not os.path.exists(model_path):
        print(json.dumps({"error": f"Model not found at {model_path}"}))
        sys.exit(1)
        
    try:
        model = tf.keras.models.load_model(model_path)
    except Exception as e:
        print(json.dumps({"error": f"Model loading failed: {str(e)}"}))
        sys.exit(1)
        
    processed_image = preprocess_image(image_path)
    
    try:
        predictions = model.predict(processed_image, verbose=0)
        predicted_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_idx] * 100)
        predicted_class = CLASSES[predicted_idx]
        
        result = {
            "predicted_class": predicted_class,
            "confidence": confidence,
            "mock_mode": False
        }
        
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": f"Prediction failed: {str(e)}"}))
        sys.exit(1)

if __name__ == "__main__":
    main()
