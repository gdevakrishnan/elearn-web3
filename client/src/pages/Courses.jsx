import React, { Fragment, useContext, useEffect, useState } from 'react'
import appContext from '../context/appContext';

function Courses() {
  const {
    State
  } = useContext(appContext);

  const {
    WalletAddress,
    ReadContract
  } = State;

  const [courses, setCourses] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);

  const getCourses = async () => {
    let data = await ReadContract.displayCourses({ from: WalletAddress });
    setCourses(data);
  }

  useEffect(() => {
    getCourses();
  }, []);

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
              {/* <a className="view_course" href={aCourse[4]} target='_blank'>View</a> */}
              <button className="view_course" onClick={(e) => {
                e.preventDefault();
                setViewCourse(aCourse);
              }}>View</button>
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
          (viewCourse) ? (
            <div className="course_details" key={viewCourse[0].toString()}>
              <div className="buttons">
                <button className="btn" onClick={(e) => {
                  e.preventDefault();
                  setViewCourse(null);
                }}>X</button>
              </div>
              <div className="main">
                <div className="left">
                  <div className="image">
                    <img src={viewCourse[1]} alt="" className="img" />
                  </div>
                </div>
                <div className="right">
                  <h1 className="title">{viewCourse[2]}</h1>
                  <p className="description">{viewCourse[3]}</p>
                  <p className="price">Fee: {viewCourse[5].toString()} ETH</p>
                  <button className="get_course">Enroll</button>
                </div>
              </div>
            </div>
          ) : null
        }
        <div className="cards">
          {
            courses && <Card />
          }
        </div>
      </section>
    </Fragment>
  )
}

export default Courses