export const reset = time => {
  time.seconds(0);
  time.minutes(0);
  time.hours(0);
  return time;
};

export const set = (time, values) => {
  const defaults = { hours: 0, minutes: 0, seconds: 0 };
  const { hours, minutes, seconds } = { ...defaults, ...values };
  time.hours(hours);
  time.minutes(minutes);
  time.seconds(seconds);
  return time;
};

export const decrement = time => {
  const hours = time.hours();
  const minutes = time.minutes();
  const seconds = time.seconds();
  if (hours === 0 && minutes === 0 && seconds === 0) {
    return time;
  }
  return time.subtract(1, 'seconds');
};
