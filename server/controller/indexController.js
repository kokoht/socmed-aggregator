var OAuth = require('oauth');

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'O7HMzJ1azSLwRJFCwjkRtEQo7',
  '0CXFcbqWG9wGYwZbDE6I3NOA9Psq7MVoMb9e0S2Mdbl6QXeh29',
  '1.0A',
  null,
  'HMAC-SHA1'
);

function timeline (req, res){
  //let query = req.query.screen_name;
  oauth.get(
    //`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${query}`,
    `https://api.twitter.com/1.1/statuses/home_timeline.json`,
    '890049648303276032-xpddNgyNrUeB82CAiI9t0UHZtDp54iR',
    '8d9d8DxIRgMlrKl52t2H8isl8QpcwrU8zhKCVFHM5gudY',
    (err,data) => {
      //grab each status..
      statusText = [];
      data = JSON.parse(data);
      data.forEach(d => {
       statusText.push(d.text);
      });
      res.send(statusText);
      //res.send(data);
    });
};

function search (req, res){
  let search = req.params.q
  oauth.get(
    `https://api.twitter.com/1.1/search/tweets.json?q=${search}`,
    '890049648303276032-xpddNgyNrUeB82CAiI9t0UHZtDp54iR',
    '8d9d8DxIRgMlrKl52t2H8isl8QpcwrU8zhKCVFHM5gudY',
    (err,data) => {
      res.send(data);
    });
};

function post (req, res) {
  let query = req.body.quote;
  oauth.post(
    `https://api.twitter.com/1.1/statuses/update.json?status=${query}`,
    '890049648303276032-xpddNgyNrUeB82CAiI9t0UHZtDp54iR',
    '8d9d8DxIRgMlrKl52t2H8isl8QpcwrU8zhKCVFHM5gudY',
    query,
    'text',
    (err,data) => {
    if(err) {console.log(err);}
    else {res.send(data);}
    });
};


module.exports = {
  timeline,
  search,
  post
}
