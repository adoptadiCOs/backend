const { findStatistics } = require("../helpers/statistics.helper")

const GetStatistics = async(req,res) => {
    
    const {data,err} = await findStatistics()

    if(err !== null){
        return res.status(400).json({error: err})
    }

    return res.status(200).json({data:data})
} 

module.exports = { GetStatistics }