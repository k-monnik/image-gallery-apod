import { useState, useEffect } from 'react';
import ImageSearch from '../components/ImageSearch';
import Card from '../components/Card';


const Images = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [term, setTerm] = useState('');

    const apiKey = process.env.REACT_APP_PIXABAY_KEY;

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${apiKey}&q=${term}&image_type=photo&pretty=true`)
            .then(res => res.json())
            .then(data => {
                setImages(data.hits);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, [term]);

    return (
        <div className='container mx-auto'>
            <ImageSearch searchText={(text => setTerm(text))} />
            {isLoading ? <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1> : <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                {images.map(image => (
                    <Card key={image.id} image={image} />
                ))}

            </div>}

        </div>

    );
};

export default Images;
