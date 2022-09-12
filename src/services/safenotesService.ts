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

async function getNotes(noteId: string, userId: number) {
  if (noteId) {
    await validateNote(noteId, userId);
    return getNotesById(noteId, userId);
  } else {
    return await getAllNotes(userId);
  }
}

async function getAllNotes(userId: number) {
  const notes = await client.safenotes.findMany({ where: { userId } });
  return notes;
}

async function getNotesById(noteId: string, userId: number) {
  const id = Number(noteId);
  const note = await client.safenotes.findFirst({
    where: { id, userId },
  });
  if (!note) {
    throw {
      code: 404,
      message: "The user does not have any note registered whit this id!",
    };
  }
  return note;
}

async function deleteNote(noteId: string, userId: number) {
  await validateNote(noteId, userId);
  await getNotesById(noteId, userId);
  await deleteNotesById(noteId);
  return "deleted!";
}

async function validateNote(noteId: string, userId: number) {
  const id = Number(noteId);
  const note = await client.safenotes.findFirst({ where: { id } });
  if (!note) {
    throw {
      code: 404,
      message: "note does not exist",
    };
  }
  const userNotes = await client.safenotes.findFirst({ where: { id, userId } });
  if (!userNotes) {
    throw {
      code: 404,
      message: "The note does not belong to this user",
    };
  }
}

async function deleteNotesById(noteId: string) {
  const id = Number(noteId);
  await client.safenotes.delete({ where: { id } });
  return "ok!";
}

export { postNote, getNotes, deleteNote };
