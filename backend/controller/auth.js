const authController = {};

authController.getPageRegister = (req, res, next)=>{
    try{
        res.render("public/register");
    }catch(err){
        next(err);
    }
}

module.exports = authController;