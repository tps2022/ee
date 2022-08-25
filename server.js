//initialize express
const express = require('express');
const app = express();
const port = 3000
const fs = require('fs') //require fs for hypatia view engine
app.engine('hypatia', (filePath, options, callback) => { // define the view engine called hypatia
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err) // if error occurs
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
    return callback(null, rendered)
  })
})
app.set('views', './views') //set view folder
app.set('view engine', 'hypatia') 


app.get('/greeting',(req,res) => {
    res.send('Hello, stranger')
})

app.get('/greeting/:name',(req,res) => {
    res.send("What's up, " + req.params.name)
})


app.get('/tip/:total/:percentage',(req,res) => {
    let tip = req.params.total*(req.params.percentage/100)
    res.render('tip',{
       title:'tip', message: 'The total is ' + req.params.total +', and tabulated tip is ' + tip
    })
})


const responses = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"]

app.get ('/magic/:question',(req,res) => {
    const response = responses[Math.floor(Math.random() * responses.length)]
       
     res.render('magic', { title: 'Magic', message: response})
 })
 


app.listen(3000, () => {
    console.log("I am listening on port")
