import styles from "./index.module.css";
import clsx from "clsx";
import type { Item } from "../home";
import { useCallback, useEffect, useState } from "react";

export interface ModalProps {
	show: boolean;
	onComplete: (item: Item) => void;
	onCancel: () => void;
}

function Field({
	placeholder,
	value,
	setValue
}: {
	placeholder: string;
	value: string;
	setValue: (value: string) => void;
}) {
	return <div className={styles.field}>
		<span className={styles.placeholder}>{placeholder}</span>
		<input className={styles.input} value={value} onChange={(ev) => setValue(ev.target.value)} placeholder={''} />
	</div>
}

const INITIAL_HREF = "https://";

export function Modal({ show, onCancel, onComplete }: ModalProps) {

	const [name, setName] = useState("");
	const [href, setHref] = useState(INITIAL_HREF);

	useEffect(() => {
		setName("");
		setHref(INITIAL_HREF);
	}, [show]);

	const handleSubmit = useCallback(() => {
		onComplete({
			name,
			href
		})
	}, [href, name, onComplete]);

	return <div onClick={onCancel} className={clsx(styles.outer, show && styles.show)}>
		<div onClick={(ev) => { ev.stopPropagation() }} className={styles.container}>
			<h2>Add Shortcut</h2>
			<Field
				value={name}
				setValue={setName}
				placeholder="Name"
			/>
			<Field
				value={href}
				setValue={setHref}
				placeholder="URL"
			/>
			<div className={styles.buttons}>
				<button onClick={onCancel} className={styles.cancel}>Cancel</button>
				<button onClick={handleSubmit}>Add</button>
			</div>
		</div>
	</div>
}