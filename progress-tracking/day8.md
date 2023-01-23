# 📋DAY 8

---

## ✍️학습 내용

```js
[next.js 새로 배우는 것들]
📌 .getServerSideProps()
📌 .getStaticProps() 와 .getStaticPaths()
📌 컴포넌트명.getInitialProps()
📌 next.js에서 url param 추출 방법 (ft. [id].js)

[React 복습]
📌 컴포넌트 재사용하는 법

[js 복습]
📌 조건 (삼항) 연산자 
	let 연산결과 = 조건 ? "조건이 truthy할 경우"
    :"조건이 falsy 할 경우 실행";
📌 String.toLowerCase() -> `모두 소문자로`
📌 Array.find((item)=> item==="item")
//순환할 수 있는 객체의 item이 "item"과 같다면 그 순환한 객체 리턴
📌 Array.findIndex((item)=>item==="item")
//배열의 item이 "item"과 일치하는 첫번째 항목의 인덱스 리턴, 없다면 -1 


[axios]
📌 axios.post("http://someURL",데이터)가 아닌  axios["post"]("http://someURL",데이터) 형태로 쓸 수 있음 😮

[moment.js]
📌 `날짜를 parse,validate,manipulate,format`하는 자바스크립트 날짜 라이브러리
📌 {github :'https://github.com/moment/moment/'}
```





---

## 🤨Errors of the Day

* 에러 1: `There are multiple modules with names that only differ in casing.`
* ![img](https://blog.kakaocdn.net/dn/bWffja/btrCPHo8miG/g2CMpykKSP4AK0jIrFAEm1/img.png)
  * ⚠️에러 원인 : `<Link/> `태그를 import 할때 'next/link'가 아닌 엉뚱한 곳에서 자동 import가 되었음. 
  * 🥰해결 : import 경로 고쳐주기 
  * [참고](https://dubaiyu.tistory.com/m/299)

---

* 에러2 : React Hydration Error
  * ![Hydration failed, React Hydration error with NextJs · Issue #605 ·  nextui-org/nextui · GitHub](https://user-images.githubusercontent.com/42145480/177699110-df60dd6e-aa48-4dba-bbf0-c08e102d3d4d.png)
  * ⚠️에러 원인 : html 태그 중 `<h1></h1>`태그 안에 `<h2><h2/>`태그를 넣음
    * Invalid HTML may cause hydration mismatch such as div inside p.
    * nextjs 공식문서 중 가능한 에러 발생 원인 3에 해당하는 겨우
  * 🥰해결 : <h1></h1>를 <div></div>태그로 바꿔줌
  * [참고](https://nextjs.org/docs/messages/react-hydration-error)