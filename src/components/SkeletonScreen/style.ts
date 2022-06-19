import styled from 'styled-components';

export const ContainerSkeleton = styled.div`
  display: grid;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .skeleton-screen-master {
    min-height: 25vh;
    max-height: 25vh;
    border-radius: 10px;

    @media screen and (min-width: 1200px) {
      min-height: 200px;
      max-height: 200px;
    }
  }
`;
