import cv2
import numpy as np
import os
from matplotlib import pyplot as plt
import mediapipe as mp
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import TensorBoard
from tensorflow.keras.models import load_model
from sklearn.metrics import multilabel_confusion_matrix, accuracy_score

mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

actions = ["acele", "acikmak", "afiyet olsun", "agabey", "agac", "agir", "aglamak", "aile", "akilli", "akilsiz"]

label_map = {label: num for num, label in enumerate(actions)}

def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) 
    image.flags.writeable = False                  
    results = model.process(image)                 
    image.flags.writeable = True                   
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    return image, results


def draw_styled_landmarks(image, results):
    # Draw pose connections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                             mp_drawing.DrawingSpec(color=(80,22,10), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(80,44,121), thickness=2, circle_radius=2)
                             ) 
    # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
                             mp_drawing.DrawingSpec(color=(121,22,76), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(121,44,250), thickness=2, circle_radius=2)
                             ) 
    # Draw right hand connections  
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
                             mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
                             ) 
    

def extract_keypoints(results):
    pose = np.array([[res.x, res.y] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*2)

    lh = np.array([[res.x, res.y] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*2)

    rh = np.array([[res.x, res.y] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*2)

    return np.concatenate([pose, lh, rh])


def extract_video_keypoints(path):
    data = []
    cap = cv2.VideoCapture(path)
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while cap.isOpened():  
            ret, frame = cap.read()

            if not ret:
                break

            image, results = mediapipe_detection(frame, holistic)
                            
            keypoints = extract_keypoints(results)
            data.append(keypoints)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
              
    cap.release()
    cv2.destroyAllWindows()
    return data

def get_names(path):
    files = os.listdir(path)
    return files

def get_all_data():
    data = []
    labels = []
    for i in range(1, 11):
        path = "C:\\Users\\terzi\\Desktop\\signs_edited\\{0}".format(i)
        names = get_names(path)
        for name in names:
            video_keypoints = extract_video_keypoints(path + "\\" + name)
            data.append(video_keypoints)
            labels.append(i)

    np_data = np.array(data)
    np_labels = np.array(labels)
    np.save("data", np_data)
    np.save("labels", np_labels)

    return data, labels


def data_to_train_test(data, labels, test_size):
    X = np.array(data)
    y = to_categorical(np.array([i-1 for i in labels])).astype(int)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size)
    return X_train, X_test, y_train, y_test


def create_model(X_train, y_train, epoch_no):
    model = Sequential()
    model.add(LSTM(64, return_sequences=True, activation='relu', input_shape=(50,150)))
    model.add(LSTM(128, return_sequences=True, activation='relu'))
    model.add(LSTM(64, return_sequences=False, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(len(actions), activation='softmax'))

    model.compile(optimizer='Adam', loss='categorical_crossentropy', metrics=['categorical_accuracy'])
    model.fit(X_train, y_train, epochs=epoch_no)
    model.summary()
    return model


#data, labels = get_all_data()
# print(np.array(data).shape)
# print(np.array(labels).shape)
# data = np.load("data.npy")
# labels = np.load("labels.npy")
# X_train, X_test, y_train, y_test = data_to_train_test(data, labels, 0.2)
# model = create_model(X_train, y_train, 185)
# res = model.predict(X_test)
# ytrue = np.argmax(y_test, axis=1).tolist()
# yhat = np.argmax(res, axis=1).tolist()
# accuracy = accuracy_score(ytrue, yhat)
# print("accuracy: ", accuracy)
# model.save('action.h5')

def predict_real_time(model):
    sequence = []
    counter = 0
    cap = cv2.VideoCapture(0)
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while cap.isOpened():

            # Read feed
            ret, frame = cap.read()

            # Make detections
            image, results = mediapipe_detection(frame, holistic)
            
            # Draw landmarks
            draw_styled_landmarks(image, results)
            
            # 2. Prediction logic
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)
            # sequence = sequence[-50:]
            
            if len(sequence) == 50:
                res = model.predict(np.expand_dims(sequence, axis=0))[0]
                print(actions[np.argmax(res)])
                break
            
            elif counter in range(0, 5):
                cv2.waitKey(1000)
                waiting_img = cv2.imread("siyah-logo.png", cv2.IMREAD_COLOR)
                cv2.putText(waiting_img, str(5 - counter) + " saniye bekleniyor", (100, 190), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 5, cv2.LINE_AA)
                cv2.imshow('OpenCV Feed', cv2.resize(waiting_img, (800,600)))
                counter += 1
            
            else:
                cv2.putText(image, "Uygula", (50,50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 2, cv2.LINE_AA)
                cv2.imshow('OpenCV Feed', cv2.resize(image, (800,600)))

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()



data = np.load("data.npy")
labels = np.load("labels.npy")
X_train, X_test, y_train, y_test = data_to_train_test(data, labels, 0.2)

model = load_model("action.h5")

res = model.predict(X_test)
ytrue = np.argmax(y_test, axis=1).tolist()
yhat = np.argmax(res, axis=1).tolist()
accuracy = accuracy_score(ytrue, yhat)
print("accuracy: ", accuracy)

#actions = ["acele", "acikmak", "afiyet olsun", "agabey", "agac", "agir", "aglamak", "aile", "akilli", "akilsiz"]

predict_real_time(model)





