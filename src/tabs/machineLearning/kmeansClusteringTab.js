import React, { useState } from 'react';
import { Button, Divider, Table, Tag, InputNumber, Row, Col, Icon, message } from "antd";
import produce from "immer";

export default function KMeansClustering() {

    const [inputX, setInputX] = useState(0);
    const [inputY, setInputY] = useState(0);
    const [inputCluster, setInputCluster] = useState(1);
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [clusterCount, setClusterCount] = useState(2);
    const [xCenters, setXCenters] = useState([]);
    const [yCenters, setYCenters] = useState([]);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    
    const reset = () => {
        setInputX(0);
        setInputY(0);
        setInputCluster(1);
        setXValues([]);
        setYValues([]);
        setClusters([]);
        setClusterCount(2);
        setXCenters([]);
        setYCenters([]);
        setIsCalculating(false);
        setIsStarted(false);
    };

    const sourceTableColumns = [
        { title: "#", dataIndex: "index", key: "index", render: text => text },
        { title: "X", dataIndex: "x", key: "x", render: text => <Tag>{text.toFixed(2)}</Tag> },
        { title: "Y", dataIndex: "y", key: "y", render: text => <Tag>{text.toFixed(2)}</Tag> },
        { title: "K", dataIndex: "cluster", key: "cluster", render: text => <Tag>{text}</Tag> }
    ];

    const centerTableColumns = [
        { title: "#", dataIndex: "index", key: "index", render: text => text },
        { title: "X", dataIndex: "x", key: "x", render: text => <Tag>{text.toFixed(2)}</Tag> },
        { title: "Y", dataIndex: "y", key: "y", render: text => <Tag>{text.toFixed(2)}</Tag> },
    ];

    const tableDataSource = () => {
        if (xValues.length < 1 || yValues.length < 1 || clusters.length < 1)
            return [];

        let result = [];
        for (let i = 0; i < xValues.length; i++) {
            result.push({
                "key": i,
                "index": i + 1,
                "x": xValues[i],
                "y": yValues[i],
                "cluster": clusters[i]
            })
        }
        return result;
    }

    const centerTableSource = () => {
        if (xCenters.length < 1 || yCenters.length < 1)
            return [];

        let result = [];
        for (let i = 0; i < xCenters.length; i++) {
            result.push({
                "key": i,
                "index": i + 1,
                "x": xCenters[i],
                "y": yCenters[i],
            })
        }
        return result;
    }

    const addNewTrainValues = (newXValue, newYValue, newCluster) => {
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

        setInputX(Math.floor(Math.random() * 10));
        setInputY(Math.floor(Math.random() * 10));
        setInputCluster(Math.floor(Math.random() * clusterCount) + 1);
    }

    const runKmeansClustering = () => {
        if (xValues.length < 1 || yValues.length < 1 || clusters.length < 1)
            return;

        setIsCalculating(true);
        setIsStarted(true);
    
        const newXCenters = [];
        const newYCenters = [];
        for (let i = 0; i < clusterCount; i++) {
            let sumX = 0;
            let sumY = 0;
            let count = 0;
            for (let j = 0; j < clusters.length; j++) {
                if (clusters[j] != (i + 1))
                    continue;
                
                count++;
                sumX += xValues[j];
                sumY += yValues[j];
            }

            if (count == 0) {
                newXCenters.push(0);
                newYCenters.push(0);
                continue;
            }

            newXCenters.push(sumX / count);
            newYCenters.push(sumY / count);            
        }

        const newClusters = [];
        for (let i = 0; i < xValues.length; i++) {
            let newCluster = 0;
            let minDistance = Number.POSITIVE_INFINITY;
            for(let j = 0; j < newXCenters.length; j++) {
                const a = xValues[i] - newXCenters[j];
                const b = yValues[i] - newYCenters[j];
                const distance = Math.sqrt(a * a + b * b);
                if (minDistance >= distance) {
                    minDistance = distance;
                    newCluster = j + 1;
                }
            }

            newClusters.push(newCluster);
        }
        

        let doneFlag = true;
        for(let i = 0; i < clusters.length; i++) {
            if (clusters[i] != newClusters[i])
                doneFlag = false;
        }
        if (doneFlag)
            message.success("Done!!!!")

        setXCenters(newXCenters);
        setYCenters(newYCenters);
        setClusters(newClusters);
        setIsCalculating(false);
    }

    const settingPanel = (
        <div>
            X: <InputNumber step={0.1} min={0} max={100} value={inputX} onChange={value => setInputX(value)} />
            <Divider type="vertical" />

            Y: <InputNumber step={0.1} min={0} max={100} value={inputY} onChange={value => setInputY(value)} />
            <Divider type="vertical" />

            K: <InputNumber step={1} min={1} max={clusterCount} value={inputCluster} onChange={value => setInputCluster(value)} />
            <Divider type="vertical" />

            Number of clusters (K): <InputNumber step={1} min={2} max={10} value={clusterCount} onChange={value => setClusterCount(value)} />
            <Divider type="vertical" />

            <Button type="primary" disabled={isStarted} onClick={() => addNewTrainValues(inputX, inputY, inputCluster)}>
                Add Data
            </Button>

            <Divider type="vertical" />
            <Button disabled={isCalculating} type="danger" onClick={runKmeansClustering}>
                <Icon type="play-circle" />
                Go
            </Button>

            <Divider type="vertical" />
            <Button type="dashed" onClick={reset}>
                Reset
            </Button>
        </div>
    );

    const sourceTable = (
        <Table 
            title={() => <b>Data</b>}
            pagination={{ hideOnSinglePage: true }} 
            size="small" 
            bordered 
            dataSource={tableDataSource()} 
            columns={sourceTableColumns} 
        />
    );

    const centerTable = (
        <Table 
            title={() => <b>Cluster centroid</b>}
            pagination={{ hideOnSinglePage: true }} 
            size="small" 
            bordered 
            dataSource={centerTableSource()} 
            columns={centerTableColumns} 
        />
    );

    return (
        <div>
            {settingPanel}
            <Divider type="horizontal" />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>{sourceTable}</Col>
                <Col span={12}>{centerTable}</Col>
            </Row>
        </div>
    );
}