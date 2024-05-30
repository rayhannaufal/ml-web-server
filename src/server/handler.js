const predictClassification = require("../services/inferenceServices")
const crypto = require('crypto')
const storeData = require("../services/storeData")
const { Firestore } = require('@google-cloud/firestore')

async function postPredictHandler(request, h) {
    const { image } = request.payload
    const { model } = request.server.app
    console.log(image)
    // const { label, suggestion } = await predictClassification(model, image)
    const score = await predictClassification(model, image)
    
    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()

    const data = {
        "id": id,
        "accuration": score,
        // "result": label,
        // "suggestion": suggestion,
        "createdAt": createdAt
    }

    // await storeData(id, data)

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    })
    response.code(201)
    return response
}

async function getDataHandler(request, h) {
    const db = new Firestore()

    const predictionCollection = db.collection('predictions')
    const snapshot = await predictionCollection.get()
    const history = snapshot.docs.map(doc => {
        const data = doc.data()
        return{ 
            id: data.id,
            history: data
        }
    })

    const response = h.response({
        status: 'success',
        message: 'Load data successfully',
        data: history
    })
    response.code(200)
    return response
}

module.exports = { postPredictHandler, getDataHandler }