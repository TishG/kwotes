import React from "react";
import "./App.css";

//components
import MySelect from "./components/MySelect";
import Quote from "./components/Quote";

class App extends React.Component {
  state = {
    categories: [],
    quote: "",
    author: "",
    errors: []
  };
  UNSAFE_componentWillMount() {
    this.myFetch();
  }
  myFetch = () => {
    fetch("https://quotes.rest/qod/categories.json")
      .then((res) =>
        res.status === 429
          ? alert(
              "Sorry, you have reached your limit of quotes for the day. Please come back tomorrow!"
            )
          : res.json()
      )
      .then((data) =>
        this.setState({ categories: data.contents.categories, loaded: true })
      )
      .catch((err) =>
        this.state.errors.length
          ? this.setState({ errors: [err, ...this.state.errors] })
          : this.setState({ errors: [err] })
      );
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
      .catch((err) => this.setState({ errors: [err] }));
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
          <small>Come back tomorrow for new kwotes!</small>
        </div>
        <MySelect
          categories={this.state.categories}
          fetchCategory={this.fetchCategory}
        />
        <Quote quote={this.state.quote} author={this.state.author} />
      </div>
    );
  }
}

export default App;
