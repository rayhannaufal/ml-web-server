require('dotenv').config()

const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const loadModel = require('../services/loadModel')
const InputError = require('../exceptions/InputError')

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })

    const model = await loadModel()
    server.app.model = model

    server.route(routes)

    server.ext('onPreResponse', function (request, h) {
        const response = request.response;
        console.log(response)
 
        if (response instanceof InputError) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
                // message: `${response.message} Silakan gunakan foto lain.`
            })
            newResponse.code(response.statusCode)
            return newResponse;
        }
 
        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: 'Payload content length greater than maximum allowed: 1000000'
                // message: response.message
            })
            newResponse.code(response.output.statusCode)
            return newResponse;
        }
 
        return h.continue;
    });

    await server.start()
    console.log(`Server running at ${server.info.uri}`)
}

init()