import client from "../database/postgres.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr("myTotallySecretKey");

async function postWifi(title: string, password: string, userId: number) {
  const passwordHash = await passwordCrypt(password);
  await insertWifi(title, passwordHash, userId);
}

async function insertWifi(title: string, password: string, userId: number) {
  await client.wifi.create({ data: { title, password, userId } });
}

async function passwordCrypt(password: string) {
  const passwordHash = cryptr.encrypt(password);
  return passwordHash;
}

async function getWifi(wifiId: string, userId: number) {
  if (wifiId) {
    await validateWifi(wifiId, userId);
    return getWifiById(wifiId, userId);
  } else {
    return await getAllWifi(userId);
  }
}

async function getAllWifi(userId: number) {
  const wifi = await client.wifi.findMany({ where: { userId } });
  const decryptWifi = [...wifi];
  decryptWifi.map((e) => {
    e.password = cryptr.decrypt(e.password);
  });
  return decryptWifi;
}

async function getWifiById(wifiId: string, userId: number) {
  const id = Number(wifiId);
  const wifi = await client.wifi.findFirst({
    where: { id, userId },
  });
  if (!wifi) {
    throw {
      code: 404,
      message: "The user does not have any wifi registered whit this id!",
    };
  }
  const decryptWifi = {
    ...wifi,
    password: cryptr.decrypt(wifi.password),
  };
  return decryptWifi;
}

async function validateWifi(wifiId: string, userId: number) {
  const id = Number(wifiId);
  const wifi = await client.wifi.findFirst({ where: { id } });
  if (!wifi) {
    throw {
      code: 404,
      message: "wifi does not exist",
    };
  }
  const userWifi = await client.wifi.findFirst({ where: { id, userId } });
  if (!userWifi) {
    throw {
      code: 404,
      message: "The wifi does not belong to this user",
    };
  }
}

async function deleteWifi(wifiId: string, userId: number) {
  await validateWifi(wifiId, userId);
  await getWifiById(wifiId, userId);
  await deleteWifiById(wifiId);
  return "deleted!";
}

async function deleteWifiById(wifiId: string) {
  const id = Number(wifiId);
  await client.wifi.delete({ where: { id } });
  return "ok!";
}

export { postWifi, getWifi, deleteWifi };
