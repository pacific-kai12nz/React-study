import React from "react";

type CardProps = {
    title: string;
    content: string;
    borderColor?:  string;
};

const Card: React.FC<CardProps> = ({title, content, borderColor = '#cccccc'}) => {
    const cardStyle = {
        padding: '16px',
        margin: '16px',
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const titleStyle = {
        fontWeight: 'bold',
        marginBottom: '8px'
    };
    return (
        <div style={cardStyle}>
            <h3 style={titleStyle}>{title}</h3>
            <p>{content}</p>
        </div>
    );
};

export default Card;