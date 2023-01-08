import { useState, useEffect } from 'react';
import './App.css';
import {db} from './firebase-config'
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState(0)
  const [users, setUsers] = useState([])


  const usersCollectionRef = collection(db, 'users')
// create
  const createUser = async (event) => {
    const key = uuidv4()
    event.preventDefault()
    setUsers([...users, {name: newName, age: Number(newAge), 'key': key}])
    await addDoc(usersCollectionRef, {name: newName, age: Number(newAge)})
  }
// update
  const updateUser = async (id, age, key) => {

    setUsers(users.map((item) => {
      if (item.key === key) {
        return {...item, age: Number(item.age + 1)}
      } else {
        return item
      }
    }))

    const userDoc = doc(db, 'users', id)
    const newFields = {age: age + 1}
    await updateDoc(userDoc, newFields)  
  }



  // delete
  const deleteUser = async (id, key) => {

    setUsers(
      users.filter((item) => {
        return item.key !== key
      })
    )


    const userDoc = doc(db, 'users', id)
    await deleteDoc(userDoc)

  }

  useEffect(()=> {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      const dataClean = data.docs.map((doc)=> ({...doc.data(), id: doc.id}))
      setUsers(dataClean.map((item) => {
        const key = uuidv4()
        return item = {...item, 'key': key}
      }))
    }
    
    getUsers()

  }, [])


  return (
    <div className="App">
      <form onSubmit={createUser}>
        <input type='text' placeholder='Name...'
        onChange={(e) => {setNewName(e.target.value)}}
        />
       <input type='number' placeholder='Age...'
          onChange={(e) => {setNewAge(e.target.value)}}
        />
        <button type='submit'>
        Create User
        </button>
      </form>
      {users.map((user)=> {
        return (
          <div key={user.key}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button onClick={()=> {updateUser(user.id, user.age, user.key)}} > Increase Age</button>
            <button onClick={()=> {deleteUser(user.id, user.key)}}> Delete User</button>
          </div>
      )})}
    </div>
  );
}

export default App;
