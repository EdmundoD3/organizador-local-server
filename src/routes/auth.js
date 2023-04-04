const router = require('express').Router();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

// constraseña
const bcrypt = require('bcrypt');

// validation
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})



//login

router.post('/login', async (req, res) => {

    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const {email} = req.body

    const {getByEmail:userGetByEmail,post:userPost} = require('../models/User.js')
    const user = await userGetByEmail({ email:email });
    if (!user[0]) return res.status(400).json({ error: 'Usuario no encontrado' });
    const validPassword = await bcrypt.compare(req.body.password, user[0].password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

    // create token
    const token = jwt.sign({
        name: user.name,
        email:user.email,
        id: user.id
    }, process.env.TOKEN_SECRET)
    
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
})

//register

router.post('/register', async (req, res) => {
    // validate user
    const { error } = schemaRegister.validate(req.body)
    
    const {name, email} =req.body

    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }

    const { isValid } = require('../modules/validateString');
    if (isValid(name)) return res.status(400).json({error: `Caracteres no válidos en name`})

    const {getByEmail:userGetByEmail,post:userPost} = require('../models/User.js')

    const userDataFromEmail = await userGetByEmail({email});
    const isEmailExist = !userDataFromEmail[0];
    if (!isEmailExist) {
        return res.status(400).json({error: 'Email ya registrado'})
    }

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    
    const user = {
        name: name,
        email: email,
        password: password
    };
    try {
        const savedUser = await userPost(user);
        const {id,name,email}=savedUser[0]
        res.status(200).json({
            error: null,
            data: {id,name,email}
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

// router.get('/users', async (req, res) => {
//     const {limit,offset} = req.body
//     if (typeof(limit) !== 'number') return  res.json({error:'limit is not a number'})
//     if (typeof(offset) !== 'number') return  res.json({error:'offset is not a number'})
//     //SQLite code
//     const {user:table} = require('../sql/tables')
//     const sqliteCode = `SELECT * FROM user ORDER BY id LIMIT ${limit} OFFSET ${offset}`
//     const {get:databaseGet} = require("../db/database")
//     const data = await databaseGet({table:table,sqliteCode:sqliteCode})
//     res.json({data})
//   })

module.exports = router;