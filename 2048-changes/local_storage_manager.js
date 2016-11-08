window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {
  this.bestScoreKey     = "bestScore";
  this.gameStateKey     = "gameState";

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";
  var storage = window.localStorage;

  try {
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Best score getters/setters
LocalStorageManager.prototype.getBestScore = function () {
  return this.storage.getItem(this.bestScoreKey) || 0;
};

LocalStorageManager.prototype.setBestScore = function (score) {
  this.storage.setItem(this.bestScoreKey, score);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  var stateJSON = this.storage.getItem(this.gameStateKey);
  return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};




/*
 * Modified by Gabriella Bova
 *
 * Makes a POST request to save game score before deleting data locally
 */
var request = new XMLHttpRequest();
LocalStorageManager.prototype.clearGameState = function (username) {

  var gameUser = "";
  // Load the entire gameState from localStorage:
  gameState = this.storage.getItem(this.gameStateKey);
  if (gameState == null) {    // Game was already cleared
    return;
  } else {
    gameUser = window.prompt("Game Over! Please submit a username", "");
  }
  var gameState = JSON.parse(gameState);
  var gameGrid = gameState["grid"];
  var gameScore = gameState["score"];

  // Make an HTTP POST request to the server:
  var url = "https://radiant-lake-20317.herokuapp.com/submit.json";
  var params = {
    username: gameUser,
    score: gameScore,
    grid: gameGrid
  }
  params = JSON.stringify(params);
  request.open("post", url, true);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(params);

  this.storage.removeItem(this.gameStateKey);
};