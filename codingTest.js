function solution(arr) {
  if (arr.length <= 2) {
    return 0;
  }

  let part = 0;
  for (let i = 0; i < arr.length; i++) {
    part += arr[i];
  }
  if (part % 3 !== 0) {
    return 0;
  } else {
    part = part / 3;
  }

  let count = 0;
  let first = 0;
  let second = 0;

  for (let i = 0; i < arr.length - 2; i++) {
    first += arr[i];
    if (first === part) {
      second = 0;
      for (let j = i + 1; j < arr.length - 1; j++) {
        second += arr[j];
        if (second === part) {
          count++;
        }
      }
    }
  }
  return count;
}

// console.log(solution([1, 2, 3, 0, 3]));

// 문자열 배열(예시: ["AAA", "AAA", "AAA", "AAA"])이 주어졌을때 M*N에서 최대 ㄷ자 모양 크기 구하기
// 마주보는 두 변은 길이 2이상, 다른 쪽 변은 3이상이어야 함.
// 문자 1개의 길이는 1이다.

function findWidestCShape(cells) {
  let maxWidth = 0;

  for (let startRow = 0; startRow < cells.length; startRow++) {
    for (let startCol = 0; startCol < cells[startRow].length; startCol++) {
      let char = cells[startRow][startCol];

      for (let height = 2; startRow + height <= cells.length; height++) {
        for (
          let width = 3;
          startCol + width <= cells[startRow].length;
          width++
        ) {
          if (isCShape(cells, startRow, startCol, width, height, char)) {
            let currentWidth = 2 * height + (width - 2);
            maxWidth = Math.max(maxWidth, currentWidth);
          }
        }
      }
    }
  }

  return maxWidth;
}

function isCShape(cells, startRow, startCol, width, height, char) {
  for (let col = startCol; col < startCol + width; col++) {
    if (
      cells[startRow][col] !== char ||
      cells[startRow + height - 1][col] !== char
    ) {
      return false;
    }
  }

  for (let row = startRow + 1; row < startRow + height - 1; row++) {
    if (cells[row][startCol] !== char) {
      return false;
    }
  }

  return true;
}

let cells = ["AAA", "AAA", "AAA", "AAA", "AAA"];
console.log(findWidestCShape(cells));
