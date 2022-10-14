import React, { useEffect, useState } from 'react'
import db from '../firebase';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import './PlansScreen.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function PlansScreen() {
	const [products, setProducts] = useState([]);
	const user = useSelector(selectUser)

	useEffect(() => {

		onSnapshot(
			query(
				collection(db, "products"),
				where(
					"active",
					"==",
					true
				)
			),
			(snapshot) => {
				const products = {};
				snapshot.forEach(async docChanges => {
					products[docChanges.id] = docChanges.data();
					const priceSnap = await getDocs(collection(db, "products", docChanges.id, "prices"));
					priceSnap.docs.forEach(price => {
						products[docChanges.id].prices = {
							priceId: price.id,
							priceData: price.data()
						}
					})
					setProducts(products)
				})
			})
	}, [])

	const loadCheckout = async (priceId) => {
		const docRef = await getDoc(doc(db, "customers", user.uid)).then(
			setDoc(doc(db, "customers", user.uid, "checkout_sessions"), {
				price: priceId,
				success_url: window.location.origin,
				cancel_url: window.location.origin
			})
		)
		console.log(docRef)
	}


	



	return (
		<div className='plansScreen'>
			{Object.entries(products).map(([productId, productData]) => {
				return (
					<div key={productId} className='plansScreen__plan'>
						<div className="plansScreen__info">
							<h5>{productData.name}</h5>
							<h6>{productData.description}</h6>
						</div>
						<button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
					</div>
					
				)
			})}
		</div>
	)
}

export default PlansScreen
