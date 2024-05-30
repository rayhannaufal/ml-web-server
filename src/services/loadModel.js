const tf = require('@tensorflow/tfjs-node')

async function loadModel() {
    // return tf.loadGraphModel('file://contoh-model/model.json') // model serta mulia
    return tf.loadLayersModel('file://model/model.json') // model kita
    // return tf.loadGraphModel(process.env.MODEL_URL)
}

module.exports = loadModel