const User = require('../../db/models/user')
const mongoose = require('mongoose')

class UserActions {
    async saveUser(req, res) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            lastName: req.body.lastName,
            number: req.body.number,
            email: req.body.email,
        });
       await user.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created user successfully',
                createdUser: {
                    _id: result._id,
                    name: result.name,
                    lastName: result.lastName,
                    email: result.email,
                    number: result.number,
                }
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    }

    async getUserId(req, res) {
        const id = req.params.id;
        await User.findById(id).select('name number _id email lastName').exec().then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    user: doc,
                })
            } else {
                res.status(400).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    }

    async getUserAll(req, res) {
        await User.find().select('name number _id email lastName').exec().then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        lastName: doc.lastName,
                        email: doc.email,
                        number: doc.number,
                    }
                })
            }
            res.status(200).json(response);
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    }

    async getUserQuery(req, res) {
        const query = req.query
        const user = await User.find(query);

        res.status(200).json(user);
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        await User.deleteOne({_id: id})

        res.sendStatus(204);
    }
}

module.exports = new UserActions();