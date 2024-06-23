import { error } from 'console';
import { auth, db } from '../firebase-config';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, where, query, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const addJournalEntry = async (entry: any) => {
    try {

      // const data = {
      //   title: title,
      //   content: content,
      //   tags: tags,
      //   createdAt: new Date(),
      //   userId: userId
      // }

      addDoc(collection(db, 'journalEntries'), {
        ...entry,
        updatedAt: new Date()
      })
      .then(docRef => {
        console.log("Write successfull with ID: ", docRef.id)
      }).catch(error => {
        console.log(error);
      })


      // console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const fetchJournalEntries = async (userId: string | undefined) => {
    const q = query(collection(db, "journalEntries"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return entries;
  };  

  const fetchJournalEntryById = async (id: string) => {
    const docRef = doc(db, 'journalEntries', id);
    const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such document!');
    return null;
  }
  }

  const updateJournalEntry = async (id: any, updatedData: any) => {
    const entryRef = doc(db, "journalEntries", id);
  await updateDoc(entryRef, {
    ...updatedData,
    updatedAt: new Date() // Add or update the modification date
  });
  }; 

  const deleteJournalEntry = async (id: any) => {
    await deleteDoc(doc(db, 'journalEntries', id));
  };

export {deleteJournalEntry, fetchJournalEntries, addJournalEntry, updateJournalEntry, fetchJournalEntryById}