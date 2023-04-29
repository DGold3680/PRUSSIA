import { useState, useEffect } from "react";
import { firestoreDb } from "../Firebase/config";
import { collection, onSnapshot, getDocs } from "firebase/firestore";

const useCollections = (firestoreCollection) => {
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ value: false, msg: "" });

  useEffect(() => {
    setError({ value: false, msg: "" });
    setLoading(true);
    let ref = collection(firestoreDb, firestoreCollection);

    const unsub = onSnapshot(ref, async (snapshot) => {
      try {
        const snapshotData = await getDocs(ref);
        setLoading(false);
        let results = [];
        snapshotData.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(results);
      } catch (err) {
        console.log("bad");
        setLoading(false);
        setError({ value: true, msg: "failed to fetch" });
      }
    }, (err) => {
      console.log("Error getting documents: ", err);
      setLoading(false);
      setError({ value: true, msg: "failed to fetch" });
    });

    return () => unsub();
  }, [firestoreCollection]);

  return { documents, loading, error };
}

export { useCollections };