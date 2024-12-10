import { useEffect, useState } from 'react';
import LoaderPage from './Loader/LoaderPage.js';
import Nutrition from './Nutrition.js';
import imageOne from './assets/coconut.jpg';
import imageTwo from './assets/healthy-life.jpg';
import imageThree from './assets/cabbige.jpg';
import imageFour from './assets/food.jpg';
import imageFive from './assets/vitaminC.jpg';
import imageCard from './assets/card.jpg';
import imageInfo from './assets/3644584.jpg';
import socialFb from './assets/icon-facebook.png';
import socialInst from './assets/icon-instagram.png';
import socialLink from './assets/icon-linkedin.png';
import './App.css';

function App() {
  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const APP_ID = 'e0a4bf88';
  const APP_KEY = '176d7ee753e97f8edf7a9db508742111';

  const fetchData = async(ingr)=>{
    setStateLoader(true);

    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })
    
    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      console.log(data);
      setMyNutrition(data);
      
    
    } else {
      setStateLoader(false);
      alert('Listing ingredients incorrectly');
    }
  }

  const myRecipeSearch =(e)=> {
    setMySearch(e.target.value);
  }

  const finalSearch =(e)=> {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
      
    }
  }, [wordSubmitted])

  return(
    <div className = 'App'>
      {stateLoader && <LoaderPage/>}
      <header>
        <h2>Cooking And Meal Prep</h2> 
        <div className='food'>
        <img src = {imageOne} alt = 'coconut'/>
        <img src = {imageTwo} alt = 'life'/>
        <img src = {imageThree} alt = 'cabbige'/>
        <img src = {imageFour} alt = 'food'/>
        <img src = {imageFive} alt = 'vitaminC'/>
        </div>
        <h3>The Best Way to Manage Nutrition</h3> 
      </header>

      <main>
        <div className = 'imageBackground'>
        <h1>Nutritional Analysis</h1>
        <p>Enter an ingredient list for what you are cooking, like "2 eggs, 1 cup rice". Type the ingredient name on a new line.</p>
        
        <form onSubmit = {finalSearch}>
          <textarea placeholder="Enter Recipe Ingredients...  " cols="30" rows="10"
          onChange = {myRecipeSearch}></textarea>
          <button type="submit">Analyze Ingredients</button>
        </form>

        <div class = "flip-card">
          <div class = "flip-card-inner">
            <div class = "flip-card-front">
              <h2>NUTRITION FACTS</h2>
              <h5>Serving size 100%</h5>
        {
          myNutrition && <p>{myNutrition.calories} kcal</p>
        }

        <img src = {imageCard} alt = 'food' width = '200px' height = '150px'/>
        <p>HEALTHY FOOD</p>
        <p>HAPPY MOOD 😊</p>
        </div>
        <div class = "flip-card-back">
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit}, index) =>
            <Nutrition
                label = {label}
                quantity = {quantity}
                unit = {unit}/>
            )
        }
        </div>
        </div>
        </div>
        </div>
      </main>

      <aside>
        <div className = 'tips'>
          <h2>Healthy Eating Tips</h2>
          <p>✅1/2 vegetables & fruits ✅1/4 whole grains✅1/4 protein ✅water</p>
          <img src = {imageInfo}  alt='info' width='280px' height='600px'/>
        </div>
      </aside>
      
      <footer>
        <h2>Contact Us</h2>
        <a href = "https://www.facebook.com/marina.garaeva" className = "fa fa_facebook"><img src = {socialFb} alt='social'/></a>
        <a href = "https://www.instagram.com/" className = "fa fa_instagram"><img src = {socialInst} alt = 'social'width = '36px' height = '36px'/></a>
        <a href = "https://www.linkedin.com/" className = "fa fa_linkedIn"><img src = {socialLink} alt = 'social'/></a>
        <p>Copyright © Maryna Garaieva. 2024 | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
