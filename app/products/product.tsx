"use client";

import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import Image from "next/image";
import { API_URL } from "../common/constants/api";
import { useRouter } from "next/navigation";

interface ProductProps {
    product: IProduct;
}

export default function Product({ product }: ProductProps) {
    const router = useRouter();
    return (
        <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
            <Card className="p-4">
                <Stack gap={1}>
                    <Typography variant="h5">{product.name}</Typography> 
                    {
                        product.imageExists && (
                            <Image 
                                src={`${API_URL}${product.imageUrl}`}
                                alt={product.name}
                                sizes="100vw"
                                width={0}
                                height={0}
                                className="w-full h-auto"
                            />
                        )
                    }
                    <Typography>{product.description}</Typography> 
                    <Typography>${product.price}</Typography> 
                </Stack>
            </Card>
        </CardActionArea>
    )
}