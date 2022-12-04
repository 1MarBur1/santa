import { Button, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { deleteSantaById, getAllSantas } from '../shared/api/santa';
import { ISanta } from '../shared/models/santa';

const { Title, Text } = Typography;

const ResultPage = () => {
	const router = useRouter();
	const [data, setData] = useState<ISanta>();
	const deleteMutation = useMutation(deleteSantaById)
	const [confirm, setConfirm] = useState(false);

	const [localStorageObj, setLocalStorageObj] = useState<any>();

	useEffect(() => {
		setLocalStorageObj(localStorage);
	}, []);

	useEffect(() => {
		if (typeof localStorageObj !== 'undefined') {
			setData(JSON.parse(localStorageObj.getItem('data') as string))
			setConfirm(JSON.parse(localStorageObj.getItem('confirmed')))
		}
	}, [localStorageObj])

	return (
		<div style={{ padding: '52px' }}>
			<Typography>
				<Title level={2}>
					Тебе попался(ась) 
					{' '}
					<span style={{ color: '#3B23F6' }}>
						{data?.name}
					</span>
				</Title>

				<Text style={{ fontSize: '16px' }}>
					<span style={{ color: '#3B23F6', fontWeight: 700 }}>
						Его/Ee пожелания:
					</span>
					<br />
					{data?.wishes}
				</Text>
				<br />
				<Text style={{ fontSize: '16px' }}>
					<span style={{ color: '#3B23F6', fontWeight: 700 }}>
						Его/Ee анти-желания:
					</span>
					<br />
					{data?.dontlikes}
				</Text>
			</Typography>

			{!confirm ? (
				<>
					<Button 
						style={{ width: '100%', height: '40px', marginTop: '32px' }}
						onClick={() => {
							deleteMutation.mutate(data?.id as string)
							localStorage.setItem('confirmed', 'true')
							setConfirm(true)
						}}
					>
						Это не я
					</Button>
					<Button 
						style={{ width: '100%', height: '40px', marginTop: '5px', backgroundColor: '#3B23F6' }}
						type='primary'
						onClick={() => {
							router.push('/')
						}}
					>
						Это я
					</Button>
				</>
			) : null}
		</div>
	)
}

export default ResultPage;
