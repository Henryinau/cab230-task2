import './MainPage.css'
import MovieSearch from './../SearchPage/SearchPage'

export default function MainPage({onLogout})
{
    return(
        <div className='mainpageContainer'>
         
          <MovieSearch/>
         
        </div>
        
    )
}