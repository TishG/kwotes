import React from "react";
import "./App.css";

//components
import MySelect from "./components/MySelect";
import Quote from "./components/Quote";

class App extends React.Component {
  state = {
    loaded: false,
    categories: [],
    quote: null,
    author: null,
    errors: []
  };
  UNSAFE_componentWillMount() {
    this.myFetch();
  }
  myFetch = () => {
    this.setState({ loaded: false });
    fetch("https://quotes.rest/qod/categories.json")
      .then((res) => res.json())
      .then((data) =>
        this.setState({ categories: data.contents.categories, loaded: true })
      )
      .catch((err) => this.setState({ errors: [...this.state.errors, err] }));
  };
  fetchCategory = (category) => {
    fetch(`https://quotes.rest/qod.json?category=${category}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          quote: data.contents.quotes[0].quote,
          author: data.contents.quotes[0].author
        })
      )
      .catch((err) => this.setState({ errors: [...this.state.errors, err] }));
  };
  render() {
    return (
      <div className="App">
        <nav>
          <h1>Kwotes</h1>
        </nav>
        <div className="app-instructions">
          <h2>
            Select a category to generate a <span className="kwote">Kwote</span>{" "}
            of the day
          </h2>
          <small>Come back the tomorrow for new quotes!</small>
        </div>
        <MySelect
          categories={this.state.categories}
          fetchCategory={this.fetchCategory}
          loaded={this.state.loaded}
        />
        <Quote quote={this.state.quote} author={this.state.author} />
      </div>
    );
  }
}

export default App;
