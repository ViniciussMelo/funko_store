import { Card, Radio, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect } from "react";
import FunkoService from "../../services/FunkoService";

const Store = () => {
  const loadFunkosOnSale = async () => {
    await FunkoService.getFunkoOnSale({ 
      sortName: 'value',
      sortDirection: 'asc'
     })
  }

  useEffect(() => {
    return () => {
      loadFunkosOnSale();
    }
  }, []);

  return (
    <>
      <div style={{
        margin: '10px 0'
      }}>
        <Radio.Group defaultValue="name">
          <Radio.Button value="name" defaultChecked>Name</Radio.Button>
          <Radio.Button value="price">Price</Radio.Button>
        </Radio.Group>
      </div>
      <div
        style={{
          display: 'flex'
        }}
      >
        <Row>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Meta title="Price: 11" />
          </Card>
        </Row>
      </div>
    </>
  )
}

export default Store;