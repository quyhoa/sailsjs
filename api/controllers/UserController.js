/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
module.exports = {
	hi: function(req,res){
		// return res.view({title:'index'},'user/index');
		return res.view('user/index',{ layout: 'layout', title:'test' });
	},

	bye: function(req, res){
		return res.send('Good bye, see you again!');
	},
	xem: function(req, res){
		return res.send(req.params['id']);
	},
	test: function(req, res){
		data = [
			{
				id: '1',
				username:'test'
			},
			{
				id: '2',
				username:'test2'
			},
		];

		return res.json(200, {
			message: "message test",
			data:data
		});
	},
	login: function (req, res) {
	    res.view();
	  },

	  dashboard: function (req, res) {
	    res.view();
	  },

	  logout: function (req, res){
	    req.session.user = null;
	    req.session.flash = 'You have logged out';
	    res.redirect('user/login');
	  },

	  'facebook': function (req, res, next) {
	     passport.authenticate('facebook', { scope: ['email', 'user_about_me']},
	        function (err, user) {
	        	sails.log.debug(user);
	            req.logIn(user, function (err) {
	            if(err) {
	                req.session.flash = 'There was an error';
	                res.redirect('user/login');
	            } else {
	                req.session.user = user;
	                res.redirect('/user/dashboard');
	            }
	        });
	    })(req, res, next);
	  },

	  'facebook/callback': function (req, res, next) {
	     passport.authenticate('facebook',
	        function (req, res) {
	            res.redirect('/user/dashboard');
	        })(req, res, next);
	  }
};

