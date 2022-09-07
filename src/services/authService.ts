import client from "../database/postgres.js";
import bcrypt from "bcrypt";

async function registerNewUser(email: string, password: string) {
  await validateEmail(email);
  const passwordCrypt = await getPasswordCrypt(password);
  await insertNewUser(email, passwordCrypt);
  return "ok!";
}

async function validateEmail(email: string) {
  const bdEmail = await client.users.findMany({ where: { email } });
  console.log(bdEmail, " ", email);
  if (bdEmail.length !== 0) {
    throw {
      code: 409,
      message: "This email is already registered in our database!",
    };
  }
  return "email ok!";
}

async function getPasswordCrypt(password: string) {
  const passwordCrypt = bcrypt.hashSync(password, 10);
  return passwordCrypt;
}

async function insertNewUser(email: string, password: string) {
  await client.users.create({ data: { email, password } });
  return "ok!";
}

export { registerNewUser };
