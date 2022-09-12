import client from "../database/postgres.js";

async function insertWifi(title: string, password: string, userId: number) {
  await client.wifi.create({ data: { title, password, userId } });
}

async function findWifi(userId: number) {
  const wifi = await client.wifi.findMany({ where: { userId } });
  return wifi;
}

async function findWifiByIds(wifiId: string, userId: number) {
  const id = Number(wifiId);
  const wifi = await client.wifi.findFirst({
    where: { id, userId },
  });
  return wifi;
}

async function findWifiById(wifiId: string) {
  const id = Number(wifiId);
  const wifi = await client.wifi.findFirst({ where: { id } });
  return wifi;
}

async function deleteWifiById(wifiId: string) {
  const id = Number(wifiId);
  await client.wifi.delete({ where: { id } });
}

export { insertWifi, findWifi, findWifiByIds, findWifiById, deleteWifiById };
