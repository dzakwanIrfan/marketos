import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { API_URL } from "@/app/common/constants/api";
import getProduct from "./get-product";
import Checkout from "@/app/checkout/checkout";

interface SingleProductProps {
  params: {
    productId: string;
  };
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageExists: boolean;
  imageUrl?: string | null;
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const { productId } = await Promise.resolve(params);
  const product: Product = await getProduct(+productId);

  return (
    <Grid
      container
      spacing={3} 
      sx={{ marginBottom: "2rem" }} 
      marginTop={{ xs: "1rem", md: "2rem" }}
    >
        {/* Image Section */}
        {product.imageExists && product.imageUrl && (
        <Grid size={{ xs: 12, md: 6 }}>
            <Image
                src={`${API_URL}${product.imageUrl}`} 
                alt={product.name} 
                width={0} 
                height={0} 
                sizes="100vw" 
                className="w-full h-auto md:w-3/4" 
            />
        </Grid>
        )}

        {/* Product Details Section */}
        <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3} sx={{ padding: { xs: "1rem", md: "0" } }}>
            <Typography variant="h2" component="h1">
                {product.name}
            </Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="h4" color="primary">
                ${product.price.toFixed(2)} 
            </Typography>
            <Checkout productId={product.id} />
            </Stack>
        </Grid>
    </Grid>
  );
}