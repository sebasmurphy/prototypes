import math

import cv2
import numpy as np


class Stitcher:
    def __init__(self):
        pass

    def detectAndDescribe(self, image, mask=None):
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        sift = cv2.xfeatures2d.SIFT_create()
        (kps, features) = sift.detectAndCompute(image, mask)

        kps = np.float32([kp.pt for kp in kps])

        return (kps, features)

    def matchKeypoints(self, kpsA, kpsB, featuresA, featuresB, ratio, reprojThres):
        bf = cv2.BFMatcher(crossCheck=True)
        matches = bf.match(featuresA, featuresB)

        if len(matches) > 4:
            ptsA = np.float32([kpsA[m.queryIdx] for m in matches])
            ptsB = np.float32([kpsB[m.trainIdx] for m in matches])

            (H, status) = cv2.findHomography(ptsA, ptsB, cv2.RANSAC, reprojThres)
            # return the matches along with the homography matrix
            # and status of each matched point
            return (matches, H, status)

        # otherwise, no homography could be computed
        return None

    def stitch(self, images, points, ratio=0.75, reprojThres=4.0, showMatches=False):
        # unpack the images, then detect keypoints and extract
        # local invariant descriptors from them
        (imageA, imageB) = images
        (top_left, bottom_right) = points

        # create bounding box mask based on upper left and lower right points
        (rows, cols, _) = imageA.shape
        mask = np.ones((rows, cols), dtype=np.uint8)
        mask[top_left[1]:bottom_right[1], top_left[0]:bottom_right[0]] = 0

        (kpsA, featuresA) = self.detectAndDescribe(imageA, mask)
        (kpsB, featuresB) = self.detectAndDescribe(imageB)

        # match features between the two images
        M = self.matchKeypoints(kpsA, kpsB, featuresA, featuresB, ratio, reprojThres)

        if M is None:
            return None

        (matches, H, status) = M
        # only use rotation and translation of H
        # from the homography matrix we only care about x and y offset for now
        H[2] = [0, 0, 1]
        # we really only care about x and y
        x_offset = math.floor(math.fabs(H[0, 2])) + 1
        y_offset = math.floor(math.fabs(H[1, 2])) + 1
        (_, _, r) = cv2.split(imageA)

        (b, g, _) = cv2.split(imageB)

        # red channel
        r[:, 0:x_offset] = 0
        r[imageA.shape[0] - y_offset:, :] = 0

        # blue channel
        b[:, imageB.shape[1] - x_offset:imageB.shape[1]] = 0
        b[0:y_offset, :] = 0

        # green channel
        g[:, imageB.shape[1] - x_offset:imageB.shape[1]] = 0
        g[0:y_offset, :] = 0

        result = np.zeros((imageA.shape[0] + 30, 2 * imageA.shape[1], 3), dtype=np.int)
        result2 = np.zeros((imageA.shape[0] + y_offset, imageA.shape[1] + x_offset, 3), dtype=np.int)
        result[10:imageA.shape[0] + 10, 0:imageA.shape[1], 2] = r
        result[10:imageA.shape[0] + 10, imageB.shape[1]:imageB.shape[1] + imageB.shape[1], 1] = g
        result[10:imageA.shape[0] + 10, imageB.shape[1]:imageB.shape[1] + imageB.shape[1], 0] = b

        result2[:imageA.shape[0], :imageA.shape[1], 2] = r
        result2[:imageA.shape[0], x_offset:imageB.shape[1] + x_offset, 1] = g
        result2[:imageA.shape[0], x_offset:imageB.shape[1] + x_offset, 0] = b

        # if showMatches:
        #     vis = self.drawMatches(imageA, imageB, kpsA, kpsB, matches, status)
        #
        #     # return a tuple of the stitched image and the
        #     # visualiaztion
        #     return (result, vis)
        return (result, result2)
