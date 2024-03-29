// 문자열 배열(예시: ["AAA", "AAA", "AAA", "AAA"])이 주어졌을때 M*N에서 최대 ㄷ자 모양 크기 구하기
// 마주보는 두 변은 길이 2이상, 다른 쪽 변은 3이상이어야 함.
// 문자 1개의 길이는 1이다.

function findWidestCShape(cells) {
  let maxWidth = 0;

  // 바깥 이중 for문: cells을 반복. C 모양 시작점(startRow, startCol)을 정의.

  for (let startRow = 0; startRow < cells.length; startRow++) {
    for (let startCol = 0; startCol < cells[startRow].length; startCol++) {
      let char = cells[startRow][startCol];

      // 안쪽 for 문: 높이와 너비를 정의. 높이 최소 3, 너비 최소 2(문제에서 글케 줌)
      for (let height = 3; startRow + height <= cells.length; height++) {
        for (
          let width = 2;
          startCol + width <= cells[startRow].length;
          width++
        ) {
          // C 모양이 맞는지 체크
          if (isCShape(cells, startRow, startCol, width, height, char)) {
            let currentWidth = 2 * height + (width - 2);
            // 너비를 계산하여 현재 maxWidth와 비교
            maxWidth = Math.max(maxWidth, currentWidth);
          }
        }
      }
    }
  }

  return maxWidth;
}

function isCShape(cells, startRow, startCol, width, height, char) {
  // 위쪽과 아래쪽 row 확인: char이랑 같은지 확인 없으면 false
  for (let col = startCol; col < startCol + width; col++) {
    if (
      cells[startRow][col] !== char || // 위쪽
      cells[startRow + height - 1][col] !== char // 아래쪽
    ) {
      return false;
    }
  }
  // 이어주는 변 확인
  for (let row = startRow + 1; row < startRow + height - 1; row++) {
    if (cells[row][startCol] !== char) {
      return false;
    }
  }

  return true;
}

let cells = ["AAA", "AAA", "AAA", "AAA", "AAA"];
console.log(findWidestCShape(cells));
