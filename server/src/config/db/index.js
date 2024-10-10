const mongoose = require('mongoose');


async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/quiz_battle_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully!!')
    } catch (error){
        console.log('Connect failure!!')

    }
}

module.exports = { connect };