import React, {Fragment} from "react"
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import varun from '../images/varun.jpeg';
import benson from '../images/benson.jpeg';
import steven from '../images/steven.jpeg';
import kyle from '../images/kyle.jpeg';
import hasan from '../images/hasan.jpeg';
import anthony from '../images/anthony.jpeg';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    container: {
        alignContent: "flex-start",
        alignItems: "center",
        justify: "center",
        justifyContent: "center",
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    lists: {

        padding: "5px"
    }

}));


function About() {
    const classes = useStyles();

  return <Fragment >

      <Container maxWidth={"xl"} >
          <Grid container spacing={2} direction="row" justify="center" alignItems="center">

              <Grid container spacing={2} direction="row" justify="center" alignItems="flex-start" className={classes.lists}>
                  <Grid  item >
                      <h2>About</h2>
                      <p>StableGen is an online tool that allows users to calculate and visualize stable states
                          of chemical systems with user specified inputs and constraints.</p>
                      <p>Please reach out to the team if you have any feedback about this website: we would love to make
                          any changes that you feel would improve the tool. Hope you enjoy it!</p>
                  </Grid>
              </Grid>


              <Grid container spacing={2} direction="row" justify="center" alignItems="flex-start" className={classes.lists}>

                  <Grid item xs={12} md={4}>
                      <Typography variant="h6" className={classes.title}>
                          Acknowledgements
                      </Typography>
                      <div>
                          <List>
                              <div>
                                  <ListItem>
                                      <ListItemText
                                          primary="Dr. Soloveichik"
                                          secondary={<div>
                                                          <div>
                                                              Faculty Mentor
                                                          </div>
                                                          <div>
                                                              http://users.ece.utexas.edu/~soloveichik/
                                                          </div>
                                                     </div>
                                          }

                                      />
                                  </ListItem>

                                  <ListItem>
                                      <ListItemText
                                          primary="Keenan Breik"
                                          secondary="Graduate Research Assistant"
                                      />
                                  </ListItem>

                                  <ListItem>
                                      <ListItemText
                                          primary="University of Texas at Austin Senior Design"
                                          secondary="Group H15"
                                      />
                                  </ListItem>
                              </div>

                          </List>
                      </div>
                  </Grid>

                  <Grid item xs={12} md={4}>
                      <Typography variant="h6" className={classes.title}>
                          References
                      </Typography>

                      <div>
                          <ListItem>
                              <ListItemText
                                  primary="Computing properties of stable configurations of thermodynamic binding networks"
                                  secondary={"https://arxiv.org/abs/1709.08731v4"}
                              />
                          </ListItem>
                          <ListItem>
                              <ListItemText
                                  primary="Backend Source Code"

                                  secondary={"https://github.com/BensonKHuang/StableConfigs"}
                              />
                          </ListItem>

                          <ListItem>
                              <ListItemText
                                  primary="Docker Version of Backend Code"
                                  secondary={"https://hub.docker.com/r/stevenzwang/stableconfigs"}
                              />
                          </ListItem>

                      </div>

                  </Grid>
              </Grid>

              <Grid container spacing={2} xs={12} direction="row" justify="center" alignItems="center">
                  <Grid item>
                      <Typography variant={"h6"}>
                          Team Members
                      </Typography>
                  </Grid>

              </Grid>

              <Grid container spacing={2} xs={11} direction="row" justify="center" alignItems="center" className={classes.lists}>

                      <Grid item xs={8} sm={6} md={4} lg={2}>
                          <Card >
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia >
                                          <Grid container direction="row" justify="center">
                                              <Grid item>
                                                  <Avatar src={varun} className={classes.large} alt='Varun Prabhu' />
                                              </Grid>
                                          </Grid>
                                      </CardMedia>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Varun Prabhu
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          Fullstack Engineer
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions>
                                  <IconButton href={"https://www.linkedin.com/in/varun-prabhu-7b674b137/"}>
                                      <LinkedInIcon/>
                                  </IconButton>
                                  <IconButton href={"https://github.com/varunprabhu/"}>
                                      <GitHubIcon/>
                                  </IconButton>
                              </CardActions>
                          </Card>
                      </Grid>

                      <Grid item xs={8} sm={6} md={4} lg={2}>
                          <Card >
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia >
                                          <Grid container direction="row" justify="center">
                                              <Grid item>
                                                  <Avatar src={benson} className={classes.large} alt='Benson Huang' />
                                              </Grid>
                                          </Grid>
                                      </CardMedia>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Benson Huang
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          PM/Backend Engineer
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions>
                                  <IconButton href={"https://www.linkedin.com/in/benson-huang/"}>
                                      <LinkedInIcon/>
                                  </IconButton>
                                  <IconButton href={"https://github.com/BensonKHuang/"}>
                                      <GitHubIcon/>
                                  </IconButton>
                              </CardActions>
                          </Card>
                      </Grid>

                      <Grid item xs={8} sm={6} md={4} lg={2}>
                          <Card>
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia>
                                          <Grid container direction="row" justify="center">
                                              <Grid item>
                                                  <Avatar src={kyle} className={classes.large} alt='Kyle Zhou' />
                                              </Grid>
                                          </Grid>
                                      </CardMedia>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Kyle Zhou
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          UI/UX Designer
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions>
                                  <IconButton href={"https://www.linkedin.com/in/kyle-zhou-9723b9153/"}>
                                      <LinkedInIcon/>
                                  </IconButton>
                                  <IconButton href={"https://github.com/INameMyMethodsExactlyWhatTheyDo"}>
                                      <GitHubIcon/>
                                  </IconButton>
                              </CardActions>
                          </Card>
                      </Grid>

                      <Grid item xs={8} sm={6} md={4} lg={2}>
                          <Card>
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia>
                                          <Grid container direction="row" justify="center">
                                              <Grid item>
                                                  <Avatar src={steven} className={classes.large} alt='Steven Wang' />
                                              </Grid>
                                          </Grid>
                                      </CardMedia>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Steven Wang
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          Fullstack Engineer
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions>
                                  <IconButton href={"https://www.linkedin.com/in/zijian-steven-wang/"}>
                                      <LinkedInIcon/>
                                  </IconButton>
                                  <IconButton href={"https://github.com/stevenwang5689/"}>
                                      <GitHubIcon/>
                                  </IconButton>
                              </CardActions>
                          </Card>
                      </Grid>


                      <Grid item xs={8} sm={6} md={4} lg={2}>
                          <Card>
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia>
                                          <Grid container direction="row" justify="center">
                                              <Grid item>
                                                  <Avatar src={anthony} className={classes.large} alt='Anthony Vento' />
                                              </Grid>
                                          </Grid>
                                      </CardMedia>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Anthony Vento
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          PM/Researcher
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions>
                                  <IconButton href={"https://www.linkedin.com/in/anthony-vento-89079b1a6/"}>
                                      <LinkedInIcon />
                                  </IconButton>
                                  <IconButton href={"https://github.com/vento99/"}>
                                      <GitHubIcon/>
                                  </IconButton>
                              </CardActions>
                          </Card>
                      </Grid>

                      <Grid item xs={8} sm={6} md={4} lg={2}>
                          <Card>
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia>
                                          <Grid container direction="row" justify="center">
                                              <Grid item>
                                                  <Avatar src={hasan} className={classes.large} alt='Hasan Saleemi' />
                                              </Grid>
                                          </Grid>
                                      </CardMedia>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Hasan Saleemi
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          Backend Engineer
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions>
                                  <IconButton href={"https://www.linkedin.com/in/hasan-saleemi"}>
                                      <LinkedInIcon/>
                                  </IconButton>
                                  <IconButton href={"https://github.com/hasansaleemi/"}>
                                      <GitHubIcon/>
                                  </IconButton>
                              </CardActions>
                          </Card>
                      </Grid>
              </Grid>
          </Grid>

      </Container>

  </Fragment>
}

export default About


