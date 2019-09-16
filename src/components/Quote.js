import React from "react";
import "./Quote.css";

const Quote = ({ quote, author }) => {
  console.log("HEY", quote, author);
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
        <h2>...waiting to generate a quote</h2>
      )}
    </section>
  );
};

export default Quote;
