//TODO: this is for testing
// have to change jobs/pets.jobs module exports!! uncomment the line

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const syncro = require('./jobs/pets.job')


dotenv.config()

mongoose.connect(process.env.DB,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB connected')
    syncro.fetchPets()
})