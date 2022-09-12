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
import Cryptr from "cryptr";
import { findTitle, insertCredentials, findCredentialsByUserId, deleteCredentialById, findCredentialsById, findCredentialsByIds, } from "../repositories/credentialRepositorie.js";
var cryptr = new Cryptr("myTotallySecretKey");
function postCredentials(title, url, username, password, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateTitle(title)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, passwordCrypt(password)];
                case 2:
                    passwordHash = _a.sent();
                    return [4 /*yield*/, insertCredentials(title, url, username, passwordHash, userId)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function validateTitle(title) {
    return __awaiter(this, void 0, void 0, function () {
        var credentials;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findTitle(title)];
                case 1:
                    credentials = _a.sent();
                    if (credentials) {
                        throw {
                            code: 409,
                            message: "A credential with the same name already exists!"
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
function getCredentials(credentialId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!credentialId) return [3 /*break*/, 2];
                    return [4 /*yield*/, validateCredential(credentialId, userId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, getCredentialsById(credentialId, userId)];
                case 2: return [4 /*yield*/, getAllCredentials(userId)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getAllCredentials(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var credentials, decryptCredentials;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findCredentialsByUserId(userId)];
                case 1:
                    credentials = _a.sent();
                    decryptCredentials = __spreadArray([], credentials, true);
                    decryptCredentials.map(function (e) {
                        e.password = cryptr.decrypt(e.password);
                    });
                    return [2 /*return*/, decryptCredentials];
            }
        });
    });
}
function getCredentialsById(credentialId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var credential, decryptCredentials;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findCredentialsByIds(credentialId, userId)];
                case 1:
                    credential = _a.sent();
                    decryptCredentials = __assign(__assign({}, credential), { password: cryptr.decrypt(credential.password) });
                    if (!credential) {
                        throw {
                            code: 404,
                            message: "The user does not have any credentials registered whit this id!"
                        };
                    }
                    return [2 /*return*/, decryptCredentials];
            }
        });
    });
}
function deleteCredential(credentialId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateCredential(credentialId, userId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getCredentialsById(credentialId, userId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, deleteCredentialById(credentialId)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, "deleted!"];
            }
        });
    });
}
function validateCredential(credentialId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var credential, userCredentials;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findCredentialsById(credentialId)];
                case 1:
                    credential = _a.sent();
                    if (!credential) {
                        throw {
                            code: 404,
                            message: "credential does not exist"
                        };
                    }
                    return [4 /*yield*/, findCredentialsByIds(credentialId, userId)];
                case 2:
                    userCredentials = _a.sent();
                    if (!userCredentials) {
                        throw {
                            code: 404,
                            message: "The credential does not belong to this user"
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export { postCredentials, getCredentials, deleteCredential };
