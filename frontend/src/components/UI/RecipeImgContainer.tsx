// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './RecipeImgContainer.module.scss';

const RecipeImgContainer = (props: {
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
    <>
      <img
        src={props.src}
        alt={props.alt}
        width={props.width || '100px'}
        height={props.height || '100px'}
        // style={{ borderRadius: '10px', overflow: 'hidden' }}
        onError={handleImgNotfound}
        
      />
    </>
  );
};
export default RecipeImgContainer;
