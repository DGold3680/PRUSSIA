import { Link } from "react-router-dom";
import "./product-form.css";
export default function ProductForm({
  name,
  price,
  qty,
  desc,
  setName,
  setPrice,
  setDesc,
  setQty,
  error,
  handleFileChange,
  handleSubmit,
}) {
  return (
    <form className="product-form">
      <h2 className="form-title">Add a Product</h2>
      <div className="product-field-box">
        <label htmlFor="name">Name</label>
        <input
          className="product-field"
          type="text"
          placeholder="Enter product Name"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="product-field-box">
        <label htmlFor="price">Price (&#x20A6;)</label>
        <input
          className="product-field"
          type="number"
          placeholder="Enter product price"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="product-field-box">
        <label htmlFor="qty">Qty</label>
        <input
          className="product-field"
          type="number"
          placeholder="Enter quantity available"
          id="qty"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </div>
      <div className="dp">
        <input
          className="product-dp"
          required
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleFileChange}
        />
      </div>
      <div className="product-field-box">
        <label htmlFor="desc" className="desc-label">
          Description
        </label>
        <textarea
          className="product-area"
          type="text"
          id="desc"
          placeholder="Tell your customers more about your product"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className=" btn addProduct-btn"
        onClick={handleSubmit}
      >
        Add Product
      </button>
      {error.value && <div className="error">{error.msg}</div>}
    </form>
  );
}
