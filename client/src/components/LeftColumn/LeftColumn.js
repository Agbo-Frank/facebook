import { Link } from 'react-router-dom'
import './leftColumn.css'
import items from './items'

function LeftColumn(){
    return(
        <div className="leftColumn">
            <ul>
                {
                    items.map((item, i)=> (
                        <li>
                            <Link to={item.link}>
                                <img src={item.img} alt="profile" />
                                <p>{item.text}</p>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default LeftColumn