import React, { useEffect, useState, useContext } from 'react';
import { Card, Badge, Button, List, Typography, Alert, Spin, Skeleton } from 'antd';
import { WarningOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import ApiContext from '../ApiContext';

const { Title } = Typography;

const RiskAlerts = () => {
  const apiUrl = useContext(ApiContext);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${apiUrl}/risk-alerts`)
      .then(response => setAlerts(response.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ color: '#ff4d4f' }}>
        <WarningOutlined /> Risk Alerts <Badge count={alerts.length} style={{ backgroundColor: '#ff4d4f' }} />
      </Title>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#ff4d4f' }} spin />} />
          <Skeleton active paragraph={{ rows: 4 }} style={{ marginTop: 20 }} />
        </div>
      ) : alerts.length > 0 ? (
        <List
          dataSource={alerts}
          renderItem={(alert) => (
            <List.Item>
              <Card
                title={`Risk Alert for User: ${alert.user}`}
                style={{ width: '100%', borderColor: '#ff4d4f' }}
                headStyle={{ backgroundColor: '#fff1f0', borderColor: '#ff4d4f' }}
              >
                <p><strong>Permission:</strong> {alert.permission}</p>
                <p><strong>Timestamp:</strong> {alert.timestamp}</p>
                <Alert
                  message="Immediate Attention Required"
                  type="error"
                  showIcon
                  style={{ marginTop: '16px' }}
                />
                <Button type="primary" danger style={{ marginTop: '16px' }}>
                  Dismiss
                </Button>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Alert
          message="No risk alerts detected. Everything looks good!"
          type="success"
          showIcon
        />
      )}
    </div>
  );
};

export default RiskAlerts;