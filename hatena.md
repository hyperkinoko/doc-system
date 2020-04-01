## プロジェクト作成

## ngx-markdown導入

ngx-markdown@9を入れると、Angularも@9に上げないと動かないっぽい

markedをscriptに書き込む必要はない

```html
<markdown [src]="url"></markdown>
```

を使う場合は、`markdownModuleConfig`の`loader`に`HttpClient`を指定する必要があります。



## CSSを適用する

```typescript
@Component({
  selector: 'app-md-viewer',
  templateUrl: './md-viewer.component.html',
  styleUrls: ['./md-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,  // これが必要
})
```

`md-viewer.component.scss`にマークダウンのCSSを書き込む。  
gitのmarkdowncssとかを適当に取ってくるといい。

## Code Highlightを適用する

コードをハイライトするために、prismをあてます。
npmでインストールしたprismは、jsとHTMLしかハイライトしてくれない・・・

```json
"scripts": [
  "node_modules/prismjs/prism.js",
  "./node_modules/prismjs/components/prism-java.js"
]
```

こんな感じでハイライトしたい言語のコンポーネントを読み込むと、その言語(今だとJava)がハイライトされる。
全部ここに列挙・・・は、しんどいので、全部入りのprism.jsを作成して読み込むことにする。
autoloaderを使いたかったので、使い方を調べたい（プラグインが有効にならない）

prismのダウンロードサイトは[こちら](https://prismjs.com/)

上記サイトですべての言語にチェックを付けて、「DOWNLOAD JS」と「DOWNLOAD CSS」でダウンロード。

ダウンロードした`prism.js`と`prism.css`は`src/assets/js`に入れる。

読み込みは、

```json
"styles": [
  + "src/assets/js/prism.css"
],
"scripts": [
  + "src/assets/js/prism.js"
]
```

## renderをoverrideする

やりたいこと：
* mermaidを書きたい
* Qiitaみたいにコードにファイル名を付与したい
* `<pre>`のclassに`line-numbers`を追加して、行番号を表示する

rendererのコードは長くなるので、app.moduleを汚さないようにファイルを分けた。

marked-options-factory.ts

```typescript
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
```

escape関数がうまくインポートできなかったので、変なコードになっています。

で、これを読み込む。

```typescript
imports: [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  MarkdownModule.forRoot({
    loader: HttpClient,
    markedOptions: {
      provide: MarkedOptions,
      useFactory: markedOptionsFactory
    }
  })
],
```

## mermaidを表示する

mermaidはnpmからインストールできます。

```
npm install mermaid
```

`angular.json`の`scripts`に追加します。

```json
"scripts": [
    "src/assets/js/prism.js",
  + "./node_modules/mermaid/dist/mermaid.js"
]
```

index.htmlで読み込むと、mermaidのレンダラが先に呼ばれる不具合があったけど、こっちの方法なら大丈夫そう。
