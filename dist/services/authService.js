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
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findEmail, insertNewUser, insertSession, } from "../repositories/authRepositorie.js";
var sign = jwt.sign;
var secretKey = "skljaksdj9983498327453lsldkjf";
function registerNewUser(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordCrypt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateEmailForRegistration(email)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getPasswordCrypt(password)];
                case 2:
                    passwordCrypt = _a.sent();
                    return [4 /*yield*/, insertNewUser(email, passwordCrypt)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, "ok!"];
            }
        });
    });
}
function validateEmailForRegistration(email) {
    return __awaiter(this, void 0, void 0, function () {
        var bdEmail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findEmail(email)];
                case 1:
                    bdEmail = _a.sent();
                    if (bdEmail) {
                        throw {
                            code: 409,
                            message: "This email is already registered in our database!"
                        };
                    }
                    return [2 /*return*/, "email ok!"];
            }
        });
    });
}
function getPasswordCrypt(password) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordCrypt;
        return __generator(this, function (_a) {
            passwordCrypt = bcrypt.hashSync(password, 10);
            return [2 /*return*/, passwordCrypt];
        });
    });
}
function userLogin(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateEmailForLogin(email)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, validatePassword(user.password, password)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, getToken(email, password)];
                case 3:
                    token = _a.sent();
                    return [4 /*yield*/, insertSession(user.id, token)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, "Ok!"];
            }
        });
    });
}
function validateEmailForLogin(email) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findEmail(email)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw {
                            code: 404,
                            message: "This email is not registered in our database!"
                        };
                    }
                    return [2 /*return*/, user];
            }
        });
    });
}
function validatePassword(passwordCrypt, password) {
    return __awaiter(this, void 0, void 0, function () {
        var comparePassword;
        return __generator(this, function (_a) {
            comparePassword = bcrypt.compareSync(password, passwordCrypt);
            if (!comparePassword) {
                throw { code: 401, message: "password incorrect" };
            }
            return [2 /*return*/, "password ok!"];
        });
    });
}
function getToken(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            token = sign({
                email: email,
                password: password
            }, secretKey, {
                expiresIn: "1y",
                subject: "1"
            });
            return [2 /*return*/, token];
        });
    });
}
export { registerNewUser, userLogin };
