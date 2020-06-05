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
  const [errors, setErrors] = useState([]);
  const [date, setDate] = useState(null);
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
        errors.length ? setErrors([err, ...errors]) : setErrors([err]);
      }
    };

    fetchCategories();
    fetchCategory("funny");
    setDate(new Date().getFullYear());
  }, [errors]);

  const fetchCategory = async category => {
    try {
      let res = await fetch(
        `https://quotes.rest/qod.json?category=${category}`
      );
      let data = await res.json();
      setQuote(data.contents.quotes[0].quote);
      setAuthor(data.contents.quotes[0].author);
    } catch (err) {
      setErrors([err]);
    }
  };

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
      {loaded ? (
        <section className="categories-quote">
          <MySelect categories={categories} fetchCategory={fetchCategory} />
          <Quote quote={quote} author={author} />
          <small>Come back tomorrow for new kwotes!</small>
        </section>
      ) : (
        <Spinner />
      )}
        <footer>
          <small> Kwotes&nbsp;&copy; {date}</small>
          <small>*Disclaimer: The Quotes on this website are not the thoughts and ideas of the creator of this site. All quotes are auto-generated from a public database system.</small>
        </footer>
    </div>
  );
};

export default App;
