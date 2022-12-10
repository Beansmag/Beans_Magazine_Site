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
const sheetID = "11W2_iaDgAl6Ss8HyQdFD8ztJXqGPYdrOTyYlNh6p2Ds";

const authentication = async () => {
    const auth = new google.auth.GoogleAuth({
        //keyFile: "glass-cycle-370910-7ae5e0ed8695.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
        credentials : {
            "type": "service_account",
            "project_id": "glass-cycle-370910",
            "private_key_id": "7ae5e0ed86956abc95a146f8497107f917ca2a7b",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRdkodcL5sdD9m\nwCadUHQgEG9pMQd4PWAbVbZBxpyesF6n+VOPAyEZP/jhX/ubAA9rOEYqJLUWWSo4\ncW2bxm0STdaCGcf6rHBjlcY/+vsEgI7cbWDyMo7wWKCNymUL/NMgyhJgUEIKgoyF\ndlEMBNLiE8RKno3LY5zdQEQfG/ui3YY4jgpnxance/8mlIWav7sMPMUJK1TiOhMx\nF7g7Xj7PXtjICoqWU821BNpaMfLjY5R6038z4n7UjTDfNycryD7nc1xW91h7/KZF\n0M0bwVhV9wimwW9mnVww6dM6FdbkYcOEW9a2t0VOKKdgNZoJXGXsOuZugEBsMc8H\nOeaU6ov7AgMBAAECggEAOC+GPvJsqfPew+WcFgusMqOl9u4HZmn0OzDZJDit72U4\n5s7a6pw4xyihTncsKw4vlJ+yNoDFMHr3d895StVFkajeduSKf4O83AGjfasJpVIE\nwDz4yc7lB7SGULJvO3F0grGhj0NIC8CsB+rOX651kN4jg66XM20DeVfRThT4AV31\nSqlmx55vr/OiQ9KJjHTkjXpI0/GCYKd0iOTGeV47QO6jf9/aZdRM8p+ZewVwPotU\nlL8s6EetDrVm5DOnaVhNbkpdZjMeTPEtP0v8phEygdbBvuKbUtOHFKIrOHqWPiV8\nk3G/8SEhT/wIPdf6tHdVuKNGqGmqCJlc7If6DC0TQQKBgQDz4oXlj2Wt+gPm96WO\nLicq73s3b7tBDYBcve75248yy5ZBO2bWPqqsHFjQimRS8Nc74FMxuyZnr3Og4aJM\nTZ4Wks7i9piVrOFyXhr53okC3sE9ZT+BqgwoWVf9nug/cRTnM2ZqaNUL69MpepjC\nX+g93Ua9kBqmu7USe9clARnAuwKBgQDb3gNJyFEVBWC51YXqRGPVETe8vA4W7iz6\nj3qBmmtlANnORlWSuPEnJVCt80ON/gPZyvnJjwG5FKb2Sj6hFYy5/WbqgO50oxd4\n1jIO0+gqqovMYeWA4FAUqzsS2oFsmNp2WejqZQlxDBrYe/dl6mqFTU2CpK5rpYBc\nua5e0BhNwQKBgQDGSJ56NGsD1uiDSUcV4NpBYzF3seS5kCOTw2xfQi4bq0A/Su9i\nMtMKWYWwD0Rf1qX3bXvWTAV+eTx2SdxtUxG74qJIDxuhXUxycqZWDqKwbbEInJ/U\naQ+3YmRStHa41dSb4MNcsly8c4BcEevO5LDqU1RnXJj+hFBEdeFGma15bwKBgBMt\nJfRFeGzw7yLGMMvh8yMeQVJAxKnTVDD2WqT7JurETDrlf4kwgDf91S+WzAmSYhuY\nzHh79JaD6pwIlbXO/1spctR5MlMR9nYfmHYanWE7Rr4ou6+l4NYsqRZX4HnsSwGP\njfUDovMtLxo6lbVZ4LiHqX7/hgb1hGCSAVdbpwMBAoGAbnoVZHNiodjvXtE0C/QG\ng3Nge4VYVYdtM+AaqV2xXrsUMcllqODRCX4luuwKqy5WyzqS1CQUzy2rlPVAc4od\n+l+UBiyU/q9IahG2POPpnP4/Of+0O5bvgK96LVagF8zB54SLFUaDJ1From87pxJd\nw7J11llD3GIHOp29NttBB5M=\n-----END PRIVATE KEY-----\n",
            "client_email": "spread-sheet@glass-cycle-370910.iam.gserviceaccount.com",
            "client_id": "100568372867579010613",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/spread-sheet%40glass-cycle-370910.iam.gserviceaccount.com"     
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
