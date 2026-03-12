import { css } from 'styled-components';

const TransitionStyles = css`
  .fadeup-enter {
    opacity: 0.01;
    transform: translateY(20px);
    transition: opacity 300ms ${props => props.theme.easing}, transform 300ms ${props => props.theme.easing};
  }

  .fadeup-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 300ms ${props => props.theme.easing}, transform 300ms ${props => props.theme.easing};
  }

  .fadedown-enter {
    opacity: 0.01;
    transform: translateY(-20px);
    transition: opacity 300ms ${props => props.theme.easing}, transform 300ms ${props => props.theme.easing};
  }

  .fadedown-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 300ms ${props => props.theme.easing}, transform 300ms ${props => props.theme.easing};
  }

  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ${props => props.theme.easing};
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms ${props => props.theme.easing};
  }
`;

export default TransitionStyles;
