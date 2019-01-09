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

export const getCoords2 = (angle, radius, tickLength) => {
  //calculate the start and stop because we don't want to render the whole ray, just the ticket
  //calculate one point along the vector and a second point farther out
  //this is the size of the tick mark

  const x1 = Math.cos(angle) * radius;
  const y1 = Math.sin(angle) * radius;

  const x2 = Math.cos(angle) * (radius + tickLength);
  const y2 = Math.sin(angle) * (radius + tickLength);

  return { x1, x2, y1, y2 };
};

export const offsetAngle = angle => {
  return (angle + Math.PI) % Math.PI;
};

export const offsetCoords = (coords, center) => {
  const { center_x, center_y } = center;
  let { x1, y1, x2, y2 } = coords;
  x1 = x1 + center_x;
  x2 = x2 + center_x;
  y1 = y1 + center_y;
  y2 = y2 + center_y;
  return { x1, y1, x2, y2 };
};

export const findClosestAngle = (angle, arr) => {};

export const findIndicies = (angle, arr) => {};

export const genRays = (center, radius, ticketLength, slices) => {
  const _30 = Math.PI / 6;
  const _45 = Math.PI / 2;
  const _60 = Math.PI / 3;
  const angles = getAngles(slices);
  const rays = angles.map(theta => {
    let tick = 0;
    let thetaRotate = theta + Math.PI / 2;
    let coords = getCoords2(theta, radius, ticketLength);
    coords = offsetCoords(coords, center);
    if (thetaRotate % _30 === 0) {
      tick = 30;
    } else if (thetaRotate % _45 === 0) {
      tick = 45;
    } else if (thetaRotate % _60 === 0) {
      tick = 60;
    }
    return {
      theta,
      x1: coords.x1,
      y1: coords.y1,
      x2: coords.x2,
      y2: coords.y2,
      tick,
      marked: false
    };
  });
  return rays;
};

export const updateRay = () => {};
