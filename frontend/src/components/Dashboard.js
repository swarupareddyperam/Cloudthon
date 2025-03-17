import React, { useContext } from 'react';
import ApiContext from '../ApiContext';
import { Card, Row, Col, Table, Typography } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const { Title } = Typography;

// Sample data for charts and tables
const data = [
  { name: 'Admin', permissions: 10 },
  { name: 'Viewer', permissions: 5 },
  { name: 'Editor', permissions: 8 },
];

const complianceData = [
  { name: 'Compliant', value: 80 },
  { name: 'Non-Compliant', value: 20 },
];

const recentActivity = [
  { key: '1', user: 'user-1', action: 'Permission Revoked', timestamp: '2025-03-16T10:00:00Z' },
  { key: '2', user: 'user-2', action: 'Role Updated', timestamp: '2025-03-16T11:00:00Z' },
  { key: '3', user: 'user-3', action: 'Access Granted', timestamp: '2025-03-16T12:00:00Z' },
];

const topUsers = [
  { key: '1', user: 'user-1', permissions: 15 },
  { key: '2', user: 'user-2', permissions: 12 },
  { key: '3', user: 'user-3', permissions: 10 },
];

const complianceStatus = [
  { key: '1', item: 'User Access Review', status: 'Compliant' },
  { key: '2', item: 'Role Permissions Audit', status: 'Non-Compliant' },
  { key: '3', item: 'Security Policy Compliance', status: 'Compliant' },
];

const riskAlertsSummary = [
  { key: '1', level: 'High', count: 5 },
  { key: '2', level: 'Medium', count: 3 },
  { key: '3', level: 'Low', count: 2 },
];

// Define columns for tables
const recentActivityColumns = [
  { title: 'User', dataIndex: 'user', key: 'user' },
  { title: 'Action', dataIndex: 'action', key: 'action' },
  { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
];

const topUsersColumns = [
  { title: 'User', dataIndex: 'user', key: 'user' },
  { title: 'Permissions', dataIndex: 'permissions', key: 'permissions' },
];

const complianceStatusColumns = [
  { title: 'Item', dataIndex: 'item', key: 'item' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (text) => (
    <span style={{ color: text === 'Non-Compliant' ? 'red' : 'green' }}>{text}</span>
  )},
];

const riskAlertsColumns = [
  { title: 'Risk Level', dataIndex: 'level', key: 'level' },
  { title: 'Count', dataIndex: 'count', key: 'count' },
];

const COLORS = ['#00C49F', '#FF8042']; // Colors for the Pie Chart

const Dashboard = () => {
  const apiUrl = useContext(ApiContext);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Dashboard</Title>

      {/* Key Metrics */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card title="Total Roles" bordered={false}>
            150
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Risky Access Patterns" bordered={false}>
            12
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Cost Savings" bordered={false}>
          €10,000
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        {/* Permission Usage Chart */}
        <Col span={12}>
          <Card title="Permission Usage" bordered={false}>
            <BarChart width={500} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="permissions" fill="#8884d8" />
            </BarChart>
          </Card>
        </Col>

        {/* Compliance Status Pie Chart */}
        <Col span={12}>
          <Card title="Compliance Status" bordered={false}>
            <PieChart width={500} height={300}>
              <Pie
                data={complianceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Card title="Recent Activity" bordered={false} style={{ marginBottom: '24px' }}>
        <Table
          columns={recentActivityColumns}
          dataSource={recentActivity}
          pagination={false}
        />
      </Card>

      {/* Top Users by Permissions */}
      <Card title="Top Users by Permissions" bordered={false} style={{ marginBottom: '24px' }}>
        <Table
          columns={topUsersColumns}
          dataSource={topUsers}
          pagination={false}
        />
      </Card>

      {/* Compliance Status */}
      <Card title="Compliance Status" bordered={false} style={{ marginBottom: '24px' }}>
        <Table
          columns={complianceStatusColumns}
          dataSource={complianceStatus}
          pagination={false}
        />
      </Card>

      {/* Risk Alerts Summary */}
      <Card title="Risk Alerts Summary" bordered={false}>
        <Table
          columns={riskAlertsColumns}
          dataSource={riskAlertsSummary}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Dashboard;