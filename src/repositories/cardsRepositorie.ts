import client from "../database/postgres.js";

async function insertCard(
  title: string,
  number: string,
  name: string,
  cvc: string,
  expiration: string,
  password: string,
  isVirtual: boolean,
  type: string,
  id: number
) {
  await client.cards.create({
    data: {
      title,
      number,
      name,
      cvc,
      expiration,
      password,
      isVirtual,
      type,
      user: { connect: { id } },
    },
  });
}

async function findTitle(title: string) {
  const card = await client.cards.findFirst({ where: { title } });
  return card;
}

async function findCardsByUserId(userId: number) {
  const cards = await client.cards.findMany({ where: { userId } });
  return cards;
}

async function findCardsByIds(cardId: string, userId: number) {
  const id = Number(cardId);
  const card = await client.cards.findFirst({
    where: { id, userId },
  });
  return card;
}

async function findCardsById(cardId: string) {
  const id = Number(cardId);
  const card = await client.cards.findFirst({ where: { id } });
  return card;
}

async function deleteCardById(cardId: string) {
  const id = Number(cardId);
  await client.cards.delete({ where: { id } });
}

export {
  insertCard,
  findTitle,
  findCardsByUserId,
  findCardsById,
  findCardsByIds,
  deleteCardById,
};
