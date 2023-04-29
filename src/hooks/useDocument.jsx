import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { firestoreDb } from "../Firebase/config";


export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  // realtime document data
  useEffect(() => {
    async function fetch() {
      setError(null)
      console.log("start");
      const docRef = doc(firestoreDb,collection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDocument( docSnap.data())
        setError(false)
        console.log("Document data:", docSnap.data());
      } else {
        setError(true)
        console.log("No such document!");
      }
    }
    fetch();
  }, [collection, id]);

  return { document, error };
};
