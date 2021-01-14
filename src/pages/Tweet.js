import React from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import ArticleError from '../components/ArticleError';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { TwitterApiInfo, TwitterTopic } from '../config';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

// Tweet Component for load intail top tweet related about configured pages 
class TweetFeed extends React.Component {
    state = {
        tweet: [],
        loading: true,
        error: false,
    }
    
    // component will mount function will fetch tweet feed from configured websites 
    async componentWillMount() {
        // first time call will happen while loadind page 
        this.fetchTweetFeed()
    }

    
    // common function for tweet new feed 
    async fetchTweetFeed(){
        let unsortedTweet = []
        // call for fetch sweets from api based on topic
        for(let i = 0; i < TwitterTopic.length; i++){
            let url = proxyurl + TwitterApiInfo.CLIENT_URL +TwitterTopic[i]+ "&result_type=popular";
            axios.get(url, { headers: { Authorization: TwitterApiInfo.CLIENT_AUTH_TOKEN } } )
                .then(res => {
                   let respTweet = res.data.statuses;
                    // merging two array 
                    Array.prototype.push.apply(unsortedTweet,respTweet); 
                    let sortedTweet = unsortedTweet.sort(function(a,b){
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        return new Date(b.created_at) - new Date(a.created_at);
                    });
                    // setting value in state 
                    this.setState({
                        tweet :  sortedTweet,
                        loading : i === TwitterTopic.length -1  ? false : true
                    })

                })
                .catch(err => {
                    this.setState({
                        error: true,
                        loading: false
                    })
                })
        }
    }

    render() {
        const { error, loading, tweet } = this.state;
        if (error) return <ArticleError />
        if (loading && tweet.length === 0) return <Spinner />
        return (
            <div className='container-fluid'>
                <ul className='article-container'>
                { tweet.map((content, index) => 
                    <TwitterTweetEmbed tweetId={content.id_str} />
                ) 
                }
                </ul>
            </div>
        )
    }

}

export default TweetFeed