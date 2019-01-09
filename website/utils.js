export const getAngles = slices => {
  const increment = (Math.PI * 2) / slices;
  let theta = 0;
  let angles = [theta];
  for (let i = 0; i < slices - 1; i++) {
    theta += increment;
    angles = [...angles, theta];
  }
  return angles;
};

export const getCoord = (angle, length) => {
  const x = Math.cos(angle) * length;
  const y = Math.sin(angle) * length;
  return [x, y];
};

export const offsetAngle = angle => {
  return (angle + Math.PI) % Math.PI;
};

export const offsetCoord = (coord, center) => {
  const [center_x, center_y] = center;
  const [x, y] = coord;
  return [x + center_x, y + center_y];
};

export const findClosestAngle = (angle, arr) => {};

export const findIndicies = (angle, arr) => {};

export const genRays = (slices, length, center) => {
  const _30 = Math.PI / 6;
  const _45 = Math.PI / 2;
  const _60 = Math.PI / 3;
  const angles = getAngles(slices);
  const rays = angles.map(theta => {
    let tick = 0;
    let thetaRotate = theta + Math.PI / 2;
    const coord = getCoord(theta, length);
    const offset = offsetCoord(coord, center);
    if (thetaRotate % _30 === 0) {
      tick = 30;
    } else if (thetaRotate % _45 === 0) {
      tick = 45;
    } else if (thetaRotate % _60 === 0) {
      tick = 60;
    }
    return { theta, x: coord[0], y: coord[1], tick, mark: false };
  });
  return rays;
};
