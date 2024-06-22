import React, { Fragment, useContext, useEffect, useState } from 'react'
import appContext from '../context/appContext';

function Courses() {
  const {
    State
  } = useContext(appContext);

  const {
    WalletAddress,
    ReadContract,
    WriteContract
  } = State;

  const [courses, setCourses] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [quizzes, setQuizzes] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});

  // Get all courses
  const getCourses = async () => {
    let data = await ReadContract.displayCourses({ from: WalletAddress });
    setCourses(data);
  }

  useEffect(() => {
    getCourses();
  }, []);

  // To check course is purchased or not
  const checkCoursePurchased = async (aCourse) => {
    const isPurchase = await ReadContract.hasPurchasedCourse(WalletAddress, aCourse[0].toString(), { from: WalletAddress });
    setIsPurchased(isPurchase);
  }

  // To view the course details
  const handleViewCourse = async (aCourse) => {
    setViewCourse(aCourse);
    // To check the course is purchased or not
    checkCoursePurchased(aCourse)
  }

  // To Purchase Course
  const handlePurchaseCourse = async (aCourse) => {
    // To buy the course
    const tx = await WriteContract.addPurchasedCourse(aCourse[0].toString(), { from: WalletAddress });
    await tx.wait();
    alert("Course purchased successfully");
    checkCoursePurchased(aCourse);
  }

  // To get quizzes of the course
  const handleGetQuizzes = async (aCourse) => {
    const quizList = await ReadContract.getQuiz(aCourse[0].toString(), { from: WalletAddress });
    setQuizzes(quizList);
  }

  // To submit quiz and calculate score and update the score in contract
  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    let count = 0;
    let score = 0;
    for (const key in quizAnswers) {
      count += 1;
      if (quizAnswers[key].trim() === '') {
        alert("Enter all the fields")
        return;
      }
    }
    
    if (count == 0 || count < quizzes.length) {
      alert("Enter all the fields")
      return;
    }

    // Calculate score
    for (let i = 0;i < quizzes.length;i++) {
      if (quizzes[i][5] == quizAnswers[`question_${i + 1}`]) {
        score++;
      }
    }

    // Send score to the contract
    const tx = await WriteContract.updateScore(score, { from: WalletAddress });
    await tx.wait();
    alert("Your score was updated")
    setQuizAnswers({});
    setQuizzes(null);
    setIsPurchased(false);
    setViewCourse(null);
  }

  // Card Component
  const Card = () => {
    return (
      courses && courses.map((aCourse, index) => {
        return (
          <Fragment>
            <div className="card" key={aCourse[0].toString()} title={aCourse[2]}>
              <div className="image">
                <img src={aCourse[1]} alt={aCourse[2]} className="img" />
              </div>
              <h1 className="title">{aCourse[2]}</h1>
              <p className="desc">{aCourse[3]}</p>
              <button className="view_course" onClick={() => handleViewCourse(aCourse)}>View</button>
            </div>
          </Fragment>
        );
      })
    );
  }

  // View detail of course
  const ViewCourse = () => {
    return (
      <Fragment>
        <div className="course_details" key={viewCourse[0].toString()}>
          <div className="buttons">
            <button className="btn" title="close" onClick={(e) => {
              e.preventDefault();
              setViewCourse(null);
              setIsPurchased(false);
              setQuizAnswers({});
              setQuizzes(null);
            }}>X</button>
          </div>
          <div className="main">
            <div className="left">
              <div className="image">
                <img src={viewCourse[1]} alt={viewCourse[2]} className="img" />
              </div>
            </div>
            <div className="right">
              <h1 className="title">{viewCourse[2]}</h1>
              <p className="description">{viewCourse[3]}</p>
              <p className="price">Fee: {viewCourse[5].toString()} ETH</p>
              {
                (isPurchased) ? (
                  <Fragment>
                    {/* To watch course video */}
                    <a href={viewCourse[4]} className="course_btn" title='watch course' target='_blank'>Watch</a>
                    {/* To attend the quiz */}
                    <button className="course_btn" onClick={() => handleGetQuizzes(viewCourse)} title='quiz'>Quiz</button>
                  </Fragment>
                ) : (
                  // To purchase the course
                  <button className="course_btn" onClick={() => handlePurchaseCourse(viewCourse)} title='enroll'>Enroll</button>
                )
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  // Attempt Quiz Component
  const Quiz = () => {
    return (
      <Fragment>
        <form className='form quiz_form'>
          {
            quizzes.map((aQuiz, index) => {
              return (
                <Fragment>
                  <div className="form_group">
                    <h1 className='title'>{index + 1}. {aQuiz[0]}</h1>
                    <div className="choice">
                      <input
                        type="radio"
                        name={`question_${index + 1}`}
                        id={`question_${index + 1}_${aQuiz[1]}`}
                        value={aQuiz[1]}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, [e.target.name]: e.target.value })}
                        checked={quizAnswers[`question_${index + 1}`] === aQuiz[1]}
                      />
                      <label htmlFor={`question_${index + 1}_${aQuiz[1]}`}>{aQuiz[1]}</label>
                    </div>

                    <div className="choice">
                      <input
                        type="radio"
                        name={`question_${index + 1}`}
                        id={`question_${index + 1}_${aQuiz[2]}`}
                        value={aQuiz[2]}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, [e.target.name]: e.target.value })}
                        checked={quizAnswers[`question_${index + 1}`] === aQuiz[2]}
                      />
                      <label htmlFor={`question_${index + 1}_${aQuiz[2]}`}>{aQuiz[2]}</label>
                    </div>

                    <div className="choice">
                      <input
                        type="radio"
                        name={`question_${index + 1}`}
                        id={`question_${index + 1}_${aQuiz[3]}`}
                        value={aQuiz[3]}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, [e.target.name]: e.target.value })}
                        checked={quizAnswers[`question_${index + 1}`] === aQuiz[3]}
                      />
                      <label htmlFor={`question_${index + 1}_${aQuiz[3]}`}>{aQuiz[3]}</label>
                    </div>

                    <div className="choice">
                      <input
                        type="radio"
                        name={`question_${index + 1}`}
                        id={`question_${index + 1}_${aQuiz[4]}`}
                        value={aQuiz[4]}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, [e.target.name]: e.target.value })}
                        checked={quizAnswers[`question_${index + 1}`] === aQuiz[4]}
                      />
                      <label htmlFor={`question_${index + 1}_${aQuiz[4]}`}>{aQuiz[4]}</label>
                    </div>
                  </div>
                </Fragment>
              );
            })
          }
          <input type="submit" value="Submit" className='quiz_btn' onClick={(e) => handleQuizSubmit(e)}/>
        </form>
      </Fragment>
    );
  }

  // Main Course Page
  return (
    <Fragment>
      <section className="page course_page">
        {
          // View Course
          (viewCourse) ? (
            <Fragment>
              <ViewCourse />
              {quizzes && <Quiz />}
            </Fragment>
          ) : null
        }
        {/* Course Card */}
        <div className="cards">
          {courses && !viewCourse && <Card />}
        </div>
      </section>
    </Fragment >
  )
}

export default Courses