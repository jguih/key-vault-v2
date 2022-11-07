import { Button, Badge, Container } from 'react-bootstrap';
import carousel from '../scss/modules/Carousel.module.scss'
import Card from './Card';

function handleClick(e, value) {
  const offset = value === "next" ? 1 : -1;
  const content = document.querySelector(`.${carousel.content}`);
  // Gets the active item inside carousel.content
  const activeItem = content.querySelector(`.${carousel.active}`);
  // Gets the index of the active item and increment or decrement it
  let newIndex = [...content.children].indexOf(activeItem) + offset;
  // If prev on first item, go to the last one
  if (newIndex < 0) newIndex = content.children.length - 1;
  // If next on last item, go to the first one
  if (newIndex >= content.children.length) newIndex = 0;
  // Add active class to next or prev child
  content.children[newIndex].classList.add(carousel.active);
  // Remove active class from current active child
  activeItem.classList.remove(carousel.active);
}

export default function Carousel({ gamesInfo }) {
  return (
    <Container className="mt-4">
      <div className={carousel.carousel}>
        <div className={carousel.header}>
          <div className={carousel.left}>
            <h4 className='m-0'>Carousel</h4>
          </div>
          <div className={carousel.right}>
            <Button
              onClick={(e) => handleClick(e, "prev")}
            >{"<"}</Button>
            <Button
              onClick={(e) => handleClick(e, "next")}
            >{">"}</Button>
          </div>
        </div>
        <div className={carousel.content}>
          <div className={carousel["card-group-sentinel"] + " " + carousel.active}>
            <Card
              imgSrc="https://via.placeholder.com/400"
              title="Title 1"
              platforms={<i class="bi bi-windows"></i>}
              price={<Badge>R$100</Badge>}
            />
            <Card imgSrc="https://via.placeholder.com/400" />
            <Card imgSrc="https://via.placeholder.com/400" />
            <Card imgSrc="https://via.placeholder.com/400" />
            <Card imgSrc="https://via.placeholder.com/400" />
          </div>
          <div className={carousel["card-group-cycle"]}>
            <Card
              imgSrc="https://via.placeholder.com/300"
              title="Title 2"
              platforms={<i class="bi bi-windows"></i>}
              price={<Badge>R$100</Badge>}
            />
            <Card imgSrc="https://via.placeholder.com/300" />
            <Card imgSrc="https://via.placeholder.com/300" />
            <Card imgSrc="https://via.placeholder.com/300" />
            <Card imgSrc="https://via.placeholder.com/300" />
          </div>
        </div>
      </div>
    </Container>
  );
}