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
  expect(result.map((card) => card.rank)).toBe([
    Rank.Jack,
    Rank.Seven,
    Rank.Six,
    Rank.Five,
    Rank.Four,
  ]);
});
