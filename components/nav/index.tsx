import styles from "./index.module.css";
import { BsFullscreen } from "react-icons/bs"
import Link from "next/link";
import { KeyboardEvent, useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

export interface NavProps {
	inDeleteMode: boolean;
	setInDeleteMode: (value: boolean) => void;
	setDefaults: () => void;
}

export function SearchBox() {

	const [value, setValue] = useState("")
	const router = useRouter();

	const handleKeyPress = useCallback((ev: KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === "Enter") {
			router.push(`https://www.google.com/search?q=${encodeURIComponent(value)}`)
		}
	}, [router, value]);

	return <div className={styles.search}>
		<FaSearch className={styles.searchIcon} />
		<input onKeyDown={handleKeyPress} value={value} onChange={ev => setValue(ev.target.value)} placeholder="Search on Google..." />
	</div>
}

export function Nav({ setDefaults, inDeleteMode, setInDeleteMode }: NavProps) {


	const handleOnClick = useCallback(() => {
		setInDeleteMode(!inDeleteMode)
	}, [inDeleteMode, setInDeleteMode]);

	return <div className={styles.container}>
		<h1>theatre++</h1>
		<SearchBox />
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