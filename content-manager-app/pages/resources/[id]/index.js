//dynamic page
//resource에 대한 상세 정보가 보이는 페이지임
//resource의 id에 따라 resource 내용이 동적으로 보여져야함
//nextjs에서는 [파일이름].js 로 지정해주면 됨

import Layout from "components/Layout";
import axios from "axios";
import Link from "next/link";
import ResourceLabel from "@/components/ResourceLabel";
import moment from "moment";
// import { useRouter } from "next/router";

//url로부터 이 파람을 뽑아내려면 반드시 []로 감싸주기!
const ResourceDetail = ({ resource }) => {
  //   const router = useRouter();
  //   if (router.isFallback) {
  //     //getStaticPaths에서 404페이지를 가져오기 전 data fetch를 다시 요청할 떄 보일 페이지
  //     return <div>Loading Data!</div>;
  //   } //npm run build하고 npm start하면 잠시 보임! 근데 바로 error남 (데이터 못받아올 때 error handling 안해줘서)

  //리스트 항목 active으로 바꿔주기
  const activateResource = () => {
    axios
      .patch("/api/resources", { ...resource, status: "active" })
      .then((_) => {
        location.reload();
        // alert("Resource activated!");
      })
      .catch(() => {
        alert("Cannot activate resource!");
      });
  };

  return (
    <Layout>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-8 is-offset-2">
                <div className="content is-medium">
                  <h2 className="subtitle is-4">
                    {moment(resource.createdAt).format("LLL")}
                    <ResourceLabel status={resource.status} />
                  </h2>
                  <h1 className="title">{resource.title}</h1>
                  <p>{resource.description}</p>
                  <p>Time to finish : {resource.timeToFinish} mins</p>

                  {resource.status == "inactive" && (
                    <>
                      <Link
                        href={`/resources/${resource.id}/edit`}
                        className="button is-warning"
                      >
                        Update
                      </Link>
                      <button
                        onClick={activateResource}
                        className="button is-success ml-2"
                      >
                        Activate
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* {resources.map((resource) => {
              return (
                <section className="section" key={resource.id}>
                  <div className="columns">
                    <div className="column is-8 is-offset-2">
                      <div className="content is-medium">
                        <h2 className="subtitle is-4">{resource.createdAt}</h2>
                        <h1 className="title">{resource.title}</h1>
                        <p>{resource.description}</p>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })} */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

//약간 deprecated되고 있는 함수이지만
//server + client 쪽 모두 실행하는 함수라서 신기함
//링크를 클릭했을때 cors 에러 발생 ! 근데 새로 고침하면 데이터 가져오기 성공
//⚠️ 링크를 클릭 (client)쪽에 요청을 함 (3000=>3001 :cors 에러)
// 새로고침 (server)쪽에서 요청을 함 (3001=> 3001: 에러 없음)
//방지 방안? proxy request를 api 쪽에다가 해주기
// ResourceDetail.getInitialProps = async ({ query }) => {
//   const dataRes = await fetch(
//     `http://localhost:3001/api/resources/${query.id}`
//   );
//   console.log("getInitialProps has been called!");

//   const data = await dataRes.json();

//   return {
//     resource: data,
//   };
// };

//getStaticProps
//Error: getStaticPaths is required for dynamic SSG pages
//and is missing for '/resources/[id]'.

//에러 원인:getStaticProps는 build 타임에 호출됨..
//현재 페이지가 동적페이지이므로
//build 시 생성되는 id들이 주어지지 않음
//npm build 를 해보면 id페이지 개수만큼 html이 생성됨! (getServerSideProps는 id 페이지에 해당 html 하나만 생성)

// export async function getStaticPaths() {
//   //getStatic Props 에 필요한 id들을 모두 리턴해줘야함
//   const resData = await fetch("http://localhost:3001/api/resources");
//   const data = await resData.json();
//   const paths = data.map((resource) => {
//     return { params: { id: resource.id } };
//   });

//   return {
//     paths,
//     // fallback: true, //404페이지로 가기 전에 data fetch해서 있는지 다시한번 기회주기
//     fallback: false, //존재하지 않은 id로 페이지 이동시 404페이지로
//   };
//   //   return {
//   //     paths:
//   //   }
// }

// export async function getStaticProps({ params }) {
//   const dataRes = await fetch(
//     `http://localhost:3001/api/resources/${params.id}`
//   );

//   const data = await dataRes.json();

//   // export function getServerSideProps({ params, query }) {
//   //   console.log(query); //{ id: '2' }
//   console.log(params); //{ id: '2' }
//   //{params}: context를 구조분해
//   //params.id 에서 페이지 이름의 []안과 동일해야함
//   //즉, id라고 페이지 이름을 지었다면 param.뒤에도 같아야함
//   return {
//     props: {
//       resource: data,
//       //   resourceId: query.id, //로 해도 동일한 결과,
//       //근데 query로 더 많은 정보를 가져올 수 있음
//       //http://localhost:3000/resources/2?someParam=helloWorld
//       //터미널에 뜸: { someParam: 'helloWorld', id: '2' }
//     },
//     revalidate: 1, //time in sec, 페이지 방문 1초 후 data regenerate하도록
//     // unstable_revalidate: 1,//예전
//   };
// }

export async function getServerSideProps({ params }) {
  const dataRes = await fetch(`${process.env.API_URL}/resources/${params.id}`);

  const data = await dataRes.json();

  // export function getServerSideProps({ params, query }) {
  //   console.log(query); //{ id: '2' }
  console.log(params); //{ id: '2' }
  //{params}: context를 구조분해
  //params.id 에서 페이지 이름의 []안과 동일해야함
  //즉, id라고 페이지 이름을 지었다면 param.뒤에도 같아야함
  return {
    props: {
      resource: data,
      //   resourceId: query.id, //로 해도 동일한 결과,
      //근데 query로 더 많은 정보를 가져올 수 있음
      //http://localhost:3000/resources/2?someParam=helloWorld
      //터미널에 뜸: { someParam: 'helloWorld', id: '2' }
    },
  };
}
export default ResourceDetail;
