import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import apiConfig from "../libs/api";
import React from "react";

const queryClient = new QueryClient();

export const findProductsClient = (page, pageSize) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["productsClient", page, pageSize],
    queryFn: async () => {
      try {
        const response = await apiConfig.get(
          `/products?page=${page}&pageSize=${pageSize}`
        );

        return response.data.Data;
      } catch (error) {
        throw error;
      }
    },
  });

  return {
    data,
    isLoading,
    refetch,
  };
};

export const findProductsAdmin = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["productsAdmin"],
    queryFn: async () => {
      try {
        const response = await apiConfig.get("/products");

        return response.data.Data;
      } catch (error) {
        throw error;
      }
    },
  });

  return {
    data,
    isLoading,
    refetch,
  };
};

export const getProduct = (idProduct) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["product", idProduct],
    queryFn: async () => {
      try {
        const response = await apiConfig.get(`/product/${idProduct}`);

        return response.data.Data;
      } catch (error) {
        throw error;
      }
    },
  });

  return {
    data,
    isLoading,
    refetch,
  };
};

export const useProduct = () => {
  const { refetch } = findProductsAdmin();
  const [imgPreview, setImgPreview] = React.useState(null);
  const [form, setForm] = React.useState({
    id: 0,
    name: "",
    categoryId: 0,
    description: "",
    qty: 0,
    price: 0,
    image: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      categoryId: 0,
      description: "",
      qty: 0,
      price: 0,
      image: "",
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      setImgPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = useMutation({
    mutationFn: async (e, idProduct) => {
      try {
        e.preventDefault();
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
          },
        };

        let formData = new FormData();
        formData.append("name", form?.name);
        formData.append("description", form?.description);
        formData.append("price", form?.price);
        formData.append("qty", form?.qty);
        formData.append("image", form?.image[0]);
        formData.append("category_id", parseInt(form?.categoryId));

        await apiConfig.post("/product", formData, config);
        alert("sucess");
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["productsAdmin"] });
      refetch();
      resetForm();
    },
    onError: (error) => {
      console.log("Mutation error:", error);
    },
  });

  const updateProduct = useMutation({
    mutationFn: async (e) => {
      try {
        e.preventDefault();
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
          },
        };

        let formData = new FormData();
        formData.append("name", form?.name);
        formData.append("description", form?.description);
        formData.append("price", form?.price);
        formData.append("qty", form?.qty);
        if (typeof form?.image !== "string") {
          formData.append("image", form?.image[0]);
        }
        formData.append("category_id", parseInt(form?.categoryId));

        await apiConfig.patch(`/product/${form.id}`, formData, config);
        alert("sucess");
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["productsAdmin"] });
      refetch();
      resetForm();
    },
    onError: (error) => {
      console.log("Mutation error:", error);
    },
  });

  return {
    form,
    imgPreview,
    resetForm,
    setImgPreview,
    handleChange,
    handleSubmit,
    setForm,
    updateProduct,
  };
};

export const deleteProduct = async (id) => {
  try {
    await apiConfig.delete(`/product/${id}`);
  } catch (error) {
    throw error;
  }
};
