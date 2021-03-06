const cookieParser = require('cookie-parser');

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/../public`));
app.use(cookieParser());

app.use('/api/v1/auth', require('./controllers/auth.js'));
app.use('/comments', require('./controllers/comment.js'));
app.use('/posts', require('./controllers/post.js'));
app.use('/listings', require('./controllers/listing.js'));
app.use('/likes', require('./controllers/like.js'));
app.use('/wishlist', require('./controllers/wishlist.js'));
app.use('/categories', require('./controllers/category.js'));
app.use('/purchases', require('./controllers/purchases.js'));
app.use('/user', require('./controllers/user.js'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
