// Generic Media Player Wrapper Library
'use strict';
var _playerConstructor;
var _playerStateFn;
var _playerPlayFn;
var _playerPauseFn;
var _playerRewindFn;
var _playerNextFn;
var _playerCurrentFn;
var _player, _playerInfo;


function Player(config) {	
		if (config) {
			console.log('Player constructor called.');
			//init with config
		}

		if (_playerConstructor) {
			_player = new _playerConstructor(function(err,result){
				if (err) throw new Error(err);
				_playerInfo = result;
				console.log(`Player status: ${playerState()}`);
			});
		}
}

Player.prototype.playerState = function() {
		if (_playerStateFn) {
			return _player._playerStateFn();
		} else return 'No status available.';
	}

Player.prototype.play = function(args) {
		console.log('Playing: ',args.title + ' by ' + args.artist);
		if (_playerPlayFn) {
			_player._playerPlayFn(args);
		}
	}

Player.prototype.pause = function() {
		if (_playerPauseFn) {
			_player._playerPauseFn();
		}
	}

Player.prototype.rewind = function() {
		if (_playerRewindFn) {
			_player._playerRewindFn();
		}
	}

Player.prototype.next = function() {
		if (_playerNextFn) {
			_player._playerNextFn();
		}
	}

Player.prototype.currentInfo = function() {
		if (_playerCurrentFn) {
			return _player._playerCurrentFn();
		}
	}

module.exports = Player;
