import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {getNews} from "../Redux/News/action";
import {connect} from "react-redux";
import Card from 'react-bootstrap/Card';
import './style.css'

function Home({
                  history,
                  getNews,
                  listNews,
                  total
              }) {

    const [limit, setLimit] = useState(20);
    const [page] = useState(1);
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(true)

    const MoreNews = () => {
        setLimit(limit + 10)
        getNews(limit + 10, page, query, "");
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getNews(limit, page, query, "");
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [query])

    const Sort = (sort) => {
        getNews(limit, page, query, sort);
    }

    useEffect(() => {
        if (listNews && listNews.articles && listNews.articles.length !== 0) {
            setLoading(false)
        }
    }, [listNews])


    return (
        <div>
            {loading ?
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> :
                <>
                    <div className="centered">
                        <div className="search w-auto">
                            <input type="text" autoFocus className="searchTerm" value={query}
                                   placeholder="Search here..." onChange={(e) => {
                                setQuery(e.target.value)
                                setLimit(20)
                            }}/>
                            <button type="submit" className="searchButton">
                                <i className="fa fa-search"/>
                            </button>
                        </div>
                    </div>
                    {query && query !== "" ?
                        <div className="centered">

                            <button className="searchButton" onClick={() => Sort("popularity")}>
                                <i className="fa fa-sort-amount-desc" aria-hidden="true"/> Popularity
                            </button>

                            <button className="searchButton mx-lg-3" onClick={() => Sort("relevancy")}>
                                <i className="fa fa-sort-amount-desc" aria-hidden="true"/> Relevancy
                            </button>

                            <button className="searchButton" onClick={() => Sort("publishedAt")}>
                                <i className="fa fa-sort-amount-desc" aria-hidden="true"/> published Date
                            </button>

                        </div> :
                        <div className="text-center">
                            <h1>Top-Headlines</h1>
                        </div>
                    }
                    {listNews && listNews.articles &&
                    listNews.articles.map((item) => {
                        return (
                            <div className="centered col col-md-6 mx-auto">
                                <Card className="text-center m-5 w-100">
                                    <Card.Body>
                                        <Card.Title><h2 className="my-2">{item.title}</h2></Card.Title>
                                        <img alt={""} className="card-img-top col-md-6 mx-auto" src={item.urlToImage}/>
                                        <Card.Text><h5 className="my-2">{item.description}</h5></Card.Text>
                                        <button className="searchButton" onClick={() => history.push({
                                                pathname: '/article',
                                                state: item
                                            }
                                        )}>READ FULL ARTICLE
                                            <i className="fa fa-arrow-right" aria-hidden="true"/>
                                        </button>
                                    </Card.Body>
                                </Card>
                            </div>

                        )
                    })
                    }
                    {total && total > limit ?
                        <div className="centered">
                            <button className="searchButton" onClick={() => MoreNews()}>
                                <i className="fa fa-arrow-down" aria-hidden="true"/> More News
                            </button>
                        </div>
                        : ""}
                </>
            }

        </div>
    );
}

const mapStateToProps = (state) => ({
    listNews: state.newsReducer.listNews,
    total: state.newsReducer.total
});

export default connect(mapStateToProps, {
    getNews
})(Home);

