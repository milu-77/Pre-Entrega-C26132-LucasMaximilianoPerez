
import { collection, doc, getDocs, getDoc, addDoc,writeBatch, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../data/data.js";

export async function readDocuments(collectionName) {
  const colRef = collection(db, collectionName);
   const snapshot = await getDocs(colRef);
  // Mapeamos los documentos para unificar el ID de Firebase con los campos internos del objeto
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

export async function readDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() };
}

export async function createDocument(collectionName, data) {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return docRef.id;
}

export async function updateDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

export async function deleteDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

export async function clearDocument(collectionName) {
  try {
    const colRef = collection(db, collectionName);
   const snapshot = await getDocs(colRef);
      if (snapshot.empty) {
      console.log(` La colección '${collectionName}' ya está vacía.`);
      return true;
    }
     const batch = writeBatch(db);
    snapshot.docs.forEach((docSnap) => {
       batch.delete(docSnap.ref);
    }); 
    await batch.commit();
    console.log(` Colección '${collectionName}' vaciada con éxito.`);
    return true;
  } catch (error) {
    console.error(`Error al vaciar la colección '${collectionName}':`, error);
    throw error;
  }
}
 