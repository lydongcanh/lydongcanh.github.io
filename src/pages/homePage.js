import React from "react";
import Navbar from "../components/navbar";
import { Spin, Divider } from "antd";

export default function HomePage() {
    return (
        <div>
            <Navbar defaultSelectedKeys="home" />
            <div style={{textAlign: "center", verticalAlign: "middle"}}>
                <br />
                <Spin size="small" />
                <Divider type="vertical" />
                <Spin size="default" />
                <Divider type="vertical" />
                <Spin size="large" />
                <Divider type="vertical" />
                <Spin size="default" />
                <Divider type="vertical" />
                <Spin size="small" />
                <Divider type="horizontal" />
                <b>Update later...</b>
            </div>
        </div >
    );
}