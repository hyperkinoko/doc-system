import {IndexNode} from '../../app/index-menu/index-menu.service';

export const MD_INDEX_DATA: IndexNode[] = [
  {
    name: '開発ガイド',
    path: 'development-guide--index',
    children: [
      {
        name: 'API設計ガイド',
        path: 'development-guide--api-design-guide'
      },
      {
        name: 'バックエンド開発ガイド',
        path: 'development-guide--backend-development-guide'
      },
      {
        name: 'フロントエンド開発ガイド',
        path: 'development-guide--frontend-development-guide'
      },
      {
        name: 'コーディング規約'
      },
      {
        name: 'Storybook'
      }
    ]
  },
  {
    name: 'ドキュメンテーション',
    children: [
      {
        name: 'このサイトに貢献する',
        path: 'documentation--contribution'
      },
      {
        name: 'markdown記法について',
        path: 'documentation--markdown'
      },
      {
        name: 'mermaidについて',
        path: 'documentation--mermaid'
      }
    ]
  },
  {
    name: 'コンテキストマップ',
  },
  {
    name: 'フロントエンドプロトタイプ',
    children: [
      {
        name: 'Angular Elements レポート',
      },
      {
        name: 'デザイン',
      },
      {
        name: 'フロントエンドフレームワーク選定レポート#1'
      },
      {
        name: 'フロントエンドフレームワーク選定レポート#2'
      },
      {
        name: 'フロントエンドフレームワーク選定レポート#3'
      },
      {
        name: 'フロントエンドフレームワーク選定レポート#4'
      }
    ]
  }
];

