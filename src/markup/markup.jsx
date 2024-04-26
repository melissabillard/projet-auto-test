import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';

import Index from "./pages/home/index";
import Page1 from "./pages/page-1";


export default function Markup(props) {
    return (
        <>
            <BrowserRouter basename={'/'}>
                {/* To get up when */}
                <ScrollToTop />
                <Routes>
                    <Route path='/' element={<Index />} />
                    <Route path='/page-1' element={<Page1 />} />
                    <Route path='*' element={<Index />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}