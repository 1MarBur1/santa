import { Button, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getAllSantas } from '../shared/api/santa';

const { Title, Text } = Typography;

const HomePage = () => {
	const router = useRouter();
	const [localStorageObj, setLocalStorageObj] = useState<any>();
	const santas = useQuery('all_santas', getAllSantas)

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	};

	const getPerson = () => {
		if (santas.data?.length && localStorageObj.getItem('data') === null) {
			const data_ = santas.data[getRandomInt(santas.data?.length-1)]

			localStorage.setItem('data', JSON.stringify(data_))

			router.push('/result')
		}
		else {
			alert('Карточки участников кончились! :(')
		}
	};


	useEffect(() => {
		setLocalStorageObj(localStorage);
	}, []);

	useEffect(() => {
		if (typeof localStorageObj !== 'undefined' && localStorageObj.getItem('data') !== null) {
			router.push('/result')
		}
	}, [localStorageObj])

	return (
		<div style={{ padding: '52px' }}>
			<Typography>
				<Title level={2}>
					Привет! Теперь ты - Тайный Санта 🎅
				</Title>

				<Text style={{ fontSize: '16px' }}>
					Правила просты - жми кнопку, получай свою цель, ее хотелки и нехотелки, а затем просто дари ей подарки!
				</Text>
			</Typography>

			<Button 
				style={{ width: '100%', height: '40px', marginTop: '32px' }}
				onClick={getPerson}
			>
				Получить цель! 🎄
			</Button>
		</div>
	)
}

export default HomePage;
