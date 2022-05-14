import { useEffect, useState } from 'react';
import OrderHistoryList, { OrderHistoryListItem } from '../../components/UserDashboard/OrderHistoryList';
import Tab from '../../components/shared/Tab/Tab';
import Hat from '../../assets/images/hat.png';
import UserDashboardModal from '../../components/UserDashboard/UserDashboardModal';
import Button from '../../components/shared/Button';
import ArrowIcon from '../../Icons/ArrowIcon';
import { useAppDispatch, useSelector } from '../../hooks/useSelector';
import { ProductOrderHistory, ReqProductsOrderHistory } from '../../types/user';
import { clearProductsOrderHistory, getProductsOrderHistory } from '../../store/ducks/userDuck';

const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 10;

const OrderHistory = () => {
  const dispatch = useAppDispatch();
  const productsOrderHistory = useSelector((state) => state.userReducer.productsOrderHistory);
  const authedUserId = useSelector((state) => state.userReducer.user?.id);
  const [loading, setLoading] = useState<boolean>(false);
  const [params, setParams] = useState<ReqProductsOrderHistory>({
    page: INITIAL_PAGE,
    pageSize: INITIAL_PAGE_SIZE,
    userId: null,
  });
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const disableLoadMoreBtn = productsOrderHistory && (params.pageSize) >= productsOrderHistory.count;

  const handleItemInfoClick = (id: number) => setSelectedItemId(id);

  const handleLoadMore = () => {
    if (productsOrderHistory && (params.pageSize) < productsOrderHistory.count) {
      setLoading(true);
      setParams({ ...params, pageSize: params.pageSize + INITIAL_PAGE_SIZE });
      dispatch(getProductsOrderHistory({
        ...params,
        pageSize: params.pageSize + INITIAL_PAGE_SIZE,
      }, { success: () => setLoading(false), error: () => setLoading(false) }));
    }
  };

  useEffect(() => {
    if (authedUserId) {
      setParams({ ...params, userId: authedUserId });
    }
  }, [authedUserId]);

  // get data based on selected tab
  useEffect(() => {
    if (selectedTab === 1 && !productsOrderHistory) {
      dispatch(getProductsOrderHistory(params));
    }
  }, [selectedTab, productsOrderHistory]);

  // clear state based on selected state
  useEffect(() => {
    if (selectedTab !== 1 && productsOrderHistory) {
      dispatch(clearProductsOrderHistory());
    }
  }, [selectedTab]);

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
          data={selectedTab === 0 ? products : productsOrderHistory?.items.map((el) => generateData(el))}
          handleItemInfoClick={handleItemInfoClick}
        />
        <Button
          loading={loading}
          type="secondary"
          classes="button--icon-right panel--content-btn"
          handleClick={handleLoadMore}
          disabled={Boolean(disableLoadMoreBtn)}
        >
          მეტის ნახვა
          <ArrowIcon className="" />
        </Button>
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
    price: 23,
    img: Hat,
  },
  {
    id: 2,
    title: 'ჰანგრიმენის ქუდი 2',
    date: '13 აპრ. 2022, 17:45',
    desc: 'საჩუქარი 40 ლარიან შენაძენზე',
    price: 3,
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
const generateData = (data: ProductOrderHistory): OrderHistoryListItem => ({
  id: data.id,
  date: data.itemPurchase.createdAt,
  desc: data.item.description,
  img: data.item?.medias?.length > 0 ? data.item.medias[0].url : '',
  price: data.item.newPrice,
  title: data.item.name,
});
