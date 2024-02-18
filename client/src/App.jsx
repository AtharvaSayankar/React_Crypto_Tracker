import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [currency, setCurrency] = useState([])

  useEffect(() => {
    axios.get('https://openapiv1.coinstats.app/coins', {
      headers: {'X-API-KEY': '5TBg/iDv11/QgmtDbYAda1NtlOyNz7OAFFpJjI/vJTM='}
    }).then(res => setCurrency(res.data.result))
    .catch(err => console.log(err))
  }, [])

  return (
    <div className='App'>
      <h2>Crypto Tracker</h2>
      <input type='text' placeholder='search' onChange={(e) => setSearch(e.target.value)}/>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Available Supply</th>
            <th>Volume (24)</th>
          </tr>
        </thead>
        <tbody>
            {/* Print the data using filter method as per search*/}
            {currency.filter((val) => {
              return val.name.toLowerCase().includes(search.toLowerCase())
            }).map((val) => {
              return <tr>
                <td className='rank'>{val.rank}</td>
                <td className='logo'>
                  <a href={val.websiteURL}>
                    <img src={val.icon} alt="" />
                  </a>
                  <p>{val.name}</p>
                </td>
                <td className='symbol'>
                  {val.symbol}
                </td>
                <td>${val.marketCap}</td>
                <td>${val.price.toFixed(2)}</td> {/* Converts price to fixed decimals string */}
                <td>{val.availableSupply}</td>
                <td>{val.volume.toFixed(0)}</td>
              </tr>
            })}
        </tbody>
      </table>
    </div>
  )
}

export default App
