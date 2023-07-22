import React, { useState, useEffect } from "react";

//components
import MySelect from "./components/MySelect";
import Quote from "./components/Quote";
import Spinner from "./components/Spinner";

//css
import "./App.css";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(false);
  const [date, setDate] = useState(null);

  const fetchCategory = async category => {
    try {
      let res = await fetch(
        `https://quotes.rest/qod.json?category=${category}`
      );
      let data = await res.json();
      setQuote(data.contents.quotes[0].quote);
      setAuthor(data.contents.quotes[0].author);
    } catch (err) {
      console.error(err.message)
      setError(true);
      return {}
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let res = await fetch("https://quotes.rest/qod/categories.json");
        let data = await res.json();
        if (res.status === 429)
          alert(
            "Sorry, you have reached your limit of quotes for the day. Please come back tomorrow!"
          );
        setLoaded(true);
        setCategories(data.contents.categories);
      } catch (err) {
        console.error(err.message)
        setError(true)
        return {}
      }
    };

    fetchCategories();
    fetchCategory("funny");
    setDate(new Date().getFullYear());
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Kwotes</h1>
      </header>
      <div className="app-instructions">
        <h2>
          Select a category to generate a <span className="kwote">Kwote</span>{" "}
          of the day
        </h2>
      </div>
      {error && <div>We were unable to get a quote. Please refresh the page and try again.</div>}
      {!loaded && !error && <Spinner/>}
      {loaded && !error && (
        <section className="categories-quote">
          <MySelect categories={categories} fetchCategory={fetchCategory} />
          <Quote quote={quote} author={author} />
          <small>Come back tomorrow for new kwotes!</small>
        </section>
      ) }
        <footer>
          <small> Kwotes&nbsp;&copy; {date}</small>
          <small>*Disclaimer: The quotes on this website are not the thoughts and ideas of the creator of this site. All quotes are auto-generated from a public database system.</small>
        </footer>
    </div>
  );
};

export default App;
