"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandler_1 = __importDefault(require("../../RequestHandler"));
var Hash256_1 = __importDefault(require("../../../../processing/crypto/functionality/Hash256"));
var RandomGenerator_1 = __importDefault(require("../../../../processing/randomization/RandomGenerator"));
var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Register.prototype.handle = function (req, res) {
        var _this = this;
        var _a = req.body, FirstName = _a.FirstName, LastName = _a.LastName, phoneNumber = _a.phoneNumber, password = _a.password;
        var qs = "insert into Users(USER_ID,FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER,PASSWORD) values(?,?,?,?,?,?)";
        var passwordhash = Hash256_1.default.getInstance().execute(password);
        this.UniqueID().then(function (userID) { return _this.pool.query(qs, [userID, FirstName, LastName, "", phoneNumber, passwordhash])
            .then(function (result) {
            return setTimeout(function () {
                res.json({ user: {
                        FIRST_NAME: FirstName,
                        LAST_NAME: LastName,
                        ADDRESS: "",
                        CONTACT_NUMBER: phoneNumber
                    } }), 10000;
            });
        })
            .catch(function (err) { return setTimeout(function () { return res.status(400).json({ error: err }); }, 10000); }); });
    };
    Register.prototype.getUserID = function () {
        return Hash256_1.default.getInstance().execute(RandomGenerator_1.default.getInstance().getNumber());
    };
    Register.prototype.UniqueID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, unique, user_id, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "select count(*) as id FROM Users where USER_ID=?";
                        unique = true;
                        user_id = "";
                        _a.label = 1;
                    case 1:
                        if (!unique) return [3 /*break*/, 3];
                        user_id = this.getUserID();
                        return [4 /*yield*/, this.pool.query(query, [user_id]).then(function (id) { return id[0]["id"]; })];
                    case 2:
                        id = _a.sent();
                        if (id < 1)
                            unique = false;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, user_id];
                }
            });
        });
    };
    return Register;
}(RequestHandler_1.default));
exports.default = Register;