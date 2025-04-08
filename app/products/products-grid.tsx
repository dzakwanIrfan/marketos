"use client";

import { Grid } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import Product from "./product";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../common/constants/api";
import revalidateProducts from "./actions/revalidate-products";
import getAuthentication from "../auth/actions/get-authentication";

interface ProductGridProps {
    products: IProduct[];
}

export default function ProductsGrid({ products }: ProductGridProps) {
    useEffect(() => {
        let socket: Socket

        const createSocket = async () => {
            socket = io(API_URL!, {
                auth: {
                    Authentication: await getAuthentication(),
                }
            });

            socket.on("productUpdated", () => {
                revalidateProducts();
            });
        }

        createSocket();

        return () => {
            socket?.disconnect();
        }
    }, [])
    return (
        <div className="mt-8">
            <Grid 
                container 
                spacing={3} 
                sx={{ 
                    height: "85vh",
                    overflow: "hidden",
                    "&:hover": {
                        overflow: "auto",
                        paddingRight: "8px" 
                    },
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(0,0,0,0.1) transparent"
                }}
            >
                {products.map((product) => (
                    <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}