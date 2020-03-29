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
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
    container: {
        alignContent: "flex-start",
        alignItems: "center",
        justify: "center",
        justifyContent: "center",
    },

}));


function About() {
    const classes = useStyles();

  return <Fragment >

      <Container maxWidth={"xl"} >
          <Grid container spacing={2} direction="row" justify="center" alignItems="center">
              <Grid  item >
                  < h1 > About Us </h1>
                  <p>Meet the team that brought you StableGEN!</p>
                  <p>This online tool has been developed over the course of a school year by our team of seniors at The University of Texas at Austin. Additional feature development is in the works and will be added to this tool as time progresses.</p>
                  <p>Special thanks to our faculty mentor Dr. Soloveichik and his graduate assistant Keenan Breik. Without them, this tool would not have been possible!</p>
                  <p>Please reach out to any of us if you have feedback about this website: we would love to make any changes that you feel would improve the tool. Hope you enjoy it!</p>
              </Grid>

              <Grid container spacing={2} direction="row" justify="center" alignItems="center">

                      <Grid item>
                          <Card >
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia >
                                          <Avatar src={varun} className={classes.large} alt='Varun Prabhu' />
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

                      <Grid item>
                          <Card >
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia >
                                          <Avatar src={benson} className={classes.large} alt='Benson Huang' />
                                      </CardMedia>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Benson Huang
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          Project Manager/Backend Engineer
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

                      <Grid item>
                          <Card>
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia>
                                          <Avatar src={kyle} className={classes.large} alt='Kyle Zhou' />
                                      </CardMedia>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Kyle Zhou
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          Backend Engineer/Deployment
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions>
                                  <IconButton href={"https://www.linkedin.com/in/kyle-zhou-9723b9153/"}>
                                      <LinkedInIcon/>
                                  </IconButton>
                              </CardActions>
                          </Card>
                      </Grid>

                      <Grid item>
                          <Card>
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia>
                                          <Avatar src={steven} className={classes.large} alt='Steven Wang' />
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


                      <Grid item>
                          <Card>
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia>
                                          <Avatar src={anthony} className={classes.large} alt='Anthony Vento' />
                                      </CardMedia>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Anthony Vento
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          Project Manager/Backend Engineer
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions>
                              </CardActions>
                          </Card>
                      </Grid>

                      <Grid item>
                          <Card>
                              <CardActionArea>
                                  <CardContent>
                                      <CardMedia>
                                          <Avatar src={hasan} className={classes.large} alt='Hasan Saleemi' />
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
                              </CardActions>
                          </Card>
                      </Grid>
              </Grid>
          </Grid>

      </Container>

  </Fragment>
}

export default About


