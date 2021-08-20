//棋盘格的位置
function getPosTop(i, j) {
    return 40 + 120 * i;
}
function getPosLeft(i, j) {
    return 40 + 120 * j;
}
//背景颜色
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edef72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33be5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 5192:
            return "#93e";
            break;
    }
    return "black";
}
//字体颜色
function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "#ffffff";
}
//判断是否还有空位置，可以放数字
function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}
//是否可以左移
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//判断水平是否有障碍
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}
//判断垂直是否有障碍
function noBlockVertical(row1, col, row2, board) {
    for (var i = row2 + 1; i < row1; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}
//能否上移动
function canMoveUp(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//能否右移动
function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//能否下移动
function canMoveDown(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//不能移动
function noMove(board) {
    if (canMoveDown(board) || canMoveUp(board) || canMoveLeft(board) || canMoveRight(board)) {
        return false;
    }
    return true;
}
//分数
function updateScore(score) {
    $('#score').text(score);
}