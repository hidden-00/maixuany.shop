const authController = {};

authController.getPageRegister = (req, res, next)=>{
    try{
        res.render("public/register");
    }catch(err){
        next(err);
    }
}

authController.getPageLogin = (req, res, next)=>{
    try{
        res.render("public/login");
    }catch(err){
        next(err);
    }
}

authController.getPageForgotPassword = (req, res, next)=>{
    try{
        res.render("public/forgot-password");
    }catch(err){
        next(err);
    }
}

module.exports = authController;