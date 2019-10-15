const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.json());
app.use('/', express.static('public'));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'holger',
    password: 'password',
    database: 'miniblog'
});



app.get('/blogposts', (req, res) => {
    const query = `select * from blogpost order by id desc`;

    connection.query(query,
        (err, rows) => {
            if (err) {
                console.log('Error: ' + err);
                return;
            }

            return res.send(rows);
        });
})




app.post('/blogposts', (req, res) => {
    if (!(req.body.title || req.body.content)) {
        return res.send({
            error: 'Title and content required'
        });
    }

    const query = `insert into blogpost (
                created, title, content
                )
            values (
                now(),?,?
                )`;

    connection.query(
        query, [req.body.title, req.body.content],
        (err, result) => {
            if (err) {
                // falls ein Fehler definiert wurde, dann schauen wir mal
                // was schiefgelaufen ist evtl. falsche mysql syntax
                console.log('Error: ' + err);
                return;
            }
            return res.send({
                error: 0,
                result: result.id
            });
        });

});





app.listen(3000);