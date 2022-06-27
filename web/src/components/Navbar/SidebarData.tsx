import { BiStore, BiUser } from "react-icons/bi";
import { GiNinjaHeroicStance } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";

export const SidebarData = [
	{
		title: 'Users',
		path: '/',
		icon: <BiUser />,
		cName: 'nav-text'
	},
	{
		title: 'Funkos',
		path: '/funkos',
		icon: <GiNinjaHeroicStance />,
		cName: 'nav-text'
	},
	{
		title: 'Store',
		path: '/store',
		icon: <BiStore />,
		cName: 'nav-text'
	},
	{
		title: 'Logout',
		path: '/',
		icon: <FiLogOut />,
		cName: 'nav-text'
	}
];