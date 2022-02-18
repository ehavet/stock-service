import {param, body, validationResult} from 'express-validator'
import {StockNotFoundError} from '../../domain/stocks.errors.js'

export default function (router, container) {
    router.use(async function (
        req,
        res,
        next
    ) {
        console.log('Time: %d', Date.now())
        next()
    })

    router.get('/v0/stocks',
        async function (
            req,
            res,
        ) {
            try {
                res.status(200).send(await container.GetStocks())
            } catch (error) {
                res.status(500).send({error: 'erreur 500'})
            }
        })

    router.put('/v0/stocks/:id',
        param('id').trim().notEmpty().withMessage('stock\'s id must be provided'),
        body('units').trim().notEmpty().withMessage('units property must be provided'),
        body('units').isNumeric().withMessage('units property value must be an integer'),
        async function (req, res) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const messages = errors.array().map(element => element.msg)
                return res.boom.badRequest(messages)
            }

            try {
                await container.UpdateStock(req.params.id, parseInt(req.body.units))
                res.status(201).send()
            } catch (error) {
                res.boom.internal(error)
            }
        })

    return router
}

