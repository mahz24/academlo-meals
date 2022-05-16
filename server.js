//Exportations
const { db } = require('./utils/database');
const { app } = require('./app');

//Dotenv configuration
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//Authentication database
db.authenticate()
  .then(console.log('Databas already'))
  .catch(err => console.log(err));

//Sync database
db.sync()
  .then(console.log('Databas synced'))
  .catch(err => console.log(err));

//Server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Express server listening on port: ${PORT}`)
);
