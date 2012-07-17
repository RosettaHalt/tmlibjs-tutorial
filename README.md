# tmlib.js STG Tutorial.
tmlib.jsを使ったシューティングゲームの制作チュートリアルです。

## 概要

ほんの少しのJavaScriptの知識(と情熱)がある人向け。  
tmlib.jsを使いながらシューティングゲームの作り方を15回に分けて学んでいきます。

### 流れ

基本的な流れは  
1. 追加するコードの解説  
2. その章までの全コード掲載  
という流れになっています。

間違いや指摘などありましたらissuesなどでお知らせ下さい。

## もくじ
もくじ兼ブログへのリンクです。  
- [その00: はじめに](http://craft-notes.com/web/javascript/tmlib-js%E3%81%A7%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%B2%E3%83%BC%E3%83%A0%E3%82%92%E4%BD%9C%E3%82%8B%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB)  
- [その01: 初期化・準備](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE1-%E5%88%9D%E6%9C%9F%E5%8C%96/)  
- [その02: シーンの作成](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE2-%E3%82%B7%E3%83%BC%E3%83%B3/)  
- [その03: シーンのクラス化](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE3-%E3%82%B7%E3%83%BC%E3%83%B3%E3%81%AE%E3%82%AF%E3%83%A9%E3%82%B9%E5%8C%96/)  
- [その04: 画像の表示 / 移動](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE4-%E7%94%BB%E5%83%8F%E3%81%AE%E8%A1%A8%E7%A4%BA/)  
- [その05: マウスとタッチの判定 / 画像との判定](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE5-%E3%83%9E%E3%82%A6%E3%82%B9%E3%81%A8%E5%BD%93%E3%81%9F%E3%82%8A%E5%88%A4%E5%AE%9A/)  
- [その06: 自機の生成 / キーイベント](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE6-%E3%82%AD%E3%83%BC%E5%85%A5%E5%8A%9B%E3%81%A8%E8%87%AA%E6%A9%9F%E3%81%AE%E7%94%9F%E6%88%90/)  
- [その07: 敵の生成](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE7-%E6%95%B5%E3%81%AE%E5%87%BA%E7%8F%BE/)  
- [その08: 自機と敵の当たり判定](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE8-%E5%BD%93%E3%81%9F%E3%82%8A%E5%88%A4%E5%AE%9A/)  
- [その09: 弾の実装](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE9-%E5%BC%BE%E3%81%AE%E5%AE%9F%E8%A3%85/)  
- [その10: ラベル / スコア(DataManager)](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE10-%E3%82%B9%E3%82%B3%E3%82%A2%E3%81%AE%E8%A1%A8%E7%A4%BA/)  
- [その11: ラベルのUI化](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE11-%E3%83%A9%E3%83%99%E3%83%AB%E3%81%AEui%E5%8C%96/)  
- [その12: ポーズの実装](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE12-%E3%83%9D%E3%83%BC%E3%82%BA%E7%94%BB%E9%9D%A2/)  
- [その13: 音の追加](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE13-%E9%9F%B3%E3%81%AE%E5%AE%9F%E8%A3%85/)  
- [その14: Twitterへの投稿](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AE14-%E3%83%84%E3%82%A4%E3%83%BC%E3%83%88%E3%81%AE%E5%AE%9F%E8%A3%85/)  
- [そのEx: コードを読む](http://craft-notes.com/web/javascript/tmlib-js-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-%E3%81%9D%E3%81%AEextra/)  

## ライブラリ/素材などのブログやウェブサイトのリンクなど
### tmlib.js
tmlib.js開発者のphi氏  
- [TM Life](http://bit.ly/MsWNlN)

### 音関連
ゲーム中の音関連のものは全てザ・マッチメイカァズ2nd様のものを使用させて頂きました。  
- [ザ・マッチメイカァズ2nd 【フリー効果音素材】](http://osabisi.sakura.ne.jp/m2/)様

### 私のブログ
昔はiPhone関係が多かったですが最近はウェブ関係のことを書くことが多いです。  
- [なんかもう実験場](http://bit.ly/MsWGXg)