import 'antd/dist/antd.css';
import { Button, Popconfirm, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import UserService from '../../services/UserService';
import { DeleteOutlined } from '@ant-design/icons';

interface UserInterface {
  _id: string;
  name: string;
}

const Users = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
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
    {
      title: 'Delete',
      dataIndex: 'id',
      width: 150,
      render: (text: any, record: any) => {
        const isUserLogged = localStorage.getItem('userId') === record.key
        return (
          <span>
            {
              !isUserLogged &&
              (
                <Popconfirm 
                  title={<div style={{marginLeft: "10px"}}>Sure to delete?</div>} 
                  onConfirm={() => deleteUser(record.key)} 
                  style={{width: '1000px'}}
                >
                  <DeleteOutlined />
                </Popconfirm>
              )
            }
              
          </span>
        )
      }
    }
  ];
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      loadUsers();
    }
  }, []);

  const deleteUser = async (id: string) => {
    await UserService.delete(id);
    await loadUsers();
  }

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

  const sendToCreateUser = () => {
    navigate('/users/0');
  }

  return (
    <>
      <div>
        <Button 
          type="primary" 
          style={{
            marginTop: '10px'
          }}
          onClick={sendToCreateUser}
        >
          Create User
        </Button>
        <Table 
          dataSource={users} 
          columns={columns}
          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
        />;
      </div>
    </>
  )
}

export default Users;