const {postPredictHandler, getDataHandler} = require("./handler")

const routes = [
    {
        path: '/api',
        method: 'GET',
        handler: () => {
            return "API ready"
        }
    },
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    },
    {
        path: '/predict/histories',
        method: 'GET',
        handler: getDataHandler
    }
]

module.exports = routes