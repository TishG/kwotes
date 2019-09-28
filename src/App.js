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
    fetch("https://quotes.rest/qod/categories.json")
      .then((res) =>
        res.status === 429
          ? alert(
              "Sorry, you have reached your limit of quotes for the day. Please come back tomorrow!"
            )
          : res.json()
      )
      .then((data) => {
        setLoaded(true);
        setCategories(data.contents.categories);
      })
      .catch((err) => {
        errors.length ? setErrors([err, ...errors]) : setErrors([err]);
      });
    fetchCategory("inspire");
    setDate(new Date().getFullYear())
  }, [errors]);
  const fetchCategory = (category) => {
    fetch(`https://quotes.rest/qod.json?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.contents.quotes[0].quote);
        setAuthor(data.contents.quotes[0].author);
      })
      .catch((err) => setErrors([err]));
  };
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
      {loaded ? (
        <section className="categories-quote">
          <MySelect categories={categories} fetchCategory={fetchCategory} />
          <Quote quote={quote} author={author} />
        </section>
      ) : (
        <Spinner />
      )}
      <footer>
        <small> &copy; Kwotes {date}</small>
      </footer>
    </div>
  );
};

export default App;
