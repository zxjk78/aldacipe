// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './RecipeRoundImgContainer.module.scss';

const RecipeRoundImgContainer = (props: {
  src: string;
  width?: string;
  height?: string;
  style?: any;
  alt: string;
}) => {
  const handleImgNotfound = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = require('../../assets/recipeImgNotfound.png');
  };
  return (
    <div className={classes.img_container}>
      <img
        src={props.src}
        alt={props.alt}
        width={props.width || '80'}
        height={props.height || '80px'}
        // style={{ borderRadius: '10px', overflow: 'hidden' }}
        onError={handleImgNotfound}
        className={classes.round_img}
      />
    </div>
  );
};
export default RecipeRoundImgContainer;
