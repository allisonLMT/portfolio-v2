import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PagePortfolio from '../pages/PagePortfolio';
import PageProject from '../pages/PageProject';
import PageNotFound from '../pages/PageNotFound';


function AppRouter() {


    return (
        <Routes>
            <Route path='/' exact element={<PageHome />} />
            <Route path='about' element={<PageAbout />} />
            <Route path='portfolio' element={<PagePortfolio  />} />
            <Route path='/project/:id' element={<PageProject />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
        
    );

};

export default AppRouter;