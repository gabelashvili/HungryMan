import { useState } from 'react';
import UserDashboardTab from '../../components/UserDashboard/UserDashboardTab/UserDashboardTab';

const OrderHistory = () => {
  const [selectedTab, setSelectedTab] = useState<0 | 1>(0);
  return (
    <div className="panel">
      <div className="panel--header with-border">
        <h3 className="panel--title">შეკვეთების ისტორია</h3>
      </div>
      <UserDashboardTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="panel--content">
        wqdqwd
      </div>
    </div>
  );
};

export default OrderHistory;
