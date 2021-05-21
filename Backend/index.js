const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 
const path = require('path');
const cors = require('cors')
const {v4:uuid} = require('uuid')
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/*fs.writeFile(path.join(__dirname, './db','tasks.json'), '[{"name": "example", "description": "This is an example"}]', err=>{
    if(err)throw err;

})*/

app.get('/api/queries', (req,res)=>{
    fs.readFile(path.join(__dirname, './db', 'tasks.json'),'utf8',(err,data)=>{
        if (err) { 
            console.log(err)
            throw err
        };
        console.log(data)
        res.json(JSON.parse(data))
    })
})


app.post('/api/queries', (req, res) => {
    const newTask = {
        name: req.body.name,
        description: req.body.description
    }
    //var nam = newTask.name.replace(' ', '_')
    const d = []
    fs.writeFile(path.join(__dirname, './db/tasks',`${newTask.name}.json`),JSON.stringify(d) ,err=>{
        if(err) throw err;
    })
    console.log(newTask)
    fs.readFile(path.join(__dirname, './db','tasks.json'),'utf8', (err, data) => {
        if(err) throw err;
       console.log('data', data)
        var tasks = JSON.parse(data)
        console.log(tasks)
        tasks.push(newTask)
        console.log('task',tasks)
        
        fs.writeFile(path.join(__dirname, './db','tasks.json'),JSON.stringify(tasks),err => {
            if(err)throw err
            console.log(tasks)
            res.json(tasks)
        })
    })
   
})

app.delete('/api/queries', (req,res)=>{
    const oldTask = {
        name: req.body.name,
        description: req.body.description
    }
    fs.unlink(path.join(__dirname,'./db/tasks', `${oldTask.name}.json`),err=>{
           if(err) throw err;
    })
    console.log('DELEYE', oldTask)
    fs.readFile(path.join(__dirname, './db','tasks.json'),'utf8', (err, data) =>{
        if(err) throw err;
        console.log('data', data)
         var tasks = JSON.parse(data)
         tasks = tasks.filter(task=>{
             if(task.name!=oldTask.name){
                 return task
             }
         })
         console.log(tasks)
           
        fs.writeFile(path.join(__dirname, './db','tasks.json'),JSON.stringify(tasks),err => {
            if(err)throw err
            console.log(tasks)
            res.json(tasks)
        })
    })
})


app.get('/api/queries/:task', (req,res)=>{
    console.log(req.params.task)
    const task = req.params.task
    fs.readFile(path.join(__dirname, './db/tasks', `${task}.json`),'utf8',(err,data)=>{
        if (err) { 
            console.log(err)
            throw err
        }
        res.json(JSON.parse(data))
    })

})


app.post('/api/queries/:task', (req, res) => {
    console.log(req.params.task)
    const task = req.params.task
    const details = {
        title: req.body.title,
        description: req.body.description,
        comments: req.body.comments,
        overdue: req.body.date
    }

    console.log('details ',details)

    fs.readFile(path.join(__dirname, './db/tasks', `${task}.json`),'utf8', (err, data)=>{
        var tasks = JSON.parse(data)
        console.log(tasks)
        tasks.push(details)
        fs.writeFile(path.join(__dirname, './db/tasks',`${task}.json`),JSON.stringify(tasks),err=>{
            if(err) throw err;
            res.json(tasks)
        })
    })
})

app.delete('/api/queries/:task', (req, res) => {
    console.log(req.params.task)
    const task = req.params.task
    const details = {
        title: req.body.title,
        description: req.body.description,
        comments: req.body.comments,
        overdue: req.body.date
    }
    console.log('details ',details)

    fs.readFile(path.join(__dirname, './db/tasks', `${task}.json`),'utf8', (err, data)=>{
        if(err) throw err;
        var tasks = JSON.parse(data)
        console.log(tasks)
        tasks = tasks.filter(Task=>{
            if(Task.title!=details.title){
                console.log(Task)
                return Task
            }
        })
        console.log(tasks)
        fs.writeFile(path.join(__dirname, './db/tasks',`${task}.json`),JSON.stringify(tasks),err=>{
            if(err) throw err;
            res.json(tasks)
        })
    })
    
})

app.put('/api/queries/:task', (req,res)=>{
    console.log(req.params.task)
    const task = req.params.task
    const  pstask =req.body
    const {comments} = pstask
    console.log(pstask)
   
    fs.readFile(path.join(__dirname, './db/tasks', `${task}.json`),'utf8', (err, data)=>{
        if(err) throw err;
        var tasks = JSON.parse(data)
        console.log(tasks)
        tasks = tasks.filter(Ttask => {
            console.log('tasks',Ttask.title)
            if(Ttask.title==pstask.title){
                console.log('Send')
                Ttask.comments = comments
                console.log('ddd',Ttask)
                return Ttask
            }
            else
            { return Ttask }
        })
        console.log(tasks)
        fs.writeFile(path.join(__dirname, './db/tasks',`${task}.json`),JSON.stringify(tasks),err=>{
            if(err) throw err;
            res.json(tasks)
        })
    }) 
       

})


app.listen(PORT, ()=>{
    console.log('Server Listening...')
})