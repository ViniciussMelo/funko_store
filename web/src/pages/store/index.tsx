import { Card, Radio, RadioChangeEvent, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect, useState } from "react";
import FunkoService from "../../services/FunkoService";

interface FunkoInterface {
  description: string;
  url: string;
  value: number;
  id: string;
  name: string;
}

const { REACT_APP_IMAGE_URL } = process.env;

const Store = () => {
  const [funkosOnSale, setFunkosOnSale] = useState<Array<FunkoInterface>>([]);
  const [sortName, setSortname] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const loadFunkosOnSale = async (sortName = 'name', sortDirection = 'asc') => {
    const { data } = await FunkoService.getFunkoOnSale({ 
      sortName,
      sortDirection
     });

    setFunkosOnSale(data.funkos);
  }

  useEffect(() => {
    return () => {
      loadFunkosOnSale();
    }
  }, []);

  const onChangeSort = ({target: { value }}: RadioChangeEvent) => {
    if (['asc', 'desc'].includes(value)) {
      setSortDirection(value);
      loadFunkosOnSale(sortName, value);
    } else {
      setSortname(value);
      loadFunkosOnSale(value, sortDirection);
    }
  }

  return (
    <>
      <div style={{
        margin: '10px 0',
        display: 'flex',
      }}>
        <div style={{
          margin: '0 10px',
          zIndex: '0'
        }}>
          <Radio.Group defaultValue="name" onChange={onChangeSort}>
            <Radio.Button value="name" defaultChecked>Name</Radio.Button>
            <Radio.Button value="value">Price</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{
          margin: '0 10px',
          zIndex: '0'
        }}>
          <Radio.Group defaultValue="asc" onChange={onChangeSort}>
            <Radio.Button value="asc" defaultChecked>Asc</Radio.Button>
            <Radio.Button value="desc">Desc</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div
        style={{
          display: 'flex'
        }}
      >
        <Row>
          {
            funkosOnSale.map((funko, index) => (
              <Card
                key={index}
                hoverable
                style={{ 
                  width: 240, 
                  margin: '5px 5px',
                }}
                cover={
                  <img 
                    alt={`funko - ${index}`} 
                    src={`${REACT_APP_IMAGE_URL}${funko.url}`}
                    style={{
                      minWidth: '10vw',
                      maxWidth: '20vw',
                      minHeight: '20vh',
                      maxHeight: '20vh',
                    }}
                  />
                }
              >
                <p>{funko.name}</p>
                <Meta title={`R$: ${funko.value}`} description={funko.description}/>
              </Card>
            ))
          }
        </Row>
      </div>
    </>
  )
}

export default Store;