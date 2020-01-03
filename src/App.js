import React from 'react';
import { Switch, Route } from "react-router-dom";
import HomePage from './pages/homePage';
import { home, encryption, hashing } from "./data/urls";
import EncryptionPage from './pages/encryptionPage';
import HashingPage from './pages/hashingPage';

export default function App() {
    return (
        <Switch>
            <Route path={home}>
                <HomePage />
            </Route>
            <Route path={encryption}>
                <EncryptionPage />
            </Route>
            <Route path={hashing}>
                <HashingPage />
            </Route>
        </Switch>
    );
}
