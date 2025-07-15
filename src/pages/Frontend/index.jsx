import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Home";
import About from './About'
import Contact from './Contact'
import Todos from './Todos'

function index() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path='about' element={<About />} />
                        <Route path='Contact' element={<Contact />} />
                        <Route path='Todos' element={<Todos />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default index;
