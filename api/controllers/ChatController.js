/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
		var data = req.params.all();
		if(req.isSocket && req.method === 'POST'){
			Chat.query('INSER into `chat`')

		}
	}
};

