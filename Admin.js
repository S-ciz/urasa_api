const express = require('express');
const AdminRouter = express.Router();


function encipher(text, shifts = 10)
{
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let new_text = "";
    for(let i = 0; i < text.length; i++)
        {

            let char = text[i];
            let indexOf_char = letters.indexOf(char);
            indexOf_char += shifts;
            indexOf_char = indexOf_char%letters.length;
            new_text += letters[indexOf_char]
        }

    return new_text;
    
}

AdminRouter.post('/admin', (req, res)=>{
   

    try{
     const {email, password} = req.body;

     if(email === process.env.URASA_EMAIL && encipher(password)=== process.env.URASA_PASSWORD ) 
     {
              res.json({"success": true})
     }else 
     {
        res.json({"success": false})
     }
    }catch(err){
      
        res.status(500).json({"error": err})
    }

})




module.exports = AdminRouter;