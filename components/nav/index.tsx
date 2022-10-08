import styles from "./index.module.css";
import { BsFullscreen } from "react-icons/bs"
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { useCallback } from "react";

export interface NavProps {
	inDeleteMode: boolean;
	setInDeleteMode: (value: boolean) => void;
	setDefaults: () => void;
}

export function Nav({ setDefaults, inDeleteMode, setInDeleteMode }: NavProps) {

	const handleOnClick = useCallback(() => {
		setInDeleteMode(!inDeleteMode)
	}, [inDeleteMode, setInDeleteMode]);

	return <div className={styles.container}>
		<h1>theatre++</h1>
		<div className={styles.flex}>
			{inDeleteMode && <button className={styles.button} onClick={setDefaults}>
				<span>Reset</span>
			</button>}
			<button className={styles.button} onClick={handleOnClick}>
				{inDeleteMode ? <span>Done</span> : <span>Edit</span>}
			</button>
			<Link passHref href={`https://www.youtube.com/redirect?q=https://theatre.elijahcobb.app`}>
				<a><BsFullscreen size={24} /></a>
			</Link>
		</div>
	</div >
}