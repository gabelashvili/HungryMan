import { useState } from 'react';
import OrderHistoryList, { OrderHistoryListItem } from '../../components/UserDashboard/OrderHistoryList';
import Tab from '../../components/shared/Tab/Tab';
import Hat from '../../assets/images/hat.png';
import CellsIcon from '../../assets/images/cells-icon.svg';
import UserDashboardModal from '../../components/UserDashboard/UserDashboardModal';

const OrderHistory = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleItemInfoClick = (id: number) => setSelectedItemId(id);
  return (
    <div className="panel">
      <UserDashboardModal
        selectedTab={selectedTab}
        open={!!selectedItemId}
        handleClose={() => setSelectedItemId(null)}
      />
      <div className="panel--header with-border">
        <h3 className="panel--title">შეკვეთების ისტორია</h3>
      </div>
      <Tab inline selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />
      <div className="panel--content">
        <OrderHistoryList
          data={selectedTab === 0 ? products : cells}
          handleItemInfoClick={handleItemInfoClick}
        />
      </div>
    </div>
  );
};

export default OrderHistory;

const products: OrderHistoryListItem[] = [
  {
    id: 1,
    title: 'ჰანგრიმენის ქუდი 1',
    date: '14 აპრ. 2022, 17:45',
    desc: 'საჩუქარი 300 ლარიან შენაძენზე',
    price: '132ლ',
    img: Hat,
  },
  {
    id: 2,
    title: 'ჰანგრიმენის ქუდი 2',
    date: '13 აპრ. 2022, 17:45',
    desc: 'საჩუქარი 40 ლარიან შენაძენზე',
    price: '13ლ',
    img: Hat,
  },
];

const cells: OrderHistoryListItem[] = [
  {
    id: 1,
    title: 'კედლის უჯრები',
    date: '14 აპრ. 2022, 17:45',
    desc: 'საჩუქარი 300 ლარიან შენაძენზე',
    price: '55ლ',
    img: CellsIcon,
  },
  {
    id: 2,
    title: 'ჰანგრიმენის ქუდი ',
    date: '13 აპრ. 2022, 17:45',
    desc: 'საჩუქარი 40 ლარიან შენაძენზე',
    price: '265ლ',
    img: Hat,
  },
];

const tabs = [
  {
    label: 'უჯრები',
    value: 0,
    counter: 12,
  },
  {
    label: 'პროდუქცია',
    value: 1,
    counter: 12,
  },
];
