function Game() {
  (this.started = false),
    (this.score = 0),
    (this.deck = new Deck()),
    (this.start = function () {
      if (this.started == true) return;
      this.deck.shuffle();
    }),
    (this.reset = function () {
      this.started = false;
      this.score = 0;
      this.deck = new Deck();
      document.getElementById("crd-holder").innerHTML = crdholder;
    }),
    (this.flip = function (id) {
      document.getElementById("crd" + id).src = this.deck.cards[id].image;
      this.deck.cards[id].flipped = true;
      this.score = score + 1;
    });
}

function Card(value) {
  this.value = value;
  this.flipped = false;
  this.image = "./images/card" + value + ".png";
}

function Deck() {
  (this.cards = [
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
  ]),
    (this.shuffle = function () {
      let j = 0;
      let temp;

      for (let i = this.cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
      }
    });
}

let game = new Game();
const crdholder = document.getElementById("crd-holder").innerHTML;
game.start();
console.log(game.deck);
