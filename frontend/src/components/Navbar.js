import React from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  SafetyOutlined,
  AlertOutlined,
  HistoryOutlined,
  BarChartOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Define menu items using the `items` prop
  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'roles',
      icon: <SafetyOutlined />,
      label: 'Role Viewer',
    },
    {
      key: 'alerts',
      icon: <AlertOutlined />,
      label: 'Risk Alerts',
    },
    {
      key: 'logs',
      icon: <HistoryOutlined />,
      label: 'Audit Logs',
    },
    {
      key: 'reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
    },
    {
      key: 'anomalies',
      icon: <WarningOutlined />,
      label: 'Anomalies',
    },
  ];

  // Handle menu item clicks
  const handleMenuClick = (e) => {
    const key = e.key;
    switch (key) {
      case 'dashboard':
        navigate('/');
        break;
      case 'roles':
        navigate('/roles');
        break;
      case 'alerts':
        navigate('/alerts');
        break;
      case 'logs':
        navigate('/logs');
        break;
      case 'reports':
        navigate('/reports');
        break;
      case 'anomalies':
        navigate('/anomalies');
      break;
      default:
        navigate('/');
    }
  };
``
  return (
    <Menu
      mode="horizontal"
      theme="dark"
      items={items}
      onClick={handleMenuClick} // Add onClick handler
    />
  );
};

export default Navbar;