import client from "../database/postgres.js";
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
  const card = await client.cards.findFirst({ where: { title } });
  if (card) {
    throw {
      code: 409,
      message: "A safe note with the same name already exists!",
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
  console.log("ok!");
}

export { postCards };
