import React,{useState} from 'react';
import SearchBar from './sub-components/Searchbar';
import Body from './sub-components/Body';

const Home = (props) => {
  const username = props.match.params.username;
  const [name, setName] = useState('');
  return (
    <div style={{backgroundColor:"#000000"}}>
      <SearchBar name={name} setName={setName} />
      <Body username={username} name={name} />
    </div>
  )
}

export default Home;
