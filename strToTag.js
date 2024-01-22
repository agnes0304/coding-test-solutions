const str = "front<p>blahblah</p><p>something<u>here</u>hello</p>back";
/*
OUTPUT: 

[
	"front",
	"p":"blahblah",
	"p": [
		"something",
		{"u":"here"},
		"hello"
	]
	"back"
]
*/

// 태그 없는 텍스트 잘라내기
// 태그 있는 텍스트
// < 만나면

function htmlToJson(str) {
  const result = [];
  let start = 0;
  while (start < str.length) {
    if (str[start] !== "<") {
      let textEndIdx = str.indexOf("<", start);
      if (textEndIdx !== -1) {
        result.push(str.slice(start, textEndIdx));
      } else {
        result.push(str.slice(start, str.length));
      }
    }
  }
}

console.log(htmlToJson(str));
