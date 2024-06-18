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

  const [newCourse, setNewCourse] = useState(initialState);

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
          <input type="submit" value="Add Course" onClick={(e) => {
            e.preventDefault();
            console.log(newCourse);
          }}/>
        </form>
      </section>
    </Fragment>
  )
}

export default Newcourse