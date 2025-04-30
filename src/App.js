import './App.css';
import Introduction from './components/introduction';
import Navigation from './components/navigation';
import AboutMe from './components/aboutme';
import RecentWork from './components/recentwork';

function App() {
  return (
    <div className='body'>
      <Navigation/>
      <div id='thecontent'>
        <Introduction/>
        <AboutMe/>
        <RecentWork/>
      </div>
    </div>

  )
}

export default App;