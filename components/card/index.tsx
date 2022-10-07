import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { Item } from "../home";
import styles from "./index.module.css";
import { SiHbo, SiNetflix, SiYoutube, SiHulu, SiPrimevideo, SiAppletv } from "react-icons/si";
import { IconType } from "react-icons";

export interface CardProps {
	item: Item;
	showDelete: boolean;
	onDelete: () => void;
}

export function Card({ item, showDelete, onDelete }: CardProps) {
	const { name, href } = item;
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push(href);
	}, [href, router]);

	const Icon = useMemo<IconType | null>(() => {
		switch (name) {
			case "HBO Max":
				return SiHbo;
			case "Netflix":
				return SiNetflix;
			case "YouTube":
				return SiYoutube;
			case "Hulu":
				return SiHulu;
			case "Prime Video":
				return SiPrimevideo;
			case "Apple TV+":
				return SiAppletv;
		}
		return null;
	}, [name]);

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