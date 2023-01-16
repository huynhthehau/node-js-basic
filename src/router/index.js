const webRouter = require('./web')
const apiRouter = require('./api')

function router(app) {
    app.use('/web', webRouter)
    app.use('/api/v1', apiRouter)
}
module.exports = router;