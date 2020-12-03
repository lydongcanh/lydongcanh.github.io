import React, { useState, useEffect } from "react";
import { Button, Divider, Table, Drawer, Tag, InputNumber, Slider, Icon } from "antd";
import * as tf from "@tensorflow/tfjs";
import produce from "immer";
import { FlexibleXYPlot, VerticalGridLines, HorizontalGridLines, LineSeries, XAxis, YAxis, MarkSeries } from "react-vis";
import { useInterval } from "../../data/useInterval";

/** y = ax^3 + bx^2 + cx + d. 
*/
export default function CubicRegressionTab() {
    const [learningRate, setLearningRate] = useState(0.1);
    const [isTraining, setIsTraining] = useState(false);
    const [error, setError] = useState(0);
    const [dataTableVisible, setDataTableVisible] = useState(false);
    const [inputX, setInputX] = useState(0);
    const [inputY, setInputY] = useState(0);
    const [xValues, setXValues] = useState(
        [-0.98, -0.89, -0.81, -0.72, -0.63, -0.52, 0.01, 0.49, 0.99]
        //[-0.98, -0.89, -0.77, -0.59, -0.41, -0.33, -0.03, -0.28, 0.17, 0.31, 0.39, 0.47, 0.61, 0.67, 0.81, 0.91, 0.98]
    );
    const [yValues, setYValues] = useState(
        [-0.99, -0.67, -0.12, 0.11, 0.23, 0.47, 0.03, -0.47, 0.97]
        //[-0.99, -0.81, -0.75, -0.69, -0.25, -0.14, 0.02, 0.21, 0.21, 0.28, 0.36, 0.51, 0.61, 0.7, 0.79, 0.95, 0.96]
    );
    const [slopeAValue, setSlopeAValue] = useState(0);
    const [slopeBValue, setSlopeBValue] = useState(0);
    const [slopeCValue, setSlopeCValue] = useState(0);
    const [yInterceptValue, setYInterceptValue] = useState(0);
    const [slopeA] = useState(tf.variable(tf.scalar(0))); // a
    const [slopeB] = useState(tf.variable(tf.scalar(0))); // b
    const [slopeC] = useState(tf.variable(tf.scalar(0))); // c
    const [yIntercept] = useState(tf.variable(tf.scalar(0))); // d

    const trainInterval = 50;
    const chartHeight = 440;

    const tableColumns = [
        { title: "x", dataIndex: "x", key: "x", render: text => <Tag>{text.toFixed(2)}</Tag> },
        { title: "y", dataIndex: "y", key: "y", render: text => <Tag>{text.toFixed(2)}</Tag> }
    ];

    const tableDataSource = () => {
        if (xValues.length < 1 || yValues.length < 1)
            return [];

        let result = [];
        for (let i = 0; i < xValues.length; i++) {
            result.push({
                "key": i,
                "x": xValues[i],
                "y": yValues[i]
            })
        }
        return result;
    }

    useEffect(() => {

        return function cleanup() {
            slopeA.dispose();
            slopeB.dispose();
            slopeC.dispose();
            yIntercept.dispose();
        }
    }, [slopeA, slopeB, slopeC, yIntercept]);

    useInterval(train, trainInterval);

    /**
     * @param {Number} predictedValue Predicted y values calculated with predict function.
     * @param {[Number]} actualYValues Actual y values.
     */
    function loss(predictedYValues, actualYValues) {
        return tf.tidy(() => {
            const labels = tf.tensor1d(actualYValues);
            // mean squared error.
            const error = predictedYValues.sub(labels).square().mean();
            return error;
        });
    }

    /** Predict y values from x values. */
    function predict(xValues) {
        return tf.tidy(() => {
            const xTensor = tf.tensor1d(xValues);
            // y = x^3*a + x^2*b + x*c + d.
            const yValues = xTensor.pow(tf.scalar(3)).mul(slopeA)
                            .add(xTensor.square().mul(slopeB))
                            .add(xTensor.mul(slopeC))
                            .add(yIntercept);
            return yValues;
        });
    }

    function train() {
        // TODO: Fix memory leak...
        if (isTraining && xValues && yValues &&
            xValues.length > 0 && yValues.length > 0) {
            tf.tidy(() => {
                const optimizer = tf.train.sgd(learningRate);

                optimizer.minimize(() => {
                    const predictedYValues = predict(xValues);
                    const error = loss(predictedYValues, yValues);
                    setError(error.dataSync()[0]);
                    return error;
                }, false, [slopeA, slopeB, slopeC, yIntercept]);

                const newSlopeA = slopeA.dataSync()[0];
                const newSlopeB = slopeB.dataSync()[0];
                const newSlopeC = slopeC.dataSync()[0];
                const newYIntercept = yIntercept.dataSync()[0];

                setSlopeAValue(newSlopeA);
                setSlopeBValue(newSlopeB);
                setSlopeCValue(newSlopeC);
                setYInterceptValue(newYIntercept);
            });
        }
    }

    function addNewTrainValues(newXValue, newYValue) {
        const newXValues = produce(xValues, copy => {
            copy.push(newXValue);
            return copy;
        });
        const newYValues = produce(yValues, copy => {
            copy.push(newYValue);
            return copy;
        });

        setXValues(newXValues);
        setYValues(newYValues);
    }

    const markSeriesData = () => {
        let result = [];
        for (let i = 0; i < xValues.length; i++) {
            result.push({
                x: xValues[i],
                y: yValues[i]
            })
        }

        return result;
    }

    const lineSeriesData = () => {
        if (xValues.length < 1 || yValues.length < 1)
            return [{ x: 0, y: 0 }, { x: 0, y: 0 }];

        let result = [];
        let predictRange = [];
        for (let i = -1; i <= 1; i+=0.1) 
            predictRange.push(i);

        const predictedResult = predict(predictRange);
        const predictedValues = predictedResult.dataSync();
        predictedResult.dispose();
        for(let i = 0; i < predictRange.length; i++) {
            result.push({
                x: predictRange[i],
                y: predictedValues[i]
            })
        }

        return result;
    }

    const trainButton = (
        <Button
            onClick={() => setIsTraining(!isTraining)}
            type={isTraining ? "danger" : "primary"}
        >
            <Icon type={isTraining ? "pause-circle" : "play-circle"} />
            {!isTraining ? "Start Training" : "Stop"}
        </Button>
    );

    const chart = (
        <div style={{ height: chartHeight }}>
            <FlexibleXYPlot
                xDomain={[-1, 1]}
                yDomain={[-1, 1]}
            >
                <VerticalGridLines />
                <HorizontalGridLines />  
                <XAxis />
                <YAxis />
                <MarkSeries data={markSeriesData()} />
                <LineSeries data={lineSeriesData()} />
            </FlexibleXYPlot>
        </div>
    );

    const settingPanel = (
        <div>
            X: <InputNumber step={0.1} min={-1} max={1} value={inputX} onChange={value => setInputX(value)} />
            <Divider type="vertical" />
            Y: <InputNumber step={0.1} min={-1} max={1} value={inputY} onChange={value => setInputY(value)} />
            <Divider type="vertical" />
            <Button type="primary" onClick={() => addNewTrainValues(inputX, inputY)}>
                Add Data
            </Button>
            <Divider type="vertical" />
            {trainButton}
            <Divider type="vertical" />
            <Button style={{ position: "absolute", right: 15 }} onClick={() => setDataTableVisible(true)}>
                Show Data Set
            </Button>
            <Divider type="horizontal" />
        </div>
    );

    return (
        <div>
            <p><b>SlopeA:</b> {slopeAValue} | <b>SlopeB:</b> {slopeBValue} | <b>SlopeC:</b> {slopeCValue} </p>
            <p><b>Y intercept:</b> {yInterceptValue}</p>
            <p><b>Error:</b> {error}</p>
            <p><b>Learning Rate:</b> {(learningRate * 100).toFixed(2)}%</p>
            <Slider min={0} max={1} step={0.01} value={learningRate} onChange={value => setLearningRate(value)} />
            {settingPanel}
            {chart}
            <Drawer title="Data Set" placement="right" closable
                onClose={() => setDataTableVisible(false)} visible={dataTableVisible}>
                <Table pagination={{ hideOnSinglePage: true }} size="small" bordered dataSource={tableDataSource()} columns={tableColumns} />
            </Drawer>
        </div>
    );
}