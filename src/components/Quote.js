import React from "react";
import "./Quote.css";

const Quote = ({ quote, author }) => {
  return (
    <section className="Quote">
      <div className="overlay">
      {quote ? (
        <blockquote>
          <h2>"{quote}"</h2>
          <p>
            - <em>{!author ? "author unknown" : author}</em>
          </p>
        </blockquote>
      ) : (
        <h2>Select a category to display a quote here.</h2>
      )}
      </div>
    </section>
  );
};

export default Quote;
