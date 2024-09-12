import React, { useState } from 'react'
import styles from "./AddStudent.module.css"
import { IStudentData } from './types'
import { addStudent } from '../../features/ClassBook/ClassBook.slice'
import { useAppDispatch } from '../../app/hooks'

export const AddStudent = () => {
  const dispatch = useAppDispatch()
  const [student, setStudent] = useState<IStudentData>({ name: "", surname: "" })

  const handleAdd = () => {
    if (student.name && student.surname) {
      dispatch(addStudent(student))
        .unwrap()
        .then(res => {
          setStudent({ name: "", surname: "" })
        })
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Add Student</p>
      <input
        type="text"
        value={student.name}
        onChange={(e) => setStudent({ ...student, name: e.target.value })}
        placeholder='Name'
        className={styles.field}
      />
      <input
        type="text"
        value={student.surname}
        onChange={(e) => setStudent({ ...student, surname: e.target.value })}
        placeholder='Surname'
        className={styles.field}
      />
      <button onClick={() => handleAdd()} className={styles.AddBtn}>Add</button>
    </div>
  )
}
