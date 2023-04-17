const User = require('../models/User');

exports.userSignup = async (req,res,next) => {
    try{
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;

        const newUser = {
            name,
            password,
            username
        }

        await User.create(newUser);
        res.status(201).json({
            status : 'Success',
            data : {
                newUser
            }
        })
    }
    catch(err){
        res.status(500).json({
            status : 'Fail',
            message : 'Error Signup'
        })
    }
}