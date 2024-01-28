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

// 중첩된 거 풀려면 재귀 필요 -> 근데 스택 오버플로 가능성
// []에 담겨야 함.
// <로 시작하는 문자열 처리하는 케이스
// base: < 로 시작하지 않을 경우

// 포인터로 해야 할듯?

function htmlToJson(str) {
  const result = [];
  let idx = 0;

  // indexOf 대체해봄.
  function findCharIndex(char, startIndex) {
    for (let i = startIndex; i < str.length; i++) {
      if (str[i] === char) {
        return i;
      }
      return -1;
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

// console.log(htmlToJson(str));

// using stack
const sample = "front<p>blahblah</p><p>something<u>here</u>hello</p>back";
/*
INPUT: html string
sample: "front<p>blahblah</p><p>something<u>here</u>hello</p>back"

OUTPUT: json object
sample: ["front",{"p":"blahblah"},{"p":["something",{"u":"here"},"hello"]},"back"]
*/

// 괄호 쌍 맞추기 방식으로 풀자
// 태그랑 콘텐츠 가리키는 포인터
// 태그 없는 애는 바로 result = []에 push
// 오픈태그 -> 닫는 태그 만날 때까지 스택 푸쉬
// 닫는태그 만나면 오픈태그까지 팝 -> // temp 리스트에 {"태그":"콘텐츠"}로 푸쉬
//

/*
<인지 아닌지 검증해나가는 과정이 필요하고. 
<내부에 <가 있으면 idx를 <로 설정하고 안쪽 반복문 break하기
그럼 다시 <인지 아닌지 검증하겠지.
</위치를 찾아야 하나 말아야 하나 -> 내부 for loop에서 str.length가 아니라 </>까지만 찾고
</>오면 temp에 있는거 옮겨주는 역할하면 됨. 

*/

function htmlToJson02(str) {
  const result = [];
  let idx = 0; // index
  let closeIdx = str.length;
  const stack = [];
  const temp = [];

  if (str[idx] === "<") {
    let endTagidx = str.indexOf(">", idx);
    let tagName = str.slice(idx + 1, endTagidx);
    stack.push(tagName);

    let closeTag = `</${tagName}>`;
    let closeTagIdx = str.lastIndexOf(closeTag, closeIdx); // 중첩된 태그가 같은 경우면 우짜냐? -> 일단 lastIndexOf

    for (let i = endTagidx + 1; i < closeTagIdx; i++) {
      // 콘텐츠 자르는 중
      if (str[i] === "<") {
        idx = i;
        closeIdx = closeTagIdx;
        let content = str.slice(endTagidx + 1, i);
        stack.push(content);
        break;
      } else if (i === closeTagIdx - 1) {
        let obj = {};
        let content = str.slice(endTagidx + 1, i);
        if (stack.length === 1) {
          let key = stack.pop();
          obj[key] = content;
          result.push(obj);
        } else {
          
        }
      }
    }
  }

  return JSON.stringify(result);
}

console.log(htmlToJson02(sample));
