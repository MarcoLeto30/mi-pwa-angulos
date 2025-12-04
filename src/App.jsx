import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import History from './pages/History';
import Sensor from './pages/Sensor';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="results" element={<Results />} />
            <Route path="history" element={<History />} />
            <Route path="sensor" element={<Sensor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
