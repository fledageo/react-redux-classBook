import React, { useEffect } from 'react'
import styles from "./styles.module.css"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { IOpenModalParam, IStudent } from './types'
import { getAllStudents, getAllSubjets } from './ClassBook.slice'
import { MarkModal } from '../MarkModal/MarkModal'
import { toggleModal } from '../MarkModal/MarkModal.slice'
export const ClassBook = () => {
    const students = useAppSelector(state => state.classbook.students)
    const subjects = useAppSelector(state => state.classbook.subjects)
    const isOpen = useAppSelector(state => state.modal.isOpen)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllStudents())
        dispatch(getAllSubjets())
    }, [])


    const handleOpenModal = (param:IOpenModalParam) => {
        dispatch(toggleModal(param))
    }

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableHeader}>
                    <tr>
                        <th rowSpan={2}>Students</th>

                        <th colSpan={12}>Subjects</th>
                    </tr>
                    <tr>
                        {
                            subjects.map(sub =>
                                <th key={sub.id} className={styles.subjects}>
                                    {sub.title}
                                </th>
                            )
                        }
                        {
                            new Array(12 - subjects.length)
                                .fill(null)
                                .map((elm, index) =>
                                    <th key={index}></th>
                                )
                        }
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {
                        students.map(stud =>
                            <tr key={stud.id}>
                                <td className={styles.student}>
                                    {stud.name} {stud.surname}
                                </td>
                                {
                                    subjects.map(subject => {
                                        const found = subject.marks.find(mark => mark.student === stud.id)
                                        return <td key={subject.id} className={styles.marks} onClick={() => {if(!found) handleOpenModal({studentId:stud.id,subjectId:subject.id})}}>
                                            {
                                                found ? found.mark : "-"
                                            }
                                        </td>
                                    })
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {
                isOpen && <MarkModal/>
            }
        </>
    )
}
