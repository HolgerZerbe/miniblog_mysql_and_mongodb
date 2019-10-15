const express = require('express');
const app = express();
const mysql = require('mysql');
const mongoose = require('mongoose');
const Post = require('./Post');


app.use(express.json());
app.use('/', express.static('public'));

require('dotenv').config();

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'holger',
    password: 'password',
    database: 'miniblog'
});




app.get('/blogposts', async (req, res) => {
    let resultmysql = [];
    console.log(1)
    const query = `select * from blogpost order by id desc`;

    connection.query(query,
        async (err, rows) => {
            if (err) {
                console.log('Error: ' + err);
                return;
            }
            resultmysql = rows;

            const posts = await Post.find()


            let result = {
                mysql: resultmysql,
                mongodb: posts

            }
            console.log(2)
            return res.json(result)
        });

})




app.post('/blogposts', async (req, res) => {
    if (!(req.body.title || req.body.content)) {
        return res.send({
            error: 'Title and content required'
        });
    }
    const data = {
        titel : req.body.title,
        content : req.body.content
    }

    const query = `insert into blogpost (
                created, title, content
                )
            values (
                now(),?,?
                )`;

    connection.query(
        query, [req.body.title, req.body.content],
        async (err, result) => {
            if (err) {

                console.log('Error: ' + err);
                return;
            }

            const createdPosts = await Post.insertMany(data);

            console.log(result, createdPosts)
            return res.send({
                error: 0,
                mysql: result.insertId,
                mongodb: createdPosts
            });
        });

});





app.listen(3000);