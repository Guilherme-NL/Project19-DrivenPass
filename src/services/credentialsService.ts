import client from "../database/postgres.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr("myTotallySecretKey");

async function postCredentials(
  title: string,
  url: string,
  username: string,
  password: string,
  userId: number
) {
  await validateTitle(title);
  const passwordHash = await passwordCrypt(password);
  await insertCredentials(title, url, username, passwordHash, userId);
}

async function validateTitle(title: string) {
  const credentials = await client.credentials.findFirst({ where: { title } });
  if (credentials) {
    throw {
      code: 409,
      message: "A credential with the same name already exists!",
    };
  }
}

async function passwordCrypt(password: string) {
  const passwordHash = cryptr.encrypt(password);
  return passwordHash;
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

async function getCredentials(credentialId: string, userId: number) {
  if (credentialId) {
    await validateCredential(credentialId);
    return getCredentialsById(credentialId, userId);
  } else {
    return await getAllCredentials();
  }
}

async function getAllCredentials() {
  const credentials = await client.credentials.findMany();
  const decryptCredentials = [...credentials];
  decryptCredentials.map((e) => {
    e.password = cryptr.decrypt(e.password);
  });
  return decryptCredentials;
}

async function getCredentialsById(credentialId: string, userId: number) {
  const id = Number(credentialId);
  const credential = await client.credentials.findFirst({
    where: { id, userId },
  });
  const decryptCredentials = {
    ...credential,
    password: cryptr.decrypt(credential.password),
  };
  if (!credential) {
    throw {
      code: 404,
      message:
        "The user does not have any credentials registered whit this id!",
    };
  }
  return decryptCredentials;
}

async function deleteCredential(credentialId: string, userId: number) {
  await validateCredential(credentialId);
  await getCredentialsById(credentialId, userId);
  await deleteCredentialById(credentialId);
  return "deleted!";
}

async function validateCredential(credentialId: string) {
  const id = Number(credentialId);
  const credential = await client.credentials.findFirst({ where: { id } });
  if (!credential) {
    throw {
      code: 404,
      message: "credential does not exist",
    };
  }
}

async function deleteCredentialById(credentialId: string) {
  const id = Number(credentialId);
  await client.credentials.delete({ where: { id } });
  return "ok!";
}

export { postCredentials, getCredentials, deleteCredential };
