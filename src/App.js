
import { useEffect, useState } from 'react';
import './App.scss';
import Card from './components/Card';



function App() {
const [catsData, setCatsData] = useState([]);


function fetchData()  {
  return fetch('data/data.json').then(res => res.json());
}


useEffect(() => {
  fetchData().then(data => setCatsData(data.goods));
},[])

  return (
    <div className="App">
      <header>

      </header>
      <main>
        <h1 className='main-header'>Ты сегодня покормил кота?</h1>
        <section className='cards'>
        {catsData?.map(item => {
          return <Card key={item.id} data={item}/>
          })
        }
        </section>
      
      
      </main>
    </div>
  );
}

export default App;
