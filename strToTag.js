// HTML DOM object traversing: DFS

/*
parseTag가 DFS 방식을 적용한 것
<가 발견되면 새 태그가 시작됨(=트리에서 새 브랜치가 발견)
새 태그 처리 위해 스스로 호출(parseTag)
-> 백트래킹하기 전, 중첩 태그까지 들어가는 DFS 방식

parseTag 외부 나머지는 단순히 문자열을 반복하고 태그가 발견될 때마다 parseTag를 사용. 
이는 HTML 문자열의 각 root-level 태그에 대해 새로운 traverse를 시작하는 것.
*/

const str = "front<p>blahblah</p><p>something<u>here</u>hello</p>back";
/*
INPUT: html string
sample: "front<p>blahblah</p><p>something<u>here</u>hello</p>back"

OUTPUT: json object
sample: ["front",{"p":"blahblah"},{"p":["something",{"u":"here"},"hello"]},"back"]
*/

// 중첩된 거 풀려면 재귀 필요.
// []에 담겨야 함.
// <로 시작하는 문자열 처리하는 케이스
// base: < 로 시작하지 않을 경우

// 포인터로 해야 할듯?

function htmlToJson(str) {
  const result = [];
  let idx = 0;

  // indexOf 대체해봄.
  function findCharIndex(char, startIndex){
    for(let i = startIndex; i<str.length; i++){
      if(str[i] === char){
        return i
      }
      return -1
    }
  }

  // <로 시작하는 태그 파싱 함수 만들고 재귀로 처리

  function parseTag() {
    if (str[idx] !== "<") {
      // basecase
      return null;
    }

    const tagCloseIdx = findCharIndex(">", idx);
    const tagName = str.slice(idx + 1, tagCloseIdx);
    idx = tagCloseIdx + 1;

    const closeTag = `</${tagName}>`;
    const closeTagIdx = findCharIndex(closeTag, idx);

    const content = [];
    let contentStr = "";

    while (idx < closeTagIdx) {
      if (str[idx] === "<") {
        // 또 <를 만나 -> 재귀 들어가야 하는데,
        if (contentStr) {
          // contentStr가 있으면
          content.push(contentStr);
          contentStr = "";
        }
        content.push(parseTag()); //
      } else {
        contentStr += str[idx];
        idx++;
      }
    }

    // []에 다 담긴 경우
    if (contentStr) {
      content.push(contentStr);
    }

    idx = closeTagIdx + closeTag.length;

    // []에 하나만 있는 경우 0번째 꺼를 꺼내줘야 예시처럼 됨.
    return { [tagName]: content.length === 1 ? content[0] : content };
  }

  // 태그 없는 텍스트 처리(else)
  while (idx < str.length) {
    if (str[idx] === "<") {
      result.push(parseTag());
    } else {
      let textEndIdx = findCharIndex("<", idx);
      if (textEndIdx === -1) textEndIdx = str.length;
      result.push(str.slice(idx, textEndIdx));
      idx = textEndIdx;
    }
  }

  return JSON.stringify(result);
}

console.log(htmlToJson(str));
