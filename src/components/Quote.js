import React from "react";
import "./Quote.css";
import Spinner from "./Spinner";

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
        <Spinner />
      )}
    </section>
  );
};

export default Quote;
