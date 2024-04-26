import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';

import Home from "./pages/home";
import Page1 from "./pages/page-1";
import Page2 from "./pages/page-2";
import Page3 from "./pages/page-3";

export default function Markup(props) {
    return (
        <>
            <BrowserRouter basename={'/'}>
                {/* To get up when */}
                <ScrollToTop />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/page-1' element={<Page1 />} />
                    <Route path='/page-2' element={<Page2 />} />
                    <Route path='/page-3' element={<Page3 />} />
                    <Route path='*' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}