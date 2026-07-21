// export function checkSet(e) {
//   return true;
// }

// export function generateDeck() {
//   return [];
// }

// function updateBoard( board: >, e: GameEvent ) {
//     if (checkSet(e)) {
//         for (const card of e.cards) {
//             board.delete(card);
//         }
//     }
// }

// interface GameEvent {
//   // card representation: [2 bits for suit] [4 bits for rank]
//   cards: number[];
//   user: string;
// }

export function checkSet(cards) {
  if (cards.length == 0) return false; // empty set does not count

  let result = 0;
  for (const card of cards) {
    result ^= card;
  }
  if (result == 0) return true;
  return false;
}

export function generateDeck() {
  const deck = [];
  for (let rank = 1; rank <= 13; rank++) {
    for (let suit = 0; suit < 4; suit++) {
      deck.push(rank + (suit << 4));
    }
  }
  // shuffle the deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// function updateBoard( board: >, e: GameEvent ) {
//     if (checkSet(e)) {
//         for (const card of e.cards) {
//             board.delete(card);
//         }
//     }
// }
