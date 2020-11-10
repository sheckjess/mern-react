import './App.css';
import React, {Component} from 'react'

class App extends Component{
  constructor(){
    super()
    this.state = {
      roster: "",
      newPlayer: 
      {
        name: ""
      }
  }
  }

  fetchRoster() {
    let url = "https://yanks-roster.herokuapp.com/players"
    fetch(url)
      .then(res => res.json())
      .then(roster=>{
        console.log(roster)
        this.setState({roster: roster})
      })
  }
  componentDidMount(){
    this.fetchRoster()
  }

handlePlayerChange(e){
  console.log(e.target.value)
  console.log(this)
  this.setState({newPlayer: {
    name: e.target.value
  }})
}

handlePost(e){
  console.log(this.state.newPlayer)
  e.preventDefault()
  let url = "https://yanks-roster.herokuapp.com/players"
  fetch(url, {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(this.state.newPlayer),
})
    .then(res => res.json())
    .then(player=>{
      this.setState({roster: [...this.state.roster, player]})
      console.log(this.state)
    })
}
handleDelete(e){
  console.log(this.state.newPlayer)
  e.preventDefault()
  let url = "https://yanks-roster.herokuapp.com/players"
  fetch(url, {
  method: 'DELETE', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(this.state.newPlayer),
})
    .then(res => res.json())
    .then(player=>{
      this.setState({roster: [...this.state.roster, player]})
      console.log(this.state)
    })
}

  render(){
    return (
      <div className="App">
        {this.state.roster.length ? 
        this.state.roster.map((player, i)=>{
          return <div key={i}>{player.name}</div>
        })
      : ""
      
      }
        <div>

          <form onSubmit={(e)=>this.handlePost(e)} className="postForm">
            <h1>Add player</h1>
            <input type="text" placeholder="Add a player..." id="createPlayer" onChange={(e)=>this.handlePlayerChange(e)}/>
            <button type="submit">Submit</button>
          </form>

          <form onSubmit={(e)=>this.handleDelete(e)}>
            <h2>Delete player</h2>
            <input type="text" placeholder="Add a player..." id="createPlayer" onChange={(e)=>this.handlePlayerChange(e)}/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;