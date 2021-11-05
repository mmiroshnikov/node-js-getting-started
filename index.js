const http = require("http");
const url = require("url");
const openurl = require('openurl');

http
  .createServer(function(req, res) {
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);

    function parseJwt(token) {
      var base64Url = token.split(".")[1];
      console.log(base64Url);
      return Buffer.from(base64Url, "base64").toString();
    }

    let whiteListed = [
      'harley.homewood@team17.com',
      'lakhvir.takhar@team17.com',
      'mich.davis@team17.com',
      'phil.harper@team17.com',
      'rossfairhurst17@gmail.com',
      'stephan@weareframework.co.uk',
      'sam.bishop@team17.com',
      'mikoza@gmail.com',
    ]

    checkEmail = (e) => {

      var email = e.split('@')[0].replace('.', '') + '@' + e.split('@')[1];

      if (email.split("@").length === 2 && email.split("@")[1] === "xsolla.com") return true;

      if (whiteListed.filter(one=> one === email.toLowerCase()).length === 1) return true
    }


    if (Object.keys(queryObject).length) {
      var params = parseJwt(queryObject["token"]);
      console.log(params);
      console.log(queryObject["token"]);

      var email = JSON.parse(params)["email"];

      if (checkEmail(email)) {
        res.writeHead(301,
          {Location: `https://xsolla-game-store.netlify.app/?APIKEY=key2e5vqPmfmASari&USER=${email}`}
        );
        res.end(`${ email} is authorized`);
      } else {
        res.writeHead(200, { "Content-Type": "text/html"});
        res.end(`${email} is NOT authorized`);
      }
    } else {
      res.writeHead(301,
        {Location: `https://xsolla-game-store.netlify.app/logout`}
      );
      res.end("Unauthorized");
    }
  })
  .listen(process.env.PORT || 8080);
