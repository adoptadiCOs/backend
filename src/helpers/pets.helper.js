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

const findPets = async(specie, breed, starts, rows) => {
    try {
        const date = new Date(new Date().setHours(0,0,0,0)).getTime()

        const query = {}
        query["date"] = date

        if (specie !== undefined) {
            query["specie"] = specie
        }

        if (breed !== undefined) {
            query["breed"] = breed
        }

        const res = await Pet.find(query,{},{skip: starts, limit: rows})

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
        const res = await Pet.aggregate( [ { $group : { _id : "$specie" } } ] )

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