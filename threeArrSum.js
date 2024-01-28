// 배열 3등분, 합이 같은 가짓수

function threeSum(arr) {
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
  
    for (let i = 0; i < arr.length - 2; i++) { // 최소한 3개의 부분 배열이 있어야 하므로 arr.length - 2
      first += arr[i]; 
      if (first === part) {
        second = 0; // second 초기화
        for (let j = i + 1; j < arr.length - 1; j++) { // 최소한 2개의 부분 배열이 있어야 하므로 arr.length - 1
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