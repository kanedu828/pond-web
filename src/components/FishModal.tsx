import ReactModal from 'react-modal';
import React from 'react';
import '../styles/fishModal.css';

interface FishModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  fish: any;
}

interface CaughtFishProps {
  fish: any;
}

function CaughtFish(props: CaughtFishProps) {
  return (
    <div className="caught-fish-container">
      <img
        className="fish-image"
        src={require(`../assets/images/fish/${props.fish.name.toLowerCase().replaceAll(' ', '_')}.png`)}
        alt="No Fish Image Available"
      ></img>
      <h3>{props.fish ? props.fish.name : null}</h3>
      <small>{props.fish ? props.fish.description : null}</small> <br />
      <small>Length: {props.fish ? props.fish.length : null} cm</small> <br />
      <small> You earned {props.fish ? props.fish.expRewarded : null} exp!</small>
    </div>
  );
}

export default function FishModal(props: FishModalProps) {
  if (props.fish) {
    return (
      <ReactModal
        isOpen={props.isOpen}
        shouldCloseOnOverlayClick={false}
        className={`fish-modal-container ${props.fish.rarity}`}
        preventScroll={false}
      >
        <CaughtFish fish={props.fish} />
        <button className="catch-fish-button" onClick={props.onRequestClose}>
          {' '}
          Catch Fish!{' '}
        </button>
      </ReactModal>
    );
  } else {
    return (<></>);
  }
  
}
