import {
  findTitle,
  insertNote,
  getAllNotes,
  findNotesByIds,
  findNotesById,
  deleteNotesById,
} from "../repositories/safeNotesRepositorie.js";

async function postNote(title: string, note: string, userId: number) {
  await validateTitle(title);
  await insertNote(title, note, userId);
}

async function validateTitle(title: string) {
  const note = await findTitle(title);
  console.log(title, note);
  if (note) {
    throw {
      code: 409,
      message: "A safe note with the same name already exists!",
    };
  }
}

async function getNotes(noteId: string, userId: number) {
  if (noteId) {
    await validateNote(noteId, userId);
    return getNotesById(noteId, userId);
  } else {
    return await getAllNotes(userId);
  }
}

async function getNotesById(noteId: string, userId: number) {
  const note = await findNotesByIds(noteId, userId);
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
  const note = await findNotesById(noteId);
  if (!note) {
    throw {
      code: 404,
      message: "note does not exist",
    };
  }
  const userNotes = await findNotesByIds(noteId, userId);
  if (!userNotes) {
    throw {
      code: 404,
      message: "The note does not belong to this user",
    };
  }
}

export { postNote, getNotes, deleteNote };
