import { IconType } from "react-icons";
import { Card } from "../card";
import { Nav } from "../nav";
import styles from "./index.module.css";
import { AddCard } from "../card/add-card";
import { useCallback, useEffect, useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Modal } from "../modal";


export interface Item {
	name: string;
	href: string;
}

const DEFAULT_ITEMS: Item[] = [
	{
		name: "HBO Max",
		href: "https://hbomax.com",
	},
	{
		name: "Netflix",
		href: "https://netflix.com",
	},
	{
		name: "YouTube",
		href: "https://youtube.com",
	},
	{
		name: "Hulu",
		href: "https://hulu.com",
	},
	{
		name: "Prime Video",
		href: "https://primevideo.com",
	},
	{
		name: "Apple TV+",
		href: "https://tv.apple.com",
	}
]

function setStorageItems(items: Item[]): void {
	sessionStorage.setItem("items", JSON.stringify(items));
}

function getStorageItems(): Item[] {
	return JSON.parse(sessionStorage.getItem("items") ?? "[]") as Item[];
}

export function HomePage() {

	const [items, setItems] = useState<Item[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [inDeleteMode, setInDeleteMode] = useState(false);
	const [parent] = useAutoAnimate<HTMLDivElement>()

	useEffect(() => {
		let storage = getStorageItems();
		if (storage.length === 0) {
			storage = [...DEFAULT_ITEMS];
			setStorageItems(storage);
		}
		setItems(storage);
	}, []);

	useEffect(() => {
		setStorageItems(items);
	}, [items]);

	const handleAddCard = useCallback((item: Item) => {
		setItems(v => [...v, item])
		setShowModal(false);
	}, []);

	const handleDelete = useCallback((item: Item) => {
		setItems(v => {
			return v.filter(i => i !== item)
		})
	}, []);

	return <div className={styles.container}>
		<Nav inDeleteMode={inDeleteMode} setInDeleteMode={setInDeleteMode} />
		<div className={styles.cards} ref={parent}>
			{items.map(item => <Card
				showDelete={inDeleteMode}
				onDelete={() => handleDelete(item)}
				item={item}
				key={item.href} />)}
			<AddCard onClick={() => setShowModal(true)} />
		</div>
		<Modal
			onCancel={() => setShowModal(false)}
			onComplete={handleAddCard}
			show={showModal} />
	</div>
} 