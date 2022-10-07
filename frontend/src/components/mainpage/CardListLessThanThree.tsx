// react core

// API

// external module

// external component
// custom component
import CarouselList from '../refrigerator/CarouselList';
// css, interface(type)
import classes from './CardListLessThanThree.module.scss';

const CardListLessThanThree = (props: { cardList: any[] }) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.main}>
            {props.cardList.map((card) => (
              <CarouselList key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default CardListLessThanThree;
