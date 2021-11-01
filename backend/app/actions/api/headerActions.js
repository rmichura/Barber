const Header = require('../../db/models/header')
const mongoose = require('mongoose')

class ServiceActions {
    async saveHeader(req, res) {
        const header = new Header({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            body: req.body.body,
        });
         header.save().then(result => {
             console.log(result);
             res.status(201).json({
                 message: 'Created header successfully',
                 createdHeader: {
                     _id: result._id,
                     title: result.title,
                     body: result.body
                 }
             })
         }).catch(err => {
             console.log(err)
             res.status(500).json({
                 error: err
             })
         })
    }

    async getHeaderId(req, res) {
        const id = req.params.id;
        await Header.findById(id).select('_id title body').exec().then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    header: doc
                })
            } else {
                res.status(400).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    }

    async getHeaderAll(req, res) {
        await Header.find().select('_id title body').exec().then(docs => {
            const response = {
                count: docs.length,
                headers: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        body: doc.body
                    }
                })
            }
            res.status(200).json(response);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    }

    async gerHeaderQuery(req, res) {
        const query = req.query
        const header = await Header.find(query);

        res.status(200).json(header);
    }

    async deleteHeader(req, res) {
        const id = req.params.id;
        await Header.deleteOne({_id: id})

        res.sendStatus(204)
    }
}

module.exports = new ServiceActions()