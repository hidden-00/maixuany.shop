const auth = {};

auth.authentication = async(req, res, next)=>{
    try{

    }catch(err){
        next(err);
    }
}

auth.authorization = async(req, res, next)=>{
    try{

    }catch(err){
        next(err);
    }
}

module.exports = auth;