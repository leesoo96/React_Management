const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

const multer = require('multer'); // multer 객체 생성 
const upload = multer({dest: './upload'}) 
// 서버의 루트 폴더(management)에 있는 업로드 폴더를 
// 사용자가 업로드한 파일이 저장되도록 설정

app.get('/api/customers', (req, res) => {
   connection.query(
     "SELECT id, image, name, birthday, gender, job FROM customer",
     (err, rows, fields) => {
       res.send(rows);
     }
   );
});

// 사용자가 접근해서 프로필이미지를 확인할 수 있도록 업로드폴더에 접근허가
app.use('/image', express.static('./upload'));
      // 접근url                             -> mapping

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO customer VALUES (null, ?, ?, ? ,? ,?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job]; // DB에 입력됨

  connection.query(sql, params, 
    (err, rows, fileds) => {
      res.send(rows); // 입력성공 시 관련 메시지를 클라이언트에게 출력해줌
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));