import React, { useState } from 'react';
import {Container, CssBaseline, Avatar, Typography, 
    Button, Checkbox, Grid, Link, makeStyles, Card, CardContent} from '@material-ui/core';
import {LockRounded} from '@material-ui/icons';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import fire from '../helpers/db';
import {ToastContainer, toast} from 'react-toastify';
import {ScaleLoader} from 'react-spinners';

const Login = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const override = `
        display: block;
        margin-left: 100px;
        border-color: red;
    `;

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handlerLogin = () => {
        setLoading(true);
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const {user} =  response;
                const data = {
                    userId: user.uid,
                    email: user.email
                }
                localStorage.setItem('user', JSON.stringify(data));
                const storage = localStorage.getItem('user');
                const loggedInUser = storage !== null ? JSON.parse(storage) : null;
                props.loggedIn(loggedInUser);
                setLoading(false);
            }).catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        toast.error('El email está mal formateado.');
                        break;
                    case 'auth/user-disabled': 
                        toast.error('La cuenta de usuario ha sido inhabilitada por un administrador.');                    
                        break;
                    case 'auth/user-not-found':
                        toast.error('No hay ningún registro de usuario que corresponda a este email. Es posible que se haya eliminado al usuario.');
                        break;
                    case 'auth/wrong-password': 
                        toast.error('La contraseña no es válida o el usuario no tiene contraseña.');                    
                        break;
                }
                setLoading(false);
            });

    }
    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
                <CardContent>
                    <ToastContainer/>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockRounded/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Iniciar sesión
                        </Typography>
                        <ValidatorForm 
                            onSubmit={handlerLogin}
                            onError={errors => {
                                for (const err of errors) {
                                  console.log(err.props.errorMessages[0])
                                }
                                }}
                                className={classes.form}>
                        <TextValidator
                         variant="outlined"
                         margin="normal"
                         fullWidth
                         label="Email"
                         onChange={handleEmail}
                         name="email"
                         value={email}
                         validators={['required', 'isEmail']}
                         errorMessages={['Este campo es requerido', 'El email no es válido']}
                         autoComplete='off' />
                          <TextValidator
                                variant="outlined"
                                fullWidth
                                label="Contraseña"
                                onChange={handlePassword}
                                name="password"
                                type="password"
                                value={password}
                                validators={['required']}
                                errorMessages={['Este campo es requerido']}
                                autoComplete="off"
                            />
                        {loading ? (
                            <ScaleLoader
                            css={override}
                            size={150}
                            color={"#eb4034"}
                            loading={loading}/>
                        ) : (
                             <Button
                             type="submit"
                             fullWidth
                             variant="contained"
                             className={classes.submit}
                         >
                             Iniciar sesión
                         </Button>
                        )}
                            <Grid container>
                                <Grid item>
                                    <Link  onClick={props.toggle} className={classes.pointer} variant="body2">
                                        {"¿No tenés cuenta? !Registrate!"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%',
        marginTop: theme.spacing(1),
      },
      submit: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          margin: theme.spacing(3, 0, 2),
          color: '#fff'
      },
      card: {
          marginTop: '60px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '20px',
      },
      pointer: {
          cursor: 'pointer',
          color: 'red'
      }
}));

export default Login;