import {MarkedOptions, MarkedRenderer} from 'ngx-markdown';

import {escape, cleanUrl} from 'marked/src/helpers';
import {environment} from '../environments/environment';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  
  // コードブロックのレンダリング
  renderer.code = (code, infostring, escaped) => {
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
    escaped = !(lang === 'html' || lang === 'markup'  || lang === 'xml');
    
    //
    return '<pre class="line-numbers">' + fileTag + '<code class="'
      + renderer.options.langPrefix
      + escape(lang, true)
      + '">'
      + (escaped ? code : escape(code, true))
      + '</code></pre>\n';
  };
  
  renderer.link = (href: string, title: string, text: string) => {
    // console.log(href);
    // if (href.match(/^\.{1,2}|\/+/)) {
    //   console.log('マッチした');
    // }
    href = cleanUrl(renderer.options.sanitize, renderer.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + escape(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  };

  renderer.image = (href: string, title: string, text: string) => {
    href = href.replace(/^(\.{0,2}\/+)+/, '');
    href = cleanUrl(renderer.options.sanitize, environment.docsBasePath, href);
    if (href === null) {
      return text;
    }
  
    let out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += renderer.options.xhtml ? '/>' : '>';
    return out;
  };
  
  return {
    renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false
  };
}
