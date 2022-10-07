import { IconType } from "react-icons";
import { Card } from "../card";
import { Nav } from "../nav";
import styles from "./index.module.css";
import { SiHbo, SiNetflix, SiYoutube, SiHulu, SiPrimevideo, SiAppletv } from "react-icons/si";
import { AddCard } from "../card/add-card";
import { useCallback, useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Modal } from "../modal";


export interface Item {
	name: string;
	href: string;
	icon?: IconType;
}

const DEFAULT_ITEMS: Item[] = [
	{
		name: "HBO Max",
		href: "https://hbomax.com",
		icon: SiHbo
	},
	{
		name: "Netflix",
		href: "https://netflix.com",
		icon: SiNetflix
	},
	{
		name: "YouTube",
		href: "https://youtube.com",
		icon: SiYoutube
	},
	{
		name: "Hulu",
		href: "https://hulu.com",
		icon: SiHulu
	},
	{
		name: "Prime Video",
		href: "https://primevideo.com",
		icon: SiPrimevideo
	},
	{
		name: "Apple TV+",
		href: "https://tv.apple.com",
		icon: SiAppletv
	}
]

export function HomePage() {

	const [items, setItems] = useState<Item[]>(DEFAULT_ITEMS);
	const [showModal, setShowModal] = useState(false);
	const [inDeleteMode, setInDeleteMode] = useState(false);
	const [parent] = useAutoAnimate<HTMLDivElement>()

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