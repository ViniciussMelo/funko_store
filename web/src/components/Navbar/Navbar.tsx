import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { AiOutlineClose } from "react-icons/ai";

import { SidebarData } from "./SidebarData";

import './styles.css';

function Navbar() {
	const [sidebar, setSidebar] = useState(false);
	const [toolbarTitle, setToolbarTitle] = useState('Users');

	const showSideBar = () => setSidebar(!sidebar);

	const handleLinkClick= (itemTitle: string) => {
		if (itemTitle === 'Logout') {
			localStorage.removeItem('userId');
			localStorage.removeItem('username');
			setToolbarTitle('Users');
		} else {
			setToolbarTitle(itemTitle);
		}
	}

	return (
		<>
			<IconContext.Provider value={{color: '#fff'}}>
				<div className="navbar">
					<Link to="#" className="menu-bars">
						<FaBars onClick={showSideBar}/>
					</Link>
					<h1 className="text-title" style={{color: "#fff"}}>{toolbarTitle}</h1>
				</div>

					<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
						<ul className='nav-menu-items' onClick={showSideBar}>
							<li className="navbar-toggle">
								<Link to="#" className='menu-bars'>
									<AiOutlineClose />
								</Link>
							</li>
								{SidebarData.map((item, index) => {
									if (item.title === 'Logout' && !localStorage.getItem('userId')) {
										return null;
									}
									return (
										<li key={index} className={item.cName}>
											<Link to={item.path} onClick={() => {handleLinkClick(item.title)}}>
												{item.icon}
												<span>{item.title}</span>
											</Link>
										</li>
									)
								})}
						</ul>
					</nav>
			</IconContext.Provider>
		</>
	)
}

export default Navbar;
