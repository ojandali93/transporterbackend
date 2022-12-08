const app = require('./www/bin/app.js');
require('dotenv').config();

const PORT = process.env.NODE_DOCKER_PORT || 4000
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});