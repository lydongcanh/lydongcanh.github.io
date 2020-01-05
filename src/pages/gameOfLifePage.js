import React, { useState } from "react";
import { Slider, InputNumber, Divider, Row, Col, Button, Icon, Progress } from "antd";
import LifeGrid from "../components/lifeGrid";

export default function GameOfLifePage() {
    const [numRows, setNumRows] = useState(15);
    const [numCols, setNumCols] = useState(35);
    const [speed, setSpeed] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const [birthRate, setBirthRate] = useState(50);
    const [deathRate, setDeathRate] = useState(50);
    const [liveCount, setLiveCount] = useState(0);

    const sliderStyle = {
        padding: 0,
        margin: "10px 0 0 0",
    }

    const inputNumberStyle = {
        padding: 0,
        margin: "10px 0 0 0",
        left: "5px"
    }

    const populationProgressPercent = (liveCount / (numRows * numCols) * 100).toFixed(2);

    function handlePlayButtonClick() {
        setIsPlaying(!isPlaying);
    }

    return (
        <div>
            <Row gutter={{ xs: 8, sm: 8, md: 16, lg: 16 }}>
                <Col span={3}>
                    Rows:
                    <InputNumber style={inputNumberStyle} defaultValue={1} step={1} min={1} max={100} 
                                 value={numRows} onChange={value => setNumRows(value)} />
                </Col>
                <Col span={3}>
                    Cols:
                    <InputNumber style={inputNumberStyle} defaultValue={1} step={1} min={1} max={100} 
                                 value={numCols} onChange={value => setNumCols(value)} />
                </Col>
                <Col span={3}>
                    Speed:
                    <InputNumber style={inputNumberStyle}defaultValue={1}  step={1} min={1} max={100} 
                                 value={speed} onChange={value => setSpeed(value)} />
                </Col>
                <Col span={3}>
                    Birth Rate: {birthRate}%
                    <Slider style={sliderStyle} tipFormatter={null} min={0} max={100} 
                            value={birthRate} onChange={value => setBirthRate(value)} />
                </Col>
                <Col span={3}>
                    Death Rate: {deathRate}%
                    <Slider style={sliderStyle} tipFormatter={null} min={0} max={100} 
                            value={deathRate} onChange={value => setDeathRate(value)} />
                </Col>
                <Col span={3}>
                    Live cells: {liveCount}
                    <Progress percent={populationProgressPercent} />
                </Col>
                <Col span={6}>
                    <Button
                        style={{ 
                            margin: "10px 0 0 0",
                            position: "absolute",
                            right: "5px"
                        }}
                        onClick={handlePlayButtonClick}
                        type={isPlaying ? "danger" : "primary"}
                    >
                        <Icon type={isPlaying ? "pause-circle" : "play-circle"}/>
                        {!isPlaying ? "Play" : "Pause"}
                    </Button>
                </Col>
            </Row>
            <Divider type="horizontal" />
            <LifeGrid 
                birthRate={birthRate}
                deathRate={deathRate}
                speed={speed} 
                isPlaying={isPlaying} 
                numRows={numRows} 
                numCols={numCols} 
                setLiveCount={setLiveCount}
            />
        </div>
    );
}