export default function tokenizing(code: string) {
  let tokenize = code;

  const asdf = ['\\(', '\\)', '\\[', '\\]', ',', '\\:', '\\.'];
  let regExp = "/(";

  for(let item of asdf) {
    regExp += item + '|';
  }

  regExp += " )/g"; //공백 포함

  const result = tokenize
    .split(regExp)
    .map(item => { return item.replace(/\n/g,'') })
    .filter(item => item !== '' && item !== ' ')

  return result;
}