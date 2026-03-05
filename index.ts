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

function findThreeOfAKind(cards: Card[]): Card[][] {
  const trips: Card[][] = [];
  const rankCount: Record<number, Card[]> = {};

  for (const card of cards) {
    if (!rankCount[card.rank]) rankCount[card.rank] = [];
    rankCount[card.rank]!.push(card);
  }

  for (const rank in rankCount) {
    if (rankCount[rank]!.length === 3) {
      trips.push(rankCount[rank]!);
    }
  }

  return trips;
}

function findStraight(cards: Card[]): Card[] | null {
  const uniqueRanks = Array.from(new Set(cards.map((c) => c.rank))).sort(
    (a, b) => b - a,
  );

  if (uniqueRanks.includes(Rank.Ace)) uniqueRanks.push(Rank.Ace);

  for (let i = 0; i <= uniqueRanks.length - 5; i++) {
    let isStraight = true;
    for (let j = 0; j < 4; j++) {
      if (uniqueRanks[i + j]! - 1 !== uniqueRanks[i + j + 1]) {
        isStraight = false;
        break;
      }
    }
    if (isStraight) {
      const straightRanks = uniqueRanks.slice(i, i + 5);
      return cards
        .filter(
          (c) =>
            straightRanks.includes(c.rank) ||
            (c.rank === Rank.Ace && straightRanks.includes(Rank.Ace)),
        )
        .sort((a, b) => b.rank - a.rank)
        .slice(0, 5);
    }
  }
  return null;
}

function findFlush(cards: Card[]): Card[] | null {
  const suits = Object.values(Color) as Color[];
  for (const suit of suits) {
    const suitedCards = cards
      .filter((c) => c.color === suit)
      .sort((a, b) => b.rank - a.rank);
    if (suitedCards.length >= 5) return suitedCards.slice(0, 5);
  }
  return null;
}

export class TexasHoldem {
  private players: Card[][];
  private communityCards: Card[];

  constructor(players: Card[][], communityCards: Card[]) {
    for (const player of players) {
      if (player.length !== 2) {
        throw new Error("User should have 2 cards");
      }
    }

    if (communityCards.length !== 5) {
      throw new Error("Community should have 5 cards");
    }

    this.players = players;
    this.communityCards = communityCards;
  }

  getBestHand(playerIndex: number): Card[] {
    const userCards = this.players[playerIndex]!;
    const allCards = [...userCards, ...this.communityCards].sort(
      (a, b) => b.rank - a.rank,
    );

    const straight = findStraight(allCards);
    if (straight) {
      return straight;
    }

    const flush = findFlush(allCards);
    if (flush) {
      return flush;
    }

    const trips = findThreeOfAKind(allCards);
    if (trips.length > 0) {
      return [...trips[0]!, ...kickers(allCards, [trips[0]![0]!.rank], 2)];
    }

    const pairs = findPairs(allCards);

    if (pairs.length === 2) {
      return [
        ...pairs[0]!,
        ...pairs[1]!,
        ...kickers(allCards, [pairs[0]![0]!.rank, pairs[1]![0]!.rank], 1),
      ];
    }

    if (pairs.length === 1) {
      return [...pairs[0]!, ...kickers(allCards, [pairs[0]![0]!.rank], 3)];
    }

    return allCards.slice(0, 5);
  }
}
