import Navbar from './components/Navbar'
import TileInfo from './components/TileInfo'
import Charts from './components/Charts'
import './App.css'

function App() {
  const deviceNumber = 3;
  const temperature = 25;
  const pressure = 1013;
  const humidity = 40;

  const numberOfTiles = 8;

  return (
    <>
    <Navbar />
    <div className="content">
      <TileInfo deviceNumber={deviceNumber} temperature={temperature} pressure={pressure} humidity={humidity} />
      <Charts />
    </div>
    <div className="tiles" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {Array.from({ length: numberOfTiles }, (_, index) => (
        <div className="tile-device" key={index} style={{ margin: '10px' }}>
          <TileInfo deviceNumber={index} temperature={temperature} pressure={pressure} humidity={humidity} />
        </div>
      ))}
    </div>
    </>
  )
}

export default App
