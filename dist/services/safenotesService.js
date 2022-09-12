var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { findTitle, insertNote, getAllNotes, findNotesByIds, findNotesById, deleteNotesById, } from "../repositories/safeNotesRepositorie.js";
function postNote(title, note, userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateTitle(title)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, insertNote(title, note, userId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function validateTitle(title) {
    return __awaiter(this, void 0, void 0, function () {
        var note;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findTitle(title)];
                case 1:
                    note = _a.sent();
                    console.log(title, note);
                    if (note) {
                        throw {
                            code: 409,
                            message: "A safe note with the same name already exists!"
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getNotes(noteId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!noteId) return [3 /*break*/, 2];
                    return [4 /*yield*/, validateNote(noteId, userId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, getNotesById(noteId, userId)];
                case 2: return [4 /*yield*/, getAllNotes(userId)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getNotesById(noteId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var note;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findNotesByIds(noteId, userId)];
                case 1:
                    note = _a.sent();
                    if (!note) {
                        throw {
                            code: 404,
                            message: "The user does not have any note registered whit this id!"
                        };
                    }
                    return [2 /*return*/, note];
            }
        });
    });
}
function deleteNote(noteId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateNote(noteId, userId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getNotesById(noteId, userId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, deleteNotesById(noteId)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, "deleted!"];
            }
        });
    });
}
function validateNote(noteId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var note, userNotes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findNotesById(noteId)];
                case 1:
                    note = _a.sent();
                    if (!note) {
                        throw {
                            code: 404,
                            message: "note does not exist"
                        };
                    }
                    return [4 /*yield*/, findNotesByIds(noteId, userId)];
                case 2:
                    userNotes = _a.sent();
                    if (!userNotes) {
                        throw {
                            code: 404,
                            message: "The note does not belong to this user"
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export { postNote, getNotes, deleteNote };
