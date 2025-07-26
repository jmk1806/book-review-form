import styled from '@emotion/styled';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-family:
    var(--font-geist-sans),
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  outline: none;

  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        `;
      case 'lg':
        return `
          padding: 1rem 1.5rem;
          font-size: 1.125rem;
        `;
      default:
        return `
          padding: 0.5rem 1rem;
          font-size: 1rem;
        `;
    }
  }}

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: #7928ca;
          color: white;
          &:hover {
            background-color: #7928cadd;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: #0070f3;
          border: 2px solid #0070f3;
          &:hover {
            background-color: #0070f3;
            color: white;
          }
        `;
      default:
        return `
          background-color: #0070f3;
          color: white;
          &:hover {
            background-color: #0070f3dd;
          }
        `;
    }
  }}
`;

export const Button = ({ children, ...props }: ButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
