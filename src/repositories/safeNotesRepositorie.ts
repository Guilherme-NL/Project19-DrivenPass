import client from "../database/postgres.js";

async function findTitle(title: string) {
  const note = await client.credentials.findFirst({ where: { title } });
  return note;
}

async function insertNote(title: string, note: string, id: number) {
  await client.safenotes.create({
    data: { title, note, user: { connect: { id } } },
  });
}

async function getAllNotes(userId: number) {
  const notes = await client.safenotes.findMany({ where: { userId } });
  return notes;
}

async function findNotesByIds(noteId: string, userId: number) {
  const id = Number(noteId);
  const note = await client.safenotes.findFirst({
    where: { id, userId },
  });
  return note;
}

async function findNotesById(noteId: string) {
  const id = Number(noteId);
  const note = await client.safenotes.findFirst({ where: { id } });
  return note;
}

async function deleteNotesById(noteId: string) {
  const id = Number(noteId);
  await client.safenotes.delete({ where: { id } });
}

export {
  findTitle,
  insertNote,
  getAllNotes,
  findNotesByIds,
  findNotesById,
  deleteNotesById,
};
