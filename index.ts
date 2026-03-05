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

export function getBestHand(userCards: Card[], communityCard: Card[]): Card[] {
  if (userCards.length !== 2) {
    throw new Error("User should have 2 cards");
  }

  if (communityCard.length !== 5) {
    throw new Error("Community should have 5 cards");
  }

  const allCards: Card[] = [...userCards, ...communityCard].sort(
    (a, b) => b.rank - a.rank,
  );

  const pairs: Card[][] = [];

  for (let i = 0; i < allCards.length - 1; i++) {
    if (allCards[i]?.rank === allCards[i + 1]?.rank) {
      pairs.push([allCards[i]!, allCards[i + 1]!]);
    }
  }

  if (pairs.length === 2) {
    return [
      ...pairs[0]!,
      ...pairs[1]!,
      ...allCards
        .filter((c) => c.rank !== pairs[0]![0]!.rank && c.rank !== pairs[1]![0]!.rank)
        .slice(0, 1),
    ];
  }

  if (pairs.length === 1) {
    return [
      ...pairs[0]!,
      ...allCards.filter((c) => c.rank !== pairs[0]![0]!.rank).slice(0, 3),
    ];
  }

  return allCards.slice(0, 5);
}
