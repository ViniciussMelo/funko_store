import 'antd/dist/antd.css';
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

import UserService from '../../services/UserService';

interface UserInterface {
  _id: string;
  name: string;
}

const columns = [
  {
    title: 'Row',
    dataIndex: 'row',
    align: 'right' as const,
  },
  {
    title: 'Id',
    dataIndex: 'id',
    render: (text: any, record: any, index: any) => {
      return (        
        <Link to={`/users/` + record.key}>{text}</Link>
      );
    },
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
];

const Users = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data } = await UserService.findAll();

    const usersFormatted = data.map((user: UserInterface, index: number) => {
      return (
        {
          key: user._id,
          row: index + 1,
          id: user._id,
          name: user.name,
        }
      )
    });

    setUsers(usersFormatted)
  }

  return (
    <>
      <Table 
        dataSource={users} 
        columns={columns}
        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
      />;
    </>
  )
}

export default Users;