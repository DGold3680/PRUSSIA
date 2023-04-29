import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";

import ProductCard from "../components/ProductCard";
export default function ShowOne() {
  const { id } = useParams();
  const { document: product, error } = useDocument("product", `${id}`);

  return (
    <div className="view-page page">
        {product && <ProductCard item={product} key={id} />}
    </div>
  );
}
