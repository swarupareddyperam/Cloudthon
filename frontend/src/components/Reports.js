import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Table, Row, Col, Spin, Skeleton } from 'antd';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import axios from 'axios';
import ApiContext from '../ApiContext';

const table_data = [
  { key: '1', item: 'User Access Review', status: 'Compliant' },
  { key: '2', item: 'Role Permissions Audit', status: 'Non-Compliant' },
  { key: '3', item: 'Security Policy Compliance', status: 'Compliant' },
  { key: '4', item: 'Data Encryption Check', status: 'Non-Compliant' },
  { key: '5', item: 'SA Access Review', status: 'Compliant' },
];

const columns = [
  { title: 'Item', dataIndex: 'item', key: 'item' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => (
      <span style={{ color: text === 'Non-Compliant' ? 'red' : 'green' }}>
        {text}
      </span>
    ),
  },
];

const Reports = () => {
  const apiUrl = useContext(ApiContext);
  const [complianceData, setComplianceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${apiUrl}/compliance`)
      .then(response => {
        const data = [
          { name: 'Compliant', value: response.data.Compliant },
          { name: 'Non-Compliant', value: response.data['Non-Compliant'] },
        ];
        setComplianceData(data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div style={{ padding: '24px' }}>
      <h1>Reports & Analytics</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="Compliance Status" bordered={false}>
            {loading ? (
              <Spin tip="Loading Compliance Data...">
                <Skeleton active />
              </Spin>
            ) : (
              <PieChart width={400} height={300}>
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
            )}
            <Button type="primary" style={{ marginTop: 16 }} disabled={loading}>
              Download Report
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="Compliance Reports" bordered={false}>
            <Table columns={columns} dataSource={table_data} pagination={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
