interface ButtonProps {
  label: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label }: ButtonProps) => {
  return <button>{label}</button>;
};
