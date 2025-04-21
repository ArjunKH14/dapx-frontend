import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('Checking backend...');

  useEffect(() => {
    const backendUrl = import.meta.env.REACT_APP_BACKEND_URL ?? 'http://localhost:3000';
    fetch(`${backendUrl}/api/health`)
    // fetch('http://dapxba-dapxf-ae6aziuspqzl-846503671.us-east-1.elb.amazonaws.com/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(`✅ ${data.status} - ${data.service} - ${backendUrl}`))
      .catch((err) => {
        console.error(err);
        setStatus('❌ Failed to reach backend')
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div style={{ padding: 40, fontFamily: 'Arial', fontSize: 18 }}>
      <h1>DAPX Frontend</h1>
      <p>Backend connection Status: {status}</p>
    </div>
    </>
  )
}

export default App
