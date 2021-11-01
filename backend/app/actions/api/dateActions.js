const Date = require('../../db/models/date')
const mongoose = require('mongoose')
const User = require('../../db/models/user')

class DateActions {
    async saveDate(req, res) {
        User.findById(req.body.id)
            .then(userFind => {
                if (!userFind) {
                    return res.status(404).json({
                        message: 'User not found'
                    })
                }
                const date = new Date({
                    _id: mongoose.Types.ObjectId(),
                    date: req.body.date,
                    hour: req.body.hour,
                    user: req.body.id,
                    service: req.body.service,
                    employee: req.body.employee
                })
                return date.save()
            })
            .then(result => {
                console.log(result)
                res.status(201).json({
                    message: 'Date added',
                    createdDate: {
                        _id: result._id,
                        user: result.user,
                        date: result.date,
                        hour: result.hour,
                        service: result.service,
                        employee: result.employee
                    }
                })
            })
            .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    }

    async getDateAll(req, res) {
        Date.find().select('user date hour service employee _id').exec().then(docs => {
            res.status(200).json({
                count: docs.length,
                dates: docs.map(doc => {
                    return {
                        _id: doc._id,
                        user: doc.user,
                        date: doc.date,
                        hour: doc.hour,
                        service: doc.service,
                        employee: doc.employee,
                    }
                }),
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }

    async getDateId(req, res) {
        Date.findById(req.params.id).exec().then(date => {
            if (!date) {
                return res.status(404).json({
                    message: 'Date not found'
                })
            }
            res.status(200).json({
                date: date,
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });
    }

    async getDateQuery(req, res) {
        const query = req.query
        const date = await Date.find(query);

        res.status(200).json(date);
    }

    async deleteDate(req, res) {
        const id = req.params.id;
        await Date.deleteOne({_id: id})

        res.sendStatus(204);
    }
}

module.exports = new DateActions();