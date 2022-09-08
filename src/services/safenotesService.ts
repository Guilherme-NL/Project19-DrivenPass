import client from "../database/postgres.js";

async function postNote(title: string, note: string, userId: number) {
  await validateTitle(title);
  await insertNote(title, note, userId);
}

async function validateTitle(title: string) {
  const note = await client.safenotes.findFirst({ where: { title } });
  if (note) {
    throw {
      code: 409,
      message: "A safe note with the same name already exists!",
    };
  }
}

async function insertNote(title: string, note: string, id: number) {
  await client.safenotes.create({
    data: { title, note, user: { connect: { id } } },
  });
}

export { postNote };
