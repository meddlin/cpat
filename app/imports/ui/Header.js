import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react';
import { Panel, PanelType } from 'office-ui-fabric-react';
import { IconButton } from 'office-ui-fabric-react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
/*import IconButton from '@material-ui/core/IconButton';*/
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import './Header.css';

const styles = theme => ({
	fluidMarginCorrection: {
		margin: '-20px -20px 10px -20px',
	},

  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    /*backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },*/
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});


class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
		    left: false,
		    showPanel: false
		};
	}

	toggleDrawer = (side, open) => () => {
		this.setState({ [side]: open, });
	};

	_onRenderFooterContent = () => {
		return (
			<div>
				<DefaultButton onClick={this._hidePanel}>Dismiss</DefaultButton>
			</div>
		);
	};

	_showPanel = () => {
		this.setState({ showPanel: true });
	};

	_hidePanel = () => {
		this.setState({ showPanel: false });
	};

	_onDismiss = (ev?) => {
		if (!ev) {
			console.log('Panel dismissed.');
			return;
		}

		console.log('Close button clicked or light dismissed.');
		if (ev.nativeEvent.srcElement && ev.nativeEvent.srcElement.className.indexOf('ms-Button-icon') !== -1) {
			console.log('Close button clicked.');
		}
		if (ev.nativeEvent.srcElement && ev.nativeEvent.srcElement.className.indexOf('ms-Overlay') !== -1) {
			console.log('Light dismissed.');
		}
	};

	render() {
		const { classes } = this.props;

		const sideList = (
	      <div className={classes.list}>
	        <List>
	        	<ListItem button >
	        		<Link to="/scripts/viewall">
	        			<ListItemText primary='Script Editor' />
	        		</Link>
	        	</ListItem>
	        	<ListItem button >
	        		<Link to="/upload">
	        			<ListItemText primary='Upload' />
	        		</Link>
	        	</ListItem>
	        	<ListItem button >
	        		<Link to="/analytics">
	        			<ListItemText primary='Analytics' />
	        		</Link>
	        	</ListItem>
	        	<ListItem button >
	        		<Link to="/target/view">
	        			<ListItemText primary='Target View' />
	        		</Link>
	        	</ListItem>

	        	<Divider />
	        	
				<ListItem button >
	        		<Link to="/person/view">
	        			<ListItemText primary='Person View' />
	        		</Link>
	        	</ListItem>
				<ListItem button >
					<Link to="/company/view">
						<ListItemText primary='Company View' />
					</Link>
				</ListItem>
				<ListItem button >
					<Link to="/device/view">
						<ListItemText primary='Device View' />
					</Link>
				</ListItem>
				<ListItem button >
					<Link to="/location/view">
						<ListItemText primary='Location View' />
					</Link>
				</ListItem>
				<ListItem button >
					<Link to="/pdfFile/view">
						<ListItemText primary='PDF File View' />
					</Link>
				</ListItem>
			</List>
	      </div>
	    );

		return (
			<div className={classes.fluidMarginCorrection}>
				<AppBar position="static">
					<Toolbar variant="dense">

						<div>
							<IconButton style={{'color': 'white' }}
								iconProps={{ iconName: 'globalNavButton', style: { fontSize: 20 } }} 
								onClick={this._showPanel} 
								title="Global Navigation" 
								ariaLabel="Global Navigation" />
					        <Panel
								headerText="Navigation"
								isOpen={this.state.showPanel}
								type={PanelType.smallFixedNear}
								isFooterAtBottom={true}
								onDismiss={this._onDismiss}
								onRenderFooterContent={this._onRenderFooterContent}
								isLightDismiss={true}>
					        	<span>{sideList}</span>
					        </Panel>
					    </div>

						<Typography variant="h6" color="inherit">CPAT</Typography>
						<div className={classes.grow} />
							<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
							/>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

/*export default Header;*/
export default withStyles(styles)(Header);