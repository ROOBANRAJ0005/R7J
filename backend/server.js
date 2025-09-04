
const app = require('./app');
const getDatabase  = require('./config/database');


getDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`Server listening to the port: ${process.env.PORT} and ${process.env.NODE_ENV}`)
})

process.on('unhandleRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('server is shutting down in unhandleRejection error');
    server.close(()=>{
        process.exit(1);
    })
})
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('server is shutting down in uncaughtExpection error');
    server.close(()=>{
        process.exit(1);
    })
})

