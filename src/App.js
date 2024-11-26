import { Header } from './components/Header/Header.jsx'
import { PasswordGenerator } from './components/PasswordForm/PasswordForm.jsx'
import { Footer } from './components/Footer/Footer.jsx'

function App() {
	return (
		<>
			<Header />

			<main>
				<PasswordGenerator />
			</main>

			<Footer />
		</>
	)
}

export default App
