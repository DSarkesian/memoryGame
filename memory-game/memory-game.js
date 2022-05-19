"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */


const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  let i = 0
  // using while loop to set individual ids to all card divs
  // to check if same card is clicked twice
  while(i<10){
    for (let color of colors) {
      const newCard = document.createElement('div')
      newCard.classList=color
      newCard.style.backgroundColor='black'
      newCard.setAttribute('id',i)
      newCard.addEventListener("click",handleCardClick)
      gameBoard.append(newCard)
      i++

    }

  }

}



/** Flip a card face-up. */

function flipCard(card) {
  card.style.backgroundColor=card.className




}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.style.backgroundColor="black",5000
}

/** Handle clicking on a card: this could be first-card or second-card. */
let cardCount = 0
let cardOne=''
let cardTwo =''
function cardCountReset(){
  cardCount=0
}
function handleCardClick(evt) {
  if(cardCount<2){
    if(cardCount===1){
      cardTwo=evt.currentTarget
      flipCard(evt.currentTarget)
      cardCount+=1
      console.log(cardTwo,cardCount)
    }
    if(cardCount===0){
      cardOne=evt.currentTarget
      flipCard(evt.currentTarget)
      cardCount+=1
      console.log(cardOne,cardCount)
    }
    if(cardCount===2){
      //flips cards over if they are unequal or samecard
      if(cardOne.className!==cardTwo.className||cardOne.id===cardTwo.id){
        setTimeout(function(){
          unFlipCard(cardOne)
          unFlipCard(cardTwo)
          //resets cardcount if cards dont match
          cardCountReset()
        },FOUND_MATCH_WAIT_MSECS)
      }else{
        //reset when cards match
        cardCountReset()
      }


    }


  }
}
