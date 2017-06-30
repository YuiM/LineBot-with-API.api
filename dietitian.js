
const LINE_CHANNEL_ACCESS_TOKEN = 'cEZnXk+iZCdy6PledOz2v5NBbRE/oT9gRCV20SWI1gJeBd1+vqDLQbRCtIRmF+IfBajc+wh0dE9GqctEJbLLoo8tw6dJGwAwDVbjvDzHKHxOhimHsQ16Wthtiv5SqfUcTH1i+/pvsukH4vu6JTMNIAdB04t89/1O/w1cDnyilFU=';

var request = require('request');

module.exports = class dietitian {
static replyRecommendation(replyToken){
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
    }
    var body = {
        replyToken: replyToken,
        messages: [{
            type: 'text',
            text: 'カレーライスでもどうですか？'
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

static replyKiriake(replyToken,reptext){
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
    }
    var body = {
        replyToken: replyToken,
        messages: [{
            type: 'text',
            text: reptext
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

static replyTsuji(replyToken,reptext){
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
    }
    var body = {
        replyToken: replyToken,
        messages: [{
            type: 'text',
            text: reptext
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























































static replyTotalCalorie(replyToken, foodList){
        var totalCalorie = 0;
        for (var food of foodList){
            totalCalorie += food.calorie;
        }

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
        }
        var body = {
            replyToken: replyToken,
            messages: [{
                type: 'text',
                text: 'カロリーは合計' + totalCalorie + 'kcalです！'
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
    static askWhichFood(replyToken, foodList){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
        }
        var body = {
            replyToken: replyToken,
            messages: [{
                type: 'template',
                altText: 'どの食品が最も近いですか？',
                template: {
                    type: 'buttons',
                    text: 'どの食品が最も近いですか？',
                    actions: []
                }
            }]
        }
        for (var food of foodList){
            body.messages[0].template.actions.push({
                type: 'postback',
                label: food.food_name,
                data: JSON.stringify(food)
            });
            if (body.messages[0].template.actions.length == 4){
                break;
            }
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
