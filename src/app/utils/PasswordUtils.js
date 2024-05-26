const bcrypt = require('bcrypt')

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return { hashedPassword, salt}
}

exports.comparePassword = async (password, hashedPassword, salt) => {
    const databasePassword = await bcrypt.hash(password, salt)
    return databasePassword === hashedPassword
}