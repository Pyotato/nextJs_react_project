import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";

const ActiveResource = () => {
  //state to keep track of activeresource
  const [resource, setResource] = useState({});

  //완성하기까지 남은 시간 state가 업데이트 될 때마다
  const [seconds, setSeconds] = useState();

  //request to fetch data
  useEffect(() => {
    async function fetchActiveResource() {
      const axiosRes = await axios.get("/api/activeresource");
      const resource = axiosRes.data;
      //시간
      const timeToFinish = parseInt(resource.timeToFinish, 10);

      //경과 시간
      const elapsedTime = moment().diff(
        moment(resource.activationTime),
        "seconds"
      );
      // "14:26 -> current time"
      // "14:27 -> activation time" 따라서 elapsedTime =60sec

      //완성하기까지 남은 시간
      const updatedTimeToFinish = timeToFinish * 60 - elapsedTime;

      if (updatedTimeToFinish >= 0) {
        resource.timeToFinish = updatedTimeToFinish;
        setSeconds(updatedTimeToFinish);
      }

      // alert(updatedTimeToFinish);
      setResource(resource);
    }
    fetchActiveResource();
  }, []);

  //seconds 바뀔때마다 리랜더
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000); //ms 단위로 (1000-> 매초)
    if (seconds < 0) {
      clearInterval(interval);
    }

    //현재 컴포넌트 언마운트시 , cleanup 함수
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <>
      <div className="active-resource">
        <h1 className="resource-name">{resource.title}</h1>
        <div className="time-wrapper">
          <h2 className="elapsed-time">{seconds}</h2>
        </div>
        <Link href="/" className="button">
          Go to resource
        </Link>
      </div>
    </>
  );
};
export default ActiveResource;
