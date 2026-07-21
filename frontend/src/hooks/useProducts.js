import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProduct, deleteProduct, getAllProducts, getMyProducts, getProductsById } from "../lib/api"


export const useProducts = () => {
   const result = useQuery({queryKey: ["products"],queryFn: getAllProducts})
    return result;
}
//queryKey is like a reference that we can use in different parts of code to queryFn


export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
    },
  });
};


export const useProduct = (id) => {
   return useQuery({
        queryKey: ["product", id],
        queryFn: ()=> getProductsById(id),
        enabled: !!id  //double bang operator , converts objects to boolean

    });
};


export const useDeleteProduct =() =>{
    const queryClient = useQueryClient()
    return useMutation({
       mutationFn: deleteProduct,
        
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["myProducts"]})
        }
    })
}

export const useMyProducts =() =>{
    return useQuery({ queryKey: ["myProducts"], queryFn: getMyProducts})
}