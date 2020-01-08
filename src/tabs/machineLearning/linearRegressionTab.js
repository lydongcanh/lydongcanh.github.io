import React, { useState } from "react";
import { Button, Divider, Table, Drawer, Tag, InputNumber } from "antd";
import * as tf from "@tensorflow/tfjs";
import produce from "immer";
import { FlexibleXYPlot, VerticalGridLines, HorizontalGridLines, LineSeries, XAxis, YAxis, MarkSeries } from "react-vis";
import { useInterval } from "../../data/useInterval";

/** y = ax + b. 
 * height = a * weight + b.
*/
export default function LinearRegressionTab() {
    const [learningRate] = useState(0.01);
    const [dataTableVisible, setDataTableVisible] = useState(false);
    const [inputX, setInputX] = useState(0);
    const [inputY, setInputY] = useState(0);
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);
    const [slopeValue, setSlopeValue] = useState(0);
    const [yInterceptValue, setYInterceptValue] = useState(0);
    const [slope] = useState(tf.variable(tf.scalar(0))); // a
    const [yIntercept] = useState(tf.variable(tf.scalar(0))); // b
    const [optimizer] = useState(tf.train.sgd(learningRate));

    const trainInterval = 50;
    const chartHeight = 450;

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

    useInterval(train, trainInterval);

    /**
     * @param {Number} predictedValue Predicted y values calculated with predict function.
     * @param {[Number]} actualYValues Actual y values.
     */
    function loss (predictedYValues, actualYValues) {
        return tf.tidy(() => {
            const labels = tf.tensor1d(actualYValues);
            // mean squared error.
            const error = predictedYValues.sub(labels).square().mean();
            return error;
        });
    }

    /** Predict y values from x values. */
    function predict (xValues) {
        return tf.tidy(() => {
            const xTensor = tf.tensor1d(xValues);
            const yValues = slope.mul(xTensor).add(yIntercept);
            return yValues;
        });
    }

    function train () {
        // TODO: Fix memory leak...
        if (xValues && yValues && 
            xValues.length > 0 && yValues.length > 0) {
            optimizer.minimize(() => {
                const predictedYValues = predict(xValues);
                return loss(predictedYValues, yValues);
            }, false, [slope, yIntercept]);

            const newSlope = slope.dataSync()[0];
            const newYIntercept = yIntercept.dataSync()[0];

            setSlopeValue(newSlope);
            setYInterceptValue(newYIntercept);
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

        let xMin = xValues[0];
        let xMax = xValues[0];
        for (let i = 1; i < xValues.length; i++) {
            if (xMin > i) xMin = i;
            if (xMax < i) xMax = i;
        }

        const predictedResult = predict([xMin, xMax]);
        const predictedValues = predictedResult.dataSync();
        predictedResult.dispose();

        return [
            {x: xMin, y: predictedValues[0]},
            {x: xMax, y: predictedValues[1]}
        ];
    }

    const chart = (
        <div style={{ height: chartHeight }}>
            <FlexibleXYPlot onClick={(e) => console.log(e.target)}>
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
            X: <InputNumber step={0.1} min={0} max={1} value={inputX} onChange={value => setInputX(value)} />
            <Divider type="vertical" />
            Y: <InputNumber step={0.1} min={0} max={1} value={inputY} onChange={value => setInputY(value)} />
            <Divider type="vertical" />
            <Button type="primary" onClick={() => addNewTrainValues(inputX, inputY)}>
                Add Data
            </Button>
            <Divider type="vertical" />
            <Button style={{ position: "absolute", right: 15 }} onClick={() => setDataTableVisible(true)}>
                Show Data Set
            </Button>
            <Divider type="horizontal" />
        </div>
    );

    return (
        <div>
            <p><b>Slope:</b> {slopeValue}</p>
            <p><b>Y intercept:</b> {yInterceptValue}</p>
            <p><b>Learning Rate:</b> {(learningRate * 100).toFixed(2)}%</p>
            {settingPanel}
            {chart}
            <Drawer title="Data Set" placement="right" closable
                onClose={() => setDataTableVisible(false)} visible={dataTableVisible}>
                <Table pagination={{ hideOnSinglePage: true }} size="small" bordered dataSource={tableDataSource()} columns={tableColumns} />
            </Drawer>
        </div>
    );
}