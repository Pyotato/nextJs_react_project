import axios from "axios";

export default async function (req, res) {
  // req.method "GET" "POST"
  let url = `${process.env.API_URL}/resources`;
  if (req.method === "GET") {
    const dataRes = await fetch(url);
    const data = await dataRes.json();
    return res.send(data);
  }
  if (req.method === "POST" || req.method === "PATCH") {
    console.log(req.body);
    //구조븐헤
    const { id, title, description, link, timeToFinish, priority } = req.body;

    if ((req.method = "PATCH")) {
      url += `/${id}`;
    }
    //조건 (삼항) 연산자
    // let url =
    //   req.method === "POST"
    //     ? `${process.env.API_URL}/resources`
    //     : `/${process.env.API_URL}resources/${id}`;

    if (!title || !description || !link || !timeToFinish || !priority) {
      return res.status(422).send("Data are missing");
    }

    console.log("req is going to ", url);
    console.log("req.method is ", req.method.toLowerCase());
    //request 도중 서버 쪽 에러가 발생할 수 있으므로 try catch로 감싸주기
    try {
      //동기적으로 data 받아와서 사용하기
      //axios["patch"] === axios.patch()
      //req.method는 대문자이므로 소문자로 바꿔주기
      const axiosRes = await axios[req.method.toLowerCase()](url, req.body);
      return res.send(axiosRes.data);
    } catch {
      //저장 실패 시 보낼 메세지
      return res.status(422).send("Data cannot be stored.");
    }
  }
}
