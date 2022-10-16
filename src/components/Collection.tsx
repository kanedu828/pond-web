import React, { useEffect, useState } from 'react';
import '../styles/collection.css';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';
import Select from 'react-select';

interface FishProps {
  fish: FishInstance;
}

interface FishInstance {
  active: boolean;
  count: number;
  description: string;
  expRewarded: number;
  fishId: number;
  lengthRangeInCm: number[];
  maxLength: number;
  name: string;
  pondUserId: number;
  rarity: string;
  secondsFishable: number;
}

function Fish(props: FishProps) {
  return (
    <div className={`fish ${props.fish.rarity}`}>
      <img
        className="collection-fish-image"
        src={require(`../assets/images/fish/${props.fish.name.toLowerCase().replaceAll(' ', '_')}.png`)}
        alt="No Fish Image Available"
      ></img>
      <h3>{props.fish.name}</h3>
      <small>Amount Caught: {props.fish.count}</small> <br />
      <small>Largest Length Caught: {props.fish.maxLength} cm</small>
    </div>
  );
}

export default function Collection() {
  const [userFish, setUserFish] = useState<any[]>([]);
  const [sortValue, setSortValue] = useState('id');
  const sortOptions = [
    {value: 'id', label: 'ID'},
    {value: 'name', label: 'Name'},
    {value: 'count', label: 'Amount Caught'},
    {value: 'maxLength', label: 'Largest Length'},
    {value: 'rarity', label: 'Rarity'}
  ]

  function sortComparator(a: FishInstance, b: FishInstance) {
    const rarityMapping = {
      'common': 3,
      'rare': 2,
      'epic': 1,
      'legendary': 0
    };
    if (sortValue === 'rarity') {
      return rarityMapping[a['rarity'] as keyof typeof rarityMapping] - rarityMapping[b['rarity'] as keyof typeof rarityMapping];
    } 
    if (sortValue === 'name') {
      return a['name'].localeCompare(b['name']);
    } else {
      const right: number = a[sortValue as keyof FishInstance] as number;
      const left: number = b[sortValue as keyof FishInstance] as number;
      return left - right;
    }
  }

  useEffect(() => {
    setUserFish([...userFish].sort(sortComparator));
  }, [sortValue]);

  useEffect(() => {
    getApiWrapper('/user/fish/', (data: any) => {
      setUserFish(data);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <div className='collection-tools'>
        <h3>Sort By:</h3>
        <Select className='sort-selector' onChange={v => setSortValue(v ? v.value : 'id')} options={sortOptions}/>
      </div>
      <div className="collection-container">
        {userFish.map((element) => (
          <Fish
            key={element.id}
            fish={element}
          />
        ))}
      </div>
    </div>
    
  );
}
