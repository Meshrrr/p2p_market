import { createContext } from "react";
import type { ProductCardType } from "../components/ProductCard/ProductCard";

export const ProductsContext = createContext<ProductCardType[]>([])