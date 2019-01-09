import { getAngles, getCoord } from './utils';
import * as utils from './utils';

it('should calculate the correct number of angle slices', () => {
  const slices = 60;
  const angles = getAngles(slices);
  const first_angle = angles[0];
  const last_angle = angles[slices - 1];
  expect(angles.length).toBe(slices);
  expect(first_angle).toBe(0);
  expect(last_angle).toBeLessThan(Math.PI * 2);
});

it('should get the correct coords', () => {
  const angle = 0;
  const length = 1;
  const [x1, y1] = getCoord(angle, length);
  expect(x1).toBe(1);
  expect(y1).toBe(0);

  const angle2 = Math.PI / 4;
  const [x2, y2] = getCoord(angle2, length);
  expect(x2).toBeCloseTo(Math.sqrt(2) / 2);
  expect(y2).toBeCloseTo(Math.sqrt(2) / 2);

  const angle3 = (7 * Math.PI) / 4;
  const [x3, y3] = getCoord(angle3, length);
  expect(x3).toBeCloseTo(Math.sqrt(2) / 2);
  expect(y3).toBeCloseTo(-Math.sqrt(2) / 2);
});

it('should get the correct coords', () => {
  const theta = 0;
  const radius = 1;
  const tickLength = 1;
  const result = { x1: 1, y1: 0, x2: 2, y2: 0 };
  const coords = utils.getCoords2(theta, radius, tickLength);
  expect(coords).toEqual(result);
});

it('should offset the angle', () => {
  const angle = 0;
  expect(utils.offsetAngle(angle)).toBe(0);
  const angle1 = -Math.PI;
  expect(utils.offsetAngle(angle)).toBe(0);
});

it('should offset the coord', () => {
  const center = { center_x: 140, center_y: 140 };
  const coord = { x1: -130, y1: -5, x2: -140, y2: -5 };
  const result = { x1: 10, y1: 135, x2: 0, y2: 135 };
  expect(utils.offsetCoords(coord, center)).toEqual(result);
});

it('should generate the correct rays', () => {
  const slices = 60;
  const radius = 1;
  const tickLength = 1;
  const center = { center_x: 124, center_y: 124 };
  const rays = utils.genRays(center, radius, tickLength, slices);
  const ray1 = {
    theta: 0,
    x1: 125,
    y1: 124,
    x2: 126,
    y2: 124,
    tick: 45,
    marked: false
  };
  expect(rays[0]).toEqual(ray1);
});
