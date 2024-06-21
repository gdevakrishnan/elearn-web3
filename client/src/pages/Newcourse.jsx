import React, { Fragment, useContext, useState } from 'react'
import appContext from '../context/appContext';

function Newcourse() {
  const initialState = {
    "id": 0,
    "imgsrc": "",
    "title": "",
    "descrip": "",
    "videourl": "",
    "price": 0
  }

  const quizInitialState = {
    "question": "",
    "choiceA": "",
    "choiceB": "",
    "choiceC": "",
    "choiceD": "",
    "correctAns": "",
  }

  const {
    State
  } = useContext(appContext);

  const {
    WalletAddress,
    WriteContract
  } = State;

  const [newCourse, setNewCourse] = useState(initialState);
  const [newQuiz, setNewQuiz] = useState(quizInitialState);
  const [noOfQuiz, setNoOfQuiz] = useState(0)
  const [quiz, setQuiz] = useState([]);
  const [flag, setFlag] = useState(false);

  const handleNewCourseSubmit = async (e) => {
    e.preventDefault();
    for (const key in newCourse) {
      if (newCourse[key] === '' || newCourse[key] === 0) {
        alert("Enter all the fields")
        return;
      }
    }

    // Call quizCreate transaction
    const tx1 = await WriteContract.getCourse(
      newCourse.id,
      newCourse.imgsrc,
      newCourse.title,
      newCourse.descrip,
      newCourse.videourl,
      newCourse.price,
      { from: WalletAddress }
    );
    await tx1.wait();
    alert("Course added successfully");
    setFlag(true);
  }

  const handleAQuiz = (e) => {
    e.preventDefault();
    for (const key in newQuiz) {
      if (newQuiz[key] === '') {
        alert("Enter all the fields")
        return;
      }
    }

    setQuiz([...quiz, newQuiz]);
    setNewQuiz(quizInitialState);
    setNoOfQuiz(noOfQuiz + 1);
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    try {
      const tx2 = await WriteContract.quizCreate(
        newCourse.id,
        noOfQuiz,
        quiz,
        { from: WalletAddress }
      );
      await tx2.wait();

      // Success message
      alert("quiz list added successfully");
      setNewCourse(initialState);

    } catch (error) {
      // Error handling
      console.error("Error submitting transaction:", error);
      alert("Error submitting transaction. Please try again.");
    }
  }


  return (
    <Fragment>
      <section className="page new_course_page">
        {/* Course Details Form */}
        <form className='form courseForm' onSubmit={(e) => handleNewCourseSubmit(e)}>
          <div className="form_group">
            <label htmlFor="id">Id</label>
            <input
              type="number"
              name="id"
              id="id"
              value={newCourse.id}
              onChange={(e) => setNewCourse({ ...newCourse, [e.target.id]: e.target.value })}
            />
          </div>

          <div className="form_group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, [e.target.id]: e.target.value })}
            />
          </div>

          <div className="form_group">
            <label htmlFor="imgsrc">Image</label>
            <input
              type="text"
              name="imgsrc"
              id="imgsrc"
              value={newCourse.imgsrc}
              onChange={(e) => setNewCourse({ ...newCourse, [e.target.id]: e.target.value })}
            />
          </div>

          <div className="form_group">
            <label htmlFor="descrip">Description</label>
            <input
              type="text"
              name="descrip"
              id="descrip"
              value={newCourse.descrip}
              onChange={(e) => setNewCourse({ ...newCourse, [e.target.id]: e.target.value })}
            />
          </div>

          <div className="form_group">
            <label htmlFor="videourl">Video</label>
            <input
              type="text"
              name="videourl"
              id="videourl"
              value={newCourse.videourl}
              onChange={(e) => setNewCourse({ ...newCourse, [e.target.id]: e.target.value })}
            />
          </div>

          <div className="form_group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={newCourse.price}
              onChange={(e) => setNewCourse({ ...newCourse, [e.target.id]: e.target.value })}
            />
          </div>
          <input type="submit" value="Add Course" onClick={(e) => handleNewCourseSubmit(e)} />
        </form>

        {
          (flag) ? (
            <Fragment>
              {/* Quiz Form */}
              <form className='form quizForm' key={noOfQuiz} onSubmit={(e) => handleFinalSubmit(e)}>
                <div className="form_group">
                  <label htmlFor="question">Question {noOfQuiz + 1}</label>
                  <input
                    type="text"
                    name="question"
                    id="question"
                    value={newQuiz.question}
                    onChange={(e) => setNewQuiz({ ...newQuiz, [e.target.id]: e.target.value })}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="choiceA">Option A</label>
                  <input
                    type="text"
                    name="choiceA"
                    id="choiceA"
                    value={newQuiz.choiceA}
                    onChange={(e) => setNewQuiz({ ...newQuiz, [e.target.id]: e.target.value })}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="choiceB">Option B</label>
                  <input
                    type="text"
                    name="choiceB"
                    id="choiceB"
                    value={newQuiz.choiceB}
                    onChange={(e) => setNewQuiz({ ...newQuiz, [e.target.id]: e.target.value })}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="choiceC">Option C</label>
                  <input
                    type="text"
                    name="choiceC"
                    id="choiceC"
                    value={newQuiz.choiceC}
                    onChange={(e) => setNewQuiz({ ...newQuiz, [e.target.id]: e.target.value })}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="choiceD">Option D</label>
                  <input
                    type="text"
                    name="choiceD"
                    id="choiceD"
                    value={newQuiz.choiceD}
                    onChange={(e) => setNewQuiz({ ...newQuiz, [e.target.id]: e.target.value })}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="correctAns">Answer</label>
                  <input
                    type="text"
                    name="correctAns"
                    id="correctAns"
                    value={newQuiz.correctAns}
                    onChange={(e) => setNewQuiz({ ...newQuiz, [e.target.id]: e.target.value })}
                  />
                </div>
                <button onClick={(e) => handleAQuiz(e)} className='btn'>Add Quiz</button>
                <input type="submit" value="Create Course" onClick={(e) => handleFinalSubmit(e)} />
              </form>
            </Fragment>
          ) : null
        }
      </section>
    </Fragment>
  )
}

export default Newcourse