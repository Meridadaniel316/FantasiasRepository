const Rol = require("../models/Rol")

module.exports = {
    xif2: (options) => {
        const operator = options.hash.expression
        switch (operator) {

            case "===":
                return (options.hash.expected === options.hash.val && options.hash.expected2 === options.hash.val2) ? options.fn(this) : options.inverse(this);

            case "=||=":
                return (options.hash.expected === options.hash.val || options.hash.expected2 === options.hash.val2) ? options.fn(this) : options.inverse(this);

            default:
                return eval("" + options.hash.val + operator + options.hash.expected) ? options.fn(this) : options.inverse(this);
        }
    },
    xif: (options) => {
        const operator = options.hash.expression
        switch (operator) {
            case "==":
                return (options.hash.val == options.hash.expected) ? options.fn(this) : options.inverse(this);

            case "!=":
                return (options.hash.val != options.hash.expected) ? options.fn(this) : options.inverse(this);

            case "===":
                return (options.hash.expected === options.hash.val) ? options.fn(this) : options.inverse(this);

            case "!==":
                return (options.hash.val !== options.hash.expected) ? options.fn(this) : options.inverse(this);

            case "&&":
                return (options.hash.val && options.hash.expected) ? options.fn(this) : options.inverse(this);

            case "||":
                return (options.hash.val || options.hash.expected) ? options.fn(this) : options.inverse(this);

            case "<":
                return (options.hash.val < options.hash.expected) ? options.fn(this) : options.inverse(this);

            case "<=":
                return (options.hash.val <= options.hash.expected) ? options.fn(this) : options.inverse(this);

            case ">":
                return (options.hash.val > options.hash.expected) ? options.fn(this) : options.inverse(this);

            case ">=":
                return (options.hash.val >= options.hash.expected) ? options.fn(this) : options.inverse(this);

            default:
                return eval("" + options.hash.val + operator + options.hash.expected) ? options.fn(this) : options.inverse(this);
        }
    },
}