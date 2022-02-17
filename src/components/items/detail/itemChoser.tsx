import React, { useEffect, useState } from 'react'

import Flavor from '../../../dataTypes/flavor';
import ModalRecipientes from './itemChoserModal';

import './itemChoser.css'


interface IProps {
  imgWidth: number;
  itemId: string;
  maxFlavors: number;
  flavors: Flavor[];
  selectedFlavors: Flavor[];
  setSelectedFlavors: any;
}

const ItemChooser: React.FC<IProps> = ({imgWidth, itemId, maxFlavors, flavors, selectedFlavors, setSelectedFlavors}) => {
  const [show, setShow] = useState<boolean>(false);
  const [changedItemIndex, setChangedItemIndex] = useState<number>(0);

  const magicNumberById = new Map([[2, 200], //1/2 Litre
                                   [3, 150], //1   Litre
                                   [4, 133], //2   Litre
                                   ])                       

  useEffect(() => {
    setSelectedFlavors(flavors.slice(0,maxFlavors));
  }, [flavors,   setSelectedFlavors, itemId])

  const selectItemById = (newItemId: string) => {
    let newSelectedItems = selectedFlavors;
    const newItem = flavors.find(i => i.id === newItemId)

    if (newItem instanceof Flavor) {
      newSelectedItems[changedItemIndex] = newItem;
      //Slice makes a copy of the item, otherwise it will have the same reference
      setSelectedFlavors(newSelectedItems.slice());
    }
    else {
      console.warn("Changed item couldn't be finded");
    }
  }

  return <>
    <ModalRecipientes items={flavors} show={show} onHide={() => setShow(false)}
                      selectItemById={selectItemById}/>
    <div id="images-container-item-choser" style={{ width: imgWidth, height: imgWidth*2/3}}>
      
      {//Image mapping
      selectedFlavors.map((dtItem, i) => {

        //Item destructuring
          const [magicNumber, pictureUrl, title]: [number , string, string] = 
                [magicNumberById.get(maxFlavors) || 150, dtItem.pictureUrl, dtItem.title];

          return (
          <div key={i} className="img-container-item-choser"style={{ width: 100/maxFlavors+"%",  left: `${i*100/maxFlavors}%`}} >
            <span onClick={() => {setShow(true); setChangedItemIndex(i);}}>
              <img 
                  className="img-item-choser"
                  style={{ objectPosition:i*magicNumber/maxFlavors+"% 0"}}
                  src={pictureUrl}
                  alt={title}
              />
            </span>
          </div>
      )})}
    </div>
  </>
}

export default ItemChooser;