exports.formatWeeks = (seconds) => {
  const weeks = seconds / (60 * 60 * 24 * 7);
  return weeks.toFixed(1);
};