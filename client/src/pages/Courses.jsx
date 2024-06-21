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
            <div className="card" key={aCourse[0].toString()}>
              <div className="image">
                <img src={aCourse[1]} alt={aCourse[2]} className="img" />
              </div>
              <h1 className="title">{aCourse[2]}</h1>
              <p className="desc">{aCourse[3]}</p>
              <a className="view_course" href={aCourse[4]} target='_blank'>View</a>
              <h1 className="title">Price{aCourse[5].toString()}</h1>
            </div>
          </Fragment>
        );
      })
    );
  }

  return (
    <Fragment>
      <section className="page course_page">
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