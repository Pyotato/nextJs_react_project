import Link from "next/link";

const ResourceList = ({ resources }) => {
  const renderResources = () =>
    resources.map((resource) => (
      <div className="column is-5 is-offset-1 " key={resource.id}>
        <div className="content is-medium">
          <h2 className="subtitle is-5 has-text-grey">{resource.createdAt}</h2>
          <h1 className="title has-text-black is-3">{resource.title}</h1>
          <p className="has-text-dark">{resource.description}</p>
          <Link className="button is-link" href={`/resources/${resource.id}`}>
            Details
          </Link>
        </div>
      </div>
    ));
  return (
    <section className="hero ">
      <div className="hero-body">
        <div className="container">
          <section className="section">
            <div className="columns is-variable is-8">{renderResources()}</div>
          </section>
        </div>
      </div>
    </section>
  );
};
export default ResourceList;