import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../Product";
import { listProducts } from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";
import Paginate from "../Paginate";
import ProductCarousel from "../ProductCarousel";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Latest Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
