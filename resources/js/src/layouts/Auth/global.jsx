import { createGlobalStyle } from "styled-components"

export const GlobalStyleAuth = createGlobalStyle`
  	html,
	body {
	  	height: 100%;
	}

	body {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 40px;
		padding-bottom: 40px;
		background-color: #f5f5f5;

		form {
			width: 330px;
		}

		.form-signin {
			width: 100%;
			max-width: 330px;
			padding: 15px;
			margin: auto;

			.form-floating {
				&:focus-within {
					z-index: 2;
				}
			}

			input[type="email"] {
				margin-bottom: -1px;
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;
			}

			input[type="password"] {
				margin-bottom: 10px;
				border-top-left-radius: 0;
				border-top-right-radius: 0;
			}
		}
	}
`