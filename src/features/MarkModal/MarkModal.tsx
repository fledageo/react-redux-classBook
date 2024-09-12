import { createPortal } from 'react-dom'
import styles from "./MarkModal.module.css"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { toggleModal } from './MarkModal.slice'
import React, { useState } from 'react'
import { addMark } from '../ClassBook/ClassBook.slice'
export const MarkModal = () => {
  const [mark, setMark] = useState<number>(0)

  const subjects = useAppSelector(state => state.classbook.subjects)
  const subjectId = useAppSelector(state => state.modal.payload?.subjectId)
  const studentId = useAppSelector(state => state.modal.payload?.studentId)

  const dispatch = useAppDispatch()

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.target as HTMLDivElement
    if (container.getAttribute("id") === "modalContainer") {
      dispatch(toggleModal(null))
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+e.target.value)) {
      if (+e.target.value < 11) {
        setMark(+e.target.value)
      } else {
        setMark(10)
      }
    }
  }
  const handleAddMark = () => {
    if (studentId && subjectId) {
      const found = subjects.find(elm => elm.id === subjectId)
      if (found) {
        dispatch(addMark({
          id: subjectId,
          payload: {
            ...found,
            marks: [
              ...found.marks,
              {student:studentId,mark:mark}
            ]
          }
        }))
        dispatch(toggleModal(null))
      }
    }
  }

  return createPortal(<>
    <div className={styles.container} onClick={(e) => handleClose(e)} id="modalContainer">
      <div className={styles.modalWrapper}>
        <p className={styles.helperText}>{mark < 4 ? "անբավարար" : mark < 8 ? "բավարար" : mark < 10 ? "լավ" : "գերազանց"}</p>
        <input
          value={mark}
          onChange={(e) => handleOnChange(e)}
          className={styles.field}
        />
        <button className={styles.btn} onClick={() => handleAddMark()}>Ok</button>
      </div>
    </div>
  </>, document.body)
}
