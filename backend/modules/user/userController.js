const userSch = require('./userSchema')
const otherHelper = require('../../helper/others.helper')
const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const userController = {}

userController.postUser = async(req, res, next)=>{
    try{
        let user = req.body;
        // if user._id --> update User
        if(user && user._id){
            const update = await userSch.findByIdAndUpdate(user._id, {$set: user}, {new: true});
            return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'user updated successfully', null);
        }
        //else --> Add User
        else{
            user.email = user.email.toLowerCase();
            const newUser = new userSch(user);
            const userSave = await newUser.save();
            return otherHelper.sendResponse(res, httpStatus.OK, true, userSave, null, 'user added successfully', null);
        }
    }catch(err){
        next(err)
    }
}

userController.postUserPwd = async(req, res, next)=>{
    try{
        let _id = req.body._id;
        let salt = await bcrypt.genSalt(10);
        let hashPwd = await bcrypt.hash(req.body.password, salt);
        
    }catch(err){
        next(err)
    }
}

module.exports = userController