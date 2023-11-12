from crop import *

if __name__ == "__main__":
    path="C:/Users/smurf/Desktop/autsl/train/signer0_sample18_color.mp4" 
    original_frames, cropped_frames, results_list =crop_image(path, 380)
    selected_frame = 20
    show_original_and_cropped_image(original_frames[selected_frame], cropped_frames[selected_frame], results_list[selected_frame])