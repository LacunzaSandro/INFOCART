import "./Error.scss";

// eslint-disable-next-line react/prop-types
function Error({ message, actionLabel = "Try again", actionFn }) {
  return (
    <div className="error">
      <div className="error__message">{message}</div>
      {actionFn && (
        <button className="error__button" onClick={actionFn}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default Error;

// => functional component
// => props
// => useState, useEff
