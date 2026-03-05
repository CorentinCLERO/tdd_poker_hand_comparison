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
      rank: Rank.Six,
      color: Color.Spades,
    },
    {
      rank: Rank.Four,
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
      color: Color.Spades,
    },
    {
      rank: Rank.Three,
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
      color: Color.Spades,
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
      color: Color.Spades,
    },
  ];

  const expected_result: Card[] = [
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
  expect(result).toEqual(expect.arrayContaining(expected_result));
});
