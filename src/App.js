import { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const [points, setPoints] = useState(null)
  const fakeTransactions = useMemo(() => {return [120, 110, 80]}, []) ;

  useEffect(() => {
    const fetchTransactions = () => {
      return new Promise((resolve, reject) => {
          fakeTransactions ? resolve(fakeTransactions): reject(console.error('error was happened while fetch transactions'));
      })
    }

    const getPoints = async() => {
      let sum = 0;
      let points = [];
      /** 
       * To avoid callback hell I used await and async function 
       */
      const transactions = await fetchTransactions();
      transactions.forEach(element => {
        let point = 0;
        if (element < 50) return;
        else element > 100 ? point = (element - 100) * 2 + 50 : point = (element - 50);  
        points.push(point);
        sum += point;
        points.push(sum);
      });
      setPoints(points);
    }

    getPoints();
  }, [fakeTransactions]);

  return (
    <div className="App">
      {fakeTransactions[0] && points &&
        <span>
          The monthly points for {fakeTransactions[0]}, {fakeTransactions[1]}, {fakeTransactions[2]} is {points[0]}, {points[1]}, {points[2]}.
          &nbsp; Total points is {points[3]}
        </span>
        
      }
    </div>
  );
}

export default App;
