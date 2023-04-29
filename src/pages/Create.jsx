import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadBytes } from "firebase/storage";
import { firestoreDb, fireStorage, ref } from "../Firebase/config";
import { collection, addDoc } from "firebase/firestore";
import ProductForm from "../components/ProductForm";

export default function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [desc, setDesc] = useState("");
  const [dp, setDp] = useState("");
  const [error, setError] = useState({ value: false, msg: "" });

  const handleFileChange = (e) => {
    setDp(null);
    let selected = e.target.files[0];
    if (selected.size > 100000){
      setError({value:true,msg:"image size is too large"})
    }
    setDp(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && price && qty && desc && dp) {
      setError({ value: false, msg: "" });
      console.log(name, price, qty, desc, dp);
      const dpRef = ref(fireStorage, `dp/${name}`);

      await uploadBytes(dpRef, dp)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
        })
        .catch((error) => {
          setError({ value: true, msg: "Failed to upload. Try again" });
        });

      const ref3 = collection(firestoreDb, "product");

      await addDoc(ref3, {
        name: name[0].toUpperCase() + name.slice(1),
        price,
        qty,
        desc,
        dp: `https://firebasestorage.googleapis.com/v0/b/fir-1-app-c043c.appspot.com/o/dp%2F${name}?alt=media`,
      })
        .then(() => {
          return navigate("/");
        })
        .catch((error) => {
          setError({ value: true, msg: "Failed to upload. Try again" });
        });
    }

    if (!name || !price || !qty || !desc || !dp) {
      setError({ value: true, msg: "Please fill all details" });
      console.log(error);
    }
  };

  return (
    <div className="create-page page container">
      <ProductForm
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        desc={desc}
        setDesc={setDesc}
        qty={qty}
        setQty={setQty}
        error={error}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
      />
    </div>
  );
}
