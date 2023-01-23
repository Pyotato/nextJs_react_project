import axios from "axios";

export default async function (req, res) {
  // req.method "GET" "POST"
  if (req.method === "GET") {
    const dataRes = fetch("http://localhost:3001/api/resources");
    const data = (await dataRes).json();
    return res.send(data);
  }
  if (req.method === "POST") {
    console.log(req.body);
    //구조븐헤
    const { title, description, link, timeToFinish, priority } = req.body;

    if (!title || !description || !link || !timeToFinish || !priority) {
      return res.status(422).send("Data are missing");
    }

    //request 도중 서버 쪽 에러가 발생할 수 있으므로
    try {
      //동기적으로 data 받아와서 사용하기
      const axiosRes = await axios.post(
        "http://localhost:3001/api/resources",
        req.body
      );
      return res.send(axiosRes.data);
    } catch {
      //저장 실패 시 보낼 메세지
      return res.status(422).send("Data cannot be stored.");
    }
  }
}
