export default interface Card {
  rank: Rank;
  color: Color;
}

export enum Color {
  Spades = "spades",
  Hearts = "hearts",
  Clubs = "clubs",
  Diamonds = "diamonds",
}

export enum Rank {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Jack = 11,
  Queen = 12,
  King = 13,
  Ace = 14,
}

function findPairs(cards: Card[]): Card[][] {
  const pairs: Card[][] = [];
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i]!.rank === cards[i + 1]!.rank) {
      pairs.push([cards[i]!, cards[i + 1]!]);
    }
  }
  return pairs;
}

function kickers(cards: Card[], excludeRanks: Rank[], count: number): Card[] {
  return cards.filter((c) => !excludeRanks.includes(c.rank)).slice(0, count);
}

export function getBestHand(userCards: Card[], communityCards: Card[]): Card[] {
  if (userCards.length !== 2) {
    throw new Error("User should have 2 cards");
  }

  if (communityCards.length !== 5) {
    throw new Error("Community should have 5 cards");
  }

  const allCards = [...userCards, ...communityCards].sort((a, b) => b.rank - a.rank);
  const pairs = findPairs(allCards);

  if (pairs.length === 2) {
    return [
      ...pairs[0]!,
      ...pairs[1]!,
      ...kickers(allCards, [pairs[0]![0]!.rank, pairs[1]![0]!.rank], 1),
    ];
  }

  if (pairs.length === 1) {
    return [
      ...pairs[0]!,
      ...kickers(allCards, [pairs[0]![0]!.rank], 3),
    ];
  }

  return allCards.slice(0, 5);
}
