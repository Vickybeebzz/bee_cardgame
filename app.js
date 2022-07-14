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
    shuffle(this.deck.cards);
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
    this.started = false;
    this.score = 0;
    this.flips = 0;
    updateScore();
    this.deck = new Deck();
    for(i=0;i<16;i++){
      
    }
    this.clickEnabled = true;
    this.start();
  };

  this.flip = function (id) {
    if (this.clickEnabled == false) return;
    if (this.deck.cards[id].flipped == false && this.previousCard == null) {
      this.toggleFlip(id);
      this.deck.cards[id].flipped = true;
      this.previousCard = this.deck.cards[id];
      this.previousCardId = id;
    } else if (this.deck.cards[id].flipped == false) {
      this.toggleFlip(id);
      this.deck.cards[id].flipped = true;
      if (this.deck.cards[id].value == this.previousCard.value) {
        this.score = this.score + 1;
        this.previousCard = null;
        if (this.score == 8) {
          if (
            this.flips < parseInt(localStorage.getItem("hiScore")) ||
            localStorage.getItem("hiScore") == null
          )
            setTimeout(updateScore, 1000);
        }
      } else {
        this.clickEnabled = false;
        this.timeout = setTimeout(() => {
          this.deck.cards[id].flipped = false;
          this.previousCard.flipped = false;
          this.toggleFlip(id);
          this.toggleFlip(this.previousCardId);
          this.previousCard = null;
          this.clickEnabled = true;
        }, 1000);
      }
    } else return;
    this.flips = this.flips + 1;
    updateScore();
  };
  this.toggleFlip = function (id) {
    document.getElementById("cardi" + id).classList.toggle("flipped");
  };
  this.setCardBack = function (id) {
    document.getElementById("crd" + id).src = this.deck.cards[id].image;
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

  this.shuffle(){
    shuffle(this.cards);
  }
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

console.log(game.deck);
game.start();
document
  .getElementById("btn-reset")
  .addEventListener("click", () => game.reset());
console.log(game.flips);
