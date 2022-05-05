import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductItem from '../../components/Products/ProductItem';
import Button from '../../components/shared/Button';
import { useSelector } from '../../hooks/useSelector';
import ArrowIcon from '../../Icons/ArrowIcon';
import Loader from '../../Icons/Loader';
import SortIcon from '../../Icons/SortIcon';
import { clearProducts, getFilteredProducts, getProducts } from '../../store/ducks/productsDuck';
import { GetProductsRequest, ProductType } from '../../types/products';
import './products.scss';

const PAGE_SIZE = 10;

const Products = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState<ProductType[] | null>(null);
  const products = useSelector((state) => state.productsReducer.productsList);
  const [filters, setFilters] = useState<GetProductsRequest>({
    Page: 1,
    PageSize: PAGE_SIZE,
  });
  const [fetching, setFetching] = useState<boolean>(false);

  // get full data filtered by price and add in local state
  const handlePriceFilter = () => {
    const OrderType = filters?.OrderType === 'Asc' ? 'Desc' : 'Asc';
    setFilters({
      ...filters,
      OrderBy: 'Price',
      OrderType,
    });
    setItems(null);
    dispatch(getFilteredProducts({
      OrderBy: 'Price',
      OrderType,
      Page: 1,
      PageSize: filters.Page * PAGE_SIZE,
    }, { success: (data:ProductType[]) => setItems(data) }));
  };

  const handleLoadMore = () => {
    setFilters({
      ...filters,
      Page: filters.Page + 1,
    });
  };

  // handle page change and add new items in local state
  useEffect(() => {
    setFetching(true);
    dispatch(getProducts(filters, {
      success: (data: ProductType[]) => {
        setFetching(false);
        setItems([...items || [], ...data]);
      },
      error: () => setFetching(false),
    }));
  }, [filters.Page]);

  useEffect(() => {
    return () => {
      dispatch(clearProducts());
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="products">
        <div className="products--filter">
          <div className="products--sort" onClick={handlePriceFilter}>
            <SortIcon className={clsx('products--sort-icon')} />
            ფასის
            {' '}
            {filters.OrderType === 'Asc' ? 'ზრდადობით' : 'კლებადობით'}
            <ArrowIcon className={clsx('products--sort-arrow', filters.OrderType === 'Asc' && 'asc')} />
          </div>
        </div>

        {items ? (
          <>
            <div className="products-list">
              {items.map((el) => <ProductItem key={el.id} data={el} />)}
            </div>
            <div className="products-controls">
              <Button
                loading={fetching}
                type="secondary"
                classes="button--icon-right"
                handleClick={handleLoadMore}
                disabled={!!(products?.count && filters.Page * PAGE_SIZE >= products?.count)}
              >
                მეტის ნახვა
                <ArrowIcon className="products-controls--arrow" />
              </Button>
            </div>
          </>
        ) : <Loader className="products--loader" /> }
      </div>
    </div>

  );
};

export default Products;
