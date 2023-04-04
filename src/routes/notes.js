const router = require('express').Router();

router.get('/note/:id', async (req, res) => {
  const id = req.params.id
  if (!id) return  res.status(400).json({error:'id is not found'})
  const {getById:noteGetById} = require('../models/Notes')
  const note = await noteGetById({id})
  if (!note[0]) return res.status(400).json({ error: 'note not found' });
  return res.status(200).json({data:note})
})

router.get('/note', async (req, res) => {
  const {title} = req.body
  if (!title) return  res.status(400).json({error:'title is missing'})
  const {getByTitle:notesGetByTitle} = require('../models/Notes')
  const note = await notesGetByTitle({title})
  return res.status(200).json({data:note})
})

router.get('/notes', async (req, res) => {
  const {limit,offset} = req.body
  if (typeof(limit) !== 'number') return  res.json({error:'limit is not a number'})
  if (typeof(offset) !== 'number') return  res.json({error:'offset is not a number'})
  const {get:notesGet} = require('../models/Notes')
  try {
    const note = await notesGet({limit,offset})
  return res.status(200).json({data:note})
  } catch (error) {
  return res.status(400).json({error:error})
  }
  
})

router.post('/note', async (req, res) => {
  const {title, content} = req.body
  if (!title || !content) return res.status(400).json({error: `Title or content is not found`})
  const {post:notePost} = require('../models/Notes')

  try {
    const note = await notePost({title,content})
    return res.status(200).json({data:note})
  } catch (error) {
    return res.status(400).json({error:error})
  }
  
})

router.put('/note', async (req, res) => {
  const {id, title, content} = req.body
  if (!id) return res.status(400).json({error:'id is not found'})
  if (!title && !content) return res.status(400).json({error: `Title and content is not found`})
  const {put:notePut} = require('../models/Notes')
  try {
    const note = await notePut({id, title, content})
    if (!note[0]) return res.status(404).json({error:'note not found'})
    return res.status(200).json({data:note})
  } catch (error) {
    return res.status(400).json({error:error})
  }
})

router.delete('/note', async (req, res) => {
  const {id} = req.body
  if (!id) return  res.status(400).json({error:'id is not found'})
  if (typeof(id) !== 'number') return  res.status(400).json({error:'id is not a number'})
  const {deleteById:deleteNoteByID} = require('../models/Notes')
  try {
    const note = await deleteNoteByID({id})
    return res.status(200).json({data:note})
  } catch (error) {
    return res.status(400).json({error:error})
  }
})
module.exports = router;