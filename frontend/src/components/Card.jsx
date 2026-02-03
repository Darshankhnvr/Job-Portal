import './Card.css';

const Card = ({ 
  children, 
  className = '',
  hover = false,
  onClick,
  ...props 
}) => {
  const classes = `card ${hover ? 'card-hover' : ''} ${className}`;
  
  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
