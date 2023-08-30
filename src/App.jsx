import { useEffect, useState } from "react";
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const removeTour = (id) => {
    const newTours = data.filter((tour) => tour.id !== id);
    setData(newTours)
  }

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url)
      const tours = await response.json()
      setData(tours)
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  } 

  useEffect(() => {
    fetchTours();
  }, [])

  // async function getSomething() {
  //   const res = await fetch("https://course-api.com/react-tours-project")
  //   const tours = await res.json()
  //   setTours(tours);
  // }

  // useEffect(() => {
  //   getSomething();
  // }, [])

  if (loading) {
    return (
      <main> 
        <Loading /> 
      </main> 
    )
  }

  if (data.length === 0) {
    return (
      <div className="title">
      <h2 style={{marginTop:'3rem'}}>no tours left</h2>
      <button
        style={{marginTop:'2rem'}}
        type="button"
        className="btn"
        onClick={() => fetchTours()}>
          refresh
      </button>
    </div>
    )
  }

  return (
    <main> 
      <Tours data={data} removeTour={removeTour}/>
    </main> 
  )
};

export default App;
