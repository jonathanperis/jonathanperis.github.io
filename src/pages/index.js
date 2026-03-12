import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Hero, About, Jobs, Featured, Contact } from '@components/sections';
import Head from '@components/head';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <>
    <Head />

    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
      <Featured />
      <Contact />
    </StyledMainContainer>
  </>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
