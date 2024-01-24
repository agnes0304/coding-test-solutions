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

  // <로 시작하는 태그 파싱 함수 만들고 재귀로 처리

  function parseTag() {
    if (str[idx] !== "<") {
      // basecase
      return null;
    }

    const tagCloseIdx = str.indexOf(">", idx);
    const tagName = str.slice(idx + 1, tagCloseIdx);
    idx = tagCloseIdx + 1;

    const closeTag = `</${tagName}>`;
    const closeTagIdx = str.indexOf(closeTag, idx);

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
      let textEndIdx = str.indexOf("<", idx);
      if (textEndIdx === -1) textEndIdx = str.length;
      result.push(str.slice(idx, textEndIdx));
      idx = textEndIdx;
    }
  }

  return JSON.stringify(result);
}

console.log(htmlToJson(str));
