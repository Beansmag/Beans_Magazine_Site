const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const excelJS = require("exceljs");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "Hi Beans Magazine !",
  });
});
router.post("/saveInExcel", async (req, res) => {
  //Cheking if files/user.xlsx is available or not
  const path = "./files/users.xlsx";
  if (fs.existsSync(path)) {
    try {
      const filepath = "./files";
      const workbook = new excelJS.Workbook();

      // const worksheet = workbook.addWorksheet("Details");
      // check files
      workbook.xlsx.readFile("./files/users.xlsx").then((data) => {
        var worksheet = workbook.getWorksheet("Details");
        var lastRow = worksheet.lastRow ? worksheet.lastRow : null;

        worksheet.columns = [
          { header: "name", key: "name", width: 10 },
          { header: "num", key: "num", width: 30 },
        ];
        let counter = lastRow ? ++lastRow.number : 2;
        var getRowInsert = worksheet.getRow(counter);
        getRowInsert.getCell("A").value = req.body.name;
        getRowInsert.getCell("B").value = req.body.num;
        getRowInsert.commit();
        try {
          workbook.xlsx.writeFile(`${filepath}/users.xlsx`).then(() => {
            res.status(200).json({ msg: "Data Pushed in existing FIle" });
          });
        } catch (e) {
          res.status(300).json({ msg: "File Exist but error occur" });
        }
      });
    } catch (e) {
      console.log("File Exist but error occur");
    }
  } else {
    // creating new File
    fs.mkdir("./files", function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("New directory successfully created.");
      }
    });
    const filepath = "./files";
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Details");
    worksheet.columns = [
      { header: "name", key: "name", width: 10 },
      { header: "num", key: "num", width: 30 },
    ];
    let count = 1;
    const data = [req.body];
    data.forEach((user) => {
      worksheet.addRow(user);
      count += 1;
    });
    const result = await workbook.xlsx.writeFile(`${filepath}/users.xlsx`);
    res.send("done");
  }
});
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
