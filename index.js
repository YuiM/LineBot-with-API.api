// -----------------------------------------------------------------------------
// // モジュールのインポート
  var express = require('express');
  var app = express();
//
// // -----------------------------------------------------------------------------
// // Webサーバー設定
  var port = (process.env.PORT || 3000);
  var server = app.listen(port, function() {
     console.log('Node is running on port ' + port);
     });
//
//     // -----------------------------------------------------------------------------
//     // ルーター設定
     app.get('/', function(req, res, next){
         res.send('Node is running on port ' + port);
         });
      app.post('/webhook', function(req, res, next){
          res.status(200).end();
          console.log(req.body);
      });
// -----------------------------------------------------------------------------
// // モジュールのインポート
 var express = require('express');
 var bodyParser = require('body-parser'); // 追加
 var app = express();
//
//
// // -----------------------------------------------------------------------------
// // ミドルウェア設定
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json()); // 追加



app.post('/webhook', function(req, res, next){
    res.status(200).end();
    for (var event of req.body.events){
        if (event.type == 'message'){
            console.log(event.message);
        }
    }
});
