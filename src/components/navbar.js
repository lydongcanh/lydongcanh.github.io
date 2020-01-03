import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { home, encryption, hashing } from "../data/urls";

/**
 * 
 * @param {*} props defaultSelectedKeys[home, encryption, hashing]
 */
export default function Navbar(props) {
    return (
        <Menu 
            defaultSelectedKeys={props.defaultSelectedKeys}
            mode="horizontal"
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