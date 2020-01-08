import React from "react";
import { Tabs } from "antd";
import LinearRegressionTab from "../tabs/machineLearning/linearRegressionTab";
import UpdateLaterPanel from "../components/updateLaterPanel";

const { TabPane } = Tabs;

export default function MachineLearning() {
    return (
        <Tabs type="line" tabPosition="left" defaultActiveKey="0">
            <TabPane tab="Linear Regression" key="0">
                <LinearRegressionTab />
            </TabPane>
            <TabPane tab="K-means Clustering" key="1">
                <UpdateLaterPanel />
            </TabPane>
        </Tabs>
    );
}