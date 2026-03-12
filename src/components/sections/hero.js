import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Jonathan Peris.</h2>;
  const three = <h3 className="big-heading">I build software solutions.</h3>;
  const four = (
    <>
      <p>
        I'm a software engineer specializing in .NET development and modern web technologies.
        My expertise spans the entire .NET ecosystem, from legacy platforms to cutting-edge
        technologies like .NET Core, MAUI, and Cloud Native Applications.
      </p>
      <p>
        I have extensive knowledge of software development patterns and architectures, including
        Clean Code, CQRS, DDD, Microservices, and Hexagonal Architecture. I believe in writing
        clean, maintainable code that promotes scalability, modularity, and flexibility.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="mailto:jperis.silva@gmail.com"
      rel="noopener noreferrer">
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {items.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </StyledHeroSection>
  );
};

Hero.propTypes = {
  data: PropTypes.array,
};

export default Hero;
