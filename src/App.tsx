import React, { useEffect, useState } from 'react';
import './App.css';
import { Toplist } from './Toplist';


type JourneyProps = {
  LineNumber: string,
  DirectionCode: string,
  JourneyPatternPointNumber: string,
  LastModifiedUtcDateTime: string,
  ExistsFromDate: string
};

type StopsProps = {
  StopPointNumber: string,
  StopPointName: string, 
  StopAreaNumber: string,
  LocationNorthingCoordinate: string,
  LocationEastingCoordinate: string,
  ZoneShortName: string,
  StopAreaTypeCode: string,
  LastModifiedUtcDateTime: string,
  ExistsFromDate: string
};

type topProps = {
  count: number,
  stops: any
}

function getKeysWithHighestValue(o:any, n:number){
  var keys = Object.keys(o);
  keys.sort(function(a,b){
    return o[b] - o[a];
  })
  console.log(keys);
  return keys.slice(0,n);
}

function App() {
  // Settings data from API
  const [JourneyData, setJourneyData] = useState<JourneyProps[]>([]);
  // const [StopsData, setStopsData] = useState<StopsProps[]>([]);

  const [top10Lines, settop10Lines] = useState<topProps[]>([]);

  useEffect(() => {
    const JourneyApi = async () => {
      
      // Getting CORS errors from trafiklab. Mocking instead.
      /*const data = await fetch("https://api.sl.se/api2/LineData.json?model=jour&key=b138ca24481d4eb9a3b3b91b7f18f7a7&DefaultTransportModeCode=BUS",{
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

      // console.log('data', jsonJourneyData.ResponseData.Result);
      // setJourneyData(jsonJourneyData.ResponseData.Result);
      
      let lines: React.SetStateAction<topProps[]> = [];
      for (var i = 0; i < jsonJourneyData.ResponseData.Result.length; i++) {
        const key:number = +jsonJourneyData.ResponseData.Result[i]['LineNumber'];
        if (!lines[key]) {
          lines[key] = { count: 0, stops: [] }
        }
        lines[key].count++;
        lines[key].stops.push(jsonJourneyData.ResponseData.Result[i]['JourneyPatternPointNumber']); 
      }

      /* const result = Object
        .keys(lines)
        .sort((a, b) => lines[b].count - count[a].count)
        [0];
      */
      // const result = getKeysWithHighestValue(lines, 10)
      // console.log('result', result);      
    };

    /* const StopsApi = async () => {
      const data = await fetch("https://api.sl.se/api2/LineData.json?model=stop&key=b138ca24481d4eb9a3b3b91b7f18f7a7&DefaultTransportModeCode=BUS",{
        method: "GET"
      });
      const jsonStopsData = await data.json();
      setStopsData(jsonStopsData.results);
    }; */

     JourneyApi();
     // StopsApi();
  }, []);

  // Handle data and get top 10 stops.
  // let top10Lines: never[] = [];
  // const [top10Lines, settop10Lines] = useState<topProps[]>([]);
  /*
  let lines: React.SetStateAction<topProps[]> = [];
  for (var i = 0; i < JourneyData.length; i++) {
    const key = JourneyData[i]['LineNumber'];
    lines[key]['count']++;
    lines[key]['stops'][] = JourneyData[i]['JourneyPatternPointNumber']; 
  }
  console.log('top10Lines', top10Lines);
  setJourneyData(lines);
  */

  /*
  JourneyData.map((value) => {
    value.LineNumber
  });
  */

  const listObject = {nameLabel:'titta', total: 2};
  return (
    <div className="App">
      <Toplist list={listObject} />
    </div>
  );
}

export default App;
