import { Link } from 'react-router-dom';
import './navbar.css'
const NavBar = ({notification}) => {
    console.log(notification,"this is log notification");
    return (
        <aside className="navbar">
            <ul className="menus">
                <li><Link to='exams'>Question Bank</Link>
                    <ul className="sub-menu">
                        {/* <li><Link to='createExam'>CreateExam</Link></li> */}
                    </ul>
                </li>
                {/* <li> */}
                    {/* <Link to=''>Trainers</Link> */}
                    {/* <ul className="sub-menu"> */}
                    <li><Link to='trainerCreation'>Trainers</Link></li>
                    <li><Link to='trainerCreation/batch'>Batches</Link></li>
                    {/* </ul> */}
                {/* </li> */}
                <li><Link to='students'>Students</Link>
                    <ul className="sub-menu">
                        <li><Link to='importStudent'>Import</Link></li>
                    </ul>
                </li>
                <li><Link to='report'>Reports</Link></li>
                <li>{ (notification !==0) ?( <Link to='notification'>Performance <font color="red"></font></Link>):(<Link to='notification'>Notification</Link>)}</li>
            </ul>
        </aside>
    );
}

export default NavBar;