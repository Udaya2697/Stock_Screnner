import React from 'react';
import { useState } from 'react';
import Plot from 'react-plotly.js';
import "./Stock.css";

function Stock() {
  const [data, setdate] = useState()
  const [Xvalue, setXvalue] = useState([])
  const [stockChartYValues, setstockChartYvalues] = useState([])
  const [name, setname] = useState("");
  const [symbol, setsymbol] = useState("");
  const [Description, setDescription] = useState("");
  const [Sector, setSector] = useState("");
  const [Industry, setIndustry] = useState("");
  const [MarketCapitalization, setMarketCapitalization] = useState("");
  const [EBITDA, setEBITDA] = useState("");
  const [PERatio, setPERatio] = useState("");
  const [BookValue, setBookValue] = useState("");
  const [DividendPerShare, setDividendPerShare] = useState("");
  const [EPS, setEPS] = useState("");
  const [QuarterlyEarningsGrowthYOY, setQuarterlyEarningsGrowthYOY] = useState("");
  const [QuarterlyRevenueGrowthYOY, setQuarterlyRevenueGrowthYOY] = useState("");
  const [PriceToBookRatio, setPriceToBookRatio] = useState("");
  const [EVToRevenue, setEVToReveue] = useState("");
  const [EVToEBITDA, setEVToEBITDA] = useState("");
  const [SharesOutstanding, setSharesOutstanding] = useState("");
  const [quaterinterestAndDebtExpense, setquaterinterestAndDebtExpense] = useState([]);
  const [quaterlyGrossProfit, setquaterlyGrossProfit] = useState([]);
  const [quaterlyOpEx, setquaterlyOpEx] = useState([]);
  const [quaterlyOpIn, setquaterlyOpIn] = useState([]);
  const [quaterlyreportRevenue, setquaterlyreportRevenue] = useState([]);
  const [quaterlyreportNetInc, setquaterlyreportNetInc] = useState([]);

  function inputHandeler(event) {
    event.preventDefault()
    //const API_KEY = 'PQL3FOCNNBFDUKSR';
    const API_KEY = '40OBVNQXL56PQ9QS';


    let StockSymbol = data;
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let API1 = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${StockSymbol}&apikey=${API_KEY}`;
    let API2 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${StockSymbol}&apikey=${API_KEY}`

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    let name;
    let symbol, Description, Sector, Industry;
    let MarketCapitalization, EBITDA, PERatio, BookValue, DividendPerShare, EPS, QuarterlyEarningsGrowthYOY, QuarterlyRevenueGrowthYOY, PriceToBookRatio, EVToRevenue, EVToEBITDA, SharesOutstanding;
    let quaterlyreportRevenue = []; let quaterlyreportNetInc = []; let quaterlyGrossProfit = []; let quaterlyOpEx = []; let quaterlyOpIn = []; let quaterinterestAndDebtExpense = [];

    fetch(API_Call)
      .then(
        function (response) {
          return response.json()
        }
      )
      .then(
        function (data) {
          console.log(data);

          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
          }

        }
      )
    setXvalue(stockChartXValuesFunction);
    setstockChartYvalues(stockChartYValuesFunction);

    fetch(API1).then(
      function (response) {
        return response.json()
      }
    )
      .then(
        function (data) {
          console.log(data);
          console.log(data.quarterlyReports[0].grossProfit);
          var quarter = data.quarterlyReports;
          for (let i = 0; i < 5; i++) {
            quaterinterestAndDebtExpense.push(quarter[i].interestAndDebtExpense);
            quaterlyGrossProfit.push(quarter[i].grossProfit);
            quaterlyOpEx.push(quarter[i].operatingExpenses);
            quaterlyOpIn.push(quarter[i].operatingIncome);
            quaterlyreportNetInc.push(quarter[i].netIncome);
            quaterlyreportRevenue.push(quarter[i].totalRevenue);
          }
          setquaterinterestAndDebtExpense(quaterinterestAndDebtExpense);
          setquaterlyGrossProfit(quaterlyGrossProfit); setquaterlyOpEx(quaterlyOpEx); setquaterlyOpIn(quaterlyOpIn); setquaterlyreportNetInc(quaterlyreportNetInc);
          setquaterlyreportRevenue(quaterlyreportRevenue);
          console.log(quaterlyreportRevenue);


        })



    fetch(API2).then(
      function (response) {
        return response.json()
      }
    )
      .then(
        function (data) {
          console.log(data);
          name = data.Name;
          symbol = data.Symbol;
          Description = data.Description;
          Sector = data.Sector;
          Industry = data.Industry;
          MarketCapitalization = data.MarketCapitalization;
          EBITDA = data.EBITDA;
          PERatio = data.PERatio;
          BookValue = data.BookValue;
          DividendPerShare = data.DividedPerShare;
          EPS = data.EPS;
          QuarterlyEarningsGrowthYOY = data.QuarterlyEarningsGrowthYOY;
          QuarterlyRevenueGrowthYOY = data.QuarterlyRevenueGrowthYOY;
          PriceToBookRatio = data.PriceToBookRatio;
          EVToRevenue = data.EVToRevenue;
          EVToEBITDA = data.EVToEBITDA;
          SharesOutstanding = data.SharesOutstanding;



          setname(name); setDescription(Description); setSector(Sector); setsymbol(symbol); setIndustry(Industry); setSharesOutstanding(SharesOutstanding); setEVToEBITDA(EVToEBITDA); setEVToReveue(EVToRevenue);
          setPriceToBookRatio(PriceToBookRatio);
          setQuarterlyEarningsGrowthYOY(QuarterlyEarningsGrowthYOY); setQuarterlyRevenueGrowthYOY(QuarterlyRevenueGrowthYOY); setEPS(EPS); setDividendPerShare(DividendPerShare);
          setBookValue(BookValue); setPERatio(PERatio); setEBITDA(EBITDA); setMarketCapitalization(MarketCapitalization)
        })

        console.log(name);
        console.log(SharesOutstanding);
        console.log(EPS);}
        return (
          <>
            <div className='container'>
              <div className='btn'>
                <input  onChange={e => setdate(e.target.value)} id="input" placeholder='Tickets' />
                <button  onClick={inputHandeler} id="button">Submit</button>
              </div>
            </div>
            <div className='header'>
            <h1>Company: {name}.</h1>
            <p>Tickets: {symbol}.</p>
            <p>Sector: {Sector}.</p>
            <p>Industry: {Industry}.</p>
            <p> Description:{Description}</p>
            </div>
    
    
            <div className='graph'>
              <Plot
                data={[
                  {
                    x: Xvalue,
                    y: stockChartYValues,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                  }
                ]}
                layout={{ width: 720, height: 440, title: "" }}
              />
            </div>
            <div>
              <h2>Ratios</h2>
              <table className='ratio-table'><tbody>
                <tr>
                  <th>Market Cap</th>
                  <td>{MarketCapitalization}</td>
                  <th>P/E	</th>
                  <td>{PERatio}</td>
                  <th>EPS</th>
                  <td>{EPS}</td>
                  <th>EBITDA</th>
                  <td>{EBITDA}</td>
                </tr>
                <tr>
                  <th>BookValue</th>
                  <td>{BookValue}</td>
                  <th>DividendPerShare</th>
                  <td>{DividendPerShare}</td>
                  <th>SharesOutstanding</th>
                  <td>
                    {SharesOutstanding}
                  </td>
                  <th>PriceToBookRatio</th>
                  <td>{PriceToBookRatio}</td>
                </tr>
                <tr>
                  <th>QuarterlyEarningsGrowthYOY</th>
                  <td>{QuarterlyEarningsGrowthYOY}</td>
                  <th>QuarterlyRevenueGrowthYOY</th>
                  <td>{QuarterlyRevenueGrowthYOY}</td>
    
                  <th>EVToEBITDA</th>
                  <td>{EVToEBITDA}</td>
                  <th>EVtoRevenue</th>
                  <td>{EVToRevenue}</td>
                </tr>
    
              </tbody>
              </table>
            </div>
            <div>
              <h2>Income</h2>
              <table className='income-table'>
                <thead><th>Income</th><th>2022Q3</th><th>2022Q2</th><th>2022Q1</th><th>2021Q4</th></thead>
              
              <tbody>
                <tr><th>grossProfit</th><td>{quaterlyGrossProfit[0]}</td><td>{quaterlyGrossProfit[1]}</td><td>{quaterlyGrossProfit[2]}</td><td>{quaterlyGrossProfit[3]}</td></tr>
                <tr><th>interestAndDebtExpense</th><td>{quaterinterestAndDebtExpense[0]}</td><td>{quaterinterestAndDebtExpense[1]}</td><td>{quaterinterestAndDebtExpense[2]}</td><td>{quaterinterestAndDebtExpense[3]}</td></tr>
                <tr><th>netIncome</th><td>{quaterlyreportNetInc[0]}</td><td>{quaterlyreportNetInc[1]}</td><td>{quaterlyreportNetInc[2]}</td><td>{quaterlyreportNetInc[3]}</td></tr>
                <tr><th>operatingExpenses</th><td>{quaterlyOpEx[0]}</td><td>{quaterlyOpEx[1]}</td><td>{quaterlyOpEx[2]}</td><td>{quaterlyOpEx[3]}</td></tr>
                <tr><th>operatingIncome</th><td>{quaterlyOpIn[0]}</td><td>{quaterlyOpIn[1]}</td><td>{quaterlyOpIn[2]}</td><td>{quaterlyOpIn[3]}</td></tr>
                <tr><th>totalRevenue</th><td>{quaterlyreportRevenue[0]}</td><td>{quaterlyreportRevenue[1]}</td><td>{quaterlyreportRevenue[2]}</td><td>{quaterlyreportRevenue[3]}</td></tr>
    
              </tbody>
              </table>
    
            </div>
          </>
        )
      }
    
    
    export default Stock;