import styled from 'styled-components'

export const Container = styled.div`
  .main-container {
    height: auto;
    min-height: 100vh;
    padding: 40px 24px;
    text-align: center;
    background-color: #e4e4e6;
  }

  .header {
    text-align: left;
    font: Noto Sans;
    color: #4b4b4b;
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .data-group {
    margin: 20px 0;
  }

  .group-title {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    margin: 24px 0 16px 0;
    color: #969696;
  }

  .buttons-control {
    display: flex;
    justify-content: flex-end;
    margin: 80px 0;
  }

  @media (min-width: 640px) {
    .main-container {
      padding: 40px;
    }
  }

  @media (min-width: 1024px) {
    .main-container {
      padding: 40px 256px;
    }
  }
`
