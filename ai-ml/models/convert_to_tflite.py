import tensorflow as tf
import os

model_path = "disease_model.h5"
output_path = "disease_model.tflite"

print(f"Loading {model_path}...")
try:
    model = tf.keras.models.load_model(model_path)
    print("Converting to TFLite...")
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    # Enable optimizations for size and speed
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    tflite_model = converter.convert()

    with open(output_path, "wb") as f:
        f.write(tflite_model)
    print(f"✅ Successfully saved TFLite model to {output_path}")
except Exception as e:
    print(f"Error during conversion: {e}")
