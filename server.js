const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost/todoapp");

todoSchema = mongoose.Schema({
    task: String,
    isDone: Boolean
});

Todo = mongoose.model("Todo", todoSchema);


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    next();
  });

// Index
app.get("/", (req, res) => {
    //res.json(Todo);
    Todo.find({}, (err, todos) =>  {
        if(err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

// Create
app.post("/add", (req, res) => {
    var task = req.body.task;
    var taskNew = {task: task, isDone: false};
    Todo.create(taskNew, (err) => {
        if(err) {
            console.log(err);

        } else {
            res.json("Successfully added")
        }
    });
});

app.get("/destroy/:id", (req, res) => {
    var todoDel = req.params.id;
    Todo.findByIdAndRemove(todoDel, (err) => {
        if(err) {
            console.log(err)
        }
        res.json("Successfully removed");
    })
});

app.listen(3000, (err) => {
    console.log("TodoServer is running on port 3000!");
});