import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import './defaultLayout.css'


interface Props {
  child:JSX.Element

}
const DefaultLayout = (props:Props):JSX.Element => {
  return (
    <div className="wrapper-layout">
      <div className="header-layout">
        <Header/>
      </div>
      <div className="content-layout">
      {props.child}
      </div>
      <div className="footer-layout">
        <Footer />
      </div>
    </div>
  );
}
export default DefaultLayout