const userSch = require('./userSchema')
const otherHelper = require('../../helper/others.helper')
const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const userController = {}

userController.postUser = async (req, res, next) => {
    try {
        let user = req.body;
        // if user._id --> update User
        if (user && user._id) {
            const update = await userSch.findByIdAndUpdate(user._id, { $set: user }, { new: true });
            return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'user updated successfully', null);
        }
        //else --> Add User
        else {
            user.email = user.email.toLowerCase();
            const newUser = new userSch(user);
            const userSave = await newUser.save();
            return otherHelper.sendResponse(res, httpStatus.OK, true, userSave, null, 'user added successfully', null);
        }
    } catch (err) {
        next(err)
    }
}

userController.changePassword = async (req, res, next) => {
    try {
        let errors = {};
        const { oldPassword, newPassword } = req.body;
        if (oldPassword == newPassword) {
            errors.oldPassword = 'Old and New password cannot be same';
            return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, null, null);
        }
        const user = await userSch.findById(req.user._id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (isMatch) {
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(newPassword, salt);
            const dbRes = await userSch.findByIdAndUpdate(req.user._id, { $set: { password: hash } }, { $new: true });
            return otherHelper.sendResponse(res, httpStatus.OK, true, dbRes, null, 'Password Change Success', null);
        } else {
            errors.oldPassword = 'Old Password incorrect';
            return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, null, null);
        }
    } catch (err) {
        next(err)
    }
}

module.exports = userController