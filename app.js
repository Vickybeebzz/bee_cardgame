function Game() {
  this.started = false;
  this.previouscard = null;
  this.previouscardid = 0;
  this.score = 0;
  this.flips = 0;
  this.clickenabled = false;
  this.deck = new Deck();

  this.start = function () {
    if (this.started == true) return;
    this.deck.shuffle();
    this.clickenabled = true;
    document
      .getElementById("crd1")
      .addEventListener("click", () => game.flip(0));
    document
      .getElementById("crd2")
      .addEventListener("click", () => game.flip(1));
    document
      .getElementById("crd3")
      .addEventListener("click", () => game.flip(2));
    document
      .getElementById("crd4")
      .addEventListener("click", () => game.flip(3));
    document
      .getElementById("crd5")
      .addEventListener("click", () => game.flip(4));
    document
      .getElementById("crd6")
      .addEventListener("click", () => game.flip(5));
    document
      .getElementById("crd7")
      .addEventListener("click", () => game.flip(6));
    document
      .getElementById("crd8")
      .addEventListener("click", () => game.flip(7));
    document
      .getElementById("crd9")
      .addEventListener("click", () => game.flip(8));
    document
      .getElementById("crd10")
      .addEventListener("click", () => game.flip(9));
    document
      .getElementById("crd11")
      .addEventListener("click", () => game.flip(10));
    document
      .getElementById("crd12")
      .addEventListener("click", () => game.flip(11));
    document
      .getElementById("crd13")
      .addEventListener("click", () => game.flip(12));
    document
      .getElementById("crd14")
      .addEventListener("click", () => game.flip(13));
    document
      .getElementById("crd15")
      .addEventListener("click", () => game.flip(14));
    document
      .getElementById("crd16")
      .addEventListener("click", () => game.flip(15));

    alert("Game Started!");
  };

  this.reset = function () {
    this.started = false;
    this.score = 0;
    this.flips = 0;
    document.getElementById("scorebox").innerHTML =
      `Moves Used: ${this.flips}` +
      "<br />" +
      `Best: ${parseInt(localStorage.getItem("hiScore"))}`;
    for (let i = 0; i <= 0; i++) {
      this.deck.cards[i].flipped = false;
    }
    document.getElementById("crd-holder").innerHTML = crdholder;
    this.clickenabled = false;
    alert("Game reset! Use START to begin a new game!");
  };

  this.flip = function (id) {
    if (this.clickenabled == false) return;
    if (this.deck.cards[id].flipped == false && this.previouscard == null) {
      document.getElementById("crd" + (id + 1)).src = this.deck.cards[id].image;
      this.deck.cards[id].flipped = true;
      this.previouscard = this.deck.cards[id];
      this.previouscardid = id + 1;
    } else if (this.deck.cards[id].flipped == false) {
      document.getElementById("crd" + (id + 1)).src = this.deck.cards[id].image;
      this.deck.cards[id].flipped = true;
      if (this.deck.cards[id].value == this.previouscard.value) {
        this.score = this.score + 1;
        this.previouscard = null;
        if ((game.score = 4)) localStorage.setItem("hiScore", game.flips);
      } else {
        this.clickenabled = false;
        setTimeout(() => {
          this.deck.cards[id].flipped = false;
          this.previouscard.flipped = false;
          document.getElementById("crd" + (id + 1)).src =
            "./images/cardback.png";
          document.getElementById("crd" + this.previouscardid).src =
            "./images/cardback.png";
          this.previouscard = null;
          this.clickenabled = true;
        }, 1000);
      }
    } else return;
    this.flips = this.flips + 1;
    document.getElementById("scorebox").innerHTML =
      `Moves Used: ${this.flips}` +
      "<br />" +
      `Best: ${parseInt(localStorage.getItem("hiScore"))}`;
  };
}

function Card(value) {
  this.value = value;
  this.flipped = false;
  this.image = "./images/card" + value + ".png";
}

function Deck() {
  this.cards = [
    new Card(1),
    new Card(1),
    new Card(2),
    new Card(2),
    new Card(3),
    new Card(3),
    new Card(4),
    new Card(4),
    new Card(5),
    new Card(5),
    new Card(6),
    new Card(6),
    new Card(7),
    new Card(7),
    new Card(8),
    new Card(8),
  ];
  this.shuffle = function () {
    let j = 0;
    let temp;

    for (let i = this.cards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  };
}

let game = new Game();
document.getElementById("scorebox").innerHTML =
  `Moves Used: ${game.flips}` +
  "<br />" +
  `Best: ${parseInt(localStorage.getItem("hiScore"))}`;
const crdholder = document.getElementById("crd-holder").innerHTML;
console.log(game.deck);

document
  .getElementById("btn-start")
  .addEventListener("click", () => game.start());
document
  .getElementById("btn-reset")
  .addEventListener("click", () => game.reset());
if ((game.score = 4)) localStorage.setItem("hiScore", game.flips);
console.log(game.flips);
