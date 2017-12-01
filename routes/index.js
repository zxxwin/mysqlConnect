var express = require('express');
var router = express.Router();
var db = require('../dbConfig.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  var queryString = "select * from user where username='" + req.body.username +"'";

  // 执行select 语句的时候，rows 是一个数组
  db.query(queryString, function(err, rows){
  	if (err) {
  		res.send(err);
  	}else {
      if (rows.length == 0){
        res.send("用户名不存在");
      }else if (rows[0].password == req.body.password) {
        res.send(rows);  //登录成功，返回用户的全部信息
      }else {
        res.send('密码错误');
      }
  	}
  })
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  // 判断用户名是否存在
  var queryString = "select * from user where username='" + req.body.username +"'";
  db.query(queryString, function(err, rows){
    if (err) {
      res.send(err);
    }else {
      if (rows.length != 0) {
        res.send("用户名已存在，注册失败");
      }
    }
  })




	queryString = "insert into user(username, password) values('" + req.body.username + "', '" + req.body.password + "')";

	db.query(queryString, function(err, rows){
		if (err) {
			res.send(err);
		}else {
			res.redirect("/login");
		}
	})
});

module.exports = router;
