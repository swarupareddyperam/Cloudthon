import React, { useEffect, useState, useContext } from 'react';
import { Table, Input, Spin, Alert } from 'antd';
import axios from 'axios';
import ApiContext from '../ApiContext';

const RoleViewer = () => {
  const apiUrl = useContext(ApiContext);
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/roles`)
      .then(response => {
        setRoles(response.data);
        setFilteredRoles(response.data);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to load roles. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = roles.filter(role => role.name.toLowerCase().includes(searchValue));
    setFilteredRoles(filtered);
  };

  const columns = [
    { title: 'Role', dataIndex: 'name', key: 'name' },
    { 
      title: 'Permissions', 
      dataIndex: 'permissions', 
      key: 'permissions', 
      render: permissions => permissions.join(', ') 
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1>Role & Permission Viewer</h1>

      <Input 
        placeholder="Search roles..." 
        onChange={handleSearch} 
        style={{ marginBottom: 16, width: '100%' }} 
      />

      {loading ? (
        <Spin tip="Loading Roles...">
          <Table columns={columns} dataSource={[]} loading={loading} />
        </Spin>
      ) : error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        <Table columns={columns} dataSource={filteredRoles} pagination={{ pageSize: 10 }} rowKey="name" />
      )}
    </div>
  );
};

export default RoleViewer;
