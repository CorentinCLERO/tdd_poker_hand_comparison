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
  ];

  // When
  const expected_result = getBestHand(user_cards, community_cards);

  // Then
  expect(expected_result.length).toBe(5);
});
