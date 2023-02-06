import Layout from "components/Layout";

import NewsLetter from "components/NewsLetter";
import ResourceHighlight from "components/ResourceHighlight";
import ResourceList from "components/ResourceList";
import React from "react";
// import { useState, useEffect } from "react";
// import { resources } from "api/data";

// default : static page임 (get serverside props나 get serverside 없이)
function Home({ resources }) {
  //클라이언트 쪽에서 실행 => 개발자툴 콘솔창
  // console.log("hi there🥰🥰🥰");

  // debugger;

  // CORS에러
  // cross origin resource sharing
  // 한 도메인(3000)에서 다른 도메인(3001)으로 req보낼 수 없음
  // Access to fetch at 'http://localhost:3001/api/resources' from origin 'http://localhost:3000' has been blocked by CORS policy:
  //No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs,
  // set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
  //왜 그럴까? 위험성
  //개발자 도구에서 도메인에서 다른 도메인으로 요청을 보낸다면?
  //민감한 정보를 캐낼 수도..

  //해결방안? proxy
  // useEffect(() => {
  //   //현재 /api의 resources에서 3001로 요청
  //   fetch("http://localhost:3000/api/resources");
  //   //cors 설치 후 요청 허락하는 도메인 정해주기
  //   // fetch("http://localhost:3001/api/resources");
  // }, []);

  return (
    <>
      <Layout>
        <ResourceHighlight resources={resources.slice(0, 2)} />
        <NewsLetter />
        <ResourceList resources={resources.slice(2)} />
      </Layout>
    </>
  );
}

//get serverside props
//is called EVERY TIME I visit the page
//function is executed on the server
//data is always fresh!
//변경이 잦거나 data 변화가 많은 페이지에
export async function getServerSideProps() {
  const resData = await fetch(`${process.env.API_URL}/resources`);
  const data = await resData.json();
  //next는 serverside+clientside 둘 다
  //서버 쪽에서 실행 => cmd
  // console.log(data);

  //getStaticProps 사용 시 getStaticPaths가 리턴해야할 자료 형식
  console.log(
    data.map((resource) => {
      return { params: { id: resource.id } };
    })
  );
  // console.log("hi there, from the server hehe");
  return {
    props: {
      resources: data,
    },
  };
}

//get static state props
// 정적인 데이터들, seo + fast
//is called at the build time, and it is called ONLY ONCE
//deploy했을 때 build 폴더(.next)에 index.html 생성
//미리 생성되었으므로 매우 빨리 페이지를 가져옴

//람다 기호 ( λ ) : ssr at runtime (getInitialProps는 유행에 뒤쳐짐..📌getServerSideProps)
//Static : 정적
//SSG(server side generated): 📌getStaticProps
//ISR (incremental static regeneration)

// nextjs framework will be handling this function
// use this to prefill page with data
//benefit : can make server site calls
// export async function getStaticProps() {
//   //fetch func
//   const resData = await fetch("http://localhost:3000/api/resources");

//   //resolve data : Fetch Api에 따르면 json형식으로 변환해줘야함
//   const data = await resData.json();

//   console.log("Calling getStaticProps");

//   // 개발자도구 > network 열어보면
//   // localhost로 html 요청했을떄
//   // fetch했던 데이터가 html 페이지에 담겨서 옴
//   // html 로드하고 데이터 요청 (X), prefilled html 로드 (O)
//   return {
//     props: {
//       resources: data,
//     },
//   };
// }

export default Home;
