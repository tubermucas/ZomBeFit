import React, { useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState(null); // Global state for user data

  return <Component {...pageProps} userData={userData} setUserData={setUserData} />;
}

export default MyApp;
