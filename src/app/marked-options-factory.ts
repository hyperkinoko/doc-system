import {MarkedOptions, MarkedRenderer} from 'ngx-markdown';

/* @NOTE
 escape関数とそこで使う定数を
 https://github.com/markedjs/marked/blob/master/src/helpers.js
 からコピペしています。
 */
const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];

function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  
  return html;
}
// escapeのコピペここまで

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  
  renderer.code = function(code, infostring, escaped) {
    // :filenameでQiitaライクにファイル名を付加できるようにする
    const delimiter = ':';
    const info = infostring.split(delimiter);
    const lang = info.shift();
    const fileName = info.join(delimiter);
    let fileTag = '';
    if (fileName) {
      fileTag = '<span class="filename">' + fileName + '</span>';
    }
    
    // 言語が指定されていないとき
    if (!lang) {
      return '<pre class="line-numbers">' + fileTag + '<code>'
        + escape(code, true)
        + '</code></pre>';
    }
    
    // コードがmermaidのときは、mermaid専用のタグに変える
    if (lang === 'mermaid') {
      return '<div class="mermaid">\n'
        + code
        + '\n</div>\n';
    }
    
    // コードがHTMLのときは、タグをエスケープする
    escaped = !(lang === 'html' || lang === 'markup');
    
    //
    return '<pre class="line-numbers">' + fileTag + '<code class="'
      + this.options.langPrefix
      + escape(lang, true)
      + '">'
      + (escaped ? code : escape(code, true))
      + '</code></pre>\n';
  };
  
  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false
  };
}
