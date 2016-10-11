const Promise = require('bluebird');
var prompt = require("prompt");
Promise.promisifyAll(prompt);

module.exports = function (config, beam) {
	
	return new Promise(function(resolve,reject) {
		var _code;
		if (config.password && config.token) {
			return reject('Auth config is invalid.');
		}

		if (config.token) {
			oAuth(config, beam)
			.then(function(){
				return resolve();
			})
			.catch(function(err){
				return reject(err);
			});
		}

		if (config.username && config.password) {
			if (config['2fa']) {
				prompt.start();
				prompt.getAsync(['Enter_2FA'])
				.then(function(result) {
					 _code = result.Enter_2FA;
				    config.code = _code;
				    password(config, beam)
				    .then(function(){
				    	return resolve();	
				    })
				    .catch(function(err){
				    	return reject(err);
				    });
				})
				.catch(function(err){
					return reject(err);
				})
			} else {
				password(config, beam)
				    .then(function(){
				    	return resolve();	
				    })
				    .catch(function(err){
				    	return reject(err);
				    });
			}
		}
	})
};

function oAuth(config, beam) {
	beam.use('oauth', {
		tokens: {
			access: config.token,
			expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
		}
	});
	return Promise.resolve();
}

function password(config, beam) {
	console.log('Logging into Beam using 2FA and password...');
	return beam.use('password', config).attempt();
}
