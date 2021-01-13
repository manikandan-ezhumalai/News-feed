import React from 'react';
import LogoGrid from '../components/LogoGrid';

import reactLogo from '../assets/Logos/react.svg';
import reduxLogo from '../assets/Logos/redux.svg';
import sassLogo from '../assets/Logos/sass-1.svg';
import reactRouterLogo from '../assets/Logos/react-router.svg';
import webpackLogo from '../assets/Logos/webpack-icon.svg';
import babelLogo from '../assets/Logos/babel-10.svg';

const logos = [
    {
        name: 'React',
        image: reactLogo
    },
    {
        name: 'Redux',
        image: reduxLogo
    },
    {
        name: 'React Router',
        image: reactRouterLogo
    },
    {
        name: 'Sass',
        image: sassLogo
    },
    {
        name: 'Babel',
        image: babelLogo
    },
    {
        name: 'Webpack',
        image: webpackLogo
    }
]

const About = () => {
    return (
        <div className='container-flex-center p-t-3'>
            <div className='container' style = {{ marginTop : '-5px'}}>
                <section className='p-a-2'>
                    <h3 className='font-normal text-center m-b-2'>We Are Using Below Tech Stack</h3>
                    <LogoGrid logos={logos} />
                </section>
            </div>
        </div>
    )
}

export default About;