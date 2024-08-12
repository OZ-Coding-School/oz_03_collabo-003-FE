import MainDescription from '../components/specific/MainDescription';
import MainPopularPlatform from '../components/specific/MainPopularPlatform';
import Footer from './../components/layout/Footer';

const HomePage = () => {
  return (
    <div className='w-full'>
      <MainPopularPlatform />
      <MainDescription />
      <Footer />
    </div>
  );
};
export default HomePage;
