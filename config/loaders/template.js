module.exports = function (a) {
  return `export default '${a.replace(/\n/g, '')}'`;
};
