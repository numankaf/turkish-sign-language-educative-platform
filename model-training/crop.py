import numpy as np
import cv2 as cv2
import mediapipe as mp
import matplotlib.pyplot as plt


mp_pose = mp.solutions.pose
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils 
mp_drawing_styles = mp.solutions.drawing_styles

def detect_landmarks(image_, model):
    image_.flags.writeable = False
    image_ = cv2.cvtColor(image_, cv2.COLOR_BGR2RGB)
    results_ = model.process(image_)
    image_.flags.writeable = True
    image_ = cv2.cvtColor(image_, cv2.COLOR_RGB2BGR)
    return image_, results_

def draw_landmarks(image_, results_):
    mp_drawing.draw_landmarks(
            image_,
            results_.pose_landmarks,
            mp_holistic.POSE_CONNECTIONS,
            mp_drawing.DrawingSpec(color =(255,0,0), thickness =1 ,circle_radius = 1),
            mp_drawing.DrawingSpec(color =(80,256,121), thickness =1 ,circle_radius = 1))
    mp_drawing.draw_landmarks(
            image_,
            results_.right_hand_landmarks,
            mp_holistic.HAND_CONNECTIONS,
            mp_drawing.DrawingSpec(color =(255,0,0), thickness =1 ,circle_radius = 1),
            mp_drawing.DrawingSpec(color =(80,256,121), thickness =1 ,circle_radius = 1))
        
    mp_drawing.draw_landmarks(
            image_,
            results_.left_hand_landmarks,
            mp_holistic.HAND_CONNECTIONS,
            mp_drawing.DrawingSpec(color =(255,0,0), thickness =1 ,circle_radius = 1),
            mp_drawing.DrawingSpec(color =(80,256,121), thickness =1 ,circle_radius = 1))

    
def show_original_and_cropped_image(original_image, cropped_image, cropped_results):
    fig = plt.figure(figsize=(12, 9)) 
    fig.add_subplot(1, 2, 1) 
    plt.title("Original Image")
    
    plt.imshow(cv2.cvtColor(original_image, cv2.COLOR_BGR2RGB))
    fig.add_subplot(1, 2, 2) 
    plt.title("Cropped Image")
    cropped_image_cp = cropped_image.copy()
    draw_landmarks(cropped_image_cp,cropped_results)
    plt.imshow( cv2.cvtColor(cropped_image_cp, cv2.COLOR_BGR2RGB))
    plt.show()    



def crop_image(path,crop_size):
    cap = cv2.VideoCapture(path)
    original_frames=[]
    cropped_frames= []
    results_list = []
    with mp_holistic.Holistic(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5) as holistic:
        while cap.isOpened():
            success, image = cap.read()

            if not success:
                break

            image = cv2.resize(image, (512, 512))
            original_frames.append(image);

            image, results = detect_landmarks(image, holistic) 

            x_ = ((results.pose_landmarks.landmark[11].x +results.pose_landmarks.landmark[12].x)/2)*512
            y_ = ((results.pose_landmarks.landmark[11].y +results.pose_landmarks.landmark[12].y)/2)*512


            #crop image
            image_cropped = image[int(y_)-int(crop_size/2):int(y_)+int(crop_size/2), int(x_)-int(crop_size/2):int(x_)+int(crop_size/2)]
            cropped_frames.append(image_cropped)

            image_cropped, results_cropped = detect_landmarks(image_cropped, holistic) 
            results_list.append(results_cropped)

            draw_landmarks(image_cropped, results_cropped);
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
    
    cap.release()
    cv2.destroyAllWindows()
    return original_frames, cropped_frames, results_list