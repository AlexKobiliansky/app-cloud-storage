const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes');
const app = express();
const PORT = config.get('serverPort');
const corsMiddleware = require('./middleware/corse.middleware');

app.use(corsMiddleware)
app.use(express.json({extended: true}));
app.use('/api/auth', authRouter);


const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    app.listen(PORT, ()=>{
      console.log('server started on port ', PORT)})
  } catch (e) {
    console.log(e.message)
  }
}

start();