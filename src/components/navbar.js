import React, { useState } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { home, encryption, hashing } from "../data/urls";
import neumorphismStyle from "../data/neumorphismStyle";

export default function Navbar() {
    const [selectedKey, setSelectedKey] = useState("home");
    // const style = neumorphismStyle({style: {
    //     margin: "15px",
    //     padding: "5px"
    // }});

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
            <Menu.Item key="encryption" >
                <Link to={encryption}>
                    <Icon type="alert" />
                    Encryption
                </Link>
            </Menu.Item>
            <Menu.Item key="hashing">
                <Link to={hashing}>
                    <Icon type="barcode" />
                    Hashing
                </Link>
            </Menu.Item>
        </Menu>
    );
}