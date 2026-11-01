import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-cocoa text-cream',
  secondary: 'bg-surface text-cocoa',
  light: 'bg-cream text-cocoa',
};
const sizes = {
  sm: 'px-4 py-[9px]',
  md: 'px-[26px] py-3.5',
  lg: 'px-[30px] py-[17px]',
};

// Renders a <Link> when `to` is given, otherwise a <button>.
export default function Button({ variant = 'primary', size = 'md', block = false, danger = false, to, className = '', ...props }) {
  const border = danger ? 'border-clay' : variant === 'secondary' ? 'border-cocoa' : 'border-transparent';
  const classes = `inline-flex items-center justify-center whitespace-nowrap rounded-full border-[1.5px] text-[15px] font-semibold ${variants[variant]} ${sizes[size]} ${border} ${block ? 'w-full' : ''} ${className}`;
  return to ? <Link to={to} className={classes} {...props} /> : <button className={classes} {...props} />;
}
