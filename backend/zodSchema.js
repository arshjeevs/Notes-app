const zod = require('zod')

const accountSchema = zod.object({
    fullName: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})

const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

module.exports = {
    accountSchema,
    loginSchema
}