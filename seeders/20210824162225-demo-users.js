'use strict'
const { v4: uuidv4 } = require('uuid')
const dotenv = require('dotenv').config()
const Level = require('../models').level
const bcrypt = require('bcrypt')

async function getLevel (name) {
    var level_id = await Level.findOne({ where: {name: name}, attributes: ["id"] })
    level_id = JSON.stringify(level_id)
    level_id = JSON.parse(level_id)
    return level_id.id
}

async function hasher(password) {
    const salt_rounds = parseInt(process.env.SALT_ROUNDS)
    const salt = bcrypt.genSaltSync(salt_rounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        console.log(await getLevel(process.env.LEVEL_ONE_NAME))
        await queryInterface.bulkInsert('users', [
            {
                id: uuidv4(),
                username: process.env.LEVEL_ONE_NAME,
                email: process.env.LEVEL_ONE_NAME+'@example.com',
                password: await hasher(process.env.DEMO_PASSWORD),
                salt_rounds: parseInt(process.env.SALT_ROUNDS),
                join_date: new Date(Date.now()),
                status: true,
                level_id: await getLevel(process.env.LEVEL_ONE_NAME),
                created_by: 'System',
                created_at: new Date(Date.now()),
            },
            {
                id: uuidv4(),
                username: process.env.LEVEL_TWO_NAME,
                email: process.env.LEVEL_TWO_NAME+'@example.com',
                password: await hasher(process.env.DEMO_PASSWORD),
                salt_rounds: parseInt(process.env.SALT_ROUNDS),
                join_date: new Date(Date.now()),
                status: true,
                level_id: await getLevel(process.env.LEVEL_TWO_NAME),
                created_by: 'System',
                created_at: new Date(Date.now()),
            },
            {
                id: uuidv4(),
                username: process.env.LEVEL_THREE_NAME,
                email: process.env.LEVEL_THREE_NAME+'@example.com',
                password: await hasher(process.env.DEMO_PASSWORD),
                salt_rounds: parseInt(process.env.SALT_ROUNDS),
                join_date: new Date(Date.now()),
                status: true,
                level_id: await getLevel(process.env.LEVEL_THREE_NAME),
                created_by: 'System',
                created_at: new Date(Date.now()),
            }
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
         await queryInterface.bulkDelete('users', null, {})
    }
}
