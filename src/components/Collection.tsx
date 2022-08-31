import React, { useEffect, useState } from 'react';
import '../styles/collection.css';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';


interface CollectionModalProps {
}

interface FishProps {
    key: number;
    name: string,
    count: number,
    maxLength: number
}

function Fish(props: FishProps) {
    return (
        <div className='fish'>
            <img className='fish-image' src={require('../assets/images/fish/default_fish.png')} alt='No Fish Image Available'></img>
            <h3>{props.name}</h3>
            <small>Amount Caught: {props.count}</small> <br/>
            <small>Largest Length Caught: {props.maxLength} cm</small> 
        </div>
    )
}

export default function CollectionModal(props: CollectionModalProps) {
    const [userFish, setUserFish] = useState<any[]>([]);

    useEffect(() => {
        getApiWrapper('/user/fish/', (data: any) => {
            setUserFish(data);
            console.log(data);
        });
    }, []);

    return (
        <div className='collection-container'>
            {
                userFish.map((element) => (
                    <Fish
                        key={element.id}
                        name={element.name}
                        count={element.count}
                        maxLength={element.maxLength}
                    />
                ))
            }
        </div>
    );
}