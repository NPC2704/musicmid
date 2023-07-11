// import React, { useState } from 'react';
// import { db } from '../firebase/config';

// const useFirestore = (collection, condition) => {
//   const [documents, setDocuments] = useState([]);

//   React.useEffect(() => {
//     let collectionRef = db.collection(collection).orderBy('createdAt');
//     if (condition) {
//       if (!condition.compareValue || !condition.compareValue.length) {
//         // reset documents data
//         setDocuments([]);
//         return;
//       }

//       collectionRef = collectionRef.where(
//         condition.fieldName,
//         condition.operator,
//         condition.compareValue
//       );
//     }

//     const unsubscribe = collectionRef.onSnapshot((snapshot) => {
//       const documents = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));

//       setDocuments(documents);
//     });

//     return unsubscribe;
//   }, [collection, condition]);

//   return documents;
// };

// export default useFirestore;
import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import firebase from "firebase/app";
import "firebase/firestore";

interface Condition {
  fieldName: string;
  operator: any;
  compareValue: any;
}

const useFirestore = (collection: string, condition: Condition | null) => {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return () => unsubscribe();
  }, [collection, condition]);

  return documents;
};

export default useFirestore;
