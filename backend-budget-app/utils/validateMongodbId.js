const { default: mongoose } = require('mongoose')
const mogoose = require('mongoose')
const validateMongoDBId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error('This id is Not Valid or Not Found')
}

module.exports = validateMongoDBId;