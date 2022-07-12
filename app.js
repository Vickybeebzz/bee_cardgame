function Game() {
  (this.started = false),
    (this.previouscard = null),
    (this.previouscardid = 0),
    (this.score = 0),
    (this.flips = 0),
    (this.deck = new Deck()),
    (this.start = function () {
      if (this.started == true) return;
      this.deck.shuffle();
    }),
    (this.reset = function () {
      this.started = false;
      this.score = 0;
      for (let i = 0; i < 0; i++) {
        this.deck.cards[i].flipped = false;
      }
      document.getElementById("crd-holder").innerHTML = crdholder;
    }),
    (this.flip = function (id) {
      if (this.deck.cards[id].flipped == false && this.previouscard == null) {
        document.getElementById("crd" + id).src = this.deck.cards[id].image;
        this.deck.cards[id].flipped = true;
        this.previouscard = this.deck.cards[id];
        this.previouscardid = id;
      } else if (this.deck.cards[id].flipped == false) {
        document.getElementById("crd" + id).src = this.deck.cards[id].image;
        this.deck.cards[id].flipped = true;
        if (this.deck.cards[id].value == this.previouscard.value)
          this.score = this.score + 1;
        else {
          this.deck.cards[id].flipped = false;
          this.previouscard.flipped = false;
          document.getElementById("crd" + id).src = "./images/cardback.png";
          document.getElementById("crd" + this.previouscardid).src =
            "./images/cardback.png";
          this.previouscard = null;
        }
      }
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

for (let i = 1, i<1, i++){
  
}