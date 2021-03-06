"use strict";
exports.__esModule = true;
exports.users = exports.User = void 0;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined && another.email === this.email && another.password === this.password;
    };
    return User;
}());
exports.User = User;
// para como chave e valor
exports.users = {
    "juliana@email.com": new User('juliana@email.com', 'Juliana', 'juliana23'),
    "amanda@email.com": new User('amanda@email.com', 'Amanda', 'amanda21')
};
