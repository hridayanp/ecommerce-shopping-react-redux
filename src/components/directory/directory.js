import { DirectoryItem } from '../directory-item/directory-item';
import './directory.styles.scss';

const categories = [
  {
    id: 1,
    title: 'Hats',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    linkUrl: 'shop/hats',
  },
  {
    id: 2,
    title: 'Jackets',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    linkUrl: 'shop/jackets',
  },
  {
    id: 3,
    title: 'Sneakers',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    linkUrl: 'shop/sneakers',
  },
  {
    id: 4,
    title: 'Women',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    linkUrl: 'shop/womens'
  },
  {
    id: 5,
    title: 'Men',
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    linkUrl: 'shop/mens'
  },
];

export const Directory = () => {
  return (
    <div className='directory-container'>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

