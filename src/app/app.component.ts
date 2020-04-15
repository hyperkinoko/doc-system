import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '@remore/authentication';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'remore-docs';
  user$: Observable<string>;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService
  ) {}
  
  ngOnInit(): void {
    this.user$ = this.auth.displayName;
    
    // 認証サーバからのリダイレクトの場合、tokenを解析する
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.auth.parseToken(fragment);
        // 認証サーバに飛ぶ前に表示していたページに戻る
        if (localStorage.getItem('route')) {
          const url: string[] = [];
          url.push(localStorage.getItem('route'));
          this.router.navigate(url);
        }
      }
    });
    
    // ページ遷移ごとにURLを記憶し、画面最上部に移動する
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // URLを記憶しておく（認証から帰ってきたときに、そのページを表示するため）
        localStorage.setItem('route', event.url);
        // 画面最上部に移動
        window.scrollTo(0, 0);
      }
    });
  }
  
  signIn() {
    this.auth.signIn();
  }
  
  signOut() {
    this.auth.signOut();
  }
}
