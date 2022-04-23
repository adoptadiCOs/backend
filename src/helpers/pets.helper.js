const Pet = require('../models/pets')

const insertAll = async(pets) => {
    try {
        await Pet.insertMany(pets)
        return {
            err: null
        }
    } catch (err) {
        console.log(err)

        return{
            err: err
        }
        
    }
}

const findPets = async(starts, rows) => {
    try {
        const date = new Date(new Date().setHours(0,0,0,0)).getTime()
        const res = await Pet.find({date: date},{},{skip: starts, limit: rows})

        return {
            data: res,
            err: null
        }
    } catch (err) {
        console.log(err)
        return {
            err: err
        }
    }
}

const findSpecies = async() => {
    try {
        const res = await Pet.aggregate( [ { $group : { _id : "$species" } } ] )

        return {
            data: res,
            err: null
        }
    } catch (err) {
        console.log(err)
        return {
            err: err
        }
    }
}

const findBreeds = async() => {
    try {
        const res = await Pet.aggregate( [ { $group : { _id : "$breed" } } ] )
        return {
            data: res,
            err: null
        }
    } catch (err) {
        console.log(err)
        return {
            err: err
        }
    }
}

module.exports = { insertAll, findPets, findSpecies, findBreeds }