import client from "../database/postgres.js";

async function findTitle(title: string) {
  const credentials = await client.credentials.findFirst({ where: { title } });
  return credentials;
}

async function insertCredentials(
  title: string,
  url: string,
  username: string,
  password: string,
  id: number
) {
  await client.credentials.create({
    data: { title, url, username, password, user: { connect: { id } } },
  });
}

async function findCredentialsByUserId(userId: number) {
  const credentials = await client.credentials.findMany({ where: { userId } });
  return credentials;
}

async function findCredentialsByIds(credentialId: string, userId: number) {
  const id = Number(credentialId);
  const credential = await client.credentials.findFirst({
    where: { id, userId },
  });
  return credential;
}

async function findCredentialsById(credentialId: string) {
  const id = Number(credentialId);
  const credential = await client.credentials.findFirst({ where: { id } });
  return credential;
}

async function deleteCredentialById(credentialId: string) {
  const id = Number(credentialId);
  await client.credentials.delete({ where: { id } });
}

export {
  findTitle,
  insertCredentials,
  findCredentialsByUserId,
  deleteCredentialById,
  findCredentialsById,
  findCredentialsByIds,
};
