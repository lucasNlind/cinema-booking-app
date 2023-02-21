import React from 'react';
import './userportal.css';

const UserPortal = () => {
    return (
        <div>
            
            <div className="users">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Email Subscription</th>
          <th>Manage User</th>
        </tr>
        <tr>
          <td>Derek Dunphy</td>
          <td>dhdunphy@gmail.com</td>
          <td>No</td>
          <button className="times">Suspend</button>
          <button className="times">Update</button>
          <button className="times">Delete</button>
        </tr>
        <tr>
          <td>Lexie Penn</td>
          <td>lexie.penn@gamil.com</td>
          <td>Yes</td>
          <button className="times">Suspend</button>
          <button className="times">Update</button>
          <button className="times">Delete</button>
        </tr>
        <tr>
          <td>Charlie Young</td>
          <td>charlie5286@hotmail.com</td>
          <td>Yes</td>
          <button className="times">Suspend</button>
          <button className="times">Update</button>
          <button className="times">Delete</button>
        </tr>
        <tr>
          <td>Aditya Malhotra</td>
          <td>asmalhotra@gmail.com</td>
          <td>Yes</td>
          <button className="times">Suspend</button>
          <button className="times">Update</button>
          <button className="times">Delete</button>
        </tr>
        <tr>
          <td>Camilla Wayne</td>
          <td>camiwayne@yahoo.com</td>
          <td>Yes</td>
          <button className="times">Suspend</button>
          <button className="times">Update</button>
          <button className="times">Delete</button>
        </tr>
        <tr>
          <td>Alia Emerson</td>
          <td>emerson876@gmail.com</td>
          <td>No</td>
          <button className="times">Suspend</button>
          <button className="times">Update</button>
          <button className="times">Delete</button>
        </tr>
      </table>
    </div>

            

        </div>
    );
};

export default UserPortal;