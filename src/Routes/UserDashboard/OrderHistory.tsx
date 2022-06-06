import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductsOrderHistoryList from '../../components/UserDashboard/ProductsOrderHistoryList';
import Tab from '../../components/shared/Tab/Tab';
import UserDashboardModal from '../../components/UserDashboard/UserDashboardModal';
import Button from '../../components/shared/Button';
import ArrowIcon from '../../Icons/ArrowIcon';
import { useAppDispatch, useSelector } from '../../hooks/useSelector';
import { ProductOrderHistory, ReqProductsOrderHistory } from '../../types/user';
import { clearProductsOrderHistory, getProductsOrderHistory } from '../../store/ducks/userDuck';
import { getCubesPurchaseHistory } from '../../store/ducks/cubesDuck';

const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 10;

const OrderHistory = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const productsOrderHistory = useSelector((state) => state.userReducer.productsOrderHistory);
  const cubesOrderHistory = useSelector((state) => state.cubesReducer.purchaseHistory);
  const authedUserId = useSelector((state) => state.userReducer.user?.id);
  const [loading, setLoading] = useState<boolean>(false);
  const [params, setParams] = useState<ReqProductsOrderHistory>({
    page: INITIAL_PAGE,
    pageSize: INITIAL_PAGE_SIZE,
    userId: null,
  });
  const [selectedItem, setSelectedItem] = useState<ProductOrderHistory | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const disableLoadMoreBtn = productsOrderHistory && (params.pageSize) >= productsOrderHistory.count;
  const tabs = [
    {
      label: 'უჯრები',
      value: 0,
      ...cubesOrderHistory && cubesOrderHistory.length > 0 && { counter: cubesOrderHistory.length },

    },
    {
      label: 'პროდუქცია',
      value: 1,
      ...productsOrderHistory?.count && productsOrderHistory?.count > 0 && { counter: productsOrderHistory.count },
    },
  ];

  const handleItemInfoClick = (id: number) => {
    if (productsOrderHistory) {
      setSelectedItem(productsOrderHistory.items.find((el) => el.id === id) || null);
    }
  };

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
    dispatch(getProductsOrderHistory(params));
    dispatch(getCubesPurchaseHistory());
  }, []);

  useEffect(() => {
    if (pathname !== 'order-history') {
      dispatch(clearProductsOrderHistory());
    }
  }, [pathname]);

  return (
    <div className="panel">
      <UserDashboardModal
        selectedTab={selectedTab}
        open={!!selectedItem}
        handleClose={() => setSelectedItem(null)}
        data={selectedItem}
      />
      <div className="panel--header with-border">
        <h3 className="panel--title">შეკვეთების ისტორია</h3>
      </div>
      <Tab inline selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />
      <div className="panel--content">
        <ProductsOrderHistoryList
          data={productsOrderHistory}
          handleItemInfoClick={handleItemInfoClick}
        />
        {selectedTab === 1 && productsOrderHistory && productsOrderHistory?.count > INITIAL_PAGE_SIZE && (
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
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
