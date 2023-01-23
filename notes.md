import React from "react";
import { useState, useEffect } from "react";

//화살표 함수 : 깔끔해짐
//param이 하나라면 ()생략가능
//expression이 하나라면 {}생략가능
//but 틀래스의 this사용이 달라지므로 주의해야함
const ArrowFunction = (\_) => (
// console.log(params);

  <div>
    <h1>I am an arrow Function</h1>
  </div>
);

// function CompA({myProp1}) { //구조 분해로
function CompA(allprops) {
useEffect(() => {
console.log("CompA useEffect:");
}, [allprops.myProp1]);
// return (
// React.createElement("h1",nul,"compA");
// React.createElement(); //unreachable code
// );
// return React.createElement(
// "div",
// null,
// React.createElement("div", null, "compA"),
// React.createElement("p", null, "Hello Comp A"),
// React.createElement(CompB)
// );
return (
<>
{/_ <ArrowFunction /> _/}
<h1>CompA</h1>
<p>hello comp a</p>
<div>My Prop1 : {allprops.myProp1}</div>
<div>My Prop2 : {allprops.myProp2}</div>
<div>My Prop3 : {allprops.myProp3.toString()}</div>
<div>My Prop4 : {<allprops.myProp4 />}</div>

      {/* <CompB /> */}
    </>

);
}

// function CompB() {
// return (
// <>
// <h1>CompB</h1>
// <p>hello comp b</p>
// </>
// );
// }

function MyComponent() {
return <h1>MyComponent</h1>;
}

//일반 기명함수로
// export default function Home() {
function Home() {
//[stateValue, function that will help us mutate the state]
const valueState = useState(10);

//의존성 배열 없이 useEffect는 컴포넌트가 변경될때마다 호출됨
// useEffect(() => {
// console.log("useEffect Called!");
// });

// console.log(valueState[0]);
//useState는 배열에 stqte의 값과,
//그를 변경할 함수가 들어있음!

// 그래서 쪼개보면 이런 형태임
// const value = valueState[0];
// const setValue = valueState[1];

//근데 함께 쓰는 방식이 더 잦음 (구조분해)
const [myValue, setValue] = useState(10);
const [myOtherValue, setOtherValue] = useState(10);
// const changeValue = (incrementor) => {
// setValue(myValue + incrementor); //Home()를 다시 실행
// };
// const changeValue = (incrementor) => {
// setValue(myValue + incrementor); //Home()를 다시 실행
// };
// const incrementValue = () => {
// console.log(myValue);
// setValue(myValue + 1); //Home()를 다시 실행
// };
// const decrementValue = () => {
// console.log(myValue);
// setValue(myValue - 1); //Home()를 다시 실행
// };

console.log("초기에 함수 실행");
useEffect(() => {
console.log("useEffect Called!");
}, [myValue]);
// }, []);//처음 마운트 했을때만 실행

//함수로
// export default function () {
return (
<>
Current Value :<h1>{myValue}</h1>
<button onClick={() => setValue(myValue + 1)}> + </button>
<button onClick={() => setValue(myValue - 1)}> - </button>
Other Value :<h1>{myOtherValue}</h1>
<button onClick={() => setOtherValue(myOtherValue + 1)}> + </button>
<button onClick={() => setOtherValue(myOtherValue - 1)}> - </button>
{/_ <button onClick={() => changeValue(+1)}> + </button>
<button onClick={() => changeValue(-1)}> - </button> _/}
{/_ valueState : {valueState} _/}
{/_ <h1>hello world</h1> _/}
{/_ <CompA /> _/}
<CompC myProp1={myValue} MyProp2={MyComponent} />
</>
);
}

//화살표 함수로
// const HomePage = () => {
// return (
// <>
// <h1>hello world</h1>
// <CompA />
// {/_ <CompC /> _/}
// </>
// );
// };
export default Home;
// export default HomePage;

//class components 이제는 잘 안쓰임 (이제는 함수형으로~)
//why? 이전 버젼에서 컴포넌트 state 유지하기 위해서는
// class 형으로 써야했지만, hook의 도입으로 인해 state 유지가
// class 형에 의존할 필요가 없어짐
class CompC extends React.Component {
state = { myValue: 10 };
changeState(incrementor) {
// console.log(incrementor);
this.setState({ myValue: incrementor });
}

//생성자로 할때...
//문제점 : 부모인 React에 생성자이기 때문에
//부모의 것들을 불러와야함 super();
constructor() {
super();
this.state = { myValue: 10 };
}

// render() {
// // h1컴포넌트를 만들고, props전달 X, h1안에 넣을 내용
// return React.createElement("h1", null, "hello comp C");
// }

// class형이므로 this로 접근해야함
render() {
//변수에 담기
// const myValue = this.state;

    //구조분해하기
    const { myValue } = this.state;
    const { myProp1, MyProp2 } = this.props;

    //클래스형은 함수형과 달리 전체 함수를 재실행하는 게 아니라 render부분만 다시 실행함
    console.log("i am reexecuted");
    return (
      <>
        <h1>Hello CompC</h1> Current Value :<h1>{myValue}</h1>
        <button onClick={() => this.changeState(myValue + 1)}> + </button>
        <button onClick={() => this.changeState(myValue - 1)}> - </button>
        {/* <CompA
          myProp1={myValue}
          myProp2="My Custom value"
          myProp3={true}
          myProp4={() => <div>MY NEW JSX!</div>}
        /> */}
        <h2>{myProp1}</h2>
        <h2>{MyProp2}</h2>
      </>
    );

}
}

//JSX란? =javascript XML
// html처럼 생겼는데? 이 파일은 분명 js 파일인데?
//jsx 사용하면 추상화 (createElement 궅이 안해줘도 됨)
//그리고 element가 여러개면 createElement로 할 경우 어엽고 복잡함
//콜백지옥도 아니고..계속 element감싸주고 있음..
/_
return React.createElement(
"div",
null,
React.createElement("div", null, "compA"),
React.createElement("p", null, "Hello Comp A"),
React.createElement(CompB)
);
_/

/_ babel.js에서 어떻게 jsx가 변환되는 지 보면..._/
// function CompA() {
// return (
// React.createElement("h1",nul,"compA");
// React.createElement(); //unreachable code
// );
// return React.createElement(
// "div",
// null,
// React.createElement("div", null, "compA"),
// React.createElement("p", null, "Hello Comp A"),
// React.createElement(CompB)
// );
// return /_#**PURE**_/React.createElement(React.Fragment, null, /_#**PURE**_/React.createElement("h1", null, "CompA"), /_#**PURE**_/React.createElement("p", null, "hello comp a"), /_#**PURE**_/React.createElement(CompB, null));
//Fragment === <></>
