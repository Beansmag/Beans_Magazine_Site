const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
// const excelJS = require("exceljs");
// const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require("body-parser");
const {google} = require("googleapis");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const router = express.Router();
const sheetID = process.env.sheet_id;

const authentication = async () => {
    const auth = new google.auth.GoogleAuth({
        //keyFile: "glass-cycle-370910-7ae5e0ed8695.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
        credentials : {
            "type": process.env.type,
            "project_id": process.env.project_id,
            "private_key_id": process.env.private_key_id,
            "private_key": process.env.private_key,
            "client_email": process.env.client_email,
            "client_id": process.env.client_id,
            "auth_uri": process.env.auth_uri,
            "token_uri": process.env.token_uri,
            "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
            "client_x509_cert_url": process.env.client_x509_cert_url
        }
    });

    const client = await auth.getClient();
    const sheets = google.sheets({
        version: "v4",
        auth: client,
    });
    return {sheets};
};

router.get("/", (req, res) => {
  res.json({
    hello: "Hi Beans Magazine !",
  });
});
// router.post("/saveInExcel", async (req, res) => {
//   //Cheking if files/user.xlsx is available or not
//   const path = "./files/users.xlsx";
//   if (fs.existsSync(path)) {
//     try {
//       const filepath = "./files";
//       const workbook = new excelJS.Workbook();

//       // const worksheet = workbook.addWorksheet("Details");
//       // check files
//       workbook.xlsx.readFile("files/users.xlsx").then((data) => {
//         var worksheet = workbook.getWorksheet("Details");
//         var lastRow = worksheet.lastRow ? worksheet.lastRow : null;

//         worksheet.columns = [
//           { header: "name", key: "name", width: 10 },
//           { header: "num", key: "num", width: 30 },
//         ];
//         let counter = lastRow ? ++lastRow.number : 2;
//         var getRowInsert = worksheet.getRow(counter);
//         getRowInsert.getCell("A").value = req.body.name;
//         getRowInsert.getCell("B").value = req.body.num;
//         getRowInsert.commit();
//         try {
//           workbook.xlsx.writeFile(`${filepath}/users.xlsx`).then(() => {
//             res.status(200).json({ msg: "Data Pushed in existing FIle" });
//           });
//         } catch (e) {
//           res.status(300).json({ msg: "File Exist but error occur" });
//         }
//       });
//     } catch (e) {
//       console.log("File Exist but error occur");
//     }
//   } else {
//     // creating new File
//     fs.mkdir("./files", function (err) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("New directory successfully created.");
//       }
//     });
//     const filepath = "./files";
//     const workbook = new excelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Details");
//     worksheet.columns = [
//       { header: "name", key: "name", width: 10 },
//       { header: "num", key: "num", width: 30 },
//     ];
//     let count = 1;
//     const data = [req.body];
//     data.forEach((user) => {
//       worksheet.addRow(user);
//       count += 1;
//     });
//     const result = await workbook.xlsx.writeFile(`${filepath}/users.xlsx`);
//     res.send("done");
//   }
// });

router.get("/getUserData", async (req, res) => {
  try {
      const {sheets} = await authentication();
      const response = await sheets.spreadsheets.values.get({
          spreadsheetId: sheetID,
          range: "Sheet1",
      });
      res.send(response.data.values);
  } catch (err) {
      console.log("Error :", err);
  }
});

router.post("/updateUserData", async (req, res) => {
  try {
      const {name, phoneNumber} = req.body;
      const {sheets} = await authentication();
      // Writing Data into Spreadsheet
      const writeReq = await sheets.spreadsheets.values.append({
          spreadsheetId: sheetID,
          range: "Sheet1",
          valueInputOption: "USER_ENTERED",
          resource: {
              values: [[name, phoneNumber]],
          },
      });

      if (writeReq.status == 200) {
          return res.json({message: "Data Added into Spreadsheet."});
      }
      return res.json({message: "Something wrong while appending data."});
  } catch (err) {
      console.log("Err: ", err);
      res.status(500).json({message: "Something went wrong.!!"});
  }
});
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
