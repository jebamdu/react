import { Link } from 'react-router-dom';
import './navbar.css'
const NavBar = () => {
    return (
        <aside className="navbar">
            <ul className="menus">
                <li><Link to='exams'>Exams</Link>
                    <ul className="sub-menu">
                        {/* <li><Link to='createExam'>CreateExam</Link></li> */}
                    </ul>
                </li>
                <li>
                    {/* <Link to=''>Trainers</Link> */}
                    {/* <ul className="sub-menu"> */}
                    <li><Link to='trainerCreation'>Trainers</Link></li>
                    <li><Link to='trainerCreation/batch'>Batches</Link></li>
                    {/* </ul> */}
                </li>
                <li><Link to='students'>Students</Link>
                    <ul className="sub-menu">
                        <li><Link to='importStudent'>Import</Link></li>
                    </ul>
                </li>
                <li><Link to='report'>Reports</Link></li>
            </ul>
        </aside>
    );
}

export default NavBar;