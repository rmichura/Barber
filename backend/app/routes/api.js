const express = require('express')
const router = express.Router()

const userActions = require('../actions/api/userActions')
const dateActions = require('../actions/api/dateActions')
const headerActions = require('../actions/api/headerActions')
const mail = require('../actions/api/mail')

// pobieranie uzytkownika po id
router.get('/users/:id', userActions.getUserId)

// pobieranie wszystkich uzytkownikow
router.get('/users', userActions.getUserAll)

// pobieranie za pomoca zapytan
router.get('/user', userActions.getUserQuery)

// zapisywanie uzytkownika
router.post('/users', userActions.saveUser)

// usuwanie uzytkownika po id
router.delete('/users/:id', userActions.deleteUser)


// pobieranie daty po id
router.get('/dates/:id', dateActions.getDateId)

// pobieranie za pomoca zapytan
router.get('/date', dateActions.getDateQuery)

// pobieranie wszystkie daty
router.get('/dates', dateActions.getDateAll)

// zapisywanie daty
router.post('/dates', dateActions.saveDate)

// usuwanie daty po id
router.delete('/dates/:id', dateActions.deleteDate)


// pobieranie naglowka po id
router.get('/headers/:id', headerActions.getHeaderId)

// pobieranie za pomoca zapytan
router.get('/header', headerActions.gerHeaderQuery)

// pobieranie wszystkich naglowkow
router.get('/headers', headerActions.getHeaderAll)

// zapisywanie naglowka
router.post('/headers', headerActions.saveHeader)

// usuwanie naglowka po id
router.delete('/headers/:id', headerActions.deleteHeader)

// wysylanie maila
router.post('/mail', mail.reservationMail)



module.exports = router