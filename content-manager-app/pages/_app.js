//모든 컴포넌트들이 랜더링 전 거쳐 가는 곳!
import "bulma/css/bulma.min.css";
import "@/styles/globals.css";
function MainApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default MainApp;
