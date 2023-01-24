
import { useEffect, useState } from 'react';
import './App.scss';
import Card from './components/Card';



function App() {
const [catsData, setCatsData] = useState([]);
const [selectedItems, setSelectedItems] = useState([]);


function fetchData()  {
  return fetch('data/data.json').then(res => res.json());
}


useEffect(() => {
  fetchData().then(data => setCatsData(data.goods));

},[])

function handleSelect(id) {
   console.log(id)
    if (!selectedItems?.find(item => item === id)) {
    setSelectedItems(prev => [...prev, id]);
    } else 
    {
      setSelectedItems(prev => prev.filter(item => item !== id));
    }


}

  return (
    <div className="App">
      <header>

      </header>
      <main>
        <h2 className='main-header'>Ты сегодня покормил кота?</h2>
        <section className='cards'>
        {catsData?.map(item => {
          // return <Card data={item} handleSelect={handleSelect} selected={selectedItems.find(elem => elem === item.id ) ? true : false}/>
          return <Card data={item}/>
          })
        }
        </section>
      
      
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
