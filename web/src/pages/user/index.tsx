import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import 'antd/dist/antd.css';

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
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (!!id) loadUser(`${id}`);
    }
  }, [id]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      form.setFieldsValue({
        _id: user._id,
        name: user.name,
        user: user.user,
        password: user.password,
      });
    }
  }, [user, form]);

  const loadUser = async (id: string) => {
    const { data } = await UserService.find(id);
    
    setUser(data);
  }

  const onFormSubmit = async ({
    _id,
    name,
    user,
    password
  }: UserInterface) => {
    if (!_id) {
      await UserService.create({
        name,
        user,
        password
      });
    } else {
      await UserService.update(_id, {
        name,
        user,
        password
      });
    }

    navigate('/users')
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
          form={form}
          name='normal_login'
          className='login-form'
          onFinish={onFormSubmit}
        >
          <Form.Item
            name='_id'
          >
            <Input 
              disabled
              prefix={<IdcardOutlined className='site-form-item-icon' />} placeholder='id'
              value={user._id}
            />
          </Form.Item>
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input 
              prefix={<IdcardOutlined className='site-form-item-icon' />} placeholder='name'
              value={user.name}
            />
          </Form.Item>
          <Form.Item
            name='user'
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