import React, {useContext} from 'react';
import ApiContext from '../ApiContext'; 
import { Table } from 'antd';

const AuditLogs = () => {
  const apiUrl = useContext(ApiContext);
  const columns = [
    { title: 'User', dataIndex: 'user', key: 'user' },
    { title: 'Action', dataIndex: 'action', key: 'action' },
    { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
  ];

  const data = [
    { user: 'User X', action: 'Permission Revoked', timestamp: '2023-10-01 10:00:00' },
    { user: 'User Y', action: 'Role Updated', timestamp: '2023-10-01 11:00:00' },
  ];

  return (
    <div>
      <h1>Audit Logs</h1>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default AuditLogs;