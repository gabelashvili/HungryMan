import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/shared/Button';
import { useSelector } from '../../hooks/useSelector';
import ArrowIcon from '../../Icons/ArrowIcon';
import Loader from '../../Icons/Loader';
import SortIcon from '../../Icons/SortIcon';
import { getProducts } from '../../store/ducks/productsDuck';
import { GetProductsRequest } from '../../types/products';
import './products.scss';

const PAGE_SIZE = 10;

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.productsList);
  const [filters, setFilters] = useState<GetProductsRequest>({
    Page: 1,
    PageSize: PAGE_SIZE,
  });
  const [fetching, setFetching] = useState<boolean>(false);

  const handlePriceFilter = () => {
    setFilters({
      ...filters,
      OrderBy: 'Price',
      OrderType: filters?.OrderType === 'Asc' ? 'Desc' : 'Asc',
    });
  };

  const handleLoadMore = () => {
    setFilters({
      ...filters,
      Page: filters.Page + 1,
    });
  };

  useEffect(() => {
    setFetching(true);
    dispatch(getProducts(filters, { success: () => setFetching(false), error: () => setFetching(false) }));
  }, [filters]);

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

        {products?.items ? (
          <>
            <div className="products-list">
              <div className="products-item">
                <picture className="products-item--image">
                  <img src="../../../assets/images/hat.png" alt="Product item" />
                </picture>

                <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
                <p className="products-item--description">
                  საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
                </p>
                <span className="products-item--price"> 250.00₾ </span>
              </div>

              <div className="products-item">
                <picture className="products-item--image">
                  <img src="../../../assets/images/hat.png" alt="Product item" />
                </picture>

                <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
                <p className="products-item--description">
                  საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
                </p>
                <span className="products-item--price"> 250.00₾ </span>
              </div>

              <div className="products-item">
                <picture className="products-item--image">
                  <img src="../../../assets/images/hat.png" alt="Product item" />
                </picture>

                <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
                <p className="products-item--description">
                  საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
                </p>
                <span className="products-item--price"> 250.00₾ </span>
              </div>

              <div className="products-item">
                <picture className="products-item--image">
                  <img src="../../../assets/images/hat.png" alt="Product item" />
                </picture>

                <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
                <p className="products-item--description">
                  საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
                </p>
                <span className="products-item--price"> 250.00₾ </span>
              </div>

              <div className="products-item">
                <picture className="products-item--image">
                  <img src="../../../assets/images/hat.png" alt="Product item" />
                </picture>

                <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
                <p className="products-item--description">
                  საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
                </p>
                <span className="products-item--price"> 250.00₾ </span>
              </div>

              <div className="products-item">
                <picture className="products-item--image">
                  <img src="../../../assets/images/hat.png" alt="Product item" />
                </picture>

                <h6 className="products-item--title">ჰანგრიმენის ნაცრისფერი საწვიმარი</h6>
                <p className="products-item--description">
                  საუკეთესო ხარისხის საწვიმარი ჩვენი ერთგული მომხმარებლისთვის.
                </p>
                <span className="products-item--price"> 250.00₾ </span>
              </div>
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
