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
	return <button className={styles.container}>
		{Icon ? <Icon className={styles.icon} /> : <span className={styles.name}>{name}</span>}
		{showDelete && <button onClick={ev => {
			ev.stopPropagation();
			onDelete();
		}} className={styles.deleteButton}>
			<FaTrash size={24} className={styles.deleteIcon} />
		</button>}
	</button>
}