import React from 'react';
import moment from 'moment';

const Article = ({ source, title, contentSnippet : description, link : url, image : urlToImage, pubDate : publishedAt }) =>
    <article>
        <a href={url} className='article'>
            <div className='article__content'> 
                <h4 className='article-headline' style = {{ color : '#bb1919'}}>{title}</h4>
                <p className='article-description p-t-1 p-b-1'>{description}</p>
                <div className='article__details'>
                    <p className='article-source' style = {{ color : 'rgb(64, 57, 168)' }}>{source}</p>
                    <p className='article-date' style = {{ color : 'rgb(0, 90, 55)'}} >{new moment(publishedAt).fromNow()}</p>
                </div>
            </div>
        </a>
    </article>

export default Article;