//TODO: this is for testing

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