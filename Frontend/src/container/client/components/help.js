import React from 'react';


const Help = ({ title, description, faqs, links }) => {
    return (
        <>
        <div className="help-container">
            <h2 className="help-title">{title || "Need Help?"}</h2>
            {description && <p className="help-description">{description}</p>}
            {faqs && faqs.length > 0 && (
                <div className="faq-section">
                    <h3>Frequently Asked Questions</h3>
                    <ul>
                        {faqs.map((faq, index) => (
                            <li key={index}>
                                <strong>{faq.question}</strong>
                                <p>{faq.answer}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {links && links.length > 0 && (
                <div className="help-links">
                    <h3>Useful Links</h3>
                    <ul>
                        {links.map((link, index) => (
                            <li key={index}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </>
    );
};

export default Help;
