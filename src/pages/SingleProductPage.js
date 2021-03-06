/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { formatPrice } from "../utils/helpers";
import Rating from "react-rating";
import { products_url as url } from "../utils/constants";
import axios from "axios";
import cookies from "react-cookies";
import { Col, Row, Form, Button } from "react-bootstrap";
import Moment from "react-moment";

import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowRightOutlined,
  LikeOutlined,
  HeartOutlined,
} from "@ant-design/icons";
const SingleProductPage = () => {
  const [rating, setRating] = useState(0);
  const [view, setView] = useState(0);
  const [comments, setComments] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [commentContent, setCommentContent] = useState(null);
  const [changed, setChanged] = useState(1);
  const { id } = useParams();
  const history = useHistory();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    layChiTietSanPham,
  } = useProductsContext();

  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const saveRating = async (rate) => {
    try {
      let res = await axios.post(
        `${url}${id}/rating/`,
        {
          rate: rate,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        }
      );
      setRating(res.data);
      console.info(res);
    } catch (err) {
      console.log(err);
    }
  };
  const loadComments = async () => {
    try {
      let res = await axios.get(`${url}${id}/comments/`, {
        headers: {
          Authorization: `Bearer ${cookies.load("access_token")}`,
        },
      });
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveViews = async (view) => {
    try {
      let res = await axios.get(
        `${url}${id}/views/`,
        {
          views: view,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        }
      );
      setView(res.data.view);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async () => {
    try {
      let res = await axios.post(
        `${url}${id}/add-comment/`,
        {
          content: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        }
      );
      console.info(res.data);
      comments.push(res.data);
      setComments(comments);
      setChanged(comments.length);
    } catch (err) {
      console.info(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    layChiTietSanPham(id);
    saveRating(id);
    saveViews(id);
    addComment(id);
    loadComments(id);
  }, [id, changed]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const { name = "", last_price, mota, pre_price, hinhanh } = product;

  let danhgia = "";
  if (user !== null && user !== undefined) {
    danhgia = (
      <>
        <Rating initialRating={rating} onClick={saveRating} />
      </>
    );
  }

  let comment = "";
  if (user !== null && user !== undefined) {
    comment = (
      <>
        <div className="form-cmt">
          <Form onSubmit={addComment}>
            <Form.Group controlId="commentContent">
              <Form.Control
                className="comment"
                as="textarea"
                placeholder="Nh???p b??nh lu???n"
                rows={3}
                value={commentContent}
                onChange={(event) => setCommentContent(event.target.value)}
              />
            </Form.Group>
            <Button className="cmt-btn" type="submit">
              Add comment
            </Button>
          </Form>
          <section className="show-cmt">
            {comments.map((c) => (
              <Row className="cmt">
                <Col md={11} xs={9}>
                  <h5>
                    <em>{c.content}</em>
                  </h5>
                  <p>B??nh lu???n b???i: {c.creator.username}</p>
                  <p>
                    V??o l??c: <Moment fromNow>{c.created_date}</Moment>
                  </p>
                </Col>
              </Row>
            ))}
          </section>
        </div>
      </>
    );
  }
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/auction" className="btn">
          Back to auction
        </Link>
        <div className=" product-center">
          <ProductImages images={hinhanh} />
          <section className="content">
            <h2>{name}</h2>
            <div>{danhgia}</div>
            <LikeOutlined style={{ fontSize: "20px" }} onClick={likeHandler} />
            <HeartOutlined
              style={{ fontSize: "20px", marginLeft: "20px" }}
              onClick={likeHandler}
            />

            <div className="info">
              <span className="postLikeCounter">{like} people like it</span>
            </div>
            <h5 className="price">
              {formatPrice(pre_price)} <ArrowRightOutlined />
              {formatPrice(last_price)}
            </h5>
            <p className="desc"> {mota}</p>
            <p className="info">
              <span>M?? kho: </span>
              {id}
            </p>
            <p className="info">
              <span>View: </span>
              {view}
            </p>
            <hr />
            <AddToCart product={product} />
          </section>
        </div>
        {comment}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .form-cmt {
    display:flex;
    padding: 1rem;
  }
  .cmt-btn {
    margin-left: 2rem;
  }
  .show-cmt {
    padding: 1rem;
  }
  .cmt{
    padding: 1rem;
    margin 0.5rem 1rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  .comment {
    margin: 2rem 2rem;
    padding: 1rem;
    width: 30rem;
    height: 5rem;
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
