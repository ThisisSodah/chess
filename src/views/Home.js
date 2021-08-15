import React from 'react'
import Game from './Game'
import MainMenu  from './Main'
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle } from '@material-ui/core';

export default function Home() {
  	const [open, showMenu] = React.useState(true)
  	const [active, setActive] = React.useState(false)

	React.useEffect(() => {
		if(active){
			showMenu(false)
		}
	},[active])

  	const renderMainMenu = () => {
		  return (
			<Dialog open={open} onClose={closeMainMenu}>
				<DialogTitle>
					Chess
				</DialogTitle>
				<MainMenu onClose={closeMainMenu} active={active} startGame={startGame}/>
			</Dialog>
		)
	}
	const openMenu = () => {
		showMenu(true)
		setActive(false)
	}

	const startGame = () => {
		setActive(true)
	}

	const closeMainMenu = () => {
		showMenu(false)
	}

    	return (
    	    <>
    	      	<Game start={active} openMenu={openMenu}/>
				{renderMainMenu()}
    	    </>
    	)
}
