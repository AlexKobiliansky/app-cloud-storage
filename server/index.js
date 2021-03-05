const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload');
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const app = express();
const PORT = config.get('serverPort');
const corsMiddleware = require('./middleware/corse.middleware');
const cors = require('cors')

app.use(fileUpload({}));
app.use(cors());
app.use(express.json({extended: true}));
app.use(express.static('static'))
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);


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