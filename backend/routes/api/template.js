const express = require("express");
const router = express.Router();

router.get("/", (req, res, next)=>{
	try{
	res.render("template/index");
	}catch(err){
	next(err);
	}
})

module.exports = router;
