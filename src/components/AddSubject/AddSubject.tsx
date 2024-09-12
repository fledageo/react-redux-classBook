import { useState } from "react"
import styles from "./AddSubject.module.css"
import { ISubjectData } from "./types"
import { useAppDispatch } from "../../app/hooks"
import { addSubject } from "../../features/ClassBook/ClassBook.slice"

export const AddSubject = () => {
  const dispatch = useAppDispatch()
  const [subject, setSubject] = useState<ISubjectData>({ title: "", marks: [] })

  const handleAdd = () => {
    if (subject.title) {
      dispatch(addSubject(subject))
        .unwrap()
        .then(res => {
          setSubject({ ...subject, title: "" })
        })
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Add Subject</p>
      <input
        type="text"
        value={subject.title}
        onChange={(e) => setSubject({ ...subject, title: e.target.value })}
        placeholder='Subject'
        className={styles.field}
      />
      <button onClick={() => handleAdd()} className={styles.addBtn}>Add</button>
    </div>
  )
}
