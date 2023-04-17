import React,{ useState } from 'react';
import './Description.css';

export default function Description({ property }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="description-section section">
      <h2>Description</h2>
      <p className={expanded ? "" : "truncated"}>
        {property.description &&
          property.description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </p>
      <span className="see-more" onClick={toggleExpand}>
        {expanded ? "See Less" : "See More"}
      </span>
    </div>
  );
}
