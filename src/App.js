import React from 'react';
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import HomePage from './pages/homePage';
import { home, encryption, hashing } from "./data/urls";
import EncryptionPage from './pages/encryptionPage';
import HashingPage from './pages/hashingPage';
import Navbar from './components/navbar';
import neumorphismStyle from './data/neumorphismStyle';

const { Content } = Layout;

export default function App() {
    // const contentStyle = neumorphismStyle({style: {
    //     padding: "15px",
    //     margin: "5px 15px 15px 15px",
    //     backgroundStartColor: "rgba(0, 0, 0, .03)",
    //     backgroundEndColor: "rgba(0, 0, 0, .03)",
    // }});

    return (
        <Switch>
            <Layout style={{backgroundColor: "white"}}>
                <Navbar />
                <Content style={{margin: "15px"}}>
                    <Route exact path={home}>
                        <HomePage />
                    </Route>
                    <Route path={encryption}>
                        <EncryptionPage />
                    </Route>
                    <Route path={hashing}>
                        <HashingPage />
                    </Route>
                </Content>
            </Layout>
        </Switch>
    );
}
