import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { Item } from "../home";
import styles from "./index.module.css";
import { SiHbo, SiNetflix, SiYoutube, SiHulu, SiPrimevideo, SiAppletv, SiTwitter, SiTwitch, SiReddit, SiLinkedin, SiGooglemaps, SiMessenger, SiApplemusic, SiInstagram, SiFacebook, SiGooglenews, SiGooglephotos, SiTesla } from "react-icons/si";
import { FaMapSigns } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import type { IconType } from "react-icons";

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
		switch (name.trim().replace(RegExp(" ", 'g'), "").toLowerCase()) {
			case "twitter":
				return SiTwitter;
			case "twitch":
			case "twitchtv":
				return SiTwitch;
			case "reddit":
				return SiReddit;
			case "linkedin":
				return SiLinkedin;
			case "googlemaps":
			case "gmaps":
			case "maps":
			case "map":
				return SiGooglemaps;
			case "messenger":
			case "fbmessenger":
			case "facebookmessenger":
				return SiMessenger;
			case "applemusic":
				return SiApplemusic;
			case "fb":
			case "fbook":
			case "facebook":
				return SiFacebook;
			case "instagram":
			case "insta":
				return SiInstagram;
			case "hbomax":
			case "hbo":
			case "hboplus":
				return SiHbo;
			case "netflix":
				return SiNetflix;
			case "youtube":
			case "utube":
				return SiYoutube;
			case "hulu":
			case "hulu+":
				return SiHulu;
			case "primevideo":
			case "prime":
			case "amazon":
			case "amazonprime":
				return SiPrimevideo;
			case "appletv":
			case "appletv+":
			case "appletvplus":
			case "apple":
			case "apple+":
			case "appleplus":
				return SiAppletv;
			case "googlenews":
			case "news":
			case "gnews":
				return SiGooglenews;
			case "photos":
			case "googlephotos":
			case "gphotos":
				return SiGooglephotos;
			case "tesla":
				return SiTesla;
			case "abrp":
			case "abetterrouteplanner":
			case "betterrouteplanner":
			case "routeplanner":
				return FaMapSigns;
			case "plugshare":
			case "plug":
				return BsFillLightningChargeFill;
		}
		return null;
	}, [name]);

	return <div onClick={handleClick} className={styles.container}>
		{Icon ? <Icon className={styles.icon} /> : <span className={styles.name}>{name}</span>}
		{showDelete && <button onClick={ev => {
			ev.stopPropagation();
			onDelete();
		}} className={styles.deleteButton}>
			<FaTrash size={24} className={styles.deleteIcon} />
		</button>}
	</div>
}