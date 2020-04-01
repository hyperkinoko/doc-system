import {InjectionToken} from '@angular/core';

export interface IndexNode {
  name: string;
  id?: string;
  route?: string;
  children?: IndexNode[];
}

export const MD_INDEX_DATA: IndexNode[] = [
  {
    name: '開発ガイド',
    route: 'docs/',
    children: [
      {
        name: 'API設計ガイド',
        id: 'development-guide--api-design-guide',
        route: 'DevelopmentGuide/ApiDesignGuide.md'
      },
      {
        name: 'バックエンド開発ガイド',
        route: 'docs/DevelopmentGuide/BackendDevelopGuide'
      },
      {
        name: 'フロントエンド開発ガイド',
        route: 'docs/DevelopmentGuide/DevelopGuide'
      },
      {
        name: 'コーディング規約'
      },
      {
        name: 'Storybook',
        route: 'docs/DevelopmentGuide/Storybook'
      }
    ]
  },
  {
    name: 'ドキュメンテーション',
    children: [
      {
        name: 'このサイトに貢献する',
        route: 'docs/Documentation/contribution'
      },
      {
        name: 'markdown記法について',
        route: 'docs/Documentation/markdown'
      },
      {
        name: 'mermaidについて',
        route: 'docs/Documentation/mermaid'
      }
    ]
  },
  {
    name: 'コンテキストマップ',
    route: 'docs/context/index'
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

export const MD_INDEX = new InjectionToken<IndexNode[]>('md-index');
