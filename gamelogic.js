function KeyboardController(keys, repeat) {
  var timers = {};

  document.onkeydown = function (event) {
    var key = (event || window.event).keyCode;
    if (!(key in keys))
      return true;
    if (!(key in timers)) {
      timers[key] = null;
      keys[key]();
      if (repeat !== 0)
        timers[key] = setInterval(keys[key], repeat);
    }
    return false;
  };

  document.onkeyup = function (event) {
    var key = (event || window.event).keyCode;
    if (key in timers) {
      if (timers[key] !== null)
        clearInterval(timers[key]);
      delete timers[key];
    }
  };

  window.onblur = function () {
    for (key in timers)
      if (timers[key] !== null)
        clearInterval(timers[key]);
    timers = {};
  };
};

var checkCollisions, drawHighscore, drawScreen, enemies, enemySpawnRate, gameLoop, hasCollided, initialize, makeEntity, moveEnemies, moveEntity, movePlayer, player, playerHitWall, run, score, setRandomEnemyStart, spawnEnemy, update, winHeight, winWidth;

makeEntity = function (x, y, speed, player) {
  var entity;
  return entity = {
    x: x,
    y: y,
    speed: speed
  };
};

winHeight = window.innerHeight;

winWidth = window.innerWidth;

score = 0;

enemySpawnRate = 50;

player = makeEntity(winWidth * 0.5, winHeight * 0.5, 5);

enemies = [];

run = false;

spawnEnemy = function (enemies) {
  var newEnemy;
  newEnemy = makeEntity(0, 0, score);
  return enemies[enemies.length] = setRandomEnemyStart(newEnemy);
};

setRandomEnemyStart = function (enemy) {
  var side;
  side = Math.floor(Math.random() * 4);
  switch (side) {
    case 0:
      enemy.x = -100;
      enemy.y = Math.random() * winHeight;
      break;
    case 1:
      enemy.x = Math.random() * winWidth;
      enemy.y = -100;
      break;
    case 2:
      enemy.x = 100 + winWidth;
      enemy.y = Math.random() * winHeight;
      break;
    case 3:
      enemy.x = Math.random() * winWidth;
      enemy.y = 100 + winHeight;
  }
  return enemy;
};

movePlayer = function (keyCode) {
  switch (keyCode) {
    case 37:
      return moveEntity(player, -player.speed, 0);
    case 38:
      return moveEntity(player, 0, -player.speed);
    case 39:
      return moveEntity(player, player.speed, 0);
    case 40:
      return moveEntity(player, 0, player.speed);
  }
};

moveEnemies = function (enemies) {
  var enemy, i, len, results;
  results = [];
  for (i = 0, len = enemies.length; i < len; i++) {
    enemy = enemies[i];
    results.push(moveEntity(enemy, (player.x - enemy.x) * 0.07, (player.y - enemy.y) * 0.07));
  }
  return results;
};

moveEntity = function (entity, diffX, diffY) {
  entity.x += diffX;
  return entity.y += diffY;
};

initialize = function (enemies) {
  spawnEnemy(enemies, winWidth, winHeight);
  return run = true;
};

drawScreen = function () {
  var enemy, i, len;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0, len = enemies.length; i < len; i++) {
    enemy = enemies[i];
    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, 5, 0, 2 * Math.PI, false);
    ctx.fill();
  }
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(player.x, player.y, 5, 0, 2 * Math.PI, false);
  ctx.fill();
};

drawHighscore = function () {
  document.getElementById('score').innerHTML = score;
  document.getElementById('scoreBoard').hidden = false;
};

update = function (enemies) {
  return KeyboardController({
    37: (function () {
      return movePlayer(37);
    }),
    38: (function () {
      return movePlayer(38);
    }),
    39: (function () {
      return movePlayer(39);
    }),
    40: (function () {
      return movePlayer(40);
    })
  }, 24);
};

hasCollided = function (enemy, player) {
  var diffX, diffY, hasNotCollidedX, hasNotCollidedY;
  diffX = player.x - enemy.x;
  diffY = player.y - enemy.y;
  hasNotCollidedX = diffX * diffX <= 110;
  hasNotCollidedY = diffY * diffY <= 110;
  return hasNotCollidedX && hasNotCollidedY;
};

playerHitWall = function (player) {
  return player.x <= 0 || player.y <= 0 || player.x >= winWidth || player.y >= winHeight;
};

checkCollisions = function (enemies, player) {
  var enemy, i, len, otherEnemy, results;
  if (playerHitWall(player)) {
    run = false;
  }
  results = [];
  for (i = 0, len = enemies.length; i < len; i++) {
    enemy = enemies[i];
    if (hasCollided(player, enemy)) {
      run = false;
    }
    results.push((function () {
      var j, len1, results1;
      results1 = [];
      for (j = 0, len1 = enemies.length; j < len1; j++) {
        otherEnemy = enemies[j];
        if ((hasCollided(enemy, otherEnemy)) && (enemy.speed !== otherEnemy.speed)) {
          enemy = setRandomEnemyStart(enemy);
          results1.push(otherEnemy = setRandomEnemyStart(otherEnemy));
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    })());
  }
  return results;
};

gameLoop = function (board) {
  if (score >= 300) {
    enemySpawnRate = 200;
  }
  if ((score % enemySpawnRate) === 0) {
    spawnEnemy(enemies, winWidth, winHeight);
  }
  checkCollisions(enemies, player);
  moveEnemies(enemies);
  drawScreen();
  ctx.fillStyle = 'white';
  ctx.font = '16pt sans-serif';
  ctx.fillText(score += 1, 50, 50);
  if (run) {
    return setTimeout((function () {
      return gameLoop();
    }), 24);
  } else {
    return drawHighscore();
  }
};

(function () {
  var canvas = document.getElementById('canvas');
  canvas.width = winWidth;
  canvas.height = winHeight;
  ctx = canvas.getContext('2d');
  initialize(enemies, run);
  update(enemies);
  return gameLoop();
})();