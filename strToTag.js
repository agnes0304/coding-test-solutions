const str = "front<p>blahblah</p><p>something<u>here</u>hello</p>back";
/*
INPUT: html string
sample: "front<p>blahblah</p><p>something<u>here</u>hello</p>back"

OUTPUT: json object
sample: ["front","p":"blahblah","p":["something",{"u":"here"},"hello"],"back"]
*/

function htmlToJson(str) {
  let result = [];
  let idx = 0;

  while (idx < str.length) {
    if (str[idx] === "<") {
      let tagClose = str.indexOf(">", idx);
      let tagName = str[idx + 1];
      let closeTag = str.indexOf(`</${tagName}>`, idx);
      let tagContent = str.slice(tagClose + 1, closeTag);
      let obj = {};
      obj[tagName] = tagContent;
      result.push(obj);
      idx = closeTag;
    } else {
      let textEndIdx = str.indexOf("<", idx);
      if (textEndIdx === -1) {
        result.push(str.slice(idx));
        idx = str.length;
      } else {
        result.push(str.slice(idx, textEndIdx));
        idx = textEndIdx;
      }
    }
  }

  return JSON.stringify(result);
}

console.log(htmlToJson(str));
