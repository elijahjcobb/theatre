import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaTrash } from "react-icons/fa";
import { Item } from "../home";
import styles from "./index.module.css";


export interface CardProps {
	item: Item;
	showDelete: boolean;
	onDelete: () => void;
}

export function Card({ item, showDelete, onDelete }: CardProps) {
	const { name, icon: Icon, href } = item;
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push(href);
	}, [href, router]);

	return <button onClick={handleClick} className={styles.container}>
		{Icon ? <Icon className={styles.icon} /> : <span className={styles.name}>{name}</span>}
		{showDelete && <button onClick={ev => {
			ev.stopPropagation();
			onDelete();
		}} className={styles.deleteButton}>
			<FaTrash size={24} className={styles.deleteIcon} />
		</button>}
	</button>
}