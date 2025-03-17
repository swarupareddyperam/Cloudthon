import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import RoleViewer from './components/RoleViewer';
import RiskAlerts from './components/RiskAlerts';
import AuditLogs from './components/AuditLogs';
import Reports from './components/Reports';
import Anomalies from './components/Anomalies';
import ApiContext from './ApiContext'; // Import the context
import './styles.css';

const { Content } = Layout;

const App = () => {
  const apiUrl = "http://127.0.0.1:5100"; // Set your backend base API URL here

  return (
    <ApiContext.Provider value={apiUrl}>
      <Router>
        <Layout>
          <Navbar />
          <Content style={{ padding: '24px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/roles" element={<RoleViewer />} />
              <Route path="/alerts" element={<RiskAlerts />} />
              <Route path="/logs" element={<AuditLogs />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/anomalies" element={<Anomalies />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </ApiContext.Provider>
  );
};

export default App;