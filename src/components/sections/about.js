import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    '.NET Framework & Core',
    'C#',
    'ASP.NET Core',
    'Entity Framework',
    'Azure Services',
    'SQL Server',
    'JavaScript',
    'TypeScript',
    'Angular',
    'React',
    'Microservices',
    'Docker',
    'CQRS',
    'DDD',
    'Clean Architecture',
    'Git',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              As an experienced .NET developer, I have a strong track record of delivering
              high-quality software solutions. My expertise spans the entire .NET ecosystem, from
              legacy platforms like Web Forms to the latest cutting-edge technologies like .NET Core,
              .NET MAUI, and Cloud Native Applications.
            </p>

            <p>
              In addition to my technical skills, I have extensive knowledge of various software
              development patterns and architectures, including{' '}
              <strong>Clean Code, CQRS, DDD, Microservices, Cloud Native Applications,</strong> and{' '}
              <strong>Hexagonal Architecture</strong>. I believe in the importance of writing clean,
              maintainable code and using patterns that promote scalability, modularity, and flexibility.
            </p>

            <p>
              I am passionate about .NET development and stay up-to-date with the latest technologies
              and best practices in the field. I thrive in fast-paced environments where I can work
              collaboratively with cross-functional teams to deliver software that exceeds expectations.
            </p>

            <p>Here are a few technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
