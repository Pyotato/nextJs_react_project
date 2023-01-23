import ResourceForm from "components/ResourceForm";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "components/Layout";

const ResourceEdit = ({ resource }) => {
  const router = useRouter();
  const updateResource = (formData) => {
    // alert(JSON.stringify(formData));
    //patch => 있던 데이터 수정
    axios
      .patch("/api/resources", formData)
      .then((_) => {
        // alert("Data has been Updated");
        router.push("/");
      })
      .catch((err) => {
        alert(err?.response?.data);
      });
  };

  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <ResourceForm
              initialData={resource}
              onFormSubmit={updateResource}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

//prefill form with data
export async function getServerSideProps({ params }) {
  const dataRes = await fetch(
    `http://localhost:3001/api/resources/${params.id}`
  );
  const data = await dataRes.json();
  return {
    props: {
      resource: data,
    },
  };
}

export default ResourceEdit;
