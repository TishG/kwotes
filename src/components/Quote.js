import React from "react";
import "./Quote.css";

const Quote = ({ quote, author }) => {
  return (
    <section className="Quote">
      {quote && author ? (
        <blockquote>
          <h2>"{quote}"</h2>
          <p>
            - <em>{author}</em>
          </p>
        </blockquote>
      ) : (
        <h2>Select a category to display a quote here.</h2>
      )}
    </section>
  );
};

export default Quote;
