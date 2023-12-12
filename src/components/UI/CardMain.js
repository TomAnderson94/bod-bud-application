import PropTypes from 'prop-types';
import './CardMain.scss';


CardMain.propTypes = {
  onClick: PropTypes.func,
  isParentHovering: PropTypes.bool
};

export default function CardMain({ children, onClick, isParentHovering=false }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className={"CardMain" + (isParentHovering ? " Hovering" : "")} onClick={onClick}>
      {children}
    </div>
  );
}

ContainerMain.propTypes = {
  className: PropTypes.string
};

function ContainerMain({ children, className="" }) {
  return (
    <div className={"CardContainerMain " + className}>
      {children}
    </div>
  );
}

// -----------------------------------------
// Compose Card Object /////////////////////
// -----------------------------------------

CardMain.Container = ContainerMain;
