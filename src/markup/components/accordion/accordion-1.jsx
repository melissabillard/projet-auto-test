import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';

// Markdown 
import ReactMarkdown from "react-markdown";

export default function Accordion1(props) {
    return (
        <>
            <Accordion className="ttr-accordion faq-bx" defaultActiveKey={["0"]}>
                {props.accordeon &&
                    props.accordeon.map((item) => (
                        <Card key={item.ID}>
                            <Accordion.Item as={Card.Header} eventKey={item.Classement}>
                                <Accordion.Button>
                                    <Link to={"#"} className="text-uppercase">{item.Titre}</Link>
                                </Accordion.Button>
                            </Accordion.Item>
                            <Accordion.Collapse eventKey={`${item.Classement}`}>
                                <Card.Body>
                                    <ReactMarkdown>{item.Corps}</ReactMarkdown>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))
                }
            </Accordion>
        </>
    )
}