import styles from "./index.module.css";
import { BsFullscreen } from "react-icons/bs"
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { useCallback } from "react";

export interface NavProps {
	inDeleteMode: boolean;
	setInDeleteMode: (value: boolean) => void;
}

export function Nav({ inDeleteMode, setInDeleteMode }: NavProps) {

	const handleOnClick = useCallback(() => {
		setInDeleteMode(!inDeleteMode)
	}, [inDeleteMode, setInDeleteMode]);

	return <div className={styles.container}>
		<h1>theatre++</h1>
		<div className={styles.flex}>
			<button onClick={handleOnClick}>
				{inDeleteMode ? <span>Done</span> : <FiEdit />}
			</button>
			<Link passHref href={`https://www.youtube.com/redirect?q=http://localhost:3000`}>
				<a><BsFullscreen /></a>
			</Link>
		</div>
	</div >
}