// Generic Media Client Wrapper library
'use strict';
var _mediaClientConstructor;
var _mediaLoginFn;
var _mediaLogoutFn;
var _mediaSearchFn;

var _mediaClient, _mediaClientInfo;

function MediaClient(config) {
	if (config) {
		console.log('Media constructor called.');
			//init
		}
	if (_mediaClientConstructor) {
			_mediaClient = new _mediaClientConstructor(function(err,result) {
				if (err) throw new Error('Unable to create media client');
				_mediaClientInfo = result;
			})
	}
}


MediaClient.prototype.login = function(username,password) {
 		try {
			if (_mediaClient && _mediaLoginFn && username && password) {
			 	_mediaClient._mediaLoginFn(username,password);
			}
 		}
 		catch (err) {
 			throw new Error('Unable to login to media client.');
 		}
 	}

MediaClient.prototype.logout = function() {
 		if (_mediaClient && _mediaLogoutFn) {
 			_mediaClient._mediaLogoutFn();
 		}
 	}

MediaClient.prototype.search= function(args) {

		var test = args.split(' ');
		return [{artist : test[0], title : test[1], url: null}];

 		if (_mediaClient && _mediaSearchFn) {
 			_mediaClient._mediaSearchFn(args,function(err,result){
 				if (err) throw new Error('Error in media search');
 				return result;
 			});
 		}
	}

module.exports = MediaClient;
