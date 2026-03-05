import { expect, test } from "bun:test";
import { getBestHand, Rank, Color } from ".";
import type Card from ".";

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
  const result = getBestHand(user_cards, community_cards);

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
  expect(() => getBestHand(user_cards, community_cards)).toThrow(
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
  expect(() => getBestHand(user_cards, community_cards)).toThrow(
    "Community should have 5 cards",
  );
});

test("it return 5 highest cards", () => {
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
      rank: Rank.Five,
      color: Color.Spades,
    },
    {
      rank: Rank.Seven,
      color: Color.Spades,
    },
  ];

  // When
  const result = getBestHand(user_cards, community_cards);

  // Then
  expect(result.map((card) => card.rank)).toEqual([
    Rank.Jack,
    Rank.Seven,
    Rank.Six,
    Rank.Five,
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
  const result = getBestHand(user_cards, community_cards);

  // Then
  expect(result).toEqual(expect.arrayContaining(expected_result));
});
