import React, { Fragment, useState } from 'react'

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
    "option_a": "",
    "option_b": "",
    "option_c": "",
    "option_d": "",
    "answer": "",
  }

  const [newCourse, setNewCourse] = useState(initialState);
  const [newQuiz, setNewQuiz] = useState(quizInitialState);
  const [flag, setFlag] = useState(false);

  const handleNewCourseSubmit = (e) => {
    e.preventDefault();
    for (const key in newCourse) {
      if (newCourse[key] === '' || newCourse[key] === 0) {
        alert("Enter all the fields")
        return;
      }
    }

    setFlag(true);
  }

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    for (const key in newQuiz) {
      if (newQuiz[key] === '') {
        alert("Enter all the fields")
        return;
      }
    }

    console.log(newQuiz);
  }

  return (
    <Fragment>
      <section className="page new_course_page">
        <form>
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
              <form onSubmit={(e) => handleQuizSubmit(e)}>
                <div className="form_group">
                  <label htmlFor="question">Question</label>
                  <input type="text" name="question" id="question" />
                </div>
                <div className="form_group">
                  <label htmlFor="option_a">Option A</label>
                  <input
                    type="text"
                    name="option_a"
                    id="option_a"
                    value={newQuiz.option_a}
                    onChange={(e) => setNewQuiz({ ...newCourse, [e.target.id]: e.target.value })}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="option_b">Option B</label>
                  <input
                    type="text"
                    name="option_b"
                    id="option_b"
                    value={newQuiz.option_b}
                    onChange={(e) => setNewQuiz({ ...newCourse, [e.target.id]: e.target.value })}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="option_c">Option C</label>
                  <input
                    type="text"
                    name="option_c"
                    id="option_c"
                    value={newQuiz.option_c}
                    onChange={(e) => setNewQuiz({ ...newCourse, [e.target.id]: e.target.value })}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="option_d">Option D</label>
                  <input
                    type="text"
                    name="option_d"
                    id="option_d"
                    value={newQuiz.option_d}
                    onChange={(e) => setNewQuiz({ ...newCourse, [e.target.id]: e.target.value })}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="answer">Answer Choice</label>
                  <input
                    type="text"
                    name="answer"
                    id="answer"
                    value={newQuiz.answer}
                    onChange={(e) => setNewQuiz({ ...newCourse, [e.target.id]: e.target.value })}
                  />
                </div>
                <input type="submit" value="New Quiz" onClick={(e) => handleQuizSubmit(e)} />
              </form>
            </Fragment>
          ) : null
        }
      </section>
    </Fragment>
  )
}

export default Newcourse