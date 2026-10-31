import { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";

import ProductGrid from "../../components/product/ProductGrid";

import useDispatch from "../../hooks/useDispatch";
import useSelector from "../../hooks/useSelector";

import { fetchProducts } from "../../redux/slices/productSlice";

function ProductList() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box py={3}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          All Products
        </Typography>

        <ProductGrid products={products} loading={loading} error={error} />
      </Box>
    </Container>
  );
}

export default ProductList;
