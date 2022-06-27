import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import 'antd/dist/antd.css';
import { Button, Popconfirm, Table } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

import FunkoService from '../../services/FunkoService';

interface FunkoInterface {
  _id: string;
  description: string;
  sale: boolean;
  url: string;
  value: number;
}

interface UserFunkoInterface {
  id: string;
  name: string;
  funkos: Array<FunkoInterface>;
}

interface DataSourceInterface {
  key: string;
  row: number;
  id: string;
  userId: string;
  username: string;
  description: string;
  value: number;
  sale: string;
}

const Funkos = () => {
  const [funkos, setFunkos] = useState<DataSourceInterface[]>([]);
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Row',
      dataIndex: 'row',
      align: 'right' as const,
      sorter: (a: any, b: any) => a.row - b.row
    },
    {
      title: 'Id',
      dataIndex: 'id',
      render: (text: any, record: any, index: any) => {
        return (        
          <Link to={`/funkos/` + record.key}>{text}</Link>
        );
      },
      sorter: (a: any, b: any) => { return a.id.localeCompare(b.id)}
    },
    {
      title: 'username',
      dataIndex: 'username',
      sorter: (a: any, b: any) => { return a.username.localeCompare(b.username)}
    },
    {
      title: 'description',
      dataIndex: 'description',
      sorter: (a: any, b: any) => { return a.description.localeCompare(b.description)}
    },
    {
      title: 'value',
      dataIndex: 'value',
      align: 'right' as const,
      sorter: (a: any, b: any) => a.value - b.value
    },
    {
      title: 'sale',
      dataIndex: 'sale',
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      width: 150,
      render: (text: any, record: any) => {
        return (
          <span>
            {
              (
                <Popconfirm 
                  title={<div style={{marginLeft: "10px"}}>Sure to delete?</div>} 
                  onConfirm={() => deleteFunko(record.key)} 
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
  
  const isUserLogged = () => {
    const userId = localStorage.getItem('userId');

    if (!userId) return false;

    return true;
  }

  useEffect(() => {
    if(!isUserLogged()) navigate('/');
    return () => {
      loadFunkos();
    }
  }, []);

  const deleteFunko = async (id: string) => {
    await FunkoService.delete(id);
    await loadFunkos();
  }

  const loadFunkos = async () => {
    const { data } = await FunkoService.findAll();
    let row = 1;

    const funkosFormatted: Array<DataSourceInterface> = [];
    data.forEach((userFunko: UserFunkoInterface) => {
      userFunko.funkos.forEach((funko: FunkoInterface) => {
        funkosFormatted.push({
          key: funko._id,
          row,
          id: funko._id,
          userId: userFunko.id,
          username: userFunko.name,
          description: funko.description,
          value: funko.value,
          sale: funko.sale ? 'true' : 'false',
        });

        row++;
      });
    });

    setFunkos(funkosFormatted)
  }

  const sendToCreateFunko = () => {
    navigate('/funkos/0');
  }

  return (
    <>
      <div>
        <Button 
          type="primary" 
          style={{
            marginTop: '10px'
          }}
          onClick={sendToCreateFunko}
        >
          Create Funko
        </Button>
        <Table 
          dataSource={funkos} 
          columns={columns}
          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
          showSorterTooltip
        />;
      </div>
    </>
  )
}

export default Funkos;