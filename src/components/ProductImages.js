import React from "react";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
const ProductImages = () => {
  const { single_product: product } = useProductsContext();
  const { image } = product;
  return (
    <Wrapper>
      <img src={image} alt="main " className="main" />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    width:500px;
    height: 600px;
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
  }
`;

export default ProductImages;
