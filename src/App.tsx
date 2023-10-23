import React, { useEffect, useState } from 'react';
import './App.css';

type topProps = {
  count: number,
  line: number,
  stops: any
}

function App() {
  // Settings data from API
  const [top10Lines, settop10Lines] = useState<topProps[]>([]);

  useEffect(() => {
    const JourneyApi = async (stopArray: any) => {
      // Getting CORS errors from trafiklab. "Mocking" instead.
      /*const data = await fetch("https://api.sl.se/api2/LineData.json?model=jour&key=[key]&DefaultTransportModeCode=BUS",{
        method: "GET"
      });
      const jsonJourneyData = await data.json();*/
      const data = await fetch("./trafiklab/jourBus.json",{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      });
      const jsonJourneyData = await data.json();

      let lines: React.SetStateAction<topProps[]> = [];
      for (var i = 0; i < jsonJourneyData.ResponseData.Result.length; i++) {
        const key:number = +jsonJourneyData.ResponseData.Result[i]['LineNumber'];
        const stopKey:number = +jsonJourneyData.ResponseData.Result[i]['JourneyPatternPointNumber'];
        if (!lines[key]) {
          lines[key] = { count: 0, line: 0, stops: [] }
        }
        lines[key].line = key;

        // Only count unique stops that is present in stops list.
        if (!lines[key].stops.includes(stopArray[stopKey]) ) {
          lines[key].count++;
          lines[key].stops.push(
            stopArray[stopKey]
          );
        }
      }
      // `${stopArray[stopKey]} - ${stopKey}`

      // Sort by count and get 10 most populated stops.
      lines.sort((a, b) => b.count - a.count);
      const topLines = lines.slice(0, 10);

      settop10Lines(topLines);
    };

    const StopsApi = async () => {
      /* const data = await fetch("https://api.sl.se/api2/LineData.json?model=stop&key=[key]&DefaultTransportModeCode=BUS",{
        method: "GET"
      });
      const jsonStopsData = await data.json(); */
      const data = await fetch("./trafiklab/stopBus.json",{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      });
      const jsonStopsData = await data.json();
      const stopData = jsonStopsData.ResponseData.Result;

      // Create the array with StopAreaNumber as key and StopPointName as value
      const stopArray = stopData.reduce((arr: { [x: string]: any; }, stop: { StopPointNumber: string | number; StopPointName: any; }) => {
        arr[stop.StopPointNumber] = stop.StopPointName;
        return arr;
      }, []);
      
      //Trigger journey API call with stop data.
      JourneyApi(stopArray);
    };
    
    StopsApi();
  }, []);

  // Added variable to keep track of open/close items.
  const [openItems, setOpenItems] = useState<boolean[]>(Array(top10Lines.length).fill(false));
  
  const toggleOpen = (index: number) => {
    const updatedOpenItems = [...openItems];
    updatedOpenItems[index] = !updatedOpenItems[index];
    setOpenItems(updatedOpenItems);
  };

  return (
    <div className="App">
      <h1>Top 10 bus-stops with most stops</h1>
      {top10Lines.map((item, index) => (
        <div key={index}>
          <button onClick={() => toggleOpen(index)}><h2>Line {item.line} with {item.count} stops</h2></button>
          {openItems[index] && (
          <ul>
            <li className="stopsLabel"><strong>Stops:</strong></li>
            {item.stops.map((stop: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, stopIndex: React.Key | null | undefined) => (
              <li key={stopIndex}>{stop}</li>
            ))}
          </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
