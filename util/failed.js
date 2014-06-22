var excuses = [
  'Forgive me, master. For I have failed.',
  'Hodor.',
  'You forgot to say please!'
];

module.exports = {
  makeExcuse: function () {
    return randomExcuse();
  },

  sendLie: function (res, err, code) {
    code = code || 500;

    var bullshit = {
      text: randomExcuse(),
      data: [],
      err: err
    };

    res.send(code, bullshit);
  }
};

function randomExcuse() {
  return excuses[Math.floor(Math.random() * excuses.length)];
}
