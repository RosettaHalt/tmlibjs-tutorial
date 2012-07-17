/*
 Twitterへの投稿
 */
 
// スクリーンのサイズ
var SCREEN_WIDTH = 480;
var SCREEN_HEIGHT= 720;
 
// リソースのリスト
tm.preload(function() {
    tm.sound.SoundManager.add("bgm", "sound/bgm/Loop_35", 1);
    tm.sound.SoundManager.add("shot", "sound/se/chargeshot");
});
 
// ユーザーのデータ
tm.util.DataManager.set("userData", {
    score: 0
});

tm.main(function(){
    app = tm.app.CanvasApp("#world");
    app.background = "black";
    app.enableStats();
    app.fitWindow();
    
	// ユーザーデータの生成
    userData = tm.util.DataManager.get("userData");

    app.replaceScene(TitleScene());

    app.run();
});

// タイトルシーン
(function(ns){

    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [
                {
                    type:"Label", name:"titleLabel",
                    x:SCREEN_WIDTH/2, y:SCREEN_HEIGHT/2, width:SCREEN_WIDTH, fillStyle:"white",
                    text:"Title", fontSize:64, align: "center"
                }
            ]
        }
    };
    
    ns.TitleScene = tm.createClass({
        superClass: tm.app.Scene,

        init: function(){
            this.superInit();

            // ラベルを追加
            this.fromJSON(UI_DATA.LABELS);
        },

        update: function(){
            if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingStart() ){
                app.replaceScene(MainScene());
            }
        }
    });
})(window);

// メインシーン
(function(ns){

    // プレイヤーのイメージ
    var playerImage = (function(){
        var c = tm.graphics.Canvas();
        c.width = c.height = 40;
        c.setTransformCenter();
        c.setLineStyle(2, "round", "round");
        c.setColorStyle("white", "rgba(200, 200, 200, 0.9)");
        c.fillPolygon(0, 0, 20, 3, 270);
        c.strokePolygon(0, 0, 20, 3, 270);
    
        return c;
    })();
    
    // エネミーのイメージ
    var enemyImage = (function(){
        var c = tm.graphics.Canvas();
        c.width = c.height = 40;
        c.setTransformCenter();
        c.setLineStyle(1.5, "round", "round");
        c.setColorStyle("white", "rgb(255, 50, 50)");
        c.fillStar(0, 0, 20, 16, 0.6);
        c.strokeStar(0, 0, 20, 16, 0.6);
        return c;
    })();
    
    // 弾のイメージ
    var bulletImage = (function(){
        var c = tm.graphics.Canvas();
        c.width = c.height = 10;
        c.setTransformCenter();
        c.setColorStyle("white", "white");
        c.fillCircle(0, 0, 5);
    
        return c;
    })();
    
    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [
                {
                    type:"Label", name:"scoreLabel",
                    x:240, y:128, width:SCREEN_WIDTH, fillStyle:"white",
                    text:"dummy", fontSize:64, align: "center"
                }
            ]
        }
    };

    ns.MainScene = tm.createClass({
        superClass: tm.app.Scene,

        init: function(){
            this.superInit();

            // ラベルを追加
            this.fromJSON(UI_DATA.LABELS);

            // ラベルのテキストを更新
            userData.score = 0;
            this.scoreLabel.text = "score : " + userData.score;

            // 自機
            this.player = Player(playerImage);
            this.player.position.set( app.width/2, 600 );
            this.addChild(this.player);
            
            // 敵用グループ
            this.enemyGroup = null;
            this.enemyGroup = tm.app.CanvasElement();
            this.addChild(this.enemyGroup);
            this.enemyGroup.update = function(app){
                if(app.frame % 30 == 0){
                    var enemy = Enemy(enemyImage);
                    enemy.position.set(Math.rand(40, app.height-40), -20);
                    this.addChild( enemy );
                }
            }

            // 弾の次弾発射までの待ち時間
            this.waitTimeBullet = 0;

            // 弾用グループ
            this.bulletGroup = null;
            this.bulletGroup = tm.app.CanvasElement();
            this.addChild(this.bulletGroup);
            
            // BGM
            this.bgm = tm.sound.SoundManager.get("bgm");
            this.bgm.loop = true;   // ループさせる
            this.bgm.play();    // 再生
        },

        update: function(){
            // プレイヤーとエネミーの衝突判定
            for(var i = 0; i < this.enemyGroup.children.length; ++i){
                var enemy = this.enemyGroup.children[i];
                if(this.player.isHitElement(enemy) == true){
                    console.log("hit");
                    enemy.remove();
                    
                    // BGMの停止
                    this.bgm.stop();
                    
                    // ゲームオーバー
                    app.replaceScene(EndScene());
                }
                // エネミーと弾の判定
                for(var j = 0; j < this.bulletGroup.children.length; ++j){
                    var bullet = this.bulletGroup.children[j];
                    if(enemy.isHitElement(bullet) == true){
                        console.log("bullet hit");
                        enemy.remove();
                        bullet.remove();

                        // スコアを更新
                        ++userData.score;
                        this.scoreLabel.text = "score : " + userData.score;
                    }
                }
            }

            // ショット
            if( (app.keyboard.getKey("Z") || app.pointing.getPointing() == true) && this.waitTimeBullet < 0){
                this.waitTimeBullet = 10;
                var bullet = Bullet(bulletImage);
                bullet.position.set(this.player.x, this.player.y-20);
                this.bulletGroup.addChild( bullet );
                
                // ショット音
                tm.sound.SoundManager.get("shot").play();
            }
            --this.waitTimeBullet;
        },

        // ポーズ画面 : 別タブへ切り替わった時 / Tabキーを押した時
        onblur: function(){
            app.pushScene(PauseScene());
        }
    });
})(window);

// エンドシーン
(function(ns) {
        
    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [
                {
                    type:"Label",name:"scoreLabel",
                    x:SCREEN_WIDTH/2, y:SCREEN_HEIGHT/2, width:SCREEN_WIDTH, fillStyle:"white",
                    text:"Title", fontSize:64, align: "center"
                }
            ]
        }
    }    
    ns.EndScene = tm.createClass({
        superClass: tm.app.Scene,
    
        init: function(){
            this.superInit();
            
            // ラベル
            this.fromJSON(UI_DATA.LABELS);
            this.scoreLabel.text = "Score : " + userData.score;
            
            // タイトルボタン
            var titleButton = tm.app.iPhoneButton(120, 60, "black");    // ボタンの読み込み
            titleButton.setPosition(120,640);   // ボタンの位置
            titleButton.label.text = "Title";   // ボタンのテキスト
            this.addChild(titleButton);
            titleButton.onpointingstart = function() {  // ボタンを押した時の挙動
                app.replaceScene(TitleScene());
            };

            // ツイートボタン
            var msg = tm.social.Twitter.createURL({ // Twitterへの投稿メッセージを作成
                type: "tweet",
                text: "Score : {0}\n".format(userData.score),
                hashtags: "tmlibjs",
                url: "http://bit.ly/O7R7gh",
            });
            var tweetButton = tm.app.iPhoneButton(120, 60, "black");
            tweetButton.setPosition(360, 640);   // ボタンの位置
            tweetButton.label.text = "Tweet";   // ボタンのテキスト
            this.addChild(tweetButton);
            tweetButton.onpointingstart = function() {  // ボタンを押した時の挙動
                window.open(msg, "_self");  // メッセージをURLに渡しつつ開く
            };
        },
    
        update: function(){
        }
    });
})(window);


// ポーズシーン
(function(ns){
    ns.PauseScene = tm.createClass({
        superClass: tm.app.Scene,
        
        init: function(audio){
            this.superInit();
            this.interaction;
            
            // 全画面にちょっと透ける黒いレイヤーを被せる
            var filter = tm.app.Sprite(app.width, app.height);
            filter.setPosition(app.width/2, app.height/2);
            filter.canvas.clearColor("rgba(0, 0, 0, 0.75)");
            this.addChild(filter);
                
            app.stop();
            
            // サウンドが流れていたら止める(サウンドについては後の章で)
            this.audio = audio; 
            if(this.audio){ this.audio.pause(); }
        },
        
        // フォーカスが合えばアプリを動かす
        onfocus: function(){
            app.start();    // アプリ自体の更新を再開する
        },
        
        // フォーカスが外れたらアプリを止める
        onblur: function(){
            app.stop();    // アプリ自体の更新を止める
        },
        
        // クリックでポーズ画面を終了
        onmousedown: function(){
            // サウンドが流れていたらサウンドも再開
            if(this.audio){ this.audio.play(); }
            app.popScene();
        },
    }); 
    
})(window);

/*
 * プレイヤークラス
 */
var Player = tm.createClass({
    superClass: tm.app.Sprite,

    init: function(img){
        this.superInit(40, 40, img);
        this.speed = 0;
        this.velocity = tm.geom.Vector2(0, 0);
    },

    update: function(){
        var angle = app.keyboard.getKeyAngle();
        if(angle != null){
            this.velocity.setDegree( angle, 1 );
            this.velocity.y *= -1;
            this.speed = 10;
        }

        // 移動
        this.position.add( tm.geom.Vector2.mul(this.velocity, this.speed) );

        // 摩擦
        this.speed *= 0.7;
    }
});

/*
 * エネミークラス
 */
var Enemy = tm.createClass({
    superClass: tm.app.Sprite,

    init: function(img){
        this.superInit(40, 40, img);
    },

    update: function(){
        this.y += 4;
        this.rotation -= 4; // 回転
        
        if(this.y > app.height+this.height){ this.remove(); }
    }

});

/*
 * 弾クラス
 */
var Bullet = tm.createClass({
    superClass: tm.app.Sprite,

    init: function(img){
        this.superInit(10, 10, img);
    },

    update: function(){
        this.y -= 16;
        
        if(this.y <= -this.height){ this.remove(); }
    }
});