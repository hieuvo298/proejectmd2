import React from "react";
import SideBar from "../../components/sideBar/sideBar";
import "./AdminLayout.css";

interface Props {
  child: JSX.Element;
}
const AdminLayout = (props: Props): JSX.Element => {
  return (
    <div className="wrapper-layout">
      <div className="sidebar-layout">
        <SideBar></SideBar>
      </div>
      <div className="content-layout">{props.child}</div>
    </div>
  );
};
export default AdminLayout;
