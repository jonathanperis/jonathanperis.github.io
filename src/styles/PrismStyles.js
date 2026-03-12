import { css } from 'styled-components';

const PrismStyles = css`
  .gatsby-highlight {
    background-color: ${props => props.theme.colors.lightNavy};
    color: ${props => props.theme.colors.lightestSlate};
    border-radius: ${props => props.theme.borderRadius};
    margin: 2em 0;
    padding: 1.25em;
    overflow: auto;
    font-family: ${props => props.theme.fonts.SFMono};
    font-size: ${props => props.theme.fontSizes.md};
  }

  .gatsby-highlight code[class*='language-'],
  .gatsby-highlight pre[class*='language-'] {
    height: auto !important;
    font-size: ${props => props.theme.fontSizes.sm};
    line-height: 1.5;
  }

  .gatsby-highlight + .gatsby-highlight {
    margin-top: 1.25em;
  }

  .gatsby-highlight-code-line {
    display: block;
    background-color: ${props => props.theme.colors.darkSlate};
    border-left: 2px solid ${props => props.theme.colors.green};
    padding-left: 1em;
    padding-right: 1em;
    margin-left: -1.25em;
    margin-right: -1.25em;
  }

  .token.attr-name {
    color: ${props => props.theme.colors.lightestSlate};
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${props => props.theme.colors.slate};
  }

  .token.property,
  .token.number,
  .token.function-name,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${props => props.theme.colors.green};
  }

  .token.boolean {
    color: ${props => props.theme.colors.blue};
  }

  .token.tag {
    color: ${props => props.theme.colors.green};
  }

  .token.string {
    color: ${props => props.theme.colors.white};
  }

  .token.punctuation {
    color: ${props => props.theme.colors.lightestSlate};
  }

  .token.selector,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${props => props.theme.colors.lightSlate};
  }

  .token.function {
    color: ${props => props.theme.colors.blue};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .token.variable {
    color: ${props => props.theme.colors.green};
  }

  .token.attr-value {
    color: ${props => props.theme.colors.white};
  }

  .token.keyword {
    color: ${props => props.theme.colors.pink};
  }

  .token.atrule,
  .token.class-name {
    color: ${props => props.theme.colors.blue};
  }

  .token.important {
    font-weight: 400;
  }

  .token.bold {
    font-weight: 700;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .namespace {
    opacity: 0.7;
  }
`;

export default PrismStyles;
