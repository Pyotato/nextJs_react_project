import { useState } from "react";

const DEFAULT_DATA = {
  title: "",
  description: "",
  link: "",
  priority: "2",
  timeToFinish: 60,
};

const ResourceForm = ({ onFormSubmit, initialData }) => {
  const [form, setForm] = useState(initialData || DEFAULT_DATA);
  //initialData || DEFAULT_DATA가 undefined라면 DEFAULT_DATA로 채우기

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
  const submitForm = () => {
    onFormSubmit(form);
  };

  return (
    <>
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
    </>
  );
};
export default ResourceForm;
