import ProductGrid from '../ProductGrid/ProductGrid';
import UsersGrid from '../UsersGrid/UsersGrid';
import OrderGrid from '../OrderGrid/OrderGrid';
import { Tabs } from 'antd';
const onChange = (key) => {
  // console.log(key);
};
const Panel = () => (
  <Tabs
    style={{
      width:'80%',
      margin:'auto'
    }}
    onChange={onChange}
    type="card"
    items={new Array(3).fill(null).map((_, i) => {
      const id = String(i);
      const label = ['products','users','orders'];
      const grid = [<ProductGrid/>,<UsersGrid/>,<OrderGrid/>]
      return {
        label: (label[id]),
        key: id,
        children: (grid[id]),
      };
    })}
  />
);
export default Panel;