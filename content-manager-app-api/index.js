//api endpoint 역할

//api를 분리 (서버 application 기능만 할 것임)
//분리 이유: vercel에 빌드시
//nextjs pages에 있는 api에 data.json에 데이터 저장 혹은 변경할때
//오류가 발생하는 경우가 있음
console.log("SERVER IS RUNNING");

const express = require("express");
const app = express();
const PORT = 3001;

const fs = require("fs");
const path = require("path");
const pathToFile = path.resolve("./data.json");
// console.log("pathToFile", pathToFile);

//cors 에러
// const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

const getResources = () => JSON.parse(fs.readFileSync(pathToFile));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/activeresource", (req, res) => {
  const resources = getResources();
  const activeResources = resources.find(
    (resource) => resource.status === "active"
  );
  res.send(activeResources);
  // res.send("Hello Resources");
});

app.get("/api/resources", (req, res) => {
  const resources = getResources();
  res.send(resources);
  // res.send("Hello Resources");
});

//상세 내용
// :id => /api/resources/어떠한 내용을 적으면 이 get요청으로 처리됨
// 단, /이 또 있으면 안됨
app.get("/api/resources/:id", (req, res) => {
  const resources = getResources();
  //:id에서 id자리에 쓴거랑 동일해야함
  // const resourceID = req.params.id;
  const { id } = req.params;
  const resource = resources.find((resource) => resource.id === id);
  res.send(resource);
  // res.send("Hello Resources");
});

app.post("/api/resources", (req, res) => {
  const resources = getResources();
  // console.log("Data has been received to POST endpoint");
  // console.log(req.body);
  //엇? undefined?? express한테 명시해줘야함
  //app.use(express.json()); => 모든 json 데이터는 req.body에 접근가능하도록

  const resource = req.body;

  //data.json에 보낼 정보
  resource.createdAt = new Date();
  resource.status = "inactive";
  resource.id = Date.now().toString();

  // resources.push(resource);
  //새로운 데이터가 json 첫 항목으로 들어갈 수 있도록
  resources.unshift(resource);

  //data.json에 보내기 writeFile(파일경로, 보낼 데이터(데이터,함수없이(변경X).포멧팅 indent lines))
  fs.writeFile(pathToFile, JSON.stringify(resources, null, 2), (err) => {
    //데이터가 저장되거나 에러 발생 시 작동하는 callback
    if (err) {
      return res.status(422).send("Cannot store data in file");
    }
    return res.send("Data has been saved!");
  });

  // res.send("Data has been received");
  // res.send("Hello Resources");
});

app.patch("/api/resources/:id", (req, res) => {
  const resources = getResources();
  //:id에서 id자리에 쓴거랑 동일해야함
  // const resourceID = req.params.id;
  const { id } = req.params;
  const index = resources.findIndex((resource) => resource.id === id);

  if (resources[index].status === "complete") {
    return res
      .status(422)
      .send("Cannot update because resource has been completed!");
  }
  const activeResource = resources.find(
    (resource) => resource.status === "active"
  );

  resources[index] = req.body;

  //active resource related functionality : resource activate하고 싶을 떄만 작동
  if (req.body.status === "active") {
    if (activeResource) {
      return res.status(422).send("There is an active resource already!");
    }
    //resource activate했을 경우
    resources[index].status = "active";
    //activate한 시간 정보도 주기
    resources[index].activationTime = new Date();
  }

  fs.writeFile(pathToFile, JSON.stringify(resources, null, 2), (err) => {
    //데이터가 저장되거나 에러 발생 시 작동하는 callback
    if (err) {
      return res.status(422).send("Cannot store data in file");
    }
    return res.send("Data has been updated!");
  });
});

app.listen(PORT, () => {
  console.log(`SERVER is listening on port:${PORT}`);
});
