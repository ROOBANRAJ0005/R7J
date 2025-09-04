const mongoose = require('mongoose');

const getDatabase = ()=>{
    mongoose.connect(process.env.LOCAL_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=>{
        console.log(`Mongodb connected: ${con.connection.host}`);
    })
}

module.exports = getDatabase;