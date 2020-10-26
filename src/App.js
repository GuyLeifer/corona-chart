import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { 
  CartesianGrid, XAxis, YAxis, Brush, Tooltip , Legend, ResponsiveContainer,
  LineChart, Line, 
  AreaChart, Area, 
  BarChart, Bar, 
  PieChart, Pie, Sector, Cell
} 
from 'recharts';
import './App.css';
import Footer from './Footer/Footer';

const animatedComponents = makeAnimated();

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {

  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const [selected, setSelected] = useState([]);

    useEffect( () => {
      axios.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
      .then(({ data:csv }) => {
        const countries = csv.split('\n').map(dataBlock => {
          const regex = /".*,.*"/
          if (dataBlock.search(regex) !== -1){
            const problemWord = dataBlock.match(regex)[0]
            const fixedWord = problemWord.replace(',', '-')
            const fixedData = dataBlock.replace(regex, fixedWord)
            return fixedData.split(',')
          } else {
            return dataBlock.split(',')
          }
        })
        countries.map(country => (
          country.color = getRandomColor()
        ))
        console.log('countries: ', countries);
        
        setOptions(countries.map((country) => {
          if (country[0] !== "") {
            return ({value: country[1] + " (" + country[0] +")", label: country[1] + " (" + country[0] +")", color: country.color})
          } else {
            return ({value: country[1], label: country[1], color: country.color})
          }
        }))

    const titles = countries.shift(0);
    console.log("titles:" , titles)
    const dates = titles.slice(4).map((date, i) => {
      const dateObject = {date: date}
      countries.forEach(country => {
        if (country[0] !== "") {
          dateObject[country[1] + " (" + country[0] +")"] = country[i + 4]
        } else {
          dateObject[country[1]] = country[i + 4];
        }
      })
      return dateObject;
    })
    setData(dates);
    console.log("data: ", dates)
  })
}, [selected]);

  const selectionChange = (choosens) => {
    setSelected(choosens);
  }

console.log("options:" , options)

  return (
    <div className="App">
      <header>
        <h1>COVID-19 DASHBOARD</h1>
        <h2>See What's Up Around The World</h2>
        <img src="https://image.flaticon.com/icons/png/512/2853/2853896.png" /> 
        <h3>Which Countries Do You Want To Know About? Compare Between Them!</h3>
      </header>
      <Select 
      className="select"
      options={options}
      isMulti 
      placeholder="Select Countries..."
      closeMenuOnSelect={false}
      components={animatedComponents}
      onChange={selectionChange}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: '#1e90ff',
        },
      })}
      />

      <LineChart 
      className="chart"
      width={700} 
      height={700} 
      data={data}
      >
        {selected && (
          selected.map((country)=> (
            <Line type="monotone" dataKey={country.value} stroke={country.color} />
          ))
        )}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Brush />
        <Tooltip  />
        <Legend />
      </LineChart>

      <AreaChart 
      className="chart"
      width={700} 
      height={700}  
      data={data}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="date"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Brush />
        {selected && (
          selected.map((country)=> (
            <Area type="monotone" dataKey={country.value} stackId="1" stroke={country.color} fill={country.color} />
          ))
        )}
      </AreaChart>

      
      <BarChart
        data={data}
        className="chart"
        width={1460} 
        height={700}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
        <YAxis />
				<Tooltip />
				<Legend />
        <Brush dataKey="date" height={30} />
        {selected && (
          selected.map((country)=> (
            <Bar dataKey={country.value} fill={country.color} />
          ))
        )}
			</BarChart>
      <Footer />
      
    </div>
  );
}

export default App;
