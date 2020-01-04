import React from "react";
import { Spin, Divider } from "antd";

export default function UpdateLaterPanel() {
    return (
        <div style={{ textAlign: "center" }}>
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
    );
}