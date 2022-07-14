class Game {
  constructor() {
    this.flipEnabled = false;
    this.started = false;
    this.timeout = 0;
    this.previousCard = null;
    this.score = 0;
    this.flips = 0;
    this.deck = new Deck();
  }

  onStart() {}
  onFlip() {}
  onScoreUpdate() {}
  onWrong() {}

  start() {
    if (this.started == true) return;
    this.deck.shuffle();
    for (let i = 0; i < this.deck.cards.length; i++) {
      this.deck.cards[i].id = i;
    }
    this.started = true;
    this.flipEnabled = true;
    this.onStart();
  }

  reset() {
    clearTimeout(this.timeout);
    this.score = 0;
    this.flips = 0;
    this.started = false;
    this.deck = new Deck();
    this.start();
  }

  flip(cardId) {
    const card = this.deck.cards.find((c) => c.id == cardId);
    if (this.flipEnabled == false || this.deck.cards[cardId].flipped == true)
      return;

    if (this.previousCard == null) {
      this.openFirstCard(cardId);
    } else {
      this.openSecondCard(cardId);
      this.checkCards(card, this.previousCard);
    }
    this.onFlip(card);
  }

  openFirstCard(cardId) {
    this.deck.cards[cardId].flipped = true;
    this.previousCard = this.deck.cards[cardId];
    this.flips = this.flips + 1;
    this.updateScore();
  }

  openSecondCard(cardId) {
    this.flipEnabled = false;
    this.deck.cards[cardId].flipped = true;
    this.flips = this.flips + 1;
    this.updateScore();
  }

  saveBest() {
    if (localStorage.getItem("hiScore") == null) {
      localStorage.setItem("hiScore", this.flips);
      return;
    }
    const lowestFlipCounts = parseInt(localStorage.getItem("hiScore"));
    if (this.flips < lowestFlipCounts) {
      localStorage.setItem("hiScore", this.flips);
    }
  }

  unflipCards(card, previousCard) {
    card.flipped = false;
    previousCard.flipped = false;
    this.onFlip(card);
    this.onFlip(previousCard);
  }

  updateScore() {
    const hiScore = localStorage.getItem("hiScore");

    if (hiScore == null) {
      this.onScoreUpdate(this.flips, "0");
    } else {
      this.onScoreUpdate(this.flips, hiScore);
    }
  }
  checkCards(card, previousCard) {
    if (card.value == previousCard.value) {
      this.score = this.score + 1;
      this.previousCard = null;
      if (this.score == 8) {
        this.saveBest();
        setTimeout(() => this.updateScore(), 1000);
      }
      this.flipEnabled = true;
    } else {
      setTimeout(() => this.unflipCards(card, previousCard), 1000);
      this.previousCard = null;
      setTimeout(() => (this.flipEnabled = true), 1000);
    }
  }
}

class Card {
  constructor(id, value) {
    this.id = id;
    this.value = value;
    this.flipped = false;
    this.image = "./images/card" + value + ".png";
  }
}

class Deck {
  constructor() {
    this.cards = [];

    for (let i = 0; i < 16; i++) {
      this.cards[i] = new Card(i, Math.round((i + 1) / 2));
      this.cards[i].id = i;
    }
  }

  shuffle = function () {
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
    game.flip(k);
  });
}

game.onStart = () => {
  game.updateScore();
  document
    .querySelectorAll(".flipped")
    .forEach((elem) => elem.classList.toggle("flipped"));
  console.log("Game started.");
};

game.onFlip = (card) => {
  console.log(
    `The card with id ${card.id} got flipped, updating UI element for it.`
  );
  document.getElementById("cardi" + card.id).classList.toggle("flipped");
  document.getElementById("crd" + card.id).src = card.image;
};

game.onScoreUpdate = (flips, best) => {
  document.getElementById("scorebox").innerHTML =
    `Moves Used: ${flips}` + "<br />" + `Best: ${best}`;
};

game.start();
document
  .getElementById("btn-reset")
  .addEventListener("click", () => game.reset());
