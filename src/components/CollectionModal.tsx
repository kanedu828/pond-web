import React, { useEffect, useState } from 'react';
import '../styles/collectionmodal.css';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';


interface CollectionModalProps {
    show: boolean,
    setShowCollection: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function CollectionModal(props: CollectionModalProps) {
    const showHideStyle = props.show ? 'modal-container display-block' : 'modal-container display-none';
    const [userFish, setUserFish] = useState<any[]>([]);

    useEffect(() => {
        getApiWrapper('/user/fish/', (data: any) => {
            setUserFish(data);
            console.log(data);
        });
    }, []);

    function closeCollectionModal() {
        props.setShowCollection(false);
    }

    return (
        <div className={showHideStyle}>
            <div className='modal-main'>
                <ul>
                    {userFish.map((element) => (
                        <li>
                            Fish Id: { element.fishId } <br />
                            Fish Name: { element.name } <br />
                            Fish Count: { element.count } <br />
                            Fish Max Length: { element.length }
                        </li>
                    ))}
                </ul>
                

                <button onClick={closeCollectionModal}>
                    Close
                </button>
            </div>
            
        </div>
    );
}