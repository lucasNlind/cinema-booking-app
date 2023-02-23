import { useState } from 'react'
import { Link } from 'react-router-dom';
import './editmovie.css'


// edit movie needs to have forms fixed and should have appropriate sized input boxes for things like
// summary (bigger box) and should have a different kind of field for show dates and show times, a dropdown perhaps
// it also needs buttons to save changes or delete (?)
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
    <div className="edit-movie">
        <h1 className="edit-title">Movies</h1>
        <table className="edit-table">
            <thead>
                <tr>
                <th className="edit-table-h">Movie Title</th>
                <th className="edit-table-h">Category</th>
                <th className="edit-table-h">Cast</th>
                <th className="edit-table-h">Director</th>
                <th className="edit-table-h">Producer</th>
                <th className="edit-table-h">Synopsis</th>
                <th className="edit-table-h">Reviews</th>
                <th className="edit-table-h">Video Link</th>
                <th className="edit-table-h">Show Dates</th>
                <th className="edit-table-h">Show Times</th>
                </tr>
            </thead>
            <tbody>
                <td>
                <input
                    className="edit-input"
                    name="title"
                    type="text"
                    placeholder="Title"
                />
                </td>
                <td>
                <input
                    className="edit-input"
                    name="category"
                    type="text"
                    placeholder="Category"
                />
                </td>
                <td>
                <input
                    className="edit-input"
                    name="cast"
                    type="text"
                    placeholder="Cast"
                />
                </td>
                <td>
                <input
                    className="edit-input"
                    name="director"
                    type="text"
                    placeholder="Director"
                />
                </td>
                <td>
                <input
                    className="edit-input"
                    name="producer"
                    type="text"
                    placeholder="Producer"
                />
                </td>
                <td>
                <input
                    className="edit-input"
                    name="synopsis"
                    type="text"
                    placeholder="Synopsis"
                />
                </td>
                <td>
                <input
                    className="edit-input"
                    name="reviews"
                    type="text"
                    placeholder="Reviews"
                />
                </td>
                <td>
                <input
                    className="edit-input"
                    name="link"
                    type="text"
                    placeholder="Link"
                />
                </td>
                <td>
                <input
                    className="edit-input"
                    name="date"
                    type="text"
                    placeholder="Dates"
                />
                </td>
                <td>
                <input
                    className="edit-input"
                    name="times"
                    type="text"
                    placeholder="Times"
                />
                </td>
            </tbody>
        </table>

        <div className="edit-center">
            <Link className="add-movie-btn" to="/addMovie">Add a Movie</Link>
        </div>
        
    </div>
  )
}

export default EditMovie