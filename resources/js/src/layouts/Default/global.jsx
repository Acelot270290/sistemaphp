import { createGlobalStyle } from "styled-components";

export const GlobalStyleDefault = createGlobalStyle`
  	body {
		font-size: .875rem;
	}
	.feather {
		width: 16px;
		height: 16px;
		vertical-align: text-bottom;
	}
	.sidebar {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 100;
		padding: 48px 0 0;
		box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
		
		.nav-link {
			font-weight: 500;
			color: #333;

			display: flex;
			align-items: center;
			
			.feather {
				margin-right: 4px;
				color: #727272;
			}

			&:hover {
				.feather {
					color: inherit;
				}
			}

			&.active {
				color: #2470dc;

				.feather {
					color: inherit;
				}
			}
		}
	}

	.sidebar-sticky {
		position: relative;
		top: 0;
		height: calc(100vh - 48px);
		padding-top: .5rem;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.sidebar-heading {
		font-size: .75rem;
		text-transform: uppercase;
	}

	.navbar-brand {
		padding-top: .75rem;
		padding-bottom: .75rem;
		font-size: 1rem;
		background-color: rgba(0, 0, 0, .25);
		box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
	}

	.navbar {
		.navbar-toggler {
			top: .25rem;
			right: 1rem;
		}

		.form-control {
			padding: .75rem 1rem;
			border-width: 0;
			border-radius: 0;
		}
	}

	.form-control-dark {
		color: #fff;
		background-color: rgba(255, 255, 255, .1);
		border-color: rgba(255, 255, 255, .1);
		
		&:focus {
			border-color: transparent;
			box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
		}
	}

	@media (max-width: 767.98px) {
		.sidebar {
			top: 5rem;
		}
	}
`;
