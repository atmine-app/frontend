import { useState } from 'react';
import './Description.css';

export default function Description ({property}) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    }

    return (
        <div className="description-section section">
            <h2>Description</h2>
            <p className={expanded ? "" : "truncated"}>{property.description}</p>
            <span className="see-more" onClick={toggleExpand}>{expanded ? "See Less" : "See More"}</span>
        </div>
    )
}
