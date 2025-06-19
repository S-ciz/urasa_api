const express = require('express')
const multer = require('multer')
const cloudinary = require('./cloudinary')
const EditorRouter = express.Router();


const EditorModel = require('./EditorModal');

EditorRouter.get('/editor', (req, res) => {
  

  EditorModel.find().lean()
    .then(editors =>{
       res.json(editors)
      })
    .catch(err => res.status(400).json('Error: ' + err));
});



EditorRouter.get('/editor/:id', (req, res) => {
  const id = req.params.id;
  EditorModel.findOne({ _id: id })
    .then(editors => res.json(editors))
    .catch(err => res.status(400).json('Error: ' + err));
});

EditorRouter.delete('/editor/:id', async(req, res) => {
  const id = req.params.id;
 
 try{
  let blog = await EditorModel.findById(id);
  const public_id = blog.public_id 
  // Delete from cloudinary
  await cloudinary.uploader.destroy(public_id)

   //  Delete the post from MongoDB
   await EditorModel.findByIdAndDelete(id);
   res.json({ message: "Post deleted successfully" })

 }catch(error)
 {
  res.status(500).json({ error: error.message });
 }

})

EditorRouter.patch('/editor/:id', (req, res) => {
  const id = req.params.id;

  const { title, content } = req.body;
  EditorModal.updateOne({ _id: id }, {
    $set:
    {
      title:title,
      content: content,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    }
  })

})


const storage = multer.diskStorage({}); 
const upload = multer({ storage: storage });

EditorRouter.post('/editor', upload.single('image'), async (req, res) => {

  try {

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const { title, content } = req.body;
    const newBlog = new EditorModel({
      title: title,
      content: content,
      image: result.secure_url,
      public_id: result.public_id
    });

    await newBlog.save();
    res.json({ message: "Successfully uploaded blog" })

  } catch (err) {
    console.log("Error uploading new blog".red.underline + err)
    res.status(500).json({ error: "Eror uploading blog post" })
  }
});



module.exports = EditorRouter;