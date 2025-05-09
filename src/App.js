import './App.css';
import Introduction from './components/introduction';
import Navigation from './components/navigation';
import AboutMe from './components/aboutme';
import Form from './components/form';
import Footer from './components/footer';

// import popupImage from './popupimage';

function App() {
  return (
    <div className='body'>
      <Navigation/>
      
      <div id='thecontent'>
        <Introduction/>
        <AboutMe/>
        <Form/>
        <Footer/>
      </div>
    </div>

  )
}

export default App;