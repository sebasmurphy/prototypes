import argparse
import time

from stereo import *
from stitcher import *

# red image on the left
# cyan image on the right
OUT_FOLDER = 'images'
INPUT_FOLDER = 'images'

if __name__ == "__main__":
    parser = argparse.ArgumentParser('Image colorization toolbox')

    parser.add_argument('-l', dest="left_image", default='left.png',
                        help='input image, located in images/source, default: left.png')
    parser.add_argument('-r', dest="right_image", default='right.png',
                        help='marked image, located in images/source, default: right.png')
    parser.add_argument('-o', dest="output_image", default='analglyph.png',
                        help='output image name, created in images/output, default: analglyph.png')
    parser.add_argument('-p', dest="points", nargs=4, default=None,
                        help='left image bounding points, closest subject to the camera')
    args = vars(parser.parse_args())
    left_image = args['left_image']
    right_image = args['right_image']
    output_image = args['output_image']
    points = args['points']
    left = cv2.imread(INPUT_FOLDER + "/" + left_image)
    right = cv2.imread(INPUT_FOLDER + "/" + right_image)
    if type(left) == None:
        print("incorrect image path for left image")
        exit(0)
    if type(right) == None:
        print("incorrect image path for right image")
        exit(0)
    if left.shape != right.shape:
        print("left and right images are not the same size")
        exit(0)
    if points == None or len(points) != 4:
        top_left = [0, 0]
        (y, x) = left_image.shape
        bottom_right = [x, y]
    else:
        (x1, y1, x2, y2) = [int(x) for x in points]
        top_left = [x1, y1]
        bottom_right = [x2, y2]

    start = time.time()
    stitcher = Stitcher()
    stereo = Stereo()
    (result, result2) = stitcher.stitch([left, right], [top_left, bottom_right])
    # disparity = stereo.compute([left, right], numDisparities=32, blockSize=15)

    cv2.imwrite(OUT_FOLDER + "/" + output_image, result2)
    # cv2.imwrite(OUT_FOLDER + "/" + "disparity.png", disparity)

    end = time.time()
    print("Process took {} seconds".format(end - start))
