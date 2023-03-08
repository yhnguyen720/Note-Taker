const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3306;
const apiRouter = require('./routes/apiRoutes');
const htmlRouter = require('./routes/htmlRoutes');

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/api', apiRouter);
app.use('/', htmlRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});