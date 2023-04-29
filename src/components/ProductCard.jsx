import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { firestoreDb, ref, fireStorage } from "../Firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";

import { useAuthContext } from "../hooks/useAuthContext";

import "./productCard.css";

export default function Card({ item }) {
  const { dispatch, user } = useAuthContext();

  const { id } = useParams();
  const navigate = useNavigate();

  const [price, setPrice] = useState(`${item.price}`);
  const [qty, setQty] = useState(`${item.qty}`);

  const addPrice = () => {
    setPrice((prevPrice) => {
      console.log(prevPrice);
      return Number(prevPrice) + 200;
    });
  };
  const reducePrice = () => {
    setPrice((prevPrice) => {
      console.log(prevPrice);
      return Number(prevPrice) - 200;
    });
  };
  const addQty = () => {
    setQty((prevQty) => {
      console.log(prevQty);
      return Number(prevQty) + 1;
    });
  };
  const reduceQty = () => {
    setQty((prevQty) => {
      console.log(prevQty);
      return Number(prevQty) - 1;
    });
  };

  const saveEdit = async () => {
    const ref = doc(firestoreDb, "product", `${id}`);
    await updateDoc(ref, { price, qty });
    navigate("/");
  };

  const handleDelete = async () => {
    const ref3 = doc(firestoreDb, "product", `${id}`);
    console.log(ref3);
    const dpRef = ref(fireStorage, `dp/${item.name}`);
    deleteObject(dpRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });

    await deleteDoc(ref3);
    navigate("/");
  };

  return (
    <div className="product-card">
      <div className="product-card-top">
        <div className="product-card-img-container">
          <img className="product-card-img" src={item.dp} alt="" />
        </div>
        <div className="product-card-content">
          {<h2 className="product-card-name">{item.name}</h2>}
          <h3 className="product-card-price">&#x20A6;{price}</h3>
          <div className="product-card-info">
            <p className="product-card-desc">{item.desc}</p>
            <p className="product-card-qty">Qty Available:{qty}</p>
            <a
              href={`https://wa.me/2348050620073?text="Hello Prussia Finery,I am interested in: ${item.name} for ${item.price}`}
            >
              <div className="product-card-btn btn"> Buy </div>
            </a>
          </div>
        </div>
      </div>
      {user && (
        <div className="product-card-control">
          <div className="product-control">
            <div  className="delete-btn">
              <i
                onClick={() => {
                  handleDelete();
                }}
              >
                <svg
                  className="icon delete-btn"
                  xmlns="http://www.w3.org/2000/svg"
                  width="35px"
                  height="35px"
                  fill=" rgb(150, 48, 99)"
                  viewBox="0 0 448 512"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </i>
            </div>
            <div>
            <div className="ctrl-box">
              <span
                onClick={() => {
                  addPrice();
                }}
                className="ctrl-icon"
              >
                <svg className="ctrl-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="rgb(150, 48, 99)" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
              </span>
              Price
              <span
                onClick={() => {
                  reducePrice();
                }}
              >
                <svg className="ctrl-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#0c0c3f" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
              </span>
              <span
                onClick={() => {
                  addQty();
                }}
              >
                <svg  className="ctrl-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="rgb(150, 48, 99)" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
              </span>
              Qty
              <span
                onClick={() => {
                  reduceQty();
                }}
            
              >
                <svg className="ctrl-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#0c0c3f" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
              </span>
            </div>
            </div>
            <div>
              <button className="btn save-btn" onClick={() => saveEdit()}>
                Save
              </button>
            </div>
          
          </div>
        </div>
      )}
    </div>
  );
}
