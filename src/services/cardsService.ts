import {
  insertCard,
  findCardsByUserId,
  findCardsById,
  findCardsByIds,
  deleteCardById,
  findTitle,
} from "../repositories/cardsRepositorie.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr("myTotallySecretKey");

async function postCards(
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
  await validateTitle(title);
  const passwordHash = await passwordCrypt(password);
  const cvcHash = await cvcCrypt(cvc);
  await insertCard(
    title,
    number,
    name,
    cvcHash,
    expiration,
    passwordHash,
    isVirtual,
    type,
    id
  );
}

async function validateTitle(title: string) {
  const card = await findTitle(title);
  if (card) {
    throw {
      code: 409,
      message: "A card with the same name already exists!",
    };
  }
}

async function passwordCrypt(password: string) {
  const passwordHash = cryptr.encrypt(password);
  return passwordHash;
}

async function cvcCrypt(cvc: string) {
  const cvcHash = cryptr.encrypt(cvc);
  return cvcHash;
}

async function getCards(cardId: string, userId: number) {
  if (cardId) {
    await validateCard(cardId, userId);
    return getCardsById(cardId, userId);
  } else {
    return await getAllCards(userId);
  }
}

async function getAllCards(userId: number) {
  const cards = await findCardsByUserId(userId);
  const decryptCards = [...cards];
  decryptCards.map((e) => {
    e.password = cryptr.decrypt(e.password);
    e.cvc = cryptr.decrypt(e.cvc);
  });
  return decryptCards;
}

async function getCardsById(cardId: string, userId: number) {
  const card = await findCardsByIds(cardId, userId);
  const decryptCards = {
    ...card,
    password: cryptr.decrypt(card.password),
    cvc: cryptr.decrypt(card.cvc),
  };
  if (!card) {
    throw {
      code: 404,
      message: "The user does not have any cards registered whit this id!",
    };
  }
  return decryptCards;
}

async function deleteCard(cardId: string, userId: number) {
  await validateCard(cardId, userId);
  await getCardsById(cardId, userId);
  await deleteCardById(cardId);
  return "deleted!";
}

async function validateCard(cardId: string, userId: number) {
  const card = await findCardsById(cardId);
  if (!card) {
    throw {
      code: 404,
      message: "card does not exist",
    };
  }
  const userCards = await findCardsByIds(cardId, userId);
  if (!userCards) {
    throw {
      code: 404,
      message: "The card does not belong to this user",
    };
  }
}

export { postCards, getCards, deleteCard };
