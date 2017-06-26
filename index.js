// -----------------------------------------------------------------------------
  const LINE_CHANNEL_ACCESS_TOKEN = 'cEZnXk+iZCdy6PledOz2v5NBbRE/oT9gRCV20SWI1gJeBd1+vqDLQbRCtIRmF+IfBajc+wh0dE9GqctEJbLLoo8tw6dJGwAwDVbjvDzHKHxOhimHsQ16Wthtiv5SqfUcTH1i+/pvsukH4vu6JTMNIAdB04t89/1O/w1cDnyilFU='; // 追加
// // モジュールのインポート 
  var express = require('express');
  var bodyParser = require('body-parser'); // 追加
  var request = require('request'); // 追加  
  var mecab = require('mecabaas-client'); // 追加 
var memory = require('memory-cache'); // 追加  
var shokuhin = require('shokuhin-db');
var dietitian = require('./dietitian'); // 追加
  var app = express();
// // ミドルウェア設定
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json()); // 追加



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
/*
app.post('/webhook', function(req, res, next){
    res.status(200).end();
    for (var event of req.body.events){
        if (event.type == 'message' && event.message.text == 'ハロー'){
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
            }
            var body = {
                replyToken: event.replyToken,
                messages: [{
                    type: 'text',
                    text: 'なっち'
                }]
            }
            var url = 'https://api.line.me/v2/bot/message/reply';
            request({
                url: url,
                method: 'POST',
                headers: headers,
                body: body,
                json: true
            });
        }
    }
});*/
/*app.post('/webhook', function(req, res, next){
    res.status(200).end();
    for (var event of req.body.events){
        if (event.type == 'message' && event.message.text){
            mecab.parse(event.message.text)
            .then(
                function(response){
                    var foodList = [];
                    for (var elem of response){
                        if (elem.length > 2 && elem[1] == '名詞'){
                            foodList.push(elem);
                        }
                    }
                    var gotAllNutrition = [];
                    if (foodList.length > 0){
                        for (var food of foodList){
                            gotAllNutrition.push(shokuhin.getNutrition(food[0]));
                        }
                        return Promise.all(gotAllNutrition);
                    }
                }
            ).then(
                function(response){
                    console.log(response);
                }
            );
        }
    }
});*/
app.post('/webhook', function(req, res, next){
    res.status(200).end();
    for (var event of req.body.events){
        if (event.type == 'message' && event.message.text){
            mecab.parse(event.message.text)
            .then(
                function(response){
                    var foodList = [];
                    for (var elem of response){
                        if (elem.length > 2 && elem[1] == '名詞'){
                            foodList.push(elem);
                        }
                    }
                    var gotAllNutrition = [];
                    if (foodList.length > 0){
                        for (var food of foodList){
                            gotAllNutrition.push(shokuhin.getNutrition(food[0]));
                        }
                        return Promise.all(gotAllNutrition);
                    }
                }
            ).then(
                function(responseList){
                    var botMemory = {
                        confirmedFoodList: [],
                        toConfirmFoodList: [],
                        confirmingFood: null
                    }
                    for (var nutritionList of responseList){
                        if (nutritionList.length == 0){
                            continue;
                        } else if (nutritionList.length == 1){
                        botMemory.confirmedFoodList.push(nutritionList[0]);
                        } else if (nutritionList.length > 1){
                        botMemory.toConfirmFoodList.push(nutritionList);
                        }
                    }
                    if (botMemory.toConfirmFoodList.length == 0 && botMemory.confirmedFoodList.length > 0){
                        console.log('Going to reply the total calorie.');
                        dietitian.replyTotalCalorie(event.replyToken, botMemory.confirmedFoodList);
                    } else if (botMemory.toConfirmFoodList.length > 0){
                        console.log('Going to ask which food the user had');
                        dietitian.askWhichFood(event.replyToken, botMemory.toConfirmFoodList[0]);
                        botMemory.confirmingFood = botMemory.toConfirmFoodList[0];
                        botMemory.toConfirmFoodList.splice(0, 1);
                        memory.put(event.source.userId, botMemory);
                    }
                }
            );
        }
    }
});
