export type Card = { id: string; title: string; comments?: Comment[] }
export type Column = { id: string; title: string; cards: Card[] }
export type Comment = {
  id: string;
  text: string;
  createdAt: string;
}