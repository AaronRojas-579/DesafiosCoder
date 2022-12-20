const log4js = require("log4js")

log4js.configure({
    appenders:{
        miLoggerConsole: { type: "console" },
        miLoggerWarn: { type: 'file', filename: 'warn.log' },
        miLoggerError: { type: 'file', filename: 'error.log' }
    },
    categories:{
        consola: { appenders: ["miLoggerConsole"], level: "debug" },
        archivo: { appenders: ["miLoggerWarn"], level: "warn" },
        archivo2: { appenders: ["miLoggerError"], level: "info" },
        todos: { appenders: ["miLoggerError","miLoggerConsole","miLoggerError"], level: "error" }
    }
})

const loggerConsola = log4js.getLogger("consola");
const loggerWarn = log4js.getLogger("archivo");
const loggerError = log4js.getLogger("archivo2")

loggerConsola.trace(`Hola sot el trace, este se deberia mostrar los warning y ls error en consola`)
loggerConsola.info(`Hola soy el info`)
loggerWarn.warn(`Hola soy el warn`)
loggerError.error(`Hola soy el error`)

module.exports = {loggerConsola,loggerWarn,loggerError};