import Cryptr from "cryptr";
import {
  findTitle,
  insertCredentials,
  findCredentialsByUserId,
  deleteCredentialById,
  findCredentialsById,
  findCredentialsByIds,
} from "../repositories/credentialRepositorie.js";

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
  const credentials = await findTitle(title);
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

async function getCredentials(credentialId: string, userId: number) {
  if (credentialId) {
    await validateCredential(credentialId, userId);
    return getCredentialsById(credentialId, userId);
  } else {
    return await getAllCredentials(userId);
  }
}

async function getAllCredentials(userId: number) {
  const credentials = await findCredentialsByUserId(userId);
  const decryptCredentials = [...credentials];
  decryptCredentials.map((e) => {
    e.password = cryptr.decrypt(e.password);
  });
  return decryptCredentials;
}

async function getCredentialsById(credentialId: string, userId: number) {
  const credential = await findCredentialsByIds(credentialId, userId);
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
  await validateCredential(credentialId, userId);
  await getCredentialsById(credentialId, userId);
  await deleteCredentialById(credentialId);
  return "deleted!";
}

async function validateCredential(credentialId: string, userId: number) {
  const credential = await findCredentialsById(credentialId);
  if (!credential) {
    throw {
      code: 404,
      message: "credential does not exist",
    };
  }
  const userCredentials = await findCredentialsByIds(credentialId, userId);
  if (!userCredentials) {
    throw {
      code: 404,
      message: "The credential does not belong to this user",
    };
  }
}

export { postCredentials, getCredentials, deleteCredential };
