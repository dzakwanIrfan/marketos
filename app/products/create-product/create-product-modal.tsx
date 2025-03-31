"use client";

import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { FormResponse } from "../../common/interfaces/form-response.interface";
import createProduct from "../actions/create-product";

interface CreateProductModalProps {
    open: boolean;
    handleClose: () => void;
}

const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function CreateProductModal({
    open,
    handleClose,
}: CreateProductModalProps) {
    const [response, setResponse] = useState<FormResponse>();
    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        price: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const onClose = () => {
        setResponse(undefined);
        setFormValues({ name: "", description: "", price: "" }); 
        handleClose();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const formData = new FormData();
        formData.append("name", formValues.name);
        formData.append("description", formValues.description);
        formData.append("price", formValues.price);

        const res = await createProduct(formData);
        setResponse(res);
        if (!res.error) {
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={styles}>
                <form className="w-full max-w-xs" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            required
                            value={formValues.name}
                            onChange={handleChange}
                            helperText={response?.error}
                            error={!!response?.error}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            required
                            value={formValues.description}
                            onChange={handleChange}
                            helperText={response?.error}
                            error={!!response?.error}
                        />
                        <TextField
                            name="price"
                            label="Price"
                            variant="outlined"
                            required
                            value={formValues.price}
                            onChange={handleChange}
                            helperText={response?.error}
                            error={!!response?.error}
                        />
                        <Button type="submit" variant="contained" fullWidth>
                            SUBMIT
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}