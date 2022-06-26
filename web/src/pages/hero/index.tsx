import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import 'antd/dist/antd.css';
import './index.css';

import { Form, Input, Button } from 'antd';

import UserService from "../../services/UserService";
import { IdcardOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

interface UserInterface {
  _id: string;
  name: string;
  user: string;
  password: string;
}

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserInterface>({} as UserInterface);

  useEffect(() => {
    return () => {
      loadUser(`${id}`);
    }
  }, []);

  const loadUser = async (id: string) => {
    const { data } = await UserService.find(id);
    console.log(data)
    setUser(data);
  }
  
  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}>
        <Form
          name='normal_login'
          className='login-form'
          // onFinish={onFinish}
        >
          <Form.Item
            name='userId'
            valuePropName={user._id}
          >
            <Input 
              disabled
              prefix={<IdcardOutlined className='site-form-item-icon' />} placeholder='id'
              value={user._id}
            />
          </Form.Item>
          <Form.Item
            name='name'
            valuePropName={user.name}
          >
            <Input 
              prefix={<IdcardOutlined className='site-form-item-icon' />} placeholder='name'
              value={user.name}
            />
          </Form.Item>
          <Form.Item
            name='username'
            valuePropName={user.user}
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input 
              prefix={<UserOutlined className='site-form-item-icon' />} 
              placeholder='Username' 
              value={user.user}
            />
          </Form.Item>
          <Form.Item
            name='password'
            valuePropName={user.password}
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Password'
              value={user.password}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default User;