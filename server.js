import express from 'express'

import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()


// Get Cars (READ)
app.get('/api/bug',(req,res)=>{
    bugService.query()
    .then(bugs =>{
        res.send(bugs)
    })
    .catch(err => {
        loggerService.error('Cannot get bugs', err)
        res.status(400).send('Cannot get bugs')
    })
})

// Save Car (CREATE/UPDATE)
app.get('/api/bug/save', (req, res) => {
    console.log('req.query:', req.query)
    const bug = {
        _id: req.query._id,
        title: req.query.title,
        severity: +req.query.severity,
    }

    bugService.save(bug)
        .then(bug => {
            res.send(bug)
        })
        .catch((err) => {
            loggerService.error('Cannot save bug', err)
            res.status(400).send('Cannot save bug')
        })
})

// Get Car (READ)
app.get('/api/bug/:bugId', (req, res) => {
    const bugId = req.params.bugId
    bugService.getById(bugId)
        .then(bug => {
            res.send(bug)
        })
        .catch((err) => {
            loggerService.error('Cannot get bug', err)
            res.status(400).send('Cannot get bug')
        })
})

// Remove Car (Delete)
app.get('/api/bug/:bugId/remove', (req, res) => {
    const bugId = req.params.bugId

    bugService.remove(bugId)
        .then(() => {
            console.log(`Car ${bugId} removed!`);
            res.redirect('/api/bug')
        })
        .catch((err) => {
            loggerService.error('Cannot remove bug', err)
            res.status(400).send('Cannot remove bug')
        })

})


app.get('/', (req, res) => res.send('Hello there'))
app.listen(3030, () => console.log('Server ready at port 3030'))