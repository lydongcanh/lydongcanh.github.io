import React from 'react';
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import HomePage from './pages/homePage';
import { home, encryption, hashing, gameOfLife, machineLearning } from "./data/urls";
import EncryptionPage from './pages/encryptionPage';
import HashingPage from './pages/hashingPage';
import Navbar from './components/navbar';
import GameOfLifePage from './pages/gameOfLifePage';
import MachineLearning from './pages/machineLearningPage';

const { Content } = Layout;

export default function App() {

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
                    <Route path={gameOfLife}>
                        <GameOfLifePage />
                    </Route>
                    <Route path={machineLearning}>
                        <MachineLearning />
                    </Route>
                </Content>
            </Layout>
        </Switch>
    );
}
