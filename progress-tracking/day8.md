# ๐DAY 8

---

## โ๏ธํ์ต ๋ด์ฉ

```js
[next.js ์๋ก ๋ฐฐ์ฐ๋ ๊ฒ๋ค]
๐ .getServerSideProps()
๐ .getStaticProps() ์ .getStaticPaths()
๐ ์ปดํฌ๋ํธ๋ช.getInitialProps()
๐ next.js์์ url param ์ถ์ถ ๋ฐฉ๋ฒ (ft. [id].js)

[React ๋ณต์ต]
๐ ์ปดํฌ๋ํธ ์ฌ์ฌ์ฉํ๋ ๋ฒ

[js ๋ณต์ต]
๐ ์กฐ๊ฑด (์ผํญ) ์ฐ์ฐ์ 
	let ์ฐ์ฐ๊ฒฐ๊ณผ = ์กฐ๊ฑด ? "์กฐ๊ฑด์ด truthyํ  ๊ฒฝ์ฐ"
    :"์กฐ๊ฑด์ด falsy ํ  ๊ฒฝ์ฐ ์คํ";
๐ String.toLowerCase() -> `๋ชจ๋ ์๋ฌธ์๋ก`
๐ Array.find((item)=> item==="item")
//์ํํ  ์ ์๋ ๊ฐ์ฒด์ item์ด "item"๊ณผ ๊ฐ๋ค๋ฉด ๊ทธ ์ํํ ๊ฐ์ฒด ๋ฆฌํด
๐ Array.findIndex((item)=>item==="item")
//๋ฐฐ์ด์ item์ด "item"๊ณผ ์ผ์นํ๋ ์ฒซ๋ฒ์งธ ํญ๋ชฉ์ ์ธ๋ฑ์ค ๋ฆฌํด, ์๋ค๋ฉด -1 


[axios]
๐ axios.post("http://someURL",๋ฐ์ดํฐ)๊ฐ ์๋  axios["post"]("http://someURL",๋ฐ์ดํฐ) ํํ๋ก ์ธ ์ ์์ ๐ฎ

[moment.js]
๐ `๋ ์ง๋ฅผ parse,validate,manipulate,format`ํ๋ ์๋ฐ์คํฌ๋ฆฝํธ ๋ ์ง ๋ผ์ด๋ธ๋ฌ๋ฆฌ
๐ {github :'https://github.com/moment/moment/'}
```





---

## ๐คจErrors of the Day

* ์๋ฌ 1: `There are multiple modules with names that only differ in casing.`
* ![img](https://blog.kakaocdn.net/dn/bWffja/btrCPHo8miG/g2CMpykKSP4AK0jIrFAEm1/img.png)
  * โ ๏ธ์๋ฌ ์์ธ : `<Link/> `ํ๊ทธ๋ฅผ import ํ ๋ 'next/link'๊ฐ ์๋ ์๋ฑํ ๊ณณ์์ ์๋ import๊ฐ ๋์์. 
  * ๐ฅฐํด๊ฒฐ : import ๊ฒฝ๋ก ๊ณ ์ณ์ฃผ๊ธฐ 
  * [์ฐธ๊ณ ](https://dubaiyu.tistory.com/m/299)

---

* ์๋ฌ2 : React Hydration Error
  * ![Hydration failed, React Hydration error with NextJs ยท Issue #605 ยท  nextui-org/nextui ยท GitHub](https://user-images.githubusercontent.com/42145480/177699110-df60dd6e-aa48-4dba-bbf0-c08e102d3d4d.png)
  * โ ๏ธ์๋ฌ ์์ธ : html ํ๊ทธ ์ค `<h1></h1>`ํ๊ทธ ์์ `<h2><h2/>`ํ๊ทธ๋ฅผ ๋ฃ์
    * Invalid HTML may cause hydration mismatch such as div inside p.
    * nextjs ๊ณต์๋ฌธ์ ์ค ๊ฐ๋ฅํ ์๋ฌ ๋ฐ์ ์์ธ 3์ ํด๋นํ๋ ๊ฒจ์ฐ
  * ๐ฅฐํด๊ฒฐ : `<h1></h1>`๋ฅผ `<div></div>`ํ๊ทธ๋ก ๋ฐ๊ฟ์ค
  * [์ฐธ๊ณ ](https://nextjs.org/docs/messages/react-hydration-error)