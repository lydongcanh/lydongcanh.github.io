import React, { useState } from "react";
import { Input, Select, Divider, Typography, Tabs } from "antd";
import CryptoJS from "crypto-js";

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

export default function HashingPage() {
    const [algorithm, setAlgorithm] = useState("MD5");
    const [hashLength, setHashLength] = useState("512");
    const [hashLengthVisible, setHashLengthVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [outputValue, setOutputValue] = useState("");

    const hashLengthSelect = (
        <div>
            <Divider mode="horizontal" />
            <Text type="secondary">Hash length:</Text>
            <Select
                disabled={!hashLengthVisible}
                value={hashLength}
                onSelect={handleHashLengthSelect}
                style={{ width: "100%" }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option key="224">224</Option>
                <Option key="256">256</Option>
                <Option key="384">384</Option>
                <Option key="512">512</Option>
            </Select>
        </div>
    );

    const textAreas = (
        <div>
            <TextArea allowClear autoSize={{ minRows: 10, maxRows: 15 }} placeholder="Input text." onChange={handleInputValueChange} value={inputValue} />
            <Divider mode="horizontal" />
            <TextArea autoSize={{ minRows: 3, maxRows: 10 }} disabled placeholder="Hashed value." value={outputValue} />
        </div>
    );

    function handleAlgorithmSelect(newAlgorithm) {
        if (newAlgorithm === "SHA2" || newAlgorithm === "SHA3") {
            setHashLengthVisible(true);
        } else {
            setHashLengthVisible(false);
        }

        setAlgorithm(newAlgorithm);
        updateOutputValue(inputValue, newAlgorithm, hashLength);
    }

    function handleHashLengthSelect(hashLength) {
        setHashLength(hashLength);
        updateOutputValue(inputValue, algorithm, hashLength);
    }

    function handleInputValueChange(e) {
        setInputValue(e.target.value);
        updateOutputValue(e.target.value, algorithm, hashLength);
    }

    function updateOutputValue(inputValue, algorithm, hashLength) {
        if (!inputValue || inputValue.length < 1)
            setOutputValue("");

        else if (algorithm === "MD5")
            setOutputValue(CryptoJS.MD5(inputValue));

        else if (algorithm === "SHA1")
            setOutputValue(CryptoJS.SHA1(inputValue));

        else if (algorithm === "SHA2") {
            if (hashLength === "224")
                setOutputValue(CryptoJS.SHA224(inputValue));

            else if (hashLength === "256")
                setOutputValue(CryptoJS.SHA256(inputValue));

            else if (hashLength === "384")
                setOutputValue(CryptoJS.SHA384(inputValue));

            else if (hashLength === "512")
                setOutputValue(CryptoJS.SHA512(inputValue));
        }

        else if (algorithm === "SHA3") {
            if (hashLength === "224")
                setOutputValue(CryptoJS.SHA3(inputValue, { outputLength: 224 }));

            else if (hashLength === "256")
                setOutputValue(CryptoJS.SHA3(inputValue, { outputLength: 256 }));

            else if (hashLength === "384")
                setOutputValue(CryptoJS.SHA3(inputValue, { outputLength: 384 }));

            else if (hashLength === "512")
                setOutputValue(CryptoJS.SHA3(inputValue, { outputLength: 512 }));
        }

        else if (algorithm === "RIPEMD160") {
            setOutputValue(CryptoJS.RIPEMD160(inputValue));
        }
    }

    return (
        <div>
            <Tabs onChange={handleAlgorithmSelect} type="line" tabPosition="left" >
                <TabPane tab="MD5" key="MD5">
                    {textAreas}
                </TabPane>
                <TabPane tab="SHA-1" key="SHA1">
                    {textAreas}
                </TabPane>
                <TabPane tab="SHA-2" key="SHA2">
                    {textAreas}
                    {hashLengthSelect}
                </TabPane>
                <TabPane tab="SHA-3" key="SHA3">
                    {textAreas}
                    {hashLengthSelect}
                </TabPane>
                <TabPane tab="RIPEMD-160" key="RIPEMD160">
                    {textAreas}
                </TabPane>
            </Tabs>
        </div>
    );
}