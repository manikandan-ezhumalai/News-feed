import React from 'react'
import Spinner from '../components/Spinner';
import Article from '../components/Article';
import ArticleError from '../components/ArticleError';
import { SourceSite } from '../config';
let Parser = require('rss-parser');
let parser = new Parser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

// Home Component for load intail page news feed 
class Home extends React.Component {
    state = {
        articles: [],
        loading: true,
        error: false,
    }
    
    // component will mount function will fetch news feed from configured websites 
    async componentWillMount() {
        // first time call will happen while loadind page 
        this.fetchNewsFeed()
    }

    // inside component did mount it will inject intervel call function every 10 secs it will get updated data from news feed
    componentDidMount(){
        setInterval(this.fetchNewsFeed(),100000);
    }
    
    // common function for fetch new feed 
    async fetchNewsFeed(){
        var unSortedArticles = [];
        for (let i = 0; i < SourceSite.length; i++){
            const feed = await parser.parseURL(CORS_PROXY + SourceSite[i]);
            let tempArticles = [];
            for(let j = 0; j < feed.items.length; j++){
                let currentObject = feed.items[j];
                currentObject.image = feed.image.url;
                currentObject.source = feed.image.title;
                tempArticles.push(currentObject)
            }
            // merging two array 
            Array.prototype.push.apply(unSortedArticles,tempArticles); 
            let sortedArticles = unSortedArticles.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.pubDate) - new Date(a.pubDate);
            });
            // setting value in state 
            this.setState({
                articles :  sortedArticles,
                loading : false
            })
        }
        // setting session search value access 
        sessionStorage.setItem("articles",JSON.stringify(unSortedArticles))
    }
    renderArticles = articles => articles.map((article, index) => <Article key={index} {...article} />)

    render() {
        if (this.state.error) return <ArticleError />
        if (this.state.loading && this.state.articles.length === 0) return <Spinner />
        return (
            <div className='container-fluid'>
                <ul className='article-container'>
                    {this.renderArticles(this.state.articles)}
                </ul>
            </div>
        )
    }

}

export default Home