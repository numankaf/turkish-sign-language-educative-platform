from crop import *

if __name__ == "__main__":
    path="C:/Users/smurf/Desktop/autsl/train/signer0_sample20_color.mp4" 
    original_frames, cropped_frames ,detection_results=crop_video(path, 380)

    show_original_and_cropped_image(original_frames[0], cropped_frames[0], detection_results[0])
    show_original_and_cropped_image(original_frames[10], cropped_frames[10], detection_results[10])
    show_original_and_cropped_image(original_frames[20], cropped_frames[20], detection_results[20])