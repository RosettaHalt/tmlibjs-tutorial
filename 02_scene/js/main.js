/*
 シーンの生成/切替方法です。
 tm.app.Scene();
 scene.update = function(){ }
 app.replaceScene(scene);
 
 タッチ判定
 app.pointing.getPointingEnd();
 */

tm.main(function(){
    app = tm.app.CanvasApp("#world");
    app.background = "black";
    app.enableStats();
    app.fitWindow();

    // シーンの生成
    var titleScene = tm.app.Scene();
    titleScene.update = function(){
        console.log("title");
        // クリックかZキーでシーン切り替え
        if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingEnd() ){
            app.replaceScene(mainScene);
        }
    }

    // シーンの生成
    var mainScene = tm.app.Scene();
    mainScene.update = function(){
        console.log("main");
        if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingEnd() ){
            app.replaceScene(titleScene);
        }
    }

    // シーンの切り替え
    app.replaceScene(titleScene);

    app.run();
});