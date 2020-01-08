import React from "react";
import { Tabs } from "antd";
import LinearRegressionTab from "../tabs/machineLearning/linearRegressionTab";
import UpdateLaterPanel from "../components/updateLaterPanel";
import QuadraticRegressionTab from "../tabs/machineLearning/quadraticRegressionTab";
import CubicRegressionTab from "../tabs/machineLearning/cubicRegressionTab";

const { TabPane } = Tabs;

export default function MachineLearning() {
    return (
        <Tabs type="line" tabPosition="left" defaultActiveKey="0">
            <TabPane tab="Linear Regression" key="0">
                <LinearRegressionTab />
            </TabPane>
            <TabPane tab="Quadratic Regression" key="1">
                <QuadraticRegressionTab />
            </TabPane>
            <TabPane tab="Cubic Regression" key="2">
                <CubicRegressionTab />
            </TabPane>
            <TabPane tab="K-means Clustering" key="3">
                <UpdateLaterPanel />
            </TabPane>
        </Tabs>
    );
}