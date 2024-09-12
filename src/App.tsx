import "./App.css"
import { AddStudent } from "./components/AddStudent/AddStudent"
import { AddSubject } from "./components/AddSubject/AddSubject"
import { MarkModal } from "./features/MarkModal/MarkModal"
import { ClassBook } from "./features/ClassBook/ClassBook"

const App = () => {
  return (
    <>
      <div className="container">
        <AddStudent/>
        <ClassBook/>
        <AddSubject/>
      </div>
    </>
  )
}

export default App
