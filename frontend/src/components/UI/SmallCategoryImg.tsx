// css, interface(type)
import { ingredientCategoryDictionary } from '../../util/data';
import imageArr from '../../assets/ingredients';

const SmallCategoryImg = (props: {
  smallCategory: string;
  width?: string;
  height?: string;
}) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={imageArr[ingredientCategoryDictionary[props.smallCategory]]}
          width={props.width || '30px'}
          height={props.height || '30px'}
          style={{ margin: 'auto' }}
          alt="재료"
        />
      </div>
    </>
  );
};
export default SmallCategoryImg;
