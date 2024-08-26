import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { get } from "/client/src/utilities.js";

import "./Gallery.css";

const Gallery = ({path}) => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        get("/api/gallery", {path: path}).then((images) => {
            setImages(images);
        });
    }, []);

    return (
        <div className="galleryContainer">
            {images.map((img) => <img src={img}/>)}
        </div>
    );
};

export default Gallery;
