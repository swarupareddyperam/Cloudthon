import React, { useContext, useState, useEffect } from 'react';
import { Alert, List, Typography, Card, Spin, Skeleton } from 'antd';
import { WarningOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import ApiContext from '../ApiContext';

const { Title } = Typography;

function Anomalies() {
  const apiUrl = useContext(ApiContext);
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${apiUrl}/detect-anomalies`)
      .then(response => setAnomalies(response.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ color: '#ff4d4f' }}>
        <WarningOutlined /> Anomaly Detection
      </Title>
      
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: '#ff4d4f' }} spin />} />
          <Skeleton active paragraph={{ rows: 4 }} style={{ marginTop: '16px' }} />
        </div>
      ) : anomalies.length > 0 ? (
        <List
          dataSource={anomalies}
          renderItem={(anomaly, index) => (
            <List.Item key={index}>
              <Card
                title={`Anomaly Detected for User: ${anomaly.user}`}
                style={{ width: '100%', borderColor: '#ff4d4f' }}
                headStyle={{ backgroundColor: '#fff1f0', borderColor: '#ff4d4f' }}
              >
                <p>
                  <strong>Permission:</strong> {anomaly.permission}
                </p>
                <p>
                  <strong>Timestamp:</strong> {anomaly.timestamp}
                </p>
                <Alert
                  message="Immediate Action Required"
                  type="error"
                  showIcon
                  style={{ marginTop: '16px' }}
                />
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Alert
          message="No anomalies detected. Everything looks good!"
          type="success"
          showIcon
        />
      )}
    </div>
  );
}

export default Anomalies;