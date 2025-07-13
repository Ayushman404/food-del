import React from 'react'
import Header from "../../components/Header/Header"
import Menu from '../../components/Menu/Menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Home = () => {

    const [category, setCategory] = React.useState('All');
    

  return (
    <div>
        <Header />
        <Menu category= {category} setCategory={setCategory} />
        <FoodDisplay category = {category} />
    </div>
  )
}

export default Home