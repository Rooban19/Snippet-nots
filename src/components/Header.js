import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Button from './Button';

const Header = ({ title, onAdd, showAdd, onTags, showTags }) => {
  const location = useLocation();

  return (
    <header className='header'>
      <h1>Notes</h1>
      {location.pathname === '/snippets' && (
        <div>
          {!showTags && (
            <Button
              color={showAdd ? 'red' : 'green'}
              text={showAdd ? 'Close' : 'Add'}
              onClick={onAdd}
            />
          )}
          {!showAdd && (
            <Button
              color={showTags ? 'red' : 'black'}
              text={showTags ? 'Close' : 'All Tags'}
              onClick={onTags}
            />
          )}
        </div>
      )}
    </header>
  );
};

Header.defaultProps = {
  title: 'Snippets',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header;
