import React, { Component } from "react";
import { Button, Alert, Container } from "react-bootstrap";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      roster: "",
      newPlayer: {
        name: "",
        position: "",
        number: 0,
        _id: "",
      },
    };
  }

  fetchRoster() {
    let url = "https://yanks-roster.herokuapp.com/players";
    fetch(url)
      .then((res) => res.json())
      .then((roster) => {
        console.log(roster);
        this.setState({ roster: roster });
      });
  }
  componentDidMount() {
    this.fetchRoster();
  }

  handlePlayerPost(e) {
    console.log(e.target.value);
    console.log(this);
    this.setState({
      newPlayer: {
        name: e.target.value,
      },
    });
  }
  /*
handlePlayerUpdate(e){
  console.log(e.target.value)
  console.log(this)
  this.setState({newPlayer: {
    name: e.target.value
  }})
}
*/
  handlePlayerRemove(e) {
    console.log(e.target.value);
    console.log(this);
    this.setState({
      newPlayer: {
        _id: e.target.value,
      },
    });
  }

  handlePost(e) {
    console.log(this.state.newPlayer);
    e.preventDefault();
    let url = "https://yanks-roster.herokuapp.com/players";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.newPlayer),
    })
      .then((res) => res.json())
      .then((player) => {
        this.setState({ roster: [...this.state.roster, player] });
        console.log(this.state);
      });
  }

  handleUpdate(e) {
    e.preventDefault();
    console.log(this.state.nameUpdate);
    let url = "https://yanks-roster.herokuapp.com/players/" + this.state.idUpdate;
    console.log(url)
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: this.state.nameUpdate}),
    })
      .then((res) => res.json())
      .then((player) => this.setState({ roster: this.state.roster }))
  }
  handleDelete(e) {
    console.log(this.state.newPlayer);
    e.preventDefault();
    let url =
      "https://yanks-roster.herokuapp.com/players/" + this.state.newPlayer._id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((player) => {
        window.location.reload(false);
        console.log(this.state);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Yankees Roster</h1>
        {this.state.roster.length
          ? this.state.roster.map((player, i) => {
              return (
                <div key={i}>
                  {player.name}
                  <br />
                  {player._id}
                  <br />
                  <br />
                </div>
              );
            })
          : ""}
        <Container>
          <form onSubmit={(e) => this.handlePost(e)} className="postForm">
            <h1>Add player</h1>
            <input
              type="text"
              placeholder="Name..."
              id="createPlayer"
              onChange={(e) => this.handlePlayerPost(e)}
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>

          <form onSubmit={(e) => this.handleDelete(e)}>
            <h2>Delete player</h2>
            <input
              type="text"
              placeholder="Remove a player..."
              id="removePlayer"
              onChange={(e) => this.handlePlayerRemove(e)}
            />
            <Button type="submit">Submit</Button>
          </form>

          <form onSubmit={(e) => this.handleUpdate(e)}>
            <h2>Update player</h2>
            <input
              type="text"
              placeholder="Player id to be updated..."
              value={this.state.idUpdate}
              onChange={(e) => this.setState({ idUpdate: e.target.value })}
              id="updatePlayerID"
            />
            <input
              type="text"
              placeholder="New player name..."
              id="updatePlayerNewName"
              value={this.state.nameUpdate}
              onChange={(e) => this.setState({ nameUpdate: e.target.value })}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Container>
      </div>
    );
  }
}

export default App;
