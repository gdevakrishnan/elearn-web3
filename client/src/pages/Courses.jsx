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
  const handleGetQuizzes = (aCourse) => {
    console.log(aCourse);
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

  return (
    <Fragment>
      <section className="page course_page">
        {
          // View Course
          (viewCourse) ? (
            <div className="course_details" key={viewCourse[0].toString()}>
              <div className="buttons">
                <button className="btn" title="close" onClick={(e) => {
                  e.preventDefault();
                  setViewCourse(null);
                  setIsPurchased(false);
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
          ) : null
        }
        {/* Course Card */}
        <div className="cards">
          {
            courses && !viewCourse && <Card />
          }
        </div>
      </section>
    </Fragment >
  )
}

export default Courses