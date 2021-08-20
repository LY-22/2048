/* 游戏数据 */
var board = new Array();
//分数
var score = 0;

//当 DOM（文档对象模型） 已经加载，并且页面（包括图像）已经完全呈现时，会发生 ready 事件。
/* 语法1
$(document).ready(function () {
})
*/
/* 语法2
$().ready(function)
*/
/*语法3
$(function)
*/
$().ready(function () {
    new_game();
});
function new_game() {
    //初始化棋盘格
    init();
    //生成随机数字
    generateOneNumber();
    generateOneNumber();
}
/* 初始化 */
function init() {
    //初始化棋盘格。设置棋盘格的位置
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }
    //初始化board，变成一个二维数组
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    //更新显示数据
    updateBoardView();
    score = 0;
    updateScore(score);
}
/* 动态生成number-cell元素，用来放数据 */
function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell' + '-' + i + '-' + j + '"></div>');
            //方便操作数据
            var theNumberCell = $('#number-cell-' + i + '-' + j);
            /* 判断board[][]里面的值，决定是否显示，以及显示的样式 */
            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            } else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                //背景颜色
                theNumberCell.css('background', getNumberBackgroundColor(board[i][j]));
                //字体颜色
                theNumberCell.css('color', getNumberColor(board[i][j]));
                //显示数字
                theNumberCell.text(board[i][j]);
            }
            if (board[i][j] > 512) {
                theNumberCell.css('font-size', '30px');
            }
        }
    }
}
/* 生成一个随机数 */
function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    //随机生成一个位置
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randX][randY] == 0) {
            break;
        }
        randX = parseInt(Math.floor(Math.random() * 4));
        randY = parseInt(Math.floor(Math.random() * 4));
    }
    //随机生成一个数
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置上显示随机数字
    board[randX][randY] = randNumber;
    //动画效果
    showNumberWithAnimation(randX, randY, randNumber);
    return true;
}
/* 判断按键方向 */
$(document).keydown(function (event) {
    /* console.log(event.keyCode); */
    switch (event.keyCode) {
        case 37:
            //是否可以向左移动
            if (moveLeft()) {
                //随机生成一个数
                setTimeout('generateOneNumber()', 200);
                //判断游戏是否结束
                setTimeout('isGameOver()', 300);
            }
            break;
        case 38:
            if (moveUp()) {
                //随机生成一个数
                setTimeout('generateOneNumber()', 200);
                //判断游戏是否结束
                setTimeout('isGameOver()', 300);
            }
            break;
        case 39:
            if (moveRight()) {
                //随机生成一个数
                setTimeout('generateOneNumber()', 200);
                //判断游戏是否结束
                setTimeout('isGameOver()', 300);
            }
            break;
        case 40:
            if (moveDown()) {
                //随机生成一个数
                setTimeout('generateOneNumber()', 220);
                //判断游戏是否结束
                setTimeout('isGameOver()', 300);
            }
            break;
        default:
            break;
    }
});
//判断是否结束
function isGameOver() {
    if (nospace(board) && noMove(board)) {
        return gameOver();
    }
}
function gameOver() {
    alert('游戏结束');
}
//左移动
function moveLeft() {
    //先判断能不能移动
    if (!canMoveLeft(board)) {
        return false;
    }
    //可以移动 判断：1、左边格子是否为空，或者跟自身相等
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            //每一个不为空的位置
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //发生移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        //跳出这次循环
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //发生移动
                        showMoveAnimation(i, j, i, k);
                        //数值相加
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //数值
                        score += board[i][k];
                        updateScore(score);
                        //跳出这次循环
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

//上移动
function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(i, j, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(i, j, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //数值
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
//右移动
function moveRight() {
    //先判断能不能移动
    if (!canMoveRight(board)) {
        return false;
    }
    //可以移动 判断：1、右边格子是否为空，或者跟自身相等
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            //每一个不为空的位置
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //发生移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        //跳出这次循环
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        //发生移动
                        showMoveAnimation(i, j, i, k);
                        //数值相加
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //数值
                        score += board[i][k];
                        updateScore(score);
                        //跳出这次循环
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
//下移动
function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(i, j, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(i, j, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //数值
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}