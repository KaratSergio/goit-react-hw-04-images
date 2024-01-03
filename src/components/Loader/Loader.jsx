import { Hourglass } from 'react-loader-spinner';

export const  Loader = () => {
  return (
    <Hourglass
    visible={true}
    height="80"
    width="80"
    ariaLabel="hourglass-loading"
    wrapperStyle={{ margin: '0 auto' }}
    colors={['#c6ce30', '#72a1ed']}
    />
  );
};

export default Loader
