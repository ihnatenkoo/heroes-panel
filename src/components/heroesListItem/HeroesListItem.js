
import { useDispatch, useSelector } from "react-redux";
import { heroDelete } from "../../actions";
import { useHttp } from "../../hooks/http.hook"

const HeroesListItem = ({id, name, description, element}) => {
    const heroes = useSelector(state => state.heroes)
    const dispatch = useDispatch();
    const {request} = useHttp();

    let elementClassName;
    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradieыnt';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    const onDeleteHero = (heroes) => {
        const newArr = heroes.filter(hero => hero.id !== id);
           
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(dispatch(heroDelete(newArr)))
        .catch(console.log("Error"))
    }   

    return (
        <li 
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover'}}/>
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span onClick={() => onDeleteHero(heroes)} className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
}

export default HeroesListItem;