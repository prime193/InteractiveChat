'use strict';
var config = require('./config');
var storage = require('./storage');
var Player = require('./player');
var MediaClient = require('./media');
var player = new Player(config);
var mediaClient = new MediaClient(config);

var handlers = {};
var intervals = [];

handlers.songPlayer = null;

var taskRunnerApi = (function(){
	return {
		init : init,
		addTask : addTask
	}

	function init(config) {
		storage.createQueue('TaskQueue');
		storage.createQueue('SongQueue');
		intervals.push(setInterval(run,500));
		try {
			if (config.songPlayer) {
					console.log(`${config.songPlayer} registered...`);
					handlers.songPlayer = 'test';
					//
					//handlers.songPlayer = require(config.songPlayer);
			}
		}
		catch(err) {
			console.log(err);
			throw new Error('Cannot process taskrunner configuration.');
		}		
	}

	function noSongPlayerError() {
		return (!handlers.songPlayer ? 'No Song player defined for application' : null);
	}

	function addTask(task,callback) {
		var err = null;
		var result = `${task.command} queued.`;
		var searchResult;

		try {
			switch (task.command) {
				case 'song' :
					err = noSongPlayerError();
					if (!err) {	
						searchResult = mediaClient.search(task.args);
						if (searchResult && Array.isArray(searchResult) && searchResult.length > 0) {

							storage.enQueue('SongQueue',{artist:searchResult[0].artist,
								title : searchResult[0].title,
								url : searchResult[0].url});	
						}
					}					
					break;
				case 'play' :
					err = noSongPlayerError();
					if (!err) {
						storage.enQueue('TaskQueue',task);	
					}
					break;
				case 'list' :
					var songs;
					result = `Songs in queue:\n`;
					songs = storage.getQueue('SongQueue');
					songs.forEach(item => {
						result += `${item.title} by ${item.artist}\n`;
					})
					break;
				default :
					storage.enQueue('TaskQueue',task);	
					break;
			}
		}
		catch(error) {
			err = error;
		}
		callback(err,result);
	}

	function run() {
		var song;
		var task = storage.deQueue('TaskQueue');

		if (task) {
			switch (task.command) {
				case 'play' :
					song = storage.deQueue('SongQueue');
					if (song) {
						console.log(`Added to playlist: ${song.title}`);
						player.play(song);	//player has its own queue
					}
					break;
				case 'pause' :
					player.pause();	
					break;
				case 'rewind' :
					player.rewind();
					break;
				case 'next' :
					player.next();
					break;
				case 'info' :
					// empty for now
					break;
				default :
					break;
			}
		}
	}

})();

module.exports = taskRunnerApi;
