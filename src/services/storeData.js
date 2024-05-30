const  { Firestore } = require('@google-cloud/firestore')

async function storeData(id, data) {
    const db = new Firestore()

    const predictCollection = db.collection('predictions')
    return predictCollection.doc(id).set(data)
    
    // const userCollection = db.collection('users')
    // return userCollection.doc('user_id').collection('user_data_preditions').set(data)
}

module.exports = storeData