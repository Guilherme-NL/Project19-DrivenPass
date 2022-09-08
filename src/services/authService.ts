import client from "../database/postgres.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;
const secretKey = "skljaksdj9983498327453lsldkjf";

async function registerNewUser(email: string, password: string) {
  await validateEmailForRegistration(email);
  const passwordCrypt = await getPasswordCrypt(password);
  await insertNewUser(email, passwordCrypt);
  return "ok!";
}

async function validateEmailForRegistration(email: string) {
  const bdEmail = await client.users.findFirst({ where: { email } });
  if (bdEmail) {
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

async function userLogin(email: string, password: string) {
  const user = await validateEmailForLogin(email);
  await validatePassword(user.password, password);
  const token = await getToken(email, password);
  await insertSession(user.id, token);
  return "Ok!";
}

async function validateEmailForLogin(email: string) {
  const user = await client.users.findUnique({ where: { email } });
  if (!user) {
    throw {
      code: 404,
      message: "This email is not registered in our database!",
    };
  }
  return user;
}

async function validatePassword(passwordCrypt: string, password: string) {
  const comparePassword = bcrypt.compareSync(password, passwordCrypt);

  if (!comparePassword) {
    throw { code: 401, message: "password incorrect" };
  }
  return "password ok!";
}

async function getToken(email: string, password: string) {
  const token = sign(
    {
      email,
      password,
    },
    secretKey,
    {
      expiresIn: "1y",
      subject: "1",
    }
  );
  return token;
}

async function insertSession(id: number, token: string) {
  await client.sessions.create({ data: { user: { connect: { id } }, token } });
}

export { registerNewUser, userLogin };
