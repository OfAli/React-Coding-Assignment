import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import './style.css'

function Article({history}) {
    const [headline, setHeadline] = useState('');
    const [time, setTime] = useState('');

        useEffect(() => {
            if (history.location.state === undefined || history.location.state === ""){
                history.push("/")
            }
        });

        useEffect(() => {
           setHeadline(history.location.state)
        }, []);

    useEffect(() => {
        headline !== "" ? setTime(headline.publishedAt.split('T')[0]) : setTime("")
    }, [headline]);


    return (
        <Card className="text-center m-5" >
            <Card.Header><h2>{headline.title}</h2>

                 </Card.Header>
            <Card.Body>
                <Card.Text>
                    <h5 className="my-2">{headline.description}</h5>
                </Card.Text>
                <img className="card-img-top w-50" src={headline.urlToImage} alt={''}/>

                {headline && headline.source ?
                    <Card.Text>
                    <p className="my-2">Source: {headline.source.name}</p>
                    </Card.Text>
                    :""}

                <Card.Text>
                    <h5 className="my-2">{headline.content}</h5>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <h5> Published At: {time}</h5>
                <h5>Author: {headline.author}</h5>
            </Card.Footer>
        </Card>
    );
}


export default Article;

