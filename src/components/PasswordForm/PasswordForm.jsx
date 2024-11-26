import { useState, useEffect } from 'react'
import { Button } from '../Button/Button'
import './PasswordForm.scss'

const passObj = {
	lowercase: 'abcdefghijklmnopqrstuvwxyz',
	uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	numbers: '0123456789',
	symbols: '~!@#$%&*^()-+|{}[]:;<>?,.',
}

export const PasswordGenerator = () => {
	const [passwordInput, setPasswordInput] = useState('')
	const [passwordLength, setPasswordLength] = useState(16)
	const [includeLowercase, setIncludeLowercase] = useState(true)
	const [includeUppercase, setIncludeUppercase] = useState(false)
	const [includeNumbers, setIncludeNumbers] = useState(false)
	const [includeSymbols, setIncludeSymbols] = useState(false)
	const [passwordStrength, setPasswordStrength] = useState(
		'password__indicator_low'
	)
	const [copyStatus, setCopyStatus] = useState('icon')

	const randomInt = (min, max) =>
		Math.floor(Math.random() * (max - min + 1)) + min

	const shuffleString = str =>
		str
			.split('')
			.sort(() => 0.5 - Math.random())
			.join('')

	const copyPassword = () => {
		navigator.clipboard.writeText(passwordInput)

		setCopyStatus('copied')

		setTimeout(() => {
			setCopyStatus('icon')
		}, 2000)
	}

	const restorePasswordOptions = () => {
		const savedOptions = JSON.parse(localStorage.getItem('passwordOptions'))
		if (savedOptions) {
			setPasswordLength(savedOptions.length)
			setIncludeUppercase(savedOptions.uppercase)
			setIncludeNumbers(savedOptions.numbers)
			setIncludeSymbols(savedOptions.symbols)
		}
	}

	const savePasswordOptions = () => {
		const options = {
			length: passwordLength,
			uppercase: includeUppercase,
			numbers: includeNumbers,
			symbols: includeSymbols,
		}
		localStorage.setItem('passwordOptions', JSON.stringify(options))
	}

	const updatePasswordStrength = length => {
		if (length >= 16) {
			setPasswordStrength('password__indicator_high')
		} else if (length >= 8) {
			setPasswordStrength('password__indicator_medium')
		} else {
			setPasswordStrength('password__indicator_low')
		}
	}

	const generatePassword = (length = passwordLength) => {
		savePasswordOptions()

		// const actualLength = length || passwordLength

		const { lowercase } = passObj

		let passwordString = shuffleString(lowercase)

		if (includeUppercase) {
			passwordString = shuffleString(`${passwordString}${passObj.uppercase}`)
		}
		if (includeNumbers) {
			passwordString = shuffleString(`${passwordString}${passObj.numbers}`)
		}
		if (includeSymbols) {
			passwordString = shuffleString(`${passwordString}${passObj.symbols}`)
		}

		let generatedPassword = ''

		// Generating a password of a specified length from random characters for (let i = 0; i < actualLength; i++) {
		for (let i = 0; i < length; i++) {
			const random = randomInt(0, passwordString.length - 1)
			generatedPassword += passwordString[random]
		}

		setPasswordInput(generatedPassword) // Set the received password in the input field
		updatePasswordStrength(length)
	}

	// Restore settings from localStorage when mounting the component
	useEffect(() => {
		restorePasswordOptions()
	}, [])

	const handleLengthChange = e => {
		// const newLength = Number(e.target.value)
		setPasswordLength(+e.target.value)
		generatePassword(e.target.value)
	}

	return (
		<section className='password'>
			<div className='container'>
				<h1 className='title'>User-friendly password generator</h1>
				<div className='password__wrapper'>
					<div className='password__head'>
						<input type='text' value={passwordInput} disabled />
						<span className='password__head-icon' onClick={copyPassword}>
							{copyStatus === 'icon' ? (
								<svg
									width='25'
									height='25'
									fill='currentColor'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 448 512'
									role='img'
									aria-label='copy'
								>
									<path d='M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z' />
								</svg>
							) : (
								<span>{copyStatus}</span>
							)}
						</span>
					</div>

					<div className={`password__indicator ${passwordStrength}`}></div>

					<div className='password__length'>
						<div className='password__info'>
							<label htmlFor='' className='label'>
								Length
							</label>
							<span>{passwordLength}</span>
						</div>
						<div className='password__range'>
							<input
								type='range'
								name='range'
								id='range'
								min={2}
								max={32}
								value={passwordLength}
								step={2}
								onChange={handleLengthChange}
							/>
						</div>
					</div>

					<div className='password__settings'>
						<label htmlFor='' className='label'>
							Settings
						</label>
						<div className='password__customisation'>
							<ul className='password__options'>
								<li className='password__option'>
									<label htmlFor='lowercase'>Lowercase (abc)</label>
									<input
										type='checkbox'
										name='lowercase'
										id='lowercase'
										checked={includeLowercase}
										onChange={() => setIncludeLowercase(!includeLowercase)}
										readOnly
										disabled
									/>
								</li>
								<li className='password__option'>
									<label htmlFor='uppercase'>Uppercase (ABC)</label>
									<input
										type='checkbox'
										name='uppercase'
										id='uppercase'
										checked={includeUppercase}
										onChange={() => setIncludeUppercase(!includeUppercase)}
									/>
								</li>
								<li className='password__option'>
									<label htmlFor='numbers'>Numbers (123)</label>
									<input
										type='checkbox'
										name='numbers'
										id='numbers'
										checked={includeNumbers}
										onChange={() => setIncludeNumbers(!includeNumbers)}
									/>
								</li>
								<li className='password__option'>
									<label htmlFor='symbols'>Symbols (~!#)</label>
									<input
										type='checkbox'
										name='symbols'
										id='symbols'
										checked={includeSymbols}
										onChange={() => setIncludeSymbols(!includeSymbols)}
									/>
								</li>
							</ul>
						</div>
					</div>

					<Button onClick={() => generatePassword()}>Generate password</Button>
				</div>
			</div>
		</section>
	)
}
