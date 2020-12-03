import React, { useState } from 'react';
import { Button, Divider, Table, Tag, InputNumber, Row, Col } from "antd";
import produce from "immer";

export default function KMeansClustering() {

    const [inputX, setInputX] = useState(0);
    const [inputY, setInputY] = useState(0);
    const [inputCluster, setInputCluster] = useState(0);
    const [xValues, setXValues] = useState([3, 8, 4, 7, 4, 0, 2, 5, 1, 9]);
    const [yValues, setYValues] = useState([5, 6, 9, 3, 7, 0, 1, 3, 2, 5]);
    const [clusters, setClusters] = useState([1, 2, 1, 2, 1, 2, 1, 2, 1, 2]);

    const tableColumns = [
        { title: "X", dataIndex: "x", key: "x", render: text => <Tag>{text.toFixed(2)}</Tag> },
        { title: "Y", dataIndex: "y", key: "y", render: text => <Tag>{text.toFixed(2)}</Tag> },
        { title: "Cluster", dataIndex: "cluster", key: "cluster", render: text => <Tag>{text}</Tag> }
    ];

    const tableDataSource = () => {
        if (xValues.length < 1 || yValues.length < 1 || clusters.length < 1)
            return [];

        let result = [];
        for (let i = 0; i < xValues.length; i++) {
            result.push({
                "key": i,
                "x": xValues[i],
                "y": yValues[i],
                "cluster": clusters[i]
            })
        }
        return result;
    }

    function addNewTrainValues(newXValue, newYValue, newCluster) {
        const newXValues = produce(xValues, copy => {
            copy.push(newXValue);
            return copy;
        });
        const newYValues = produce(yValues, copy => {
            copy.push(newYValue);
            return copy;
        });
        const newClusters = produce(clusters, copy => {
            copy.push(newCluster);
            return copy;
        });

        setXValues(newXValues);
        setYValues(newYValues);
        setClusters(newClusters);
    }

    const settingPanel = (
        <div>
            X: <InputNumber step={0.1} min={0} max={100} value={inputX} onChange={value => setInputX(value)} />
            <Divider type="vertical" />
            Y: <InputNumber step={0.1} min={0} max={100} value={inputY} onChange={value => setInputY(value)} />
            <Divider type="vertical" />
            Cluster: <InputNumber step={1} min={1} max={10} value={inputCluster} onChange={value => setInputCluster(value)} />
            <Divider type="vertical" />
            <Button type="primary" onClick={() => addNewTrainValues(inputX, inputY, inputCluster)}>
                Add Data
            </Button>
        </div>
    );

    const dataTable = (
        <Table 
            pagination={{ hideOnSinglePage: true }} 
            size="small" 
            bordered 
            dataSource={tableDataSource()} 
            columns={tableColumns} 
        />
    );

    const chart = (
        
    );

    return (
        <div>
            {settingPanel}
            <Divider type="horizontal" />
            <Row>
                <Col span={12}>{dataTable}</Col>
            </Row>

        </div>
    );
}