import React from 'react';
import './App.scss';
import { useStore } from './store/store';
import TabSelector from './components/TabSelector'
import Worksheet from './components/Worksheet';
import Solution from './components/Solution'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

    const [{ selectedTab, documents }] = useStore();

    return (
        <div className="App">

            <div className="control-panel">
                <Header />
                <TabSelector />
            </div>

            {documents[selectedTab].docType === 'worksheet' ? (
                <Worksheet />
            ) : (
                <Solution />
            )}

            <Footer />

        </div>
    );
}

export default App;
