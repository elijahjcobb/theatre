import { IconType } from "react-icons";
import { Card } from "../card";
import { Nav } from "../nav";
import styles from "./index.module.css";
import { AddCard } from "../card/add-card";
import { useCallback, useEffect, useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Modal } from "../modal";
import clsx from "clsx";

export interface Item {
	name: string;
	href: string;
}

const DEFAULT_ITEMS: Item[] = [
	{
		name: "PlugShare",
		href: "https://www.plugshare.com/",
	},
	{
		name: "ABRP",
		href: "https://abetterrouteplanner.com/",
	},
	{
		name: "YouTube",
		href: "https://youtube.com",
	},
	{
		name: "HBO Max",
		href: "https://hbomax.com",
	},
	{
		name: "Netflix",
		href: "https://netflix.com",
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
	},
	{
		name: "Twitter",
		href: "https://twitter.com",
	},
	{
		name: "Twitch",
		href: "https://twitch.tv",
	},
	{
		name: "Reddit",
		href: "https://reddit.com",
	},
	{
		name: "LinkedIn",
		href: "https://linkedin.com",
	},
	{
		name: "Google Maps",
		href: "https://maps.google.com",
	},
	{
		name: "Messenger",
		href: "https://messenger.com",
	},
	{
		name: "Apple Music",
		href: "https://music.apple.com",
	},
	{
		name: "Instagram",
		href: "https://instagram.com",
	},
	{
		name: "Facebook",
		href: "https://facebook.com",
	},
	{
		name: "Google News",
		href: "https://news.google.com",
	},
	{
		name: "Google Photos",
		href: "https://photos.google.com",
	},
	{
		name: "Tesla",
		href: "https://https://www.tesla.com/findus",
	}
]

function setStorageItems(items: Item[]): void {
	localStorage.setItem("items", JSON.stringify(items));
}

function getStorageItems(): Item[] {
	return JSON.parse(localStorage.getItem("items") ?? "[]") as Item[];
}

export function HomePage() {

	const [items, setItems] = useState<Item[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [inDeleteMode, setInDeleteMode] = useState(false);
	const [parent] = useAutoAnimate<HTMLDivElement>()

	useEffect(() => {
		let storage = getStorageItems();
		if (storage.length === 0) storage = [...DEFAULT_ITEMS];
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

	const handleReset = useCallback(() => {
		setItems([...DEFAULT_ITEMS]);
	}, []);

	return <div className={styles.container}>
		<Nav setDefaults={handleReset} inDeleteMode={inDeleteMode} setInDeleteMode={setInDeleteMode} />
		<div className={clsx(styles.cards, items.length > 0 && styles.animateIn)} ref={parent}>
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