import { getAngles, findClosestAngle, getCoord } from './utils';
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

it('should offset the angle', () => {
  const angle = 0;
  expect(utils.offsetAngle(angle)).toBe(0);
  const angle1 = -Math.PI;
  expect(utils.offsetAngle(angle)).toBe(0);
});

it('should offset the coord', () => {
  const center = [140, 140];
  const coord = [-140, -5];
  const coord2 = [10, 10];
  expect(utils.offsetCoord(coord, center)).toEqual([0, 135]);
  expect(utils.offsetCoord(coord2, center)).toEqual([150, 150]);
});

it('should generate the correct rays', () => {
  const slices = 60;
  const length = 1;
  const center = [124, 124];
  const rays = utils.genRays(slices, length, center);
  const ray1 = { theta: 0, x: 1, y: 0, tick: 45, mark: false };
  expect(rays[0]).toEqual(ray1);
});
