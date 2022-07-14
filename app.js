function Game() {
  this.started = false;
  this.timeout = 0;
  this.previousCard = null;
  this.previousCardId = 0;
  this.score = 0;
  this.flips = 0;
  this.clickEnabled = false;
  this.deck = new Deck();

  this.start = function () {
    if (this.started == true) return;
    this.deck.shuffle(this.deck.cards);
    this.clickEnabled = true;

    for (let k = 0; k < 16; k++) {
      document
        .getElementById("card" + k)
        .addEventListener("click", () => game.flip(k));
    }
    for (k = 0; k < 16; k++) {
      this.setCardBack(k);
    }

    this.started = true;
  };

  this.reset = function () {
    clearTimeout(this.timeout);
    document
      .querySelectorAll(".flipped")
      .forEach((elem) => elem.classList.toggle("flipped"));
    this.score = 0;
    this.flips = 0;
    updateScore();
    setTimeout(() => {
      this.started = false;
      this.deck = new Deck();
      this.clickEnabled = true;
      this.start();
    }, 1000);
  };

  this.flip = function (id) {
    if (this.clickEnabled == false || this.deck.cards[id].flipped == true)
      return;

    if (this.previousCard == null) {
      this.openFirstCard(id);
    } else {
      this.openSecondCard(id);
    }
  };
  this.toggleFlip = function (id) {
    document.getElementById("cardi" + id).classList.toggle("flipped");
  };
  this.setCardBack = function (id) {
    document.getElementById("crd" + id).src = this.deck.cards[id].image;
  };

  this.openFirstCard = function (id) {
    this.toggleFlip(id);
    this.deck.cards[id].flipped = true;
    this.previousCard = this.deck.cards[id];
    this.previousCardId = id;
    this.flips = this.flips + 1;
    updateScore();
  };

  this.openSecondCard = function (id) {
    this.toggleFlip(id);
    this.deck.cards[id].flipped = true;
    this.flips = this.flips + 1;
    if (this.deck.cards[id].value == this.previousCard.value) {
      this.score = this.score + 1;
      this.previousCard = null;
      if (this.score == 8) {
        this.saveBest();
        setTimeout(updateScore, 1000);
      }
    } else {
      this.unflipCards(id);
    }
    updateScore();
  };

  this.saveBest = function () {
    if (localStorage.getItem("hiScore") == null) {
      localStorage.setItem("hiScore", this.flips);
      return;
    }
    const lowestFlipCounts = parseInt(localStorage.getItem("hiScore"));
    if (this.flips < lowestFlipCounts) {
      localStorage.setItem("hiScore", this.flips);
    }
  };

  this.unflipCards = function (id) {
    this.clickEnabled = false;
    this.timeout = setTimeout(() => {
      this.deck.cards[id].flipped = false;
      this.previousCard.flipped = false;
      this.toggleFlip(id);
      this.toggleFlip(this.previousCardId);
      this.previousCard = null;
      this.clickEnabled = true;
    }, 1000);
  };
}

function Card(value) {
  this.value = value;
  this.flipped = false;
  this.image = "./images/card" + value + ".png";
}

function Deck() {
  this.cards = [];

  for (i = 0; i < 16; i++) {
    this.cards[i] = new Card(Math.round((i + 1) / 2));
  }

  this.shuffle = function () {
    shuffle(this.cards);
  };
}

function shuffle(arr) {
  let j = 0;
  let temp;

  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

function updateScore() {
  if (localStorage.getItem("hiScore") == null) {
    document.getElementById("scorebox").innerHTML =
      `Moves Used: ${game.flips}` + "<br />" + `Best: 0`;
    const crdholder = document.getElementById("crd-holder").innerHTML;
  } else {
    document.getElementById("scorebox").innerHTML =
      `Moves Used: ${game.flips}` +
      "<br />" +
      `Best: ${parseInt(localStorage.getItem("hiScore"))}`;
  }
}

let game = new Game();
updateScore();
const crdholder = document.getElementById("crd-holder").innerHTML;

game.start();
document
  .getElementById("btn-reset")
  .addEventListener("click", () => game.reset());
