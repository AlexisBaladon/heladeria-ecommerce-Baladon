import React, { FunctionComponent } from 'react';
import {Card, Button} from 'react-bootstrap';
import DtItem from '../../dataTypes/item';
import './item.css';
import ItemCount from './itemCount'


interface IProps {
  item: DtItem;
  setSelectedItem: React.Dispatch<DtItem> | null;
  initial: number;
  onClick: Function;
  onAdd(num: number, set: React.Dispatch<number>): void;
  onSub(num: number, set: React.Dispatch<number>): void;
}

const Item: FunctionComponent<IProps> = 
  ({item, setSelectedItem, initial, onClick, onAdd, onSub}: IProps) => {
  
  const [title, description, price, pictureUrl, stock]:
        [string, string, number, string, number] =
        [item.title, item.description, item.price, item.pictureUrl, item.stock];
  
  const selectItem = (): void => {
    if (setSelectedItem) setSelectedItem(item);
    if (onClick) onClick()
  };

  return <>
    <Card id="carta" className="" >
      <Card.Img variant="top" src={pictureUrl}/>
      <Card.Body className="body-card">
        <Card.Title id="titulo-carta" className="btn stretched-link" onClick={selectItem}>
          <strong>{title}</strong>
        </Card.Title>
        <hr></hr>
        <Card.Text className ="texto-carta">
          {description}
        </Card.Text>
        <Card.Text className ="texto-carta">
          <strong>{price} US$</strong>
        </Card.Text>
        <div className = "item-count-container">
          <ItemCount 
            stock = {stock}
            initial = {initial}
            onAdd = {onAdd}
            onSub = {onSub}
          />
        </div>
        <div className ="aniadir-carro-container input-group py-2 display-content-center">
          <Button className = "aniadir-carro" variant="primary">Agregar al carro</Button>
        </div>
      </Card.Body>
      <Card.Footer>
        Stock: {stock}
      </Card.Footer>
    </Card>
  </>;
};

export default Item;
