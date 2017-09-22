/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req,res){
		return res.view('post/index',{ layout: 'layout', title:'List Post' });
	},
	xem: function(req, res){
		id = req.params['id'];
		// return res.view('post/view',{ layout: 'layout', title:'Detail',id: id});
		Post.findOne({
		  id: id
		}).exec(function (err, result){
		  if (err) {
		    return res.serverError(err);
		  }
		  if (!result) {
		    return res.notFound('Could not find result, sorry.');
		  }

		  User.findOne({
		  	id: result.user_id
		  }).exec(function(err, user){
		  	if (err) {
			    return res.serverError(err);
			  }
		  	sails.log.debug(result);
		  	return res.view('post/view',{ layout: 'layout', title:'Detail', data: result, user: user});
		  });
		  // sails.log.debug(user);
		  // return res.view('post/view',{ layout: 'layout', title:'Detail', data: result});
		  // return res.json(result);
		});
	},
	them: function(req, res){
		if(req.method === 'POST'){
			req.file('image').upload({
		    	dirname: require('path').resolve(sails.config.appPath, 'assets/images')
		    },function (err, files) {
		    	if (err)
		        	return res.serverError(err);
		        sails.log.debug(req.params['title']);
		      	return res.json({
			        message: files.length + ' file(s) uploaded successfully!',
			        files: files
			    });								
		    });
		}
		return res.view('post/them');
	},
	uploadfile: function(req,res){
		return res.view('post/them');
	},
	upload: function  (req, res) {
		if(req.method === 'POST'){
			req.file('image').upload({
		    	dirname: require('path').resolve(sails.config.appPath, 'assets/images')
		    },function (err, files) {
		      if (err)
		        return res.serverError(err);
		    	Post.create({title: req.body.title, content: req.body.content, image: files[0].fd.split('\\').reverse()[0], user_id: req.body.user_id}).exec(function (err, post){
				  if (err) { return res.serverError(err); }
				  return res.redirect('/bai-viet/');
				  // return res.ok();
				});
		      // return res.json({
		      //   message: files.length + ' file(s) uploaded successfully!',
		      //   files: files
		      // });
		    });
		}	    
	  }
};

