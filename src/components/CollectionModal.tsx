import React, { useEffect } from 'react';
import '../styles/collectionmodal.css';
import '../styles/shared.css';


interface CollectionModalProps {
    show: boolean,
    setShowCollection: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CollectionModal(props: CollectionModalProps) {
    const showHideStyle = props.show ? 'modal-container display-block' : 'modal-container display-none';

    useEffect(() => {
        
    }, []);

    function closeCollectionModal() {
        props.setShowCollection(false);
    }

    return (
        <div className={showHideStyle}>
            <div className='modal-main'>
                Your Collection!

                <button onClick={closeCollectionModal}>
                    Close
                </button>
            </div>
            
        </div>
    );
}