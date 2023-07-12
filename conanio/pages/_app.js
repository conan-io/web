import React from "react";

import '../styles/bootstrap.min.css';
import '../styles/style.css';
import '../styles/stylev2.css';
import '../styles/font.css';
import '../styles/index.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
export default MyApp

// export function MyApp({ Component, pageProps }) {
//   const [loading, setLoading] = useState(false);
//   React.useEffect(() => {
//     const start = () => {
//       console.log("start");
//       setLoading(true);
//     };
//     const end = () => {
//       console.log("findished");
//       setLoading(false);
//     };
//     Router.events.on("routeChangeStart", start);
//     Router.events.on("routeChangeComplete", end);
//     Router.events.on("routeChangeError", end);
//     return () => {
//       Router.events.off("routeChangeStart", start);
//       Router.events.off("routeChangeComplete", end);
//       Router.events.off("routeChangeError", end);
//     };
//   }, []);
//   return (
//     <>
//       {loading ? (
//         <div className="flex-wrapper">
//           <ConanKitchenHeader/>
//           <div className="text-center">
//             <div className="spinner-grow conan-loading text-primary">
//             </div>
//           </div>
//           <ConanFooter/>
//         </div>
//       ) : (
//         <Component {...pageProps} />
//       )}
//     </>
//   );
// }
//
// export default MyApp
