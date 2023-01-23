import Layout from "components/Layout";
import { useState } from "react";
import axios from "axios";

//router 접근, 내 app내에 있는 모든 route로
import { useRouter } from "next/router";

const DEFAULT_DATA = {
  title: "",
  description: "",
  link: "",
  priority: "2",
  timeToFinish: 60,
};
const ResourceCreate = () => {
  const [form, setForm] = useState(DEFAULT_DATA);
  const router = useRouter();

  const submitForm = () => {
    // alert(JSON.stringify(form)); //{"title":"","description":"","link":"","priority":"2","timeToFininsh":60}
    //브라우저 내에서 요청하는 거이므로 http>//localhost:3000생략가능
    // fetch("/api/resources", {
    //   body: JSON.stringify(form),
    //   headers: { "Content-Type": "application/json" },
    //   method: "POST",
    // });
    //fetch는 default가 GET요청이라서 POST나 다른 요청시 항상 서술해야함 => AXIOS를 쓰자!
    axios
      .post("/api/resources", form)
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

  const resetForm = () => {
    setForm(DEFAULT_DATA);
  };

  const handleChange = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
    // 비구조할당
    const { name, value } = e.target;

    // console.log("called on title: ", e.target.name);
    //변수를 key로 하고 싶다면 []로 감싸기
    // setForm({ ...form, [e.target.name]: e.target.value });
    setForm({ ...form, [name]: value });
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
            <div className="resource-form">
              <h1 className="title">Add New Resource</h1>
              <form>
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      value={form.title}
                      onChange={handleChange}
                      name="title"
                      className="input"
                      type="text"
                      placeholder="Learn Next JS and Sanity IO"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea
                      value={form.description}
                      onChange={handleChange}
                      name="description"
                      className="textarea"
                      placeholder="Learn these technologies because they are popular and able better SEO"
                    ></textarea>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Link</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="text"
                      placeholder="http://yourLink.com"
                      value={form.link}
                      onChange={handleChange}
                      name="link"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Priority</label>
                  <div className="control">
                    <div className="select">
                      <select
                        value={form.priority}
                        onChange={handleChange}
                        name="priority"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Time to finish</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="text"
                      value={form.timeToFinish}
                      name="timeToFinish"
                      onChange={handleChange}
                    />
                  </div>
                  <p className="help">Time is in minutes</p>
                </div>
                <div className="field is-grouped">
                  <div className="control">
                    <button
                      onClick={submitForm}
                      type="button"
                      className="button is-link"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="control">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="button is-link is-light"
                    >
                      Rest Form
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ResourceCreate;
