function Game() {
  (this.started = false),
    (this.score = 0),
    (this.start = function () {
      if (this.started == true) return;
      document.getElementById("crd-holder").innerHTML = ``;
    });
}
