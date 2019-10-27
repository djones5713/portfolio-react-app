import React, { Component, Fragment } from 'react';
import NarBar from './NavBar';
import axios from 'axios';
import Footer from './Footer';
import './ArticuleImageItem.css';


class ArticulePage extends Component {
    state = {
        book: {},
        isLoading: false,
        imgInfo: []
    }
  
    componentDidMount(){
       axios.get('/wp-json/wp/v2/media')
            .then(res => {
                this.setState({
                    imgInfo: res.data
                })
            // console.log(res.data)
            // console.log(this.state.imgInfo)
            })
            
       axios.get(`/wp-json/wp/v2/articules/${this.props.match.params.id}`)
            .then( res => {
                this.setState({
                book: res.data,
                isLoading: true   
            })
            // console.log(res.data)
            // console.log(this.state)
            // console.log(this.state.book.featured_media)
        })
            .catch(err => console.log(err))    
    }
    

    render(){
        const { book, isLoading, imgInfo } = this.state;
        let image 
            imgInfo.map((info) => {
                if(info.id === book.featured_media)
                image = info.source_url
                return image
            })
        if(isLoading){
            return(
                <Fragment>
                    <NarBar />
                    <div className="ArticuleImage-itemstyle">
                        {!image ? null : <img className="ArticuleImage-img"  src={image} alt="articule"/>}
                        <div className="ArticuleImage-box"></div>
                    </div>
                    <h2 className="ArticuleImage-title">{book.title.rendered}</h2>
                    <div className='FeaturePage-blurb' dangerouslySetInnerHTML={{ __html: book.content.rendered }}></div>
                    <Footer />
                </Fragment>
            )
        }

        return <h3>Loading...</h3>
       
    }
}

export default ArticulePage