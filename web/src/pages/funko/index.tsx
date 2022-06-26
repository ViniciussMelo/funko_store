import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import './index.css';
import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Input, Select, Upload } from 'antd';
import { IdcardOutlined, UploadOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

import { IoMdPricetag } from 'react-icons/io';
import { MdTitle } from 'react-icons/md';

import FunkoService from "../../services/FunkoService";
import UserService from "../../services/UserService";


interface UserFunkoInterface {
  id: string;
  name: string;
  funko: FunkoInterface;
}

interface FunkoInterface {
  _id: string;
  description: string;
  sale: boolean;
  url: string;
  value: number;
}

interface UserInterface {
  _id: string;
  name: string;
}

interface FormDataInterface {
  description: string;
  sale: boolean;
  url: string;
  value: number;
  id: string;
}

const h1Style = {
  fontSize: '2em',
  fontWeight: "bold"
}

const imageStyle = {
  color: '#fff',
  lineHeight: '80px',
  textAlign: 'center' as const,
  background: '#364d79',
  position: 'relative' as const,
  zIndex: 2,
  maxHeight: '50vh'
};

const { Option } = Select;

const Funko = () => {
  const { REACT_APP_IMAGE_URL } = process.env;
  
  const { id } = useParams();
  const [form] = Form.useForm();
  const [funko, setFunko] = useState<UserFunkoInterface>({
    funko: {
      description: '',
      sale: true,
      url: '',
      value: 0,
    }
  } as UserFunkoInterface);
  const [users, setUsers] = useState<Array<UserInterface>>([{}] as Array<UserInterface>);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    return () => {
      if (!!id) loadFunko(`${id}`);
      loadUsers();
    }
  }, []);

  useEffect(() => {
    if (Object.keys(funko).length > 0) {
      form.setFieldsValue({
        id: funko.id,
        _id: funko.funko._id,
        description: funko.funko.description,
        value: funko.funko.value,
        sale: funko.funko.sale,
      });
    }
  }, [funko, form]);

  const loadFunko = async (id: string) => {
    const { data } = await FunkoService.find(id);

    setFunko(data);
  }

  const loadUsers = async () => {
    const { data } = await UserService.findAll();

    setUsers(data);
  }

  const onFormSubmit = async ({
    description,
    value,
    id,
    sale
  }: FormDataInterface) => {
    await FunkoService.update(funko.funko._id, {
      description,
      value,
      userId: id,
      sale
    });
    
    if (selectedImage) {
      const formData = new FormData();
      formData.append('funko', selectedImage);
      formData.append('id', funko.funko._id);
      formData.append('userId', funko.id);
      await FunkoService.updateImage(funko.funko._id, formData);
    }
  }

  const onChangeSale = (event: CheckboxChangeEvent) => {
    const sale = event.target.checked;

    const newFunko = JSON.parse(JSON.stringify(funko)) as UserFunkoInterface;
    newFunko.funko.sale = sale;
    setFunko(newFunko);
  }

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: "center"
      }}>
        <div>
          <h1 style={h1Style}>{funko.funko.url}</h1>
          <img 
            style={imageStyle} 
            src={funko.funko.url && REACT_APP_IMAGE_URL + funko.funko.url} 
            id="firstMovie" 
            alt="firstMovie"
          />
        </div>
        <div style={{
          marginLeft: '100px',
          width: '100vh'
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
                value={funko.funko._id}
              />
            </Form.Item>
            <Form.Item
              name='description'
              rules={[
                {
                  required: true,
                  message: 'Please input the description!',
                },
              ]}
            >
              <Input 
                prefix={<MdTitle className='site-form-item-icon' />} placeholder='description'
                value={funko.funko.description}
              />
            </Form.Item>
            <Form.Item
              name='value'
              rules={[
                {
                  required: true,
                  message: 'Please input the value!',
                },
              ]}
            >
              <Input 
                prefix={<IoMdPricetag className='site-form-item-icon' />} placeholder='value'
                value={funko.funko.value}
              />
            </Form.Item>
            <Form.Item
              name='id'
            >
              <Select
                style={{marginLeft: '15px'}}
              >
                {users.map((user, index) => (
                  <Option key={index} value={user._id}>{user.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <input
                type="file"
                name="image"
                accept="image/*"
                multiple={false}
                style={{
                  marginLeft: '15px'
                }}
                onChange={(event: any) => {
                  setSelectedImage(event.target.files[0]);
                }}
              ></input>
            </Form.Item>
            <Form.Item
              name='sale'
            >
              <Checkbox 
                value={funko.funko.sale}
                onChange={onChangeSale} 
                checked={funko.funko.sale}
              >
                Sale
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Save
              </Button>
            </Form.Item>
        </Form>
        </div>
      </div>
    </>
  )
}

export default Funko;