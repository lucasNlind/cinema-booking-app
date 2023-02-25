import {Link} from 'react-router-dom';
import './userportal.css';

//needs home-button fixed because it isn't aligning center
const UserPortal = () => {
    return (
        <div className="users-wrap">
        <table className="user-table">
            <tr>
                <th className="user-head">Name</th>
                <th className="user-head">Email</th>
                <th className="user-head">Email Subscription</th>
                <th className="user-head">Manage User</th>
            </tr>
            <tr>
                <td>Derek Dunphy</td>
                <td>dhdunphy@gmail.com</td>
                <td>No</td>
                <button className="times-users">Suspend</button>
                <button className="times-users">Update</button>
                <button className="times-users">Delete</button>
            </tr>
            <tr>
                <td>Lexie Penn</td>
                <td>lexie.penn@gamil.com</td>
                <td>Yes</td>
                <button className="times-users">Suspend</button>
                <button className="times-users">Update</button>
                <button className="times-users">Delete</button>
            </tr>
        </table>

        <br></br>

        <div className="user-home-center">
            <Link className="home-button" to="/adminhome">Home</Link>
        </div>

        </div>
    );
};

export default UserPortal;