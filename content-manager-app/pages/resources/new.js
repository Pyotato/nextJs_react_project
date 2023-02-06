import Layout from "components/Layout";
// import { useState } from "react";
import axios from "axios";

//router 접근, 내 app내에 있는 모든 route로
import { useRouter } from "next/router";
import ResourceForm from "components/ResourceForm";

const ResourceCreate = () => {
  // const [form, setForm] = useState(DEFAULT_DATA);
  const router = useRouter();

  const createResource = (formData) => {
    // alert(JSON.stringify(form)); //{"title":"","description":"","link":"","priority":"2","timeToFininsh":60}
    //브라우저 내에서 요청하는 거이므로 http>//localhost:3000생략가능
    // fetch("/api/resources", {
    //   body: JSON.stringify(form),
    //   headers: { "Content-Type": "application/json" },
    //   method: "POST",
    // });
    //fetch는 default가 GET요청이라서 POST나 다른 요청시 항상 서술해야함 => AXIOS를 쓰자!
    axios
      .post("/api/resources", formData)
      .then((_) => {
        router.push("/");
        // alert(res?.data);
      })
      .catch((err) => {
        // debugger;
        //?. optional chaining
        alert(err?.message);
      });
  };

  // const person = { hehe: undefined };
  // const person = { hehe: { haha: "hi" }, hoho: [1, 2, 3, 4] };

  return (
    <Layout>
      {/* TypeError: Cannot read properties of undefined (reading '0') */}
      {/* {person.haha.hehe} */}
      {/* optional chaining */}
      {/* 중첩된 객체에서 ?앞의 가 undefined일 경우 에러 대신 undefined 리턴 */}
      {/* {person.haha?.hehe} */}
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <ResourceForm onFormSubmit={createResource} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ResourceCreate;
