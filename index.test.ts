import { expect, test } from "bun:test";
import { TexasHoldem, Rank, Color } from ".";
import type Card from ".";

// ------------------------------------------------
// tests getBestHand
// ------------------------------------------------

test("it return 5 cards", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Three,
      color: Color.Spades,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Three,
      color: Color.Spades,
    },
    {
      rank: Rank.Four,
      color: Color.Spades,
    },
    {
      rank: Rank.Five,
      color: Color.Spades,
    },
    {
      rank: Rank.Six,
      color: Color.Spades,
    },
  ];

  // When
  const game = new TexasHoldem([user_cards], community_cards);
  const result = game.getBestHand(0);

  // Then
  expect(result.length).toBe(5);
});

test("user should have 2 cards", () => {
  // Given
  const user_cards: Card[] = [];

  const community_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Three,
      color: Color.Spades,
    },
    {
      rank: Rank.Four,
      color: Color.Spades,
    },
    {
      rank: Rank.Five,
      color: Color.Spades,
    },
    {
      rank: Rank.Six,
      color: Color.Spades,
    },
  ];

  // When
  // Then
  expect(() => new TexasHoldem([user_cards], community_cards)).toThrow(
    "User should have 2 cards",
  );
});

test("community should have 5 cards", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Jack,
      color: Color.Spades,
    },
  ];

  const community_cards: Card[] = [];

  // When
  // Then
  expect(() => new TexasHoldem([user_cards], community_cards)).toThrow(
    "Community should have 5 cards",
  );
});

test("it return 5 highest cards", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Clubs,
    },
    {
      rank: Rank.Jack,
      color: Color.Spades,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Six,
      color: Color.Hearts,
    },
    {
      rank: Rank.Three,
      color: Color.Spades,
    },
    {
      rank: Rank.Four,
      color: Color.Diamonds,
    },
    {
      rank: Rank.King,
      color: Color.Spades,
    },
    {
      rank: Rank.Seven,
      color: Color.Spades,
    },
  ];

  // When
  const game = new TexasHoldem([user_cards], community_cards);
  const result = game.getBestHand(0);

  // Then
  expect(result.map((card) => card.rank)).toEqual([
    Rank.King,
    Rank.Jack,
    Rank.Seven,
    Rank.Six,
    Rank.Four,
  ]);
});

test("it return one pair", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Jack,
      color: Color.Spades,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Six,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Three,
      color: Color.Hearts,
    },
    {
      rank: Rank.Four,
      color: Color.Clubs,
    },
    {
      rank: Rank.Jack,
      color: Color.Clubs,
    },
    {
      rank: Rank.Seven,
      color: Color.Spades,
    },
  ];

  const expected_result: Card[] = [
    {
      rank: Rank.Jack,
      color: Color.Spades,
    },
    {
      rank: Rank.Jack,
      color: Color.Clubs,
    },
    {
      rank: Rank.Seven,
      color: Color.Spades,
    },
    {
      rank: Rank.Six,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Four,
      color: Color.Clubs,
    },
  ];

  // When
  const game = new TexasHoldem([user_cards], community_cards);
  const result = game.getBestHand(0);

  // Then
  expect(result).toEqual(expect.arrayContaining(expected_result));
});

test("it return two pair", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Jack,
      color: Color.Spades,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Six,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Three,
      color: Color.Hearts,
    },
    {
      rank: Rank.Two,
      color: Color.Hearts,
    },
    {
      rank: Rank.Jack,
      color: Color.Clubs,
    },
    {
      rank: Rank.Seven,
      color: Color.Spades,
    },
  ];

  const expected_result: Card[] = [
    {
      rank: Rank.Jack,
      color: Color.Spades,
    },
    {
      rank: Rank.Jack,
      color: Color.Clubs,
    },
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Two,
      color: Color.Hearts,
    },
    {
      rank: Rank.Seven,
      color: Color.Spades,
    },
  ];

  // When
  const game = new TexasHoldem([user_cards], community_cards);
  const result = game.getBestHand(0);

  // Then
  expect(result).toEqual(expect.arrayContaining(expected_result));
});

test("it return three of a kind", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.King,
      color: Color.Spades,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Six,
      color: Color.Spades,
    },
    {
      rank: Rank.Two,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Two,
      color: Color.Hearts,
    },
    {
      rank: Rank.Jack,
      color: Color.Clubs,
    },
    {
      rank: Rank.Seven,
      color: Color.Spades,
    },
  ];

  const expected_result: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Two,
      color: Color.Hearts,
    },
    {
      rank: Rank.King,
      color: Color.Spades,
    },
    {
      rank: Rank.Jack,
      color: Color.Clubs,
    },
  ];

  // When
  const game = new TexasHoldem([user_cards], community_cards);
  const result = game.getBestHand(0);

  // Then
  expect(result).toEqual(expect.arrayContaining(expected_result));
});

test("it return straight", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Three,
      color: Color.Diamonds,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Four,
      color: Color.Spades,
    },
    {
      rank: Rank.Five,
      color: Color.Spades,
    },
    {
      rank: Rank.Two,
      color: Color.Hearts,
    },
    {
      rank: Rank.Jack,
      color: Color.Clubs,
    },
    {
      rank: Rank.Six,
      color: Color.Hearts,
    },
  ];

  const expected_result: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Three,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Four,
      color: Color.Spades,
    },
    {
      rank: Rank.Five,
      color: Color.Spades,
    },
    {
      rank: Rank.Six,
      color: Color.Hearts,
    },
  ];

  // When
  const game = new TexasHoldem([user_cards], community_cards);
  const result = game.getBestHand(0);

  // Then
  expect(result).toEqual(expect.arrayContaining(expected_result));
});

test("it return flush", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Three,
      color: Color.Spades,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Four,
      color: Color.Spades,
    },
    {
      rank: Rank.Nine,
      color: Color.Spades,
    },
    {
      rank: Rank.Two,
      color: Color.Hearts,
    },
    {
      rank: Rank.Jack,
      color: Color.Clubs,
    },
    {
      rank: Rank.Six,
      color: Color.Spades,
    },
  ];

  const expected_result: Card[] = [
    {
      rank: Rank.Nine,
      color: Color.Spades,
    },
    {
      rank: Rank.Six,
      color: Color.Spades,
    },
    {
      rank: Rank.Four,
      color: Color.Spades,
    },
    {
      rank: Rank.Three,
      color: Color.Spades,
    },
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
  ];

  // When
  const game = new TexasHoldem([user_cards], community_cards);
  const result = game.getBestHand(0);

  // Then
  expect(result).toEqual(expect.arrayContaining(expected_result));
});

test("it return full house", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.King,
      color: Color.Spades,
    },
    {
      rank: Rank.King,
      color: Color.Hearts,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.King,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Three,
      color: Color.Spades,
    },
    {
      rank: Rank.Nine,
      color: Color.Hearts,
    },
    {
      rank: Rank.Three,
      color: Color.Clubs,
    },
    {
      rank: Rank.Five,
      color: Color.Diamonds,
    },
  ];

  const expected_result: Card[] = [
    {
      rank: Rank.King,
      color: Color.Spades,
    },
    {
      rank: Rank.King,
      color: Color.Hearts,
    },
    {
      rank: Rank.King,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Three,
      color: Color.Spades,
    },
    {
      rank: Rank.Three,
      color: Color.Clubs,
    },
  ];

  // When
  const game = new TexasHoldem([user_cards], community_cards);
  const result = game.getBestHand(0);

  // Then
  expect(result).toEqual(expect.arrayContaining(expected_result));
});

test("it return four of a kind", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Two,
      color: Color.Hearts,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Two,
      color: Color.Clubs,
    },
    {
      rank: Rank.Nine,
      color: Color.Hearts,
    },
    {
      rank: Rank.Three,
      color: Color.Clubs,
    },
    {
      rank: Rank.Five,
      color: Color.Diamonds,
    },
  ];

  const expected_result: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Spades,
    },
    {
      rank: Rank.Two,
      color: Color.Hearts,
    },
    {
      rank: Rank.Two,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Two,
      color: Color.Clubs,
    },
    {
      rank: Rank.Nine,
      color: Color.Hearts,
    },
  ];

  // When
  const game = new TexasHoldem([user_cards], community_cards);
  const result = game.getBestHand(0);

  // Then
  expect(result).toEqual(expect.arrayContaining(expected_result));
});

test("it return straight flush", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.Five,
      color: Color.Hearts,
    },
    {
      rank: Rank.Six,
      color: Color.Hearts,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Seven,
      color: Color.Hearts,
    },
    {
      rank: Rank.Eight,
      color: Color.Hearts,
    },
    {
      rank: Rank.Nine,
      color: Color.Hearts,
    },
    {
      rank: Rank.Ten,
      color: Color.Clubs,
    },
    {
      rank: Rank.Jack,
      color: Color.Clubs,
    },
  ];

  const expected_result: Card[] = [
    {
      rank: Rank.Five,
      color: Color.Hearts,
    },
    {
      rank: Rank.Six,
      color: Color.Hearts,
    },
    {
      rank: Rank.Seven,
      color: Color.Hearts,
    },
    {
      rank: Rank.Eight,
      color: Color.Hearts,
    },
    {
      rank: Rank.Nine,
      color: Color.Hearts,
    },
  ];

  // When
  const game = new TexasHoldem([user_cards], community_cards);
  const result = game.getBestHand(0);

  // Then
  expect(result).toEqual(expect.arrayContaining(expected_result));
});

test("it return royal flush", () => {
  // Given
  const user_cards: Card[] = [
    {
      rank: Rank.Ace,
      color: Color.Clubs,
    },
    {
      rank: Rank.King,
      color: Color.Clubs,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Queen,
      color: Color.Clubs,
    },
    {
      rank: Rank.Jack,
      color: Color.Clubs,
    },
    {
      rank: Rank.Ten,
      color: Color.Clubs,
    },
    {
      rank: Rank.Two,
      color: Color.Hearts,
    },
    {
      rank: Rank.Five,
      color: Color.Diamonds,
    },
  ];

  const expected_result: Card[] = [
    {
      rank: Rank.Ace,
      color: Color.Clubs,
    },
    {
      rank: Rank.King,
      color: Color.Clubs,
    },
    {
      rank: Rank.Queen,
      color: Color.Clubs,
    },
    {
      rank: Rank.Jack,
      color: Color.Clubs,
    },
    {
      rank: Rank.Ten,
      color: Color.Clubs,
    },
  ];

  // When
  const game = new TexasHoldem([user_cards], community_cards);
  const result = game.getBestHand(0);

  // Then
  expect(result).toEqual(expect.arrayContaining(expected_result));
});

// ------------------------------------------------
// tests getTableWinner
// ------------------------------------------------

test("it return only one winner", () => {
  // Given
  const user1_cards: Card[] = [
    {
      rank: Rank.Ace,
      color: Color.Spades,
    },
    {
      rank: Rank.King,
      color: Color.Spades,
    },
  ];

  const user2_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Hearts,
    },
    {
      rank: Rank.Seven,
      color: Color.Diamonds,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Ace,
      color: Color.Hearts,
    },
    {
      rank: Rank.Ace,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Ace,
      color: Color.Clubs,
    },
    {
      rank: Rank.Three,
      color: Color.Hearts,
    },
    {
      rank: Rank.Five,
      color: Color.Diamonds,
    },
  ];

  // When
  const game = new TexasHoldem([user1_cards, user2_cards], community_cards);
  const winner = game.getTableWinner();

  // Then
  expect(typeof winner).toBe("number");
});

test("it should throw if less than 2 players", () => {
  // Given
  const user1_cards: Card[] = [
    {
      rank: Rank.Two,
      color: Color.Hearts,
    },
    {
      rank: Rank.Seven,
      color: Color.Diamonds,
    },
  ];

  const community_cards: Card[] = [
    {
      rank: Rank.Ace,
      color: Color.Hearts,
    },
    {
      rank: Rank.Ace,
      color: Color.Diamonds,
    },
    {
      rank: Rank.Ace,
      color: Color.Clubs,
    },
    {
      rank: Rank.Three,
      color: Color.Hearts,
    },
    {
      rank: Rank.Five,
      color: Color.Diamonds,
    },
  ];

  // When
  // Then
  expect(() =>
    new TexasHoldem([user1_cards], community_cards).getTableWinner(),
  ).toThrow("There should be at least 2 players");
});
