require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3001

require('./config/db')

const Tenant = require('./models/tenant')
const {tenantDb , centralDb} = require('./middlewars/dbSwitch')
const {auth , centralAuth} = require('./middlewars/auth')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/multitenant', async (req, res) => {
    const pass = process.env.MONGODB_PASS || 'test'
    const db = process.env.DB_NAME || 'testPass'
  res.json({
      pass,
      db
  })
})
app.post('/api/create/tenant/:slug', centralAuth, async (req, res) => {
    const tenant = new Tenant({
        _id: new mongoose.Types.ObjectId(),
        tenantSlug: req.params.slug
    })
    tenant
        .save()
        .then((result) => {
            res.status(200).json({
                message: "Tenant Created",
                tenant,
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
})
app.post('/api/create/tenant/:slug/book/', auth, async (req, res, next) => {
    const BookInfo = require('./tenantModels/book')
    const book = new BookInfo({
        _id: new mongoose.Types.ObjectId(),
        bookName: req.body.name,
        bookPrice: req.body.price
    })
    book
    .save()
    .then((result) => {
        res.status(200).json({
            message: "book Created",
            result,
        });
    })
    .catch((err) => {
        next(err)
    });
})
app.get('/api/tenant/:slug/book',auth, async (req, res,next) => {
    const BookInfo = require('./tenantModels/book')
    quryMethod = BookInfo.find();
    quryMethod
        .select()
        .exec()
        .then((info) => {
            res.status(200).json(info);
        })
        .catch((err) => {
            console.log(err);
            next(err)
        });
})

// 404 handler
app.use((req, res, next) => {
    const err = new Error('Not Found!');
    err.status = 404;
    next(err);
  });
  
// Global Error handler 
  app.use((err, req, res, next) => {
    const status = err.status ? 400 : err.status || 500;
    const message =
      process.env.NODE_ENV === 'production' && err.status === 500
        ? 'Something Went Wrong!'
        : err.message;
  
    if (status === 500) console.log(err.stack);
  
    res.status(status).json({
      status: status >= 500 ? 'error' : 'fail',
      message,
    });
  });

app.listen(port, () => {
  console.log(`Multi tenant app listening at http://localhost:${port}`)
})