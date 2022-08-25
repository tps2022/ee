const express = require('express');//initialize express
const app = express();
const port = 3000
const fs = require('fs') // fs required
app.engine('hypatia', (filePath, options, callback) => { // hypatia view engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace()
      .replace('#a#',`<a href= ${options.link}> ${options.content} </a>` )
    return callback(null, rendered)
  })
})
app.set('views', './views') // views folder
app.set('view engine', 'hypatia') 

app.get('/',(req,res) => {
    res.render('template',{
        title:'pass it around', message:'99 Bottles of beer on the wall', content:'take one down, pass it around', link:`/98`})
})

app.get('/:num',(req, res) => {
  res.render('template', {title:`pass it around`, message:` ${req.params.num}Bottles of beer on the wall`, link:`/${req.params.num - 1}`, a:``, content:`Take a beer and pass it around`})
})
app.listen(3000, () => {
    console.log("I am listening on port")
})