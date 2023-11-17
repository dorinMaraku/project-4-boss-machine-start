const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors())

// app.use(express.static(path.join(__dirname, 'public')))
// Add middware for parsing request bodies here:
app.use(bodyParser.json())


// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter)
// app.get('/', (req,res) => {
//   res.status(200).sendFile(path.join(__dirname, 'index.html'))
// })
// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => console.log(`listening to port ${PORT}`))
}
