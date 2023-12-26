const GlobalFireflies = () => {
  return (
    <div>
      {new Array(15).fill(1).map((_, index) => (
        <div className="firefly" key={`fire--${index}`} />
      ))}
    </div>
  );
};

export default GlobalFireflies;
