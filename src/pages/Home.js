import React, { Component, Fragment } from 'react'
import { Logo, Banner, Tag, Button } from '../components/Elements/index.js';
import { SearchBar } from '../components/SearchBar.js/index.js';
import { Footer } from '../components/Footer/index.js';

import './Home.css';
import PhotoList from '../components/PhotoList/index.js';
import Loader from '../components/Loader/index.js';
import PopupImage from './PopupImage.js';
import { getPhotoList, getRandomPhoto ,downloadImageByURL} from '../services/ImageService.js';
import { Switch, Route } from 'react-router-dom';

const MemoizedBanner = React.memo(Banner);
const MemoizedFooter = React.memo(Footer);
const MemoizedSearchBar = React.memo(SearchBar);
const MemoizedPhotoList = React.memo(PhotoList);

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            search :"",
            backGroundBanner : "",
            data: [],
            showLoader : false
        }
        this.pageNumber = 1;
    }
    

    componentDidMount() {
        //fetch data from here
        this.getListOfPhotos();
        this.updateBanner();
    }

    componentDidUpdate(prevProps,prevState) {
        if(prevState.search!==this.state.search) {
            this.pageNumber = 1;
            this.getListOfPhotos();
        }
    }
    onSearchChange = (search) => {
        if(search) {
            this.setState({search});
        } else {
            alert("Please enter some keywords to search!")
        }        
    }

    updateBanner = () => {
        const result = getRandomPhoto();
        result.then(res=>{
            this.setState({backGroundBanner:res.data.urls.regular});
        }).catch(error=>{
        })
    }


    toggleLoader =() => {
        this.setState(prevstate=> ({showLoader:!prevstate.showLoader}));
    }

    getListOfPhotos = () => {
            const reqParamas = {
                query : this.state.search,pageNumber:this.pageNumber
            };
            this.toggleLoader();
            const result = getPhotoList(reqParamas);
            result.then(res=>{
                this.toggleLoader();
                let olddata = this.state.data;
                let newdata = [];
                if(this.state.search) {
                    if(this.pageNumber===1)
                        newdata = res.data.results;
                    else
                    newdata = olddata.concat(res.data.results);
                } else {
                    newdata = olddata.concat(res.data);
                }
                this.setState({data:newdata});
                this.pageNumber++;
            }).catch(error=>{
                this.toggleLoader();
                alert("Opps Erro Occured");
            })
    }

    getPhotoFromStoreById = (id) => {
        const {data} = this.state;
        let dataToReturn = data.find(item=>item.id === id);
        return dataToReturn !==undefined?dataToReturn:null;
    }


    downloadImage = (URL) => {
        //as not on the same origin , need to download image as blob and render it on browser
        this.toggleLoader();
        const result =downloadImageByURL(URL);
        result.then(res=>{
            let url = window.URL.createObjectURL(new Blob([res.data]));
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'image.jpg'); //or any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
            this.toggleLoader();
        }).catch(error=>{
            this.toggleLoader();
            alert("error while downloading image");
        })
    }


    getPhotoListToRender = () => {
        if(this.state.data.length>0) {
            return <Fragment>
                <section className="photo-list-wrapper">
                    <MemoizedPhotoList data ={this.state.data}/>
                </section>
                <div className="load-more-btn">
                    <Button content="Load more" onClick={this.getListOfPhotos} />
                </div>
            </Fragment>
        } 
        return <div className="error-msg-wrapper">
                <div className="error-msg">
                    {this.state.search?"No result found for '"+this.state.search+"'":""}
                </div>
            </div>
    }

    render() {
        return (
            <section className="home-wrapper">
                {this.state.showLoader&& <Loader/>}
                
                    <MemoizedBanner source={this.state.backGroundBanner} />                    
                <section className="main-content-wrapper">
                    <Logo />
                    <header className="header">
                        <h3 className="header__title title--big">Free stock photos for everything</h3>
                        <h4 className="header__title title--small title--margin">We offer the best stock photo's all in one place</h4>  
                        <section className="searchtag">
                            <label className="search__label">Search by tags:</label>
                            <div className="search__tag">
                            {["Dog", "Cat", "Space", "Nature", "Business", "Office", "Coffee", "World"].map((item, index) =>
                                <Tag key={item+index} content={item} />
                            )}
                            </div>
                        </section>                      
                    </header>                                        
                    
                    <section className="searchbar">
                        <MemoizedSearchBar onSearchChange={this.onSearchChange} />
                    </section>
                    { this.getPhotoListToRender()}                                    
                </section>
                <MemoizedFooter />
                <Switch>
                    <Route path="/:photoid">
                        <PopupImage getPhotoFromStoreById={this.getPhotoFromStoreById} onDownloadClick= {this.downloadImage}/>
                    </Route>
                </Switch>
            </section>
        )
    }
}
