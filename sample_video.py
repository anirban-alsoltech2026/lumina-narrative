import cv2
import math
import os

video_path = "reference.mp4"
output_path = "reference-contact-sheet.jpg"
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)
frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = frames / fps
samples = 12
thumbs = []
for i in range(samples):
    timestamp = duration * i / max(samples - 1, 1)
    cap.set(cv2.CAP_PROP_POS_MSEC, timestamp * 1000)
    ok, frame = cap.read()
    if not ok:
        continue
    height, width = frame.shape[:2]
    target_width = 420
    target_height = round(height * target_width / width)
    frame = cv2.resize(frame, (target_width, target_height))
    cv2.putText(frame, f"{timestamp:.1f}s", (12, 28), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255,255,255), 2, cv2.LINE_AA)
    thumbs.append(frame)
cap.release()
cols = 3
rows = math.ceil(len(thumbs) / cols)
h, w = thumbs[0].shape[:2]
sheet = cv2.copyMakeBorder(thumbs[0], 0, h * rows - h, 0, w * cols - w, cv2.BORDER_CONSTANT, value=(20,20,20))
sheet[:] = (20,20,20)
for idx, frame in enumerate(thumbs):
    y, x = divmod(idx, cols)
    sheet[y*h:(y+1)*h, x*w:(x+1)*w] = frame
cv2.imwrite(output_path, sheet)
print({"fps": fps, "frames": frames, "duration": duration, "width": int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), "height": int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)), "output": os.path.abspath(output_path)})
