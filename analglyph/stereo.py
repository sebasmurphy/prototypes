import cv2

class Stereo:
    def __init__(self):
        pass

    def compute(self, images, numDisparities=16, blockSize=15):
        (left, right) = images
        left = cv2.cvtColor(left, cv2.COLOR_BGR2GRAY)
        right = cv2.cvtColor(right, cv2.COLOR_BGR2GRAY)
        stereo = cv2.StereoSGBM_create(numDisparities=numDisparities)
        # stereo = cv2.StereoBM_create(numDisparities=numDisparities, blockSize=blockSize)
        disparity = stereo.compute(left, right)

        return disparity

