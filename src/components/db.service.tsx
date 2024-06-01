import { error } from 'console';
import { auth, db } from '../firebase-config';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, where, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const addJournalEntry = async (title: string, content: any, tags: any, entryDate: any, userId: string | undefined) => {
    try {

      const data = {
        title: title,
        content: content,
        tags: tags,
        entryDate: entryDate,
        createdAt: new Date(),
        userId: userId
      }

      addDoc(collection(db, 'journalEntries'), data)
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

  const updateJournalEntry = async (id: any, updatedData: any) => {
    const entryRef = doc(db, 'journalEntries', id);
    await updateDoc(entryRef, updatedData);
  }; 

  const deleteJournalEntry = async (id: any) => {
    await deleteDoc(doc(db, 'journalEntries', id));
  };

export {deleteJournalEntry, fetchJournalEntries, addJournalEntry, updateJournalEntry}