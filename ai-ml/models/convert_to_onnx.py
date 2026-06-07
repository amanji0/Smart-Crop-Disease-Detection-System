import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
import tensorflow as tf
import tf2onnx

model_path = "disease_model.h5"
output_path = "disease_model.onnx"

print(f"Loading {model_path}...")
model = tf.keras.models.load_model(model_path)

print("Converting to ONNX...")
spec = (tf.TensorSpec((None, 224, 224, 3), tf.float32, name="input"),)
model_proto, _ = tf2onnx.convert.from_keras(model, input_signature=spec, output_path=output_path)

print(f"✅ Successfully saved ONNX model to {output_path}")
