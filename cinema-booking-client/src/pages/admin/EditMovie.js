import { useState } from 'react'
import { Link } from 'react-router-dom';
import './editmovie.css'

const data = [
  {
    title: 'John Doe',
    category: 'johndoe@email.com',
    cast: 'Frontend Developer',
    director: 'John Doe',
    producer: 'johndoe@email.com',
    synopsis: 'Frontend Developer',
    reviews: 'John Doe',
    link: 'johndoe@email.com',
    dates: 'Frontend Developer',
    times: 'John Doe',
  },
  
]

const EditMovie = () => {
  const [employeeData, setEmployeeData] = useState(data)

  const onChangeInput = (e, employeeId) => {
    const { name, value } = e.target

    const editData = employeeData.map((item) =>
      item.employeeId === employeeId && name ? { ...item, [name]: value } : item
    )

    setEmployeeData(editData)
  }

  return (
    <div className="edmovie">
      <h1 className="title">Movies</h1>
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Category</th>
            <th>Cast</th>
            <th>Director</th>
            <th>Producer</th>
            <th>Synopsis</th>
            <th>Reviews</th>
            <th>Video Link</th>
            <th>Show Dates</th>
            <th>Show Times</th>
          </tr>
        </thead>
        <tbody>
              <td>
                <input
                  name="title"
                  type="text"
                  placeholder="Title"
                />
              </td>
              <td>
                <input
                  name="category"
                  type="text"
                  placeholder="Category"
                />
              </td>
              <td>
                <input
                  name="cast"
                  type="text"
                  placeholder="Cast"
                />
              </td>
              <td>
                <input
                  name="director"
                  type="text"
                  placeholder="Director"
                />
              </td>
              <td>
                <input
                  name="producer"
                  type="text"
                  placeholder="Producer"
                />
              </td>
              <td>
                <input
                  name="synopsis"
                  type="text"
                  placeholder="Synopsis"
                />
              </td>
              <td>
                <input
                  name="reviews"
                  type="text"
                  placeholder="Reviews"
                />
              </td>
              <td>
                <input
                  name="link"
                  type="text"
                  placeholder="Link"
                />
              </td>
              <td>
                <input
                  name="date"
                  type="text"
                  placeholder="Dates"
                />
              </td>
              <td>
                <input
                  name="times"
                  type="text"
                  placeholder="Times"
                />
              </td>
        </tbody>
      </table>

      <div className="buttonCenter">
            <Link className="seatBtn" to="/addMovie">Add a Movie</Link>
      </div>

    </div>
  )
}

export default EditMovie