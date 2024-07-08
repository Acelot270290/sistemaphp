import { createGlobalStyle } from "styled-components"

export const GlobalStylePublic = createGlobalStyle`
html, body {
    height: 100%;
	width: 100%;
    margin: 0;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }

  .public-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh; 
  }

  .form-signin {
    width: 100%; 
    max-width: 100%; 
    padding: 20px; 
    margin: auto;
    background: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center; 
	background-color: transparent;
  }

  .form-floating {
    width: 100%; 
    margin-bottom: 15px;

    input {
      width: 100%; 
      border: 1px solid #ced4da; 
      padding: 10px; 
      border-radius: 0.25rem; 
      height: 40px; 
    }

  }


  button[type="submit"] {
    width: 100%;
    padding: 10px; 
    margin-top: 10px; 
    border-radius: 0.25rem; 
   
  }

  @media (max-width: 767.98px) {
    .form-signin {
      width: 90%; 
    }
  }
`;