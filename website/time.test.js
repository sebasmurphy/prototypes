import * as time from './time';
const moment = require('moment');

it('should reset the time', () => {
  const timer = moment();
  const reset = time.reset(timer);
  expect(reset.seconds()).toBe(0);
  expect(reset.minutes()).toBe(0);
  expect(reset.hours()).toBe(0);
});

it('should set the time', () => {
  const timer = moment();
  const hours = 1;
  const minutes = 2;
  const seconds = 59;
  const values = { hours, minutes, seconds };
  const set = time.set(timer, values);
  expect(set.hours()).toBe(hours);
  expect(set.minutes()).toBe(minutes);
  expect(set.seconds()).toBe(seconds);
});

it('should decrement the time correctly', () => {
  let timer = moment();
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  timer = time.set(timer, { hours, minutes, seconds });
  timer = time.decrement(timer);
  expect(timer.hours()).toBe(hours);
  expect(timer.minutes()).toBe(minutes);
  expect(timer.seconds()).toBe(seconds);

  timer = moment();
  hours = 0;
  minutes = 0;
  seconds = 59;
  timer = time.set(timer, { hours, minutes, seconds });
  timer = time.decrement(timer);
  expect(timer.hours()).toBe(hours);
  expect(timer.minutes()).toBe(minutes);
  expect(timer.seconds()).toBe(58);
});
