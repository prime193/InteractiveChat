'use strict';
var config = require('./config');
var taskRunner = require('./taskRunner');


taskRunner.init(config);
const defaultCooldown = 5000;

var messageBody, user, line;
var commands = 'song|play|stop|next|list|EOL';
var adminCommands = 'play|stop|next|EOL';
var cooldownCommands = 'song|EOL';
var blockList = {};
var cooldownList = {};

user = 'someUser';
messageBody = '!song taylor style';
parse(messageBody,commands,adminCommands,cooldownCommands,user,console.log);
messageBody = '!list';
parse(messageBody,commands,adminCommands,cooldownCommands,user,console.log);

user = 'trango812';
messageBody = '!play';
parse(messageBody,commands,adminCommands,cooldownCommands,user,console.log);

user = 'someUser';
messageBody = '!song taylor shake it';
parse(messageBody,commands,adminCommands,cooldownCommands,user,console.log);

setTimeout(tryagain,5000);

function tryagain() {
	parse(messageBody,commands,adminCommands,cooldownCommands,user,console.log);	
}

function parse(messageBody,commands,adminCommands,cooldownCommands,user,out) {
	if (messageBody.startsWith('!')) {
		line = messageBody.split(' ');
		line[0]=line[0].slice(1);
		if (commands.indexOf(line[0] + '|') !== -1) {

			if (adminCommands.indexOf(line[0] + '|') !== -1) {
				if (user !== config.adminUser) {
					out(`[Bot]: @${user} Moderator only command`);
					return;
				}
			}

			if (cooldownCommands.indexOf(line[0] + '|') !== -1) {
				if (user !== config.adminUser) {
					if (cooldownList.hasOwnProperty(user)) {
						//check to see if it has expired
						if (Date.now() - cooldownList[user] < defaultCooldown) {
							out(`[Bot]: @${user} cooldown in effect`);
							return;
						} else cooldownList[user] = Date.now();
					} else {
						cooldownList[user] = Date.now();
					}
				}
			}

			var task  = {user : user, command : line.shift(), args: line.join(' ')};
			taskRunner.addTask(task, function(err,result) {
				if (err) out(`[Bot]: @${user} ${err}`);
				if (!err) out(`[Bot]: @${user} ${result}`);
				return;
			});
		}
	}
}
