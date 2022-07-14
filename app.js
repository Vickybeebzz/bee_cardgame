function Game() {
  this.started = false;
  this.timeout = 0;
  this.previousCard = null;
  this.score = 0;
  this.flips = 0;
  this.clickEnabled = false;
  this.deck = new Deck();

  this.onStart = function () {};
  this.onFlip = function () {};
  this.onScoreUpdate = function () {};
  this.onWrong = function() {};

  this.start = function () {
    if (this.started == true) return;
    this.deck.shuffle(this.deck.cards);
    this.clickEnabled = true;
    this.started = true;
    this.onStart();
  };

  this.reset = function () {
    clearTimeout(this.timeout);
    this.score = 0;
    this.flips = 0;
    setTimeout(() => {
      this.started = false;
      this.deck = new Deck();
      this.clickEnabled = true;
      this.start();
    }, 1000);
  };

  this.flip = function (cardId) {
    const card = this.deck.cards.find((c) => c.id == cardId);
    if (this.clickEnabled == false || this.deck.cards[cardId].flipped == true)
      return;

    if (this.previousCard == null) {
      this.openFirstCard(cardId);
    } else {
      this.openSecondCard(cardId);
    }

    this.onFlip(card);
  };

  this.openFirstCard = function (cardId) {
    this.deck.cards[cardId].flipped = true;
    this.previousCard = this.deck.cards[cardId];
    this.flips = this.flips + 1;
    this.updateScore();
  };

  this.openSecondCard = function (cardId) {
    this.deck.cards[cardId].flipped = true;
    this.flips = this.flips + 1;
    if (this.deck.cards[cardId].value == this.previousCard.value) {
      this.score = this.score + 1;
      this.previousCard = null;
      if (this.score == 8) {
        this.saveBest();
        setTimeout(() => this.updateScore(), 1000);
      }
    } else {
      this.onWrong(card,this.previousCard);
      this.updateScore();
    }
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

  this.unflipCards = function (cardId) {
    this.clickEnabled = false;
    this.timeout = setTimeout(() => {
      this.deck.cards[cardId].flipped = false;
      this.previousCard.flipped = false;
      this.previousCard = null;
      this.clickEnabled = true;
    }, 1000);
  };

  this.updateScore = function () {
    const hiScore = localStorage.getItem("hiScore");

    if (hiScore == null) {
      this.onScoreUpdate(this.flips, "0");
    } else {
      this.onScoreUpdate(this.flips, "0");
    }
  };
}

function Card(id, value) {
  this.id = id;
  this.value = value;
  this.flipped = false;
  this.image = "./images/card" + value + ".png";
}

function Deck() {
  this.cards = [];

  for (i = 0; i < 16; i++) {
    this.cards[i] = new Card(i, Math.round((i + 1) / 2));
    this.cards[i].id = i;
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

let game = new Game();

for (let k = 0; k < 16; k++) {
  document.getElementById("card" + k).addEventListener("click", () => {
    const id = k;
    game.flip(id);
  });
}

game.onStart = () => {
  for (k = 0; k < 16; k++) {
    game.setCardBack(k);
  }
  game.updateScore();
  console.log("Game started.");
};

game.onFlip = (card) => {
  console.log(
    `The card with id ${card.id} got flipped, updating UI element for it.`
  );
  document.getElementById("cardi" + card.id).classList.toggle("flipped");
  document.getElementById("crd" + card.id).src = card.image;
};

game.onWrong() = (card, previouscard){
  document.getElementById("cardi" + card.id).classList.toggle("flipped");
  document.getElementById("cardi" + previouscard.id).classList.toggle("flipped");
}

game.onScoreUpdate = (flips, best) => {
  document.getElementById("scorebox").innerHTML =
    `Moves Used: ${flips}` + "<br />" + `Best: ${best}`;
};

game.start();
document
  .getElementById("btn-reset")
  .addEventListener("click", () => game.reset());
