import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Elements
//import BackToTop from './components/back-top';
import ScrollToTop from './components/ScrollToTop';

// Home 
import Index from "./pages/home/index";

// Contact
import Contact from "./pages/contact/contact";

// Error 404
import Error from "./pages/error/error";

export default function Markup(props) {
    return (
        <>
            <BrowserRouter basename={'/'}>
                {/* To get up when */}
                <ScrollToTop />
                <Routes>
                    {/* Home Page */}
                    <Route path='/' element={<Index />} />

                    {/* Contact Page */}
                    <Route path='/contact' element={<Contact />} />

                    {/* Error Page */}
                    <Route path='*' element={<Error />} />

                </Routes>
            </BrowserRouter>
            {/* <BackToTop /> */}
        </>
    )
}