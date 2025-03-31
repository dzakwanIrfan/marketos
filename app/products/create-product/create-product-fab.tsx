"use client";

import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import CreateProductModal from "./create-product-modal";
import { useState } from "react";

export default function CreateProductFab() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <CreateProductModal open={modalVisible} handleClose={() => setModalVisible(false)} />
            <div className="absolute left-8 bottom-8">
                <Fab color="primary" onClick={() => setModalVisible(true)}>
                    <AddIcon />
                </Fab>
            </div>
        </>
    )
}