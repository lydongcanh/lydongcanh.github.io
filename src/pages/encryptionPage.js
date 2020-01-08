import React, { useState } from "react";
import { Tabs, Input, Divider, Radio } from "antd";
import CryptoJS from "crypto-js";

const { TabPane } = Tabs;
const { TextArea } = Input;

export default function EncryptionPage() {

    const [algorithm, setAlgorithm] = useState("AES");
    const [mode, setMode] = useState("encrypt");
    const [passphrase, setPassphrase] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [outputValue, setOutputValue] = useState("");

    const textAreas = (
        <div>
            <Radio.Group onChange={handleModeChange} value={mode}>
                <Radio.Button value="encrypt">Encryption</Radio.Button>
                <Radio.Button value="decrypt">Decryption</Radio.Button>
            </Radio.Group>

            <Divider mode="horizontal" />
            <TextArea
                allowClear
                onChange={handlePassphraseChange}
                value={passphrase}
                autoSize={{ minRows: 2, maxRows: 5 }}
                placeholder="Secret passphrase."
            />
            <Divider mode="horizontal" />
            <TextArea
                allowClear
                disabled={!passphrase || passphrase.length < 1}
                onChange={handleInputValueChange}
                autoSize={{ minRows: 8, maxRows: 10 }}
                value={inputValue}
                placeholder="Input message."
            />
            <Divider mode="horizontal" />
            <TextArea
                disabled
                autoSize={{ minRows: 8, maxRows: 10 }}
                value={outputValue}
                placeholder="Output message."
            />
        </div>
    );

    function handleAlgorithmChange(newAlgorithm) {
        setAlgorithm(newAlgorithm);
        updateOutputValue(inputValue, mode, newAlgorithm, passphrase);
    }

    function handleModeChange(e) {
        const newMode = e.target.value;
        setMode(newMode);
        setInputValue(outputValue.toString());
        updateOutputValue(outputValue.toString(), newMode, algorithm, passphrase);
    }

    function handlePassphraseChange(e) {
        const newPassphrase = e.target.value;
        setPassphrase(newPassphrase);
        updateOutputValue(inputValue, mode, algorithm, newPassphrase);
    }

    function handleInputValueChange(e) {
        const newInputValue = e.target.value;
        setInputValue(newInputValue);
        updateOutputValue(newInputValue, mode, algorithm, passphrase);
    }

    function updateOutputValue(inputValue, mode, algorithm, passphrase) {
        if (!inputValue || inputValue.length < 1 ||
            !passphrase || passphrase.length < 1)
            return;

        const result = getOutputFunction(mode, algorithm)(inputValue, passphrase);

        // console.log({
        //     inputValue: inputValue,
        //     mode: mode,
        //     algorithm: algorithm,
        //     passphrase: passphrase,
        //     result: result
        // });

        setOutputValue(result);
    }

    function getOutputFunction(mode, algorithm) {
        if (mode === "encrypt")
            return getEncryptFunction(algorithm);

        if (mode === "decrypt")
            return getDecryptFunction(algorithm);
    }

    function getEncryptFunction(algorithm) {
        if (algorithm === "AES")
            return CryptoJS.AES.encrypt;

        if (algorithm === "DES")
            return CryptoJS.DES.encrypt;

        if (algorithm === "3DES")
            return CryptoJS.TripleDES.encrypt;

        if (algorithm === "Rabbit")
            return CryptoJS.Rabbit.encrypt;

        if (algorithm === "RC4")
            return CryptoJS.RC4.encrypt;
    }

    function getDecryptFunction(algorithm) {
        if (algorithm === "AES")
            return CryptoJS.AES.decrypt;

        if (algorithm === "DES")
            return CryptoJS.DES.decrypt;

        if (algorithm === "3DES")
            return CryptoJS.TripleDES.decrypt;

        if (algorithm === "Rabbit")
            return CryptoJS.Rabbit.decrypt;

        if (algorithm === "RC4")
            return CryptoJS.RC4.decrypt;
    }

    return (
        <Tabs onChange={handleAlgorithmChange} type="line" tabPosition="left">
            <TabPane tab="AES" key="AES">
                {textAreas}
            </TabPane>
            <TabPane tab="DES" key="DES">
                {textAreas}
            </TabPane>
            <TabPane tab="Triple DES" key="3DES">
                {textAreas}
            </TabPane>
            <TabPane tab="Rabbit" key="Rabbit">
                {textAreas}
            </TabPane>
            <TabPane tab="RC4" key="RC4">
                {textAreas}
            </TabPane>
        </Tabs>
    );
}