import { Item } from "../home";
import styles from "./index.module.css";
import { IoMdAdd } from "react-icons/io";

export interface AddCardProps {
	onClick: () => void;
}

export function AddCard(props: AddCardProps) {
	return <div onClick={props.onClick} className={styles.container}>
		<IoMdAdd className={styles.add} />
	</div>
}