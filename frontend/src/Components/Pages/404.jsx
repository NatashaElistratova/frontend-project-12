import { Link } from 'react-router-dom';

function NotFound() {
    return (
    <div>
        <h1>Страница не найдена</h1>
        <h2>Но вы можете перейти на <Link to="/">Главную страницу</Link></h2>
    </div>
      
    );
  }
  
  export default NotFound;