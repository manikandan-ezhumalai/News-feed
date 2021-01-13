import React from 'react'
import Spinner from '../components/Spinner';
import Article from '../components/Article';
import ArticleError from '../components/ArticleError';
import EmptyData from '../components/EmptyData';

// search component to search news based on whatever key word user types
class Search extends React.Component {

    state = {
        articles: [],
        loading: true,
        error: false
    }
    
    // function will fetch article based on key text 
    fetchArticles() {
        this.setState({ loading: true })
        let allArticles = JSON.parse(sessionStorage.getItem("articles"));
        let unsortedArticles = [];
        // checking search content present or not 
        for(let i = 0;i < allArticles.length;i++){
            // check for title or new site name matching or not 
            if(allArticles[i].title.includes(this.props.match.params.id)){
                  unsortedArticles.push(allArticles[i])
            }else if(allArticles[i].content.includes(this.props.match.params.id)){
                unsortedArticles.push(allArticles[i])
            }else if(allArticles[i].source.includes(this.props.match.params.id)){
                unsortedArticles.push(allArticles[i])
            }
        }
        unsortedArticles.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
        });
        // call for data in state
        this.setState({loading : false, articles : unsortedArticles})
    }
    
    // compoenent did mount it will call fetch artucles function to filter iterm 
    componentDidMount() {
        this.fetchArticles();
    }

    renderArticles = articles => articles.map((article, index) => <Article key={index} {...article} />)

    render() {
        const { articles, loading, error } = this.state;
        if (error) return <ArticleError />
        if (loading) return <Spinner />
        return (
            <div className='container-fluid'>
                {/* check for article found or not  */}
                { articles && articles.length > 0 ? 
                <ul className='article-container'>
                    {this.renderArticles(this.state.articles)}
                </ul>
                :
                <EmptyData /> }
            </div>
        )
    }
}

export default Search;