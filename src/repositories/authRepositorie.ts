import client from "../database/postgres.js";

async function findEmail(email: string) {
  const bdEmail = await client.users.findFirst({ where: { email } });
  return bdEmail;
}

async function insertNewUser(email: string, password: string) {
  await client.users.create({ data: { email, password } });
}

async function insertSession(id: number, token: string) {
  await client.sessions.create({ data: { user: { connect: { id } }, token } });
}

export { findEmail, insertNewUser, insertSession };
