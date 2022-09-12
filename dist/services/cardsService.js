var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { insertCard, findCardsByUserId, findCardsById, findCardsByIds, deleteCardById, findTitle, } from "../repositories/cardsRepositorie.js";
import Cryptr from "cryptr";
var cryptr = new Cryptr("myTotallySecretKey");
function postCards(title, number, name, cvc, expiration, password, isVirtual, type, id) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordHash, cvcHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateTitle(title)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, passwordCrypt(password)];
                case 2:
                    passwordHash = _a.sent();
                    return [4 /*yield*/, cvcCrypt(cvc)];
                case 3:
                    cvcHash = _a.sent();
                    return [4 /*yield*/, insertCard(title, number, name, cvcHash, expiration, passwordHash, isVirtual, type, id)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function validateTitle(title) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findTitle(title)];
                case 1:
                    card = _a.sent();
                    if (card) {
                        throw {
                            code: 409,
                            message: "A card with the same name already exists!"
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function passwordCrypt(password) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordHash;
        return __generator(this, function (_a) {
            passwordHash = cryptr.encrypt(password);
            return [2 /*return*/, passwordHash];
        });
    });
}
function cvcCrypt(cvc) {
    return __awaiter(this, void 0, void 0, function () {
        var cvcHash;
        return __generator(this, function (_a) {
            cvcHash = cryptr.encrypt(cvc);
            return [2 /*return*/, cvcHash];
        });
    });
}
function getCards(cardId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!cardId) return [3 /*break*/, 2];
                    return [4 /*yield*/, validateCard(cardId, userId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, getCardsById(cardId, userId)];
                case 2: return [4 /*yield*/, getAllCards(userId)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getAllCards(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var cards, decryptCards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findCardsByUserId(userId)];
                case 1:
                    cards = _a.sent();
                    decryptCards = __spreadArray([], cards, true);
                    decryptCards.map(function (e) {
                        e.password = cryptr.decrypt(e.password);
                        e.cvc = cryptr.decrypt(e.cvc);
                    });
                    return [2 /*return*/, decryptCards];
            }
        });
    });
}
function getCardsById(cardId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var card, decryptCards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findCardsByIds(cardId, userId)];
                case 1:
                    card = _a.sent();
                    decryptCards = __assign(__assign({}, card), { password: cryptr.decrypt(card.password), cvc: cryptr.decrypt(card.cvc) });
                    if (!card) {
                        throw {
                            code: 404,
                            message: "The user does not have any cards registered whit this id!"
                        };
                    }
                    return [2 /*return*/, decryptCards];
            }
        });
    });
}
function deleteCard(cardId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateCard(cardId, userId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getCardsById(cardId, userId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, deleteCardById(cardId)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, "deleted!"];
            }
        });
    });
}
function validateCard(cardId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var card, userCards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findCardsById(cardId)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw {
                            code: 404,
                            message: "card does not exist"
                        };
                    }
                    return [4 /*yield*/, findCardsByIds(cardId, userId)];
                case 2:
                    userCards = _a.sent();
                    if (!userCards) {
                        throw {
                            code: 404,
                            message: "The card does not belong to this user"
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export { postCards, getCards, deleteCard };
