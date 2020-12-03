import React, { useState } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { home, encryption, hashing, gameOfLife, machineLearning } from "../data/urls";

export default function Navbar() {
    const [selectedKey, setSelectedKey] = useState("home");

    function handleOnSelect(e) {
        setSelectedKey(e.key);
    }

    return (
        <Menu 
            onSelect={handleOnSelect}
            style={{
                
            }}
            selectedKeys={selectedKey}
            mode="horizontal"
            theme="dark"
        >
            <Menu.Item key="home">
                <Link to={home}>
                    <Icon type="home" />
                    Home
                </Link>
            </Menu.Item>
            <Menu.Item key="machineLearning">
                <Link to={machineLearning}>
                    <Icon type="robot" />
                    Machine Learning
                </Link>
            </Menu.Item>
            <Menu.Item key="encryption" >
                <Link to={encryption}>
                    <Icon type="lock" />
                    Encryption
                </Link>
            </Menu.Item>
            <Menu.Item key="hashing">
                <Link to={hashing}>
                    <Icon type="scissor" />
                    Hashing
                </Link>
            </Menu.Item>
            <Menu.Item key="gameOfLife">
                <Link to={gameOfLife}>
                    <Icon type="experiment" />
                    Game Of Life
                </Link>
            </Menu.Item>
        </Menu>
    );
}