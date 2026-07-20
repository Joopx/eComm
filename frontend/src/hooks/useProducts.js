import { useMutation, useQuery } from "@tanstack/react-query"
import { createProduct, getAllProducts } from "../lib/api"


export const useProducts = () => {
   const result = useQuery({queryKey: ["products"],queryFn: getAllProducts})
    return result;
}
//queryKey is like a reference that we can use in different parts of code to queryFn


export const useCreateProduct =() => {
    const result =useMutation({mutationFn:createProduct})
    return result;
}