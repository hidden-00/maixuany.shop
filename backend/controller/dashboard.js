const dashboardController = {};

dashboardController.getIndexPage = (req, res, next)=>{
	try{
		res.render("template/error-maintenance");
	}catch(err){
		next(err);
	}
}

module.exports = dashboardController;
