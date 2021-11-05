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


    checkEmail = (e) => {

      return true
    }




    if (Object.keys(queryObject).length) {
      // var params = parseJwt(queryObject["email"]);
      console.log(params);
      console.log(queryObject["email"]);

      var email = JSON.parse(params)["email"];

      if (checkEmail(email)) {
        res.writeHead(301,
          {Location: `https://shop.demarochome.com/?USER=${email}`}
        );
        res.end(`${ email} is authorized`);
      } else {
        res.writeHead(200, { "Content-Type": "text/html"});
        res.end(`${email} is NOT authorized`);
      }
    } else {
      res.writeHead(301,
        {Location: `https://shop.demarochome.com/logout`}
      );
      res.end("Unauthorized");
    }
  })
  .listen(process.env.PORT || 8080);
