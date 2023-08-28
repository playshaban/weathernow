import './App.css';
import $, { isEmptyObject } from 'jquery';
import {useEffect , useState} from 'react';
function App() {

  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})
  const [wicon , setWicon] = useState("");

  const [dark , setDark] = useState(0);

  const getWetherDetails = async(cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=99f77181af3fd5fd82c803e86bf197bb";
    try{
    const response = await fetch(apiURL);
    const resjson = await response.json();
   
    const iconurl = "https://openweathermap.org/img/wn/"+resjson?.weather[0].icon+"@2x.png";
    setData(resjson);
    setWicon(iconurl);
    }
    catch(err)
    {
      alert("City Not Found ");
      console.log(err);
    }
  }


  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getWetherDetails(inputCity);
  }

  useEffect(() => {
    $(".Moreinfo").hide();
   
  }, []);

  const changeTheme = () => 
  {
    if(dark)
    {
      $('body').css("background","white");
      $('footer').css("background","white");
      $('footer').css("color","black");
      setDark(0);
    }
    else 
    {
      
      $('body').css("background","black");
      $('footer').css("background","black");
      $('footer').css("color","white");
      setDark(1);
    }
  }
  
  function ViewMore()
  {
    $(".InfoData").toggle(100);
    $(".Moreinfo").toggle(100);
  }


  


  return (
    <div className="App">
      <div className="Contents" id={(dark)?"Darktheme":""}>
        <div className="Head">
          <div> <img src={require('./resources/Appicon.png')} alt="appicon"  style={{height:"100px",borderRadius:"10px"}}></img> <h1> Weather Now</h1></div>
            <form >
              <input type="text" value={inputCity} onChange={handleChangeInput} placeholder="Enter Your City"></input>
              <button onClick={handleSearch}> Find </button>
            </form>
            <div>
              <button onClick={changeTheme}>{(dark)?"Light":"Dark"} Theme</button>
            </div>
        </div>
        <div className="Infoarea">
          {

            (isEmptyObject(data))?(<p>Search Your City In Above Field </p>):
            (
              <div className="Infocard InfoData " id={(dark)?"InfocardDark":""} >
              <img src={wicon} alt="appicon"></img>
              <h2>{data?.name} <span style={{fontSize:10}}>({data?.sys?.country}) </span></h2>
              <p>{data?.weather[0].main}</p>
              <h1> {((data?.main?.temp)-273.15).toFixed(1)} °C</h1>
              <p> Feels Like {((data?.main?.feels_like)-273.15).toFixed(1)} °C </p>
              <button className="Viewmore" onClick={ViewMore}> View More  </button>
              
          </div>
          )
          }
          <div className="Infocard Moreinfo" id={(dark)?"InfocardDark":""}>
               <div> <h1>{data?.name}</h1> </div>
              <p><b>Description</b> <br></br>
              {!(isEmptyObject(data))?
                (data?.weather[0].description):
                (<p>Loadin</p>)}
              </p>

              <table> 
                <tr>
                    <td>
                    <i class="fa fa-arrow-up" aria-hidden="true"></i> Minimum 
                    </td>
                    <td>
                      
                    {((data?.main?.temp_min)-273.15).toFixed(1)}
                    </td>
                </tr>
                <tr>
                    <td>
                        <i class="fa fa-arrow-down" aria-hidden="true"></i> Maximum
                    </td>
                    <td>
                    {((data?.main?.temp_max)-273.15).toFixed(1)}
                    </td>
                </tr>
                <tr>
                  <td>
                  <i class="fas fa-tint"></i> Humidity
                  </td>
                  <td>
                  {data?.main?.humidity}
                  </td>
                </tr>
                <tr>
                  <td>
                  <i class="fas fa-cloud"></i> Clouds
                  </td>
                  <td>
                  {data?.clouds?.all} %
                  </td>
                </tr>
                
              </table>
              <button className="Viewless" onClick={ViewMore}> Hide </button>
              
          </div>
          </div>
      </div>
      <footer>
        Design & Developed By Shaban Khan
        <span><a href="https://playshaban.github.io/profile/" target="_blank" rel="noreferrer" >Click Here</a>For Contacts</span>
      </footer>
    </div>
  );
}

export default App;
